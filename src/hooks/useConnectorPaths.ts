import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react'

export interface ConnectorPath {
  key: string
  from: string
  to: string
  d: string
}

const GAP = 8

interface Box {
  left: number
  right: number
  top: number
  height: number
}

/**
 * Layout box of `el` relative to `root`, ignoring CSS transforms —
 * so in-flight reveal animations don't skew the lines.
 */
function boxWithin(el: HTMLElement, root: HTMLElement): Box | null {
  let left = 0
  let top = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    left += node.offsetLeft
    top += node.offsetTop
    const parent = node.offsetParent as HTMLElement | null
    if (parent && parent !== root && !root.contains(parent)) return null
    node = parent
  }
  if (node !== root) return null
  return { left, right: left + el.offsetWidth, top, height: el.offsetHeight }
}

/**
 * Measures registered DOM anchors inside `container` and returns SVG paths
 * connecting them — so diagram lines follow the real layout at every breakpoint.
 */
export function useConnectorPaths(container: RefObject<HTMLElement | null>, edges: ReadonlyArray<readonly [string, string]>, layoutDirection: string) {
  const anchors = useRef(new Map<string, HTMLElement>())
  const [paths, setPaths] = useState<ConnectorPath[]>([])

  const register = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) anchors.current.set(id, el)
      else anchors.current.delete(id)
    },
    [],
  )

  useLayoutEffect(() => {
    const root = container.current
    if (!root) return

    const measure = () => {
      const next: ConnectorPath[] = []
      const rtl = getComputedStyle(root).direction === 'rtl'
      const box = (id: string) => {
        const el = anchors.current.get(id)
        return el ? boxWithin(el, root) : null
      }
      for (const [from, to] of edges) {
        const a = box(from)
        const b = box(to)
        if (!a || !b) continue
        const ay = a.top + a.height / 2
        const by = b.top + b.height / 2
        // In RTL, text-start buttons share their right edge instead of their left.
        const aStart = rtl ? a.right : a.left
        const bStart = rtl ? b.right : b.left
        const sameColumn = Math.abs(aStart - bStart) < 40
        let d: string
        if (sameColumn) {
          // Route from the logical start edge of the column.
          const x1 = rtl ? a.right + GAP : a.left - GAP
          const x2 = rtl ? b.right + GAP : b.left - GAP
          const bulge = Math.min(64, 18 + Math.abs(by - ay) * 0.12)
          const bend = rtl ? bulge : -bulge
          d = `M${x1},${ay} C${x1 + bend},${ay} ${x2 + bend},${by} ${x2},${by}`
        } else {
          const rightward = b.left > a.left
          const x1 = (rightward ? a.right : a.left) + (rightward ? GAP : -GAP)
          const x2 = (rightward ? b.left : b.right) + (rightward ? -GAP : GAP)
          const mx = (x1 + x2) / 2
          d = `M${x1},${ay} C${mx},${ay} ${mx},${by} ${x2},${by}`
        }
        next.push({ key: `${from}->${to}`, from, to, d })
      }
      setPaths(next)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [container, edges, layoutDirection])

  return { paths, register }
}

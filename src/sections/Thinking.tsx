import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { principles, thinkingStages } from '@/data/thinking'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Reveal, Stagger, StaggerItem } from '@/animations/Reveal'
import { duration, ease } from '@/animations/tokens'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/cn'
import { pad2 } from '@/lib/format'
import { useI18n } from '@/i18n'

const ADVANCE_MS = 4200

function Pipeline() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const { reducedMotion } = usePreferences()
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  const stage = thinkingStages[active] ?? thinkingStages[0]!
  const last = thinkingStages.length - 1

  useEffect(() => {
    if (!inView || manual || reducedMotion) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % thinkingStages.length), ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [inView, manual, reducedMotion])

  const choose = (i: number) => {
    setManual(true)
    setActive(i)
  }

  return (
    <div ref={ref} className="mt-16">
      {/* Stage rail */}
      <div className="scrollbar-none -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="relative min-w-[680px]">
          <div className="absolute start-[7%] end-[7%] top-[7px] h-px bg-line-strong" aria-hidden="true" />
          <motion.div
            className="absolute start-[7%] top-[7px] h-px origin-left bg-accent"
            style={{ width: '86%' }}
            animate={{ scaleX: active / last }}
            transition={{ duration: duration.slow, ease: ease.out }}
            aria-hidden="true"
          />
          <ol className="relative grid grid-cols-7" aria-label={t('Front-end process')}>
            {thinkingStages.map((s, i) => {
              const isActive = i === active
              const done = i < active
              return (
                <li key={s.id} className="flex justify-center">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="thinking-detail"
                    onClick={() => choose(i)}
                    onMouseEnter={() => choose(i)}
                    onFocus={() => choose(i)}
                    className="group flex flex-col items-center gap-3 px-1 pb-2"
                  >
                    <span
                      className={cn(
                        'relative grid size-[15px] place-items-center border transition-colors duration-300',
                        isActive ? 'border-accent bg-ink-950' : done ? 'border-accent bg-accent' : 'border-fg-dim bg-ink-950 group-hover:border-fg-muted',
                      )}
                      aria-hidden="true"
                    >
                      {isActive && <motion.span layoutId="thinking-dot" className="size-[7px] bg-accent" />}
                    </span>
                    <span className="font-mono text-[10px] text-fg-dim">{pad2(i + 1)}</span>
                    <span
                      className={cn(
                        'font-mono text-[11px] uppercase tracking-[0.14em] transition-colors',
                        isActive ? 'text-fg' : 'text-fg-dim group-hover:text-fg-muted',
                      )}
                    >
                      {t(s.label)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* Stage detail */}
      <div id="thinking-detail" className="mt-12 min-h-[300px] border-t border-line pt-10 sm:min-h-[250px]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
            transition={{ duration: duration.base * 0.7, ease: ease.out }}
            className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {t('stage')} {pad2(active + 1)} / {t(stage.label)}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.025em] text-balance sm:text-[2.15rem] sm:leading-tight">
                {t(stage.question)}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted">{t(stage.detail)}</p>
            </div>
            <ul className="space-y-3 self-end font-mono text-[12.5px]">
              {stage.practices.map((p) => (
                <li key={p} className="flex gap-3 text-fg-muted">
                  <span className="text-ok" aria-hidden="true">
                    ✓
                  </span>
                  {t(p)}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** Working principles in the site's editor-like visual language. */
function PrincipleSpec() {
  const { t } = useI18n()
  return (
    <Reveal className="mt-20 border border-line bg-ink-900/60">
      <div className="flex h-9 items-center justify-between border-b border-line px-4 font-mono text-[11px] text-fg-dim">
        <span>{t('notes / working-principles')}</span>
        <span className="hidden sm:inline">{t('front-end engineering')}</span>
      </div>
      <div className="p-4 font-mono text-[12.5px] leading-6 sm:p-6">
        <p>
          <span className="bg-ok px-1.5 py-px text-[11px] font-semibold text-ink-950">UI</span>{' '}
          <span className="text-fg">WorkingPrinciples.ts</span>
        </p>
        <Stagger gap={0.07} className="mt-2">
          {principles.map((p) => (
            <StaggerItem key={p.key}>
              <p className="group grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-1 py-0.5 sm:grid-cols-[1.25rem_11rem_minmax(0,1fr)]">
                <span className="text-ok" aria-hidden="true">
                  ✓
                </span>
                <span className="text-fg transition-colors group-hover:text-accent-strong">{t(p.key)}</span>
                <span className="col-start-2 text-fg-muted sm:col-start-3">{t(p.statement)}</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-4 border-t border-line pt-3 text-fg-dim">
          {principles.length} {t('principles')} · {t('based on my front-end work')}
        </p>
      </div>
    </Reveal>
  )
}

export function Thinking() {
  const { t } = useI18n()
  return (
    <Section id="thinking" component="Thinking" labelledBy="thinking-title">
      <SectionHeader
        id="thinking-title"
        index="05"
        eyebrow={t('How I work')}
        title={
          <>
            {t('From workflow to UI.')} <span className="text-fg-dim">{t('Every detail matters.')}</span>
          </>
        }
        description={t('The practices behind my React and enterprise interface work. Select a stage to see how I approach it.')}
      />
      <Pipeline />
      <PrincipleSpec />
    </Section>
  )
}

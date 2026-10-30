import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Experience as ExperienceItem } from '@/types/content'
import { experience } from '@/data/experience'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { StatusDot } from '@/components/StatusDot'
import { Reveal } from '@/animations/Reveal'
import { usePreferences } from '@/hooks/usePreferences'
import { formatPeriod, pad2 } from '@/lib/format'
import { useI18n } from '@/i18n'

const PIPELINE = ['build', 'test', 'deploy', 'run'] as const

/** BUILD → TEST → DEPLOY → RUN, lighting up in sequence for each role. */
function DeployPipeline() {
  const { reducedMotion } = usePreferences()
  const { t } = useI18n()
  return (
    <ol className="flex items-center gap-0 font-mono text-[10.5px] uppercase tracking-[0.14em]" aria-label={t('Deployment pipeline: all stages passed')}>
      {PIPELINE.map((stage, i) => (
        <li key={stage} className="flex items-center">
          {i > 0 && (
            <span className="relative mx-2 h-px w-6 overflow-hidden bg-line-strong sm:w-12" aria-hidden="true">
              <motion.span
                className="absolute inset-0 origin-left bg-ok"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : 0.15 + i * 0.28 }}
              />
            </span>
          )}
          <motion.span
            className="flex items-center gap-1.5"
            initial={{ color: 'var(--color-fg-dim)' }}
            animate={{ color: 'var(--color-fg)' }}
            transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.1 + i * 0.28 }}
          >
            <motion.span
              className="size-1.5 rounded-full"
              initial={{ backgroundColor: 'var(--color-ink-600)' }}
              animate={{ backgroundColor: 'var(--color-ok)' }}
              transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.1 + i * 0.28 }}
              aria-hidden="true"
            />
            {t(stage)}
          </motion.span>
        </li>
      ))}
    </ol>
  )
}

function Manifest({ item }: { item: ExperienceItem }) {
  const { t } = useI18n()
  const meta: Array<[string, string]> = [
    ['role', item.role],
    ['location', item.domain],
    ...(item.organization ? ([['org', item.organization]] as Array<[string, string]>) : []),
    ['period', formatPeriod(item.period)],
  ]

  return (
    <div className="space-y-8 pb-10 pt-4">
      <DeployPipeline />
      {item.summary && <p className="max-w-5xl text-base leading-relaxed text-fg sm:text-[17px]">{item.summary}</p>}
      <dl className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px]">
        {meta.map(([k, v]) => (
          <div key={k} className="flex flex-wrap gap-x-2">
            <dt className="text-fg-dim">{t(k)}:</dt>
            <dd className="text-fg">{t(v)}</dd>
          </div>
        ))}
      </dl>
      {item.technologies.length > 0 && <div>
        <h4 className="label-mono">{t('Technologies')}</h4>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[12px] text-fg-muted">
          {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>}
      {item.systems.length > 0 && <div>
        <h4 className="label-mono">{t('Systems')}</h4>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
          {item.systems.map((system) => (
            <li key={system} className="flex items-center gap-2.5">
              <span className="size-1 bg-accent" aria-hidden="true" />
              {t(system)}
            </li>
          ))}
        </ul>
      </div>}
      {item.problems.length > 0 && <div>
        <h4 className="label-mono">{t('Interesting problems')}</h4>
        <ol className="mt-4 divide-y divide-line border-y border-line">
          {item.problems.map((problem, i) => (
            <li key={problem.title} className="grid grid-cols-[minmax(0,1fr)] gap-1 py-4 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
              <span className="font-mono text-[11px] text-fg-dim">{pad2(i + 1)}</span>
              <div>
                <p className="text-[15px] font-medium text-fg">{problem.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{problem.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>}
    </div>
  )
}

export function Experience() {
  const { t } = useI18n()
  const { reducedMotion } = usePreferences()
  const [openExperience, setOpenExperience] = useState<string | null>(null)
  const experienceRefs = useRef(new Map<string, HTMLElement>())

  function toggleExperience(id: string) {
    const isOpen = openExperience === id
    setOpenExperience(isOpen ? null : id)

    if (!isOpen) {
      requestAnimationFrame(() => {
        experienceRefs.current.get(id)?.scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      })
    }
  }

  return (
    <Section id="experience" component="Experience" labelledBy="experience-title">
      <SectionHeader
        id="experience-title"
        index="03"
        eyebrow={t('Experience · service lifecycle')}
        title={
          <>
            {t('Deployed work.')} <span className="text-fg-dim">{t('Inspect any service.')}</span>
          </>
        }
        description={t('Every role is shown with its full scope, technologies, responsibilities, and the problems it dealt with.')}
      />

      <div className="relative mt-16">
        {/* Lifecycle rail */}
        <div className="absolute bottom-0 start-[1.15rem] top-0 hidden w-px bg-line sm:block" aria-hidden="true" />

        <ul className="border-b border-line sm:ps-12">
          {experience.map((item, i) => {
            const panelId = `exp-panel-${item.id}`
            return (
              <li key={item.id} className="relative border-t border-line">
                <Reveal delay={i * 0.06}>
                  <article
                    ref={(node) => {
                      if (node) experienceRefs.current.set(item.id, node)
                      else experienceRefs.current.delete(item.id)
                    }}
                    aria-labelledby={`${panelId}-title`}
                    className="scroll-mt-24 py-8 sm:py-10"
                  >
                    <header className="min-w-0">
                      <button
                        type="button"
                        aria-expanded={openExperience === item.id}
                        aria-controls={panelId}
                        onClick={() => toggleExperience(item.id)}
                        className="group flex w-full items-center gap-6 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950 sm:gap-10"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px]">
                            <span className="flex items-center gap-2 uppercase tracking-[0.14em] text-fg-muted">
                              <StatusDot tone={item.status === 'running' ? 'ok' : 'idle'} pulse={item.status === 'running'} />
                              {t(item.status)}
                            </span>
                            <span className="text-fg-dim">{formatPeriod(item.period)}</span>
                          </div>
                          <h3 id={`${panelId}-title`} className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-fg sm:text-[2rem]">
                            {t(item.organization ?? item.title)}
                          </h3>
                          <p className="mt-1.5 text-sm font-medium text-fg-muted sm:text-base">
                            {t(item.title)} <span className="text-fg-dim">· {t(item.domain)}</span>
                          </p>
                        </div>
                        <span className="ms-auto grid size-14 shrink-0 place-items-center border border-line-strong text-fg-dim transition-colors duration-200 group-hover:border-accent group-hover:text-fg sm:size-16">
                          <ChevronDown
                            aria-hidden="true"
                            className={`size-6 transition-transform duration-200 sm:size-7 ${openExperience === item.id ? 'rotate-180' : ''}`}
                          />
                        </span>
                      </button>
                    </header>
                    <AnimatePresence initial={false}>
                      {openExperience === item.id && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={`${panelId}-title`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6">
                            <h4 className="label-mono">{t('Responsibilities')}</h4>
                            <ul className="mt-4 space-y-3">
                              {item.responsibilities.map((responsibility) => (
                                <li key={responsibility} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted sm:text-base">
                                  <span className="mt-[0.15em] font-mono text-xs text-accent" aria-hidden="true">→</span>
                                  <span>{t(responsibility)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-7">
                            <Manifest item={item} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

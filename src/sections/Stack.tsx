import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownLeft, ArrowUpRight, Braces, ChartNoAxesCombined, Code2, Database, Layers3, Search, ShieldCheck, Sparkles, Workflow, Wrench } from 'lucide-react'
import { skillChains, skills } from '@/data/skills'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Reveal } from '@/animations/Reveal'
import { duration, ease } from '@/animations/tokens'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/cn'
import { pad2, proficiencyLabel } from '@/lib/format'
import { useI18n } from '@/i18n'

const stateAndForms = new Set(['redux', 'redux_toolkit', 'zustand', 'context', 'rhf', 'formik', 'yup', 'zod'])
const apiAndRealtime = new Set(['axios', 'query', 'swr', 'orval', 'socketio', 'signalr', 'rest_integration', 'websocket'])
const dataAndMaps = new Set(['apexcharts', 'recharts', 'reactflow', 'gojs', 'mapbox', 'reactleaflet', 'neshan'])
const qualityAndTooling = new Set(['jest', 'unit_testing', 'component_testing', 'testable_code', 'rtl', 'testing_quality', 'vite', 'webpack', 'eslint', 'prettier', 'git', 'gitlab', 'storybook'])

const domains = [
  { id: 'all', label: 'All skills', Icon: Layers3 },
  { id: 'frontend', label: 'Front-End', Icon: Code2 },
  { id: 'backend', label: 'Back-End', Icon: Database },
  { id: 'state', label: 'State & Forms', Icon: Braces },
  { id: 'api', label: 'APIs & Realtime', Icon: Workflow },
  { id: 'data', label: 'Data & Maps', Icon: ChartNoAxesCombined },
  { id: 'quality', label: 'Quality & Tooling', Icon: ShieldCheck },
  { id: 'engineering', label: 'Engineering', Icon: Wrench },
  { id: 'familiar', label: 'Familiar With', Icon: Sparkles },
] as const

function domainOf(skill: (typeof skills)[number]) {
  if (skill.group === 'core') return 'frontend'
  if (skill.group === 'backend') return 'backend'
  if (skill.group === 'exploring') return 'familiar'
  if (stateAndForms.has(skill.id)) return 'state'
  if (apiAndRealtime.has(skill.id)) return 'api'
  if (dataAndMaps.has(skill.id)) return 'data'
  if (qualityAndTooling.has(skill.id)) return 'quality'
  return 'engineering'
}

const skillById = new Map(skills.map((skill) => [skill.id, skill]))
const relatedById = new Map<string, string[]>()
for (const { edges } of skillChains) {
  for (const [from, to] of edges) {
    relatedById.set(from, [...(relatedById.get(from) ?? []), to])
    relatedById.set(to, [...(relatedById.get(to) ?? []), from])
  }
}

export function Stack() {
  const { reducedMotion } = usePreferences()
  const { t } = useI18n()
  const [domain, setDomain] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>('react')

  const visibleSkills = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const inDomain = domain === 'all' || domainOf(skill) === domain
      const matches = !needle || skill.label.toLowerCase().includes(needle) || skill.note.toLowerCase().includes(needle)
      return inDomain && matches
    })
  }, [domain, query])

  useEffect(() => {
    if (!visibleSkills.some((skill) => skill.id === selectedId)) {
      setSelectedId(visibleSkills[0]?.id ?? null)
    }
  }, [selectedId, visibleSkills])

  const selectedSkill = visibleSkills.find((skill) => skill.id === selectedId) ?? visibleSkills[0] ?? null
  const related = selectedSkill
    ? [...new Set(relatedById.get(selectedSkill.id) ?? [])].map((id) => skillById.get(id)).filter((skill): skill is (typeof skills)[number] => Boolean(skill)).slice(0, 5)
    : []

  return (
    <Section id="stack" component="Stack" labelledBy="stack-title" className="overflow-hidden border-y border-line bg-ink-900/30">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgb(77_141_255_/_0.12),transparent_32%),radial-gradient(circle_at_85%_80%,rgb(62_207_142_/_0.08),transparent_28%)]" aria-hidden="true" />
      <div className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="stack-title"
            index="02"
            eyebrow={t('Skills · stack explorer')}
            title={t('A stack built to ship.')}
            description={t('Explore the tools behind polished interfaces, reliable APIs, and the systems that connect them.')}
          />
          <div className="flex shrink-0 items-center gap-3 border-y border-line py-3 font-mono text-xs text-fg-muted lg:mb-1 lg:border-y-0">
            <span className="text-2xl font-semibold tracking-tight text-fg">{pad2(skills.length)}</span>
            <span className="max-w-32 leading-snug">{t('technologies across my stack')}</span>
            <span className="mx-1 h-8 w-px bg-line" aria-hidden="true" />
            <span className="text-fg"><span className="text-accent">Senior</span> FE <span className="text-fg-dim">/</span> <span className="text-ok">Mid-level</span> BE</span>
          </div>
        </div>

        <Reveal className="mt-12 border border-line-strong bg-ink-950/80 shadow-[0_32px_100px_-55px_rgb(77_141_255_/_0.6)] sm:mt-16">
          <div className="flex flex-col gap-4 border-b border-line px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:flex-wrap" role="group" aria-label={t('Browse skill domains')}>
              {domains.map(({ id, label, Icon }) => {
                const count = id === 'all' ? skills.length : skills.filter((skill) => domainOf(skill) === id).length
                const active = domain === id
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setDomain(id)}
                    className={cn(
                      'group inline-flex shrink-0 items-center gap-2 border px-3 py-2 text-xs transition-colors',
                      active ? 'border-accent/60 bg-accent/10 text-fg' : 'border-transparent text-fg-dim hover:border-line-strong hover:text-fg-muted',
                    )}
                  >
                    <Icon className={cn('size-3.5', active ? 'text-accent-strong' : 'text-fg-dim')} aria-hidden="true" />
                    <span>{t(label)}</span>
                    <span className="font-mono text-[10px] text-fg-dim">{count}</span>
                  </button>
                )
              })}
            </div>

            <label className="flex h-10 shrink-0 items-center gap-2 border border-line bg-ink-900 px-3 text-fg-dim focus-within:border-accent/60 lg:w-56">
              <Search className="size-4 shrink-0" aria-hidden="true" />
              <input
                type="text"
                inputMode="search"
                dir="auto"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('Search skills')}
                aria-label={t('Search skills')}
                className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim"
              />
              <kbd className="hidden border border-line px-1 font-mono text-[10px] sm:inline">⌕</kbd>
            </label>
          </div>

          <div className="grid min-h-[29rem] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="min-w-0 p-4 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="label-mono">{t('Skill directory')} <span className="text-fg-dim">/ {t(domains.find((item) => item.id === domain)?.label ?? 'All skills')}</span></p>
                <p className="font-mono text-[11px] text-fg-dim">{visibleSkills.length} <span aria-hidden="true">/</span> {skills.length}</p>
              </div>

              {visibleSkills.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {visibleSkills.map((skill, index) => {
                      const active = selectedSkill?.id === skill.id
                      return (
                        <motion.button
                          key={skill.id}
                          layout
                          type="button"
                          aria-pressed={active}
                          aria-label={`${skill.label} · ${t(proficiencyLabel[skill.level])}`}
                          onClick={() => setSelectedId(skill.id)}
                          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: reducedMotion ? 0 : duration.fast, delay: reducedMotion ? 0 : Math.min(index * 0.008, 0.12), ease: ease.out }}
                          className={cn(
                            'group flex min-h-12 items-center gap-3 border px-3.5 py-2.5 text-start transition-colors',
                            active ? 'border-accent/60 bg-accent/10 text-fg' : 'border-line bg-ink-900/55 text-fg-muted hover:border-line-strong hover:bg-ink-800/70 hover:text-fg',
                          )}
                        >
                          <span className={cn('size-2 shrink-0', skill.level === 'strong' ? 'bg-accent' : skill.level === 'mid' ? 'bg-ok' : 'border border-ai')} aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate text-sm font-medium">{skill.label}</span>
                          <ArrowUpRight className={cn('size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5', active ? 'text-accent-strong' : 'text-fg-dim')} aria-hidden="true" />
                        </motion.button>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="grid min-h-52 place-items-center border border-dashed border-line px-6 text-center">
                  <div>
                    <Search className="mx-auto mb-3 size-5 text-fg-dim" aria-hidden="true" />
                    <p className="text-sm text-fg-muted">{t('No skills match this search.')}</p>
                    <button type="button" onClick={() => setQuery('')} className="mt-3 text-xs text-accent-strong underline underline-offset-4">{t('Clear search')}</button>
                  </div>
                </div>
              )}
            </div>

            <aside className="relative flex flex-col overflow-hidden border-t border-line bg-ink-900/70 p-5 sm:p-6 lg:border-t-0 lg:border-s">
              <div className="pointer-events-none absolute -end-14 -top-16 size-56 rounded-full border border-accent/10" aria-hidden="true" />
              <div className="pointer-events-none absolute -end-4 -top-6 size-36 rounded-full border border-accent/10" aria-hidden="true" />
              <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-fg-dim">
                <span>{t('Skill signal')}</span>
                <span className="flex items-center gap-1.5"><span className="size-1.5 animate-pulse-dot rounded-full bg-ok" aria-hidden="true" /> {t('Selected')}</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {selectedSkill ? (
                  <motion.div
                    key={selectedSkill.id}
                    aria-live="polite"
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                    transition={{ duration: reducedMotion ? 0 : duration.fast }}
                    className="relative mt-10 flex flex-1 flex-col"
                  >
                    <div className="font-mono text-[11px] text-accent-strong">{pad2(skills.findIndex((skill) => skill.id === selectedSkill.id) + 1)} <span className="text-fg-dim">/ {t(domains.find((item) => item.id === domainOf(selectedSkill))?.label ?? '')}</span></div>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-fg">{selectedSkill.label}</h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{t(selectedSkill.note)}</p>

                    <div className="mt-8 border-y border-line py-4">
                      <p className="label-mono mb-3">{t('Experience level')}</p>
                      <div className="flex items-center gap-2.5">
                        <span className={cn('size-2.5', selectedSkill.level === 'strong' ? 'bg-accent' : selectedSkill.level === 'mid' ? 'bg-ok' : 'border border-ai')} aria-hidden="true" />
                        <span className="text-sm font-medium text-fg">{t(proficiencyLabel[selectedSkill.level])}</span>
                      </div>
                    </div>

                    {related.length > 0 && (
                      <div className="mt-6">
                        <p className="label-mono mb-3">{t('Connected skills')}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {related.map((skill) => (
                            <button key={skill.id} type="button" onClick={() => { setDomain('all'); setQuery(''); setSelectedId(skill.id) }} className="border border-line-strong px-2 py-1 text-[11px] text-fg-muted transition-colors hover:border-accent/50 hover:text-fg">
                              {skill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto flex items-end justify-between pt-8 font-mono text-[10px] text-fg-dim">
                      <span>{t('Front-end craft')}<br />{t('Back-end systems')}</span>
                      <ArrowDownLeft className="size-4 text-accent/70" aria-hidden="true" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mt-10 text-sm leading-relaxed text-fg-muted">{t('Select a skill to inspect it.')}</motion.p>
                )}
              </AnimatePresence>
            </aside>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 font-mono text-[10px] text-fg-dim sm:px-6">
            {(['strong', 'mid', 'exploring'] as const).map((level) => (
              <span key={level} className="flex items-center gap-2">
                <span className={cn('size-1.5', level === 'strong' ? 'bg-accent' : level === 'mid' ? 'bg-ok' : 'border border-ai')} aria-hidden="true" />
                {t(proficiencyLabel[level])}
              </span>
            ))}
            <span className="ms-auto hidden items-center gap-2 sm:flex">{t('Choose a skill to explore its connections')} <ArrowUpRight className="size-3" aria-hidden="true" /></span>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

import type { ReactNode } from 'react'
import { profile } from '@/data/profile'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { CodePanel } from '@/components/CodePanel'
import { StatusDot } from '@/components/StatusDot'
import { Reveal, Stagger, StaggerItem } from '@/animations/Reveal'
import { useClock } from '@/hooks/useClock'
import { useI18n } from '@/i18n'

const engineerSource = `type Engineer = {
  name: string
  role: string
  focus: string
  stack: string[]
}

const alireza: Engineer = {
  name: "${profile.name}",
  role: "${profile.roles[0]}",
  focus: "${profile.focus}",
  stack: ["React", "Next.js", "Node.js", "NestJS", "SQL"],
}

// Build clear interfaces for complex work.
export default alireza`

export function About() {
  const { language, t } = useI18n()
  const time = useClock(profile.location.timeZone, 30_000)

  const rows: Array<{ key: string; value: ReactNode }> = [
    { key: 'Name', value: profile.name },
    { key: 'Role', value: t(profile.roles[0]!) },
    { key: 'Focus', value: t(profile.focus) },
    { key: 'Skills', value: profile.stack.join(' / ') },
    { key: 'Interests', value: profile.interests.map(t).join(' / ') },
    {
      key: 'Location',
      value: (
        <>
          {t(profile.location.country)} <span className="text-fg-dim">· {time.slice(0, 5)} {t('local')}</span>
        </>
      ),
    },
    ...(profile.availability
      ? [
          {
            key: 'Status',
            value: (
              <span className="flex items-center gap-2">
                <StatusDot /> {profile.availability}
              </span>
            ),
          },
        ]
      : []),
  ]

  return (
    <Section id="about" component="About" labelledBy="about-title">
      <SectionHeader
        id="about-title"
        index="01"
        eyebrow={t('About the engineer')}
        title={
          <>
            {t('About Me')}
          </>
        }
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-14 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <Reveal>
            <div className="label-mono mb-3 flex items-center justify-between border-b border-line pb-3">
              <span>{t('Engineer profile')}</span>
              <span className="text-fg-dim">{t('inspect --verbose')}</span>
            </div>
          </Reveal>
          <Stagger className="divide-y divide-line" gap={0.05}>
            {rows.map((row) => (
              <StaggerItem key={row.key}>
                <dl className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-dim">{t(row.key)}</dt>
                  <dd className="text-[15px] text-fg">{row.value}</dd>
                </dl>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-10 space-y-5">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-[1.75] text-fg-muted sm:text-base">{t(paragraph)}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11.5px] text-fg-dim">
              {profile.focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <span className="size-1 bg-fg-dim" aria-hidden="true" />
                  {t(area)}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 border-t border-line pt-6">
              <h3 className="label-mono mb-5">{t('Education')}</h3>
              <div className="space-y-5 text-sm text-fg-muted">
                <p><strong className="block text-fg">{t('MSc, Artificial Intelligence')}</strong> {t('Islamic Azad University, South Tehran')} · {language === 'fa' ? '۲۰۲۴–اکنون' : '2024–Present'}</p>
                <p><strong className="block text-fg">{t('BSc, Electrical Engineering')}</strong> {t('Islamic Azad University, Science and Research')} · {language === 'fa' ? '۲۰۱۹–۲۰۲۳' : '2019–2023'}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal y={28} className="lg:pt-8">
          <CodePanel filename="engineer.ts" language="TypeScript" code={engineerSource} />
          <p className="mt-3 font-mono text-[11px] text-fg-dim">
            <span className="text-ok">✓</span> {t('A profile in TypeScript · illustrative code')}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

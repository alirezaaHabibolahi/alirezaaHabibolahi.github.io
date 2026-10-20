import { profile } from '@/data/profile'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/cn'
import { StatusDot } from './StatusDot'
import { useI18n } from '@/i18n'

const BUILD = new Date(__BUILD_TIME__).toISOString().slice(0, 10)

export function Footer() {
  const { t } = useI18n()
  const { effects, setEffects } = usePreferences()

  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8" data-component="Footer">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 font-mono text-[11px] text-fg-dim md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <p className="text-fg-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            v{__APP_VERSION__} · build {BUILD} · static · no backend · React + Three.js
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3" role="group" aria-label={t('Visual effects')}>
            <span>{t('effects')}</span>
            {(['full', 'lite'] as const).map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={effects === level}
                onClick={() => setEffects(level)}
                className={cn('uppercase tracking-[0.14em] transition-colors', effects === level ? 'text-fg' : 'hover:text-fg-muted')}
              >
                [{effects === level ? '×' : ' '}] {t(level)}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-2">
            <StatusDot /> {t('Portfolio online')}
          </span>
        </div>
      </div>
    </footer>
  )
}

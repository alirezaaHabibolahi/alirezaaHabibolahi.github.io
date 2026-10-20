import { motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, MousePointer2 } from 'lucide-react'
import { profile } from '@/data/profile'
import { StatusDot } from '@/components/StatusDot'
import { useBooted } from '@/hooks/useBoot'
import { useClock } from '@/hooks/useClock'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { usePreferences } from '@/hooks/usePreferences'
import { duration, ease } from '@/animations/tokens'
import { useI18n } from '@/i18n'

export function Hero() {
  const booted = useBooted()
  const isDesktop = useIsDesktop()
  const { reducedMotion } = usePreferences()
  const { language, t } = useI18n()
  const time = useClock(profile.location.timeZone)
  const DirectionArrow = language === 'fa' ? ArrowLeft : ArrowRight

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 18 },
    animate: booted ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reducedMotion ? 0 : duration.slow, ease: ease.out, delay: reducedMotion ? 0 : delay },
  })

  return (
    <section
      id="system"
      data-component="Hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,rgb(25_52_97_/_0.28),transparent_48%)]" aria-hidden="true" />
      <motion.svg
        className="pointer-events-none absolute inset-x-0 top-[35%] h-[25svh] w-full opacity-50 sm:top-[32%]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        initial={false}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-signal-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4d8dff" stopOpacity="0" />
            <stop offset="48%" stopColor="#4d8dff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3ecf8e" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-20 174 C170 174 155 65 350 65 S530 198 704 136 914 42 1055 104 1257 216 1460 37"
          fill="none"
          stroke="url(#hero-signal-gradient)"
          strokeWidth="1.2"
          strokeDasharray="5 10"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={booted ? (reducedMotion ? { pathLength: 1, pathOffset: 0 } : { pathLength: 1, pathOffset: [0, 1] }) : undefined}
          transition={{ pathLength: { duration: reducedMotion ? 0 : 1.6, ease: ease.out }, pathOffset: { duration: 18, repeat: Infinity, ease: 'linear' } }}
        />
        {[350, 704, 1055].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={[65, 136, 104][i]}
            r="3"
            fill={i === 1 ? '#3ecf8e' : '#79a9ff'}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={booted ? (reducedMotion ? { opacity: 0.7, scale: 1 } : { opacity: [0.35, 1, 0.35], scale: [0.8, 1.25, 0.8] }) : undefined}
            transition={{ duration: 2.8, repeat: Infinity, delay: reducedMotion ? 0 : i * 0.55 }}
          />
        ))}
      </motion.svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-10 pt-32 sm:px-8 sm:pt-36 lg:pb-14 lg:pt-28">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <motion.p {...reveal(0.04)} className="label-mono flex items-center gap-2 text-fg-muted">
            <StatusDot /> {t('Online')}
          </motion.p>
          <span className="text-fg-dim" aria-hidden="true">/</span>
          <motion.p {...reveal(0.08)} className="label-mono text-fg-muted">{t(profile.location.country)}</motion.p>
          <span className="text-fg-dim" aria-hidden="true">/</span>
          <motion.p {...reveal(0.12)} className="label-mono text-fg-muted">
            <span className="sr-only">{t('Local time ')}</span>
            <time className="tabular-nums">{time}</time> <span dir="ltr">{profile.location.utcOffset}</span>
          </motion.p>
        </div>

        <motion.div {...reveal(0.16)} className="mt-8 sm:mt-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-strong sm:text-xs">{t('Alireza Habibollahi · Engineer')}</p>
          <h1 id="hero-title" className={`max-w-full text-[clamp(3.2rem,12.8vw,10.5rem)] font-semibold text-fg ${language === 'fa' ? 'leading-[0.98] tracking-normal' : 'leading-[0.82] tracking-[-0.065em]'}`}>
            <span className="block">{t(profile.firstName)}</span>
            <span className="mt-2 block text-fg/40 sm:mt-3">{t(profile.lastName)}<span className="text-accent">.</span></span>
          </h1>
        </motion.div>

        <motion.div {...reveal(0.24)} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-9">
          <span className="border border-accent/35 bg-accent/10 px-3 py-1.5 text-sm font-medium text-fg sm:text-base">{t('Senior Front-End Engineer')}</span>
          <span className="font-mono text-xs text-fg-dim" aria-hidden="true">+</span>
          <span className="border border-ok/30 bg-ok/5 px-3 py-1.5 text-sm font-medium text-fg-muted sm:text-base">{t('Mid-Level Back-End Developer')}</span>
          <span className="ms-1 inline-flex items-center gap-2 font-mono text-xs text-fg-dim"><span className="text-2xl font-semibold text-fg">6+</span> {t('years experience')}</span>
        </motion.div>

        <div className="mt-8 flex flex-col gap-7 border-t border-line pt-6 sm:mt-10 sm:pt-7 lg:flex-row lg:items-end lg:justify-between">
          <motion.p {...reveal(0.32)} className="max-w-[42rem] text-base leading-relaxed text-fg-muted sm:text-lg">
            {t(profile.headline)}
          </motion.p>

          <motion.div {...reveal(0.4)} className="pointer-events-auto flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a href="#about" className="group inline-flex h-11 items-center gap-2 bg-fg px-4 text-sm font-medium text-ink-950 transition-colors hover:bg-white sm:px-5">
              {t('Explore my work')}
              <DirectionArrow className={`size-4 transition-transform duration-300 ${language === 'fa' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
            </a>
            <a href="#terminal" className="inline-flex h-11 items-center gap-2 border border-line-strong px-4 font-mono text-[13px] text-fg-muted transition-colors hover:border-fg-dim hover:text-fg">
              <span className="text-accent">$</span> {t('open terminal')}
            </a>
            <a href="/alireza_habibollahi_cv.pdf" download className="inline-flex h-11 items-center gap-2 border border-line-strong px-4 font-mono text-[13px] text-fg-muted transition-colors hover:border-fg-dim hover:text-fg">
              {t('Download CV')}
            </a>
          </motion.div>
        </div>

        <motion.div {...reveal(0.52)} className="mt-10 grid grid-cols-1 border-y border-line sm:mt-14 sm:grid-cols-3">
          <div className="flex items-center gap-4 py-4 sm:border-e sm:border-line sm:pe-5 sm:py-5">
            <span className="font-mono text-[10px] text-accent">01</span>
            <div><p className="label-mono">{t('Interface')}</p><p className="mt-1 text-sm text-fg-muted">{t('Thoughtful, accessible products')}</p></div>
          </div>
          <div className="flex items-center gap-4 border-t border-line py-4 sm:border-e sm:border-t-0 sm:border-line sm:px-5 sm:py-5">
            <span className="font-mono text-[10px] text-accent">02</span>
            <div><p className="label-mono">{t('Services')}</p><p className="mt-1 text-sm text-fg-muted">{t('Reliable APIs and data')}</p></div>
          </div>
          <div className="flex items-center gap-4 border-t border-line py-4 sm:border-t-0 sm:ps-5 sm:py-5">
            <span className="font-mono text-[10px] text-accent">03</span>
            <div><p className="label-mono">{t('Delivery')}</p><p className="mt-1 text-sm text-fg-muted">{t('From first sketch to production')}</p></div>
            {isDesktop && <MousePointer2 className="ms-auto size-3.5 text-fg-dim" aria-hidden="true" />}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={booted ? { opacity: 1 } : undefined}
        transition={{ duration: duration.slow, delay: reducedMotion ? 0 : 0.7 }}
        className="relative z-10 border-t border-line bg-ink-950/60 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <p className="label-mono py-3">{t('Interfaces')} <span className="text-accent">→</span> {t('Services')} <span className="text-accent">→</span> {t('Products')}</p>
          <a href="#about" className="label-mono hidden shrink-0 items-center gap-2 py-3 hover:text-fg-muted sm:flex">
            {t('Scroll')} <ArrowDown className="size-3" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

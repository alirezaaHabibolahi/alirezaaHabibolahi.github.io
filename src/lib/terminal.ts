import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { skillGroups, skills } from '@/data/skills'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'
import { formatPeriod, proficiencyLabel } from './format'
import { translate, type Language } from '@/i18n'

export type Tone = 'fg' | 'muted' | 'dim' | 'accent' | 'ok' | 'warn' | 'ai' | 'error'

export interface OutputLine {
  text: string
  tone?: Tone
}

export type Effect = { type: 'clear' } | { type: 'scroll'; target: string } | { type: 'hired' }

export interface CommandResult {
  lines: OutputLine[]
  effect?: Effect
}

export interface CommandContext {
  history: string[]
  language: Language
}

const line = (text: string, tone?: Tone): OutputLine => ({ text, tone })
const blank = line('')

/** Commands shown as quick-run chips and in `help`. */
export const quickCommands = ['whoami', 'stack', 'projects', 'experience', 'architecture', 'contact'] as const

const sections = ['system', 'about', 'stack', 'experience', 'projects', 'thinking', 'contact']

const commandHelp: Array<[string, string]> = [
  ['whoami', 'who is behind this portfolio'],
  ['stack', 'technologies, grouped by proficiency'],
  ['projects', 'list projects · project <n> for details'],
  ['experience', 'work history'],
  ['architecture', 'a front-end and back-end application flow'],
  ['contact', 'ways to reach me'],
  ['ls / cd <section>', 'navigate the page'],
  ['history', 'commands you ran (stored locally)'],
  ['clear', 'clear the screen'],
]

// Plain ASCII on purpose: box-drawing glyphs aren't in the web-font subset and would misalign.
const architecture = [
  '  User interaction',
  '       |',
  '       v',
  '  React / Next.js + TypeScript',
  '       | REST / WebSockets',
  '       v',
  '  Node.js -> NestJS / Express',
  '       |',
  '       v',
  '  Prisma / TypeORM',
  '       |',
  '       v',
  '  SQL / MongoDB',
]

function whoami(language: Language): CommandResult {
  return {
    lines: [line(profile.name, 'fg'), line(translate(profile.roles[0]!, language), 'muted'), line(translate(profile.focus, language), 'muted'), line(`${translate(profile.location.country, language)} · ${profile.location.utcOffset}`, 'dim')],
  }
}

function stack(language: Language): CommandResult {
  const lines: OutputLine[] = []
  for (const group of skillGroups) {
    lines.push(line(`[${translate(group.label, language)}]`, 'accent'))
    for (const s of skills.filter((x) => x.group === group.id)) {
      const mark = s.level === 'strong' ? '●' : s.level === 'mid' ? '◉' : '○'
      const tone = s.level === 'strong' ? 'fg' : s.level === 'mid' ? 'ok' : 'ai'
      lines.push(line(`  ${mark} ${s.label.padEnd(22)} ${translate(s.note, language)}`, tone))
    }
    lines.push(blank)
  }
  lines.push(line(`● ${translate(proficiencyLabel.strong, language)}   ◉ ${translate(proficiencyLabel.mid, language)}   ○ ${translate(proficiencyLabel.exploring, language)}`, 'dim'))
  return { lines }
}

function listProjects(language: Language): CommandResult {
  return {
    lines: [
      ...projects.map((p, i) => line(`  ${String(i + 1).padStart(2, '0')}  ${translate(p.name, language).padEnd(28)} ${translate(p.category, language)}`, 'fg')),
      blank,
      line(translate('run `project <n>` for project details', language), 'dim'),
    ],
  }
}

function projectDetail(arg: string | undefined, language: Language): CommandResult {
  const n = Number(arg)
  const p = Number.isInteger(n) ? projects[n - 1] : projects.find((x) => x.id === arg)
  if (!p) return { lines: [line(translate('project: not found', language) + `: ${arg ?? '(none)'} — ${translate('try', language)} 1..${projects.length}`, 'error')] }
  return {
    lines: [
      line(translate(p.name, language), 'accent'),
      line(translate(p.description, language), 'muted'),
      blank,
      line(translate('interface flow:', language), 'dim'),
      ...p.architecture.map((l, i) => line(`  ${i === 0 ? '  ' : '->'} ${translate(l.label, language).padEnd(16)} ${translate(l.detail, language)}`, 'fg')),
      blank,
      line(`${translate('stack:', language)} ${p.technologies.join(', ')}`, 'muted'),
    ],
  }
}

function listExperience(language: Language): CommandResult {
  return {
    lines: experience.flatMap((e) => [
      line(`${e.serviceName}  ● ${translate(e.status, language)}  (${translate(formatPeriod(e.period), language)})`, 'ok'),
      line(`  ${translate(e.title, language)} — ${translate(e.domain, language)}`, 'fg'),
      line(`  ${e.technologies.slice(0, 6).join(' · ')}`, 'muted'),
      blank,
    ]),
  }
}

function contact(language: Language): CommandResult {
  const lines = socials.map((s) => line(`  ${translate(s.label, language).toLowerCase().padEnd(10)} ${s.href ? (s.handle ?? s.href) : `(${translate('not linked yet', language)})`}`, s.href ? 'fg' : 'dim'))
  return { lines: [...lines, blank, line(translate('or use the form: cd contact', language), 'dim')] }
}

function sudo(args: string[], language: Language): CommandResult {
  if (args.join(' ').toLowerCase() === 'hire alireza') {
    return {
      lines: [
        line('[sudo] password for visitor: ********', 'dim'),
        line(translate('Verifying credentials... ok', language), 'muted'),
        line(translate('Permission granted.', language), 'ok'),
        line(translate('Next step: cd contact', language), 'accent'),
      ],
      effect: { type: 'hired' },
    }
  }
  return { lines: [line(translate('visitor is not in the sudoers file. This incident will be reported.', language), 'error')] }
}

/** Parse and run one command line. Pure aside from the returned effect. */
export function runCommand(input: string, ctx: CommandContext): CommandResult {
  const [cmd = '', ...args] = input.trim().split(/\s+/)
  switch (cmd.toLowerCase()) {
    case '':
      return { lines: [] }
    case 'help':
      return {
        lines: [
          line(translate('available commands:', ctx.language), 'dim'),
          ...commandHelp.map(([c, d]) => line(`  ${c.padEnd(20)} ${translate(d, ctx.language)}`, 'fg')),
        ],
      }
    case 'whoami':
      return whoami(ctx.language)
    case 'stack':
      return stack(ctx.language)
    case 'projects':
      return listProjects(ctx.language)
    case 'project':
      return projectDetail(args[0], ctx.language)
    case 'experience':
      return listExperience(ctx.language)
    case 'architecture':
      return { lines: architecture.map((l) => line(l, 'muted')) }
    case 'contact':
      return contact(ctx.language)
    case 'ls':
      return { lines: [line(sections.map((s) => `${s}/`).join('  '), 'accent')] }
    case 'cd': {
      const target = (args[0] ?? '').replace(/\/$/, '')
      if (!sections.includes(target)) return { lines: [line(`cd: no such section: ${args[0] ?? ''}`, 'error')] }
      return { lines: [line(`→ /${target}`, 'dim')], effect: { type: 'scroll', target } }
    }
    case 'pwd':
      return { lines: [line('/home/visitor/inside-the-system')] }
    case 'history':
      return { lines: ctx.history.length ? ctx.history.map((h, i) => line(`  ${String(i + 1).padStart(3)}  ${h}`, 'muted')) : [line('(empty)', 'dim')] }
    case 'date':
      return { lines: [line(new Date().toString())] }
    case 'echo':
      return { lines: [line(args.join(' '))] }
    case 'clear':
      return { lines: [], effect: { type: 'clear' } }
    case 'sudo':
      return sudo(args, ctx.language)
    case 'rm':
      return { lines: [line('rm: refusing to operate on production. Nice try.', 'warn')] }
    case 'npm':
      return { lines: [line(translate('This is a portfolio preview. Explore projects or run `contact`.', ctx.language), 'dim')] }
    case 'exit':
      return { lines: [line(translate('Thanks for visiting. Scrolling works too.', ctx.language), 'dim')] }
    default:
      return { lines: [line(`${translate('command not found', ctx.language)}: ${cmd}. ${translate("Type 'help' for a list.", ctx.language)}`, 'error')] }
  }
}

export const completions = ['help', 'whoami', 'stack', 'projects', 'project', 'experience', 'architecture', 'contact', 'ls', 'cd', 'pwd', 'history', 'clear', 'date', 'echo']

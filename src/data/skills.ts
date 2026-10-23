import type { Skill, SkillChain, SkillGroup } from '@/types/content'

/** Skill domains and technologies transcribed from Alireza's latest resume. */
export const skillGroups: SkillGroup[] = [
  { id: 'core', label: 'Front-End', description: 'Languages, frameworks, UI architecture and rendering.' },
  { id: 'backend', label: 'Back-End', description: 'Server frameworks, databases and real-time services.' },
  { id: 'systems', label: 'Tools & Engineering', description: 'State, forms, testing and build tools.' },
  { id: 'exploring', label: 'Familiar With', description: 'Additional front-end frameworks listed in my resume.' },
]

export const skills: Skill[] = [
  // Front-end, architecture and rendering
  { id: 'javascript', label: 'JavaScript (ES6+)', group: 'core', level: 'strong', note: 'JavaScript ecosystem' },
  { id: 'typescript', label: 'TypeScript', group: 'core', level: 'strong', note: 'JavaScript ecosystem' },
  { id: 'react', label: 'React.js', group: 'core', level: 'strong', note: 'JavaScript ecosystem' },
  { id: 'next', label: 'Next.js', group: 'core', level: 'strong', note: 'React framework' },
  { id: 'component_arch', label: 'Component-Driven Architecture', group: 'core', level: 'strong', note: 'Front-end architecture' },
  { id: 'design_systems', label: 'Design Systems', group: 'core', level: 'strong', note: 'Front-end architecture' },
  { id: 'ssr', label: 'SSR', group: 'core', level: 'strong', note: 'Rendering strategies' },
  { id: 'ssg', label: 'SSG', group: 'core', level: 'strong', note: 'Rendering strategies' },
  { id: 'isr', label: 'ISR', group: 'core', level: 'strong', note: 'Rendering strategies' },

  // Back-end frameworks, databases and real-time technologies
  { id: 'node', label: 'Node.js', group: 'backend', level: 'mid', note: 'Backend & databases' },
  { id: 'nest', label: 'NestJS', group: 'backend', level: 'mid', note: 'Core backend' },
  { id: 'express', label: 'Express.js', group: 'backend', level: 'mid', note: 'Core backend' },
  { id: 'sql', label: 'SQL', group: 'backend', level: 'mid', note: 'Core backend databases' },
  { id: 'mongo', label: 'MongoDB', group: 'backend', level: 'mid', note: 'Core backend databases' },
  { id: 'signalr', label: 'SignalR', group: 'backend', level: 'mid', note: 'Real-time features' },
  { id: 'websocket', label: 'WebSockets', group: 'backend', level: 'mid', note: 'Real-time communication' },

  // State, forms, testing and build tools
  { id: 'redux_toolkit', label: 'Redux Toolkit', group: 'systems', level: 'strong', note: 'Client-side state management' },
  { id: 'zustand', label: 'Zustand', group: 'systems', level: 'strong', note: 'Client-side state management' },
  { id: 'query', label: 'TanStack Query', group: 'systems', level: 'strong', note: 'Data fetching and API integration' },
  { id: 'rhf', label: 'React Hook Form', group: 'systems', level: 'strong', note: 'Forms and validation' },
  { id: 'zod', label: 'Zod', group: 'systems', level: 'strong', note: 'Forms and validation' },
  { id: 'jest', label: 'Jest', group: 'systems', level: 'strong', note: 'Testing and code quality' },
  { id: 'rtl', label: 'React Testing Library', group: 'systems', level: 'strong', note: 'Testing and code quality' },
  { id: 'git', label: 'Git', group: 'systems', level: 'strong', note: 'Version control' },
  { id: 'vite', label: 'Vite', group: 'systems', level: 'strong', note: 'Build and code quality' },
  { id: 'webpack', label: 'Webpack', group: 'systems', level: 'strong', note: 'Build and code quality' },

  // Other front-end frameworks listed on the resume
  { id: 'reactnative', label: 'React Native', group: 'exploring', level: 'exploring', note: 'JavaScript ecosystem' },
  { id: 'vue', label: 'Vue.Js', group: 'exploring', level: 'exploring', note: 'JavaScript ecosystem' },
]

/** Relationship paths only connect technologies listed in the latest resume. */
export const skillChains: SkillChain[] = [
  {
    id: 'frontend', label: 'Front-End', description: 'Front-end frameworks, component architecture, design systems and rendering.',
    edges: [
      ['javascript', 'typescript'], ['typescript', 'react'], ['react', 'next'], ['react', 'reactnative'], ['react', 'vue'],
      ['react', 'component_arch'], ['component_arch', 'design_systems'], ['next', 'ssr'], ['next', 'ssg'], ['next', 'isr'],
    ],
  },
  {
    id: 'backend', label: 'Back-End', description: 'Node.js frameworks, databases and real-time technologies.',
    edges: [
      ['typescript', 'node'], ['node', 'nest'], ['node', 'express'], ['nest', 'sql'], ['nest', 'mongo'],
      ['node', 'websocket'], ['node', 'signalr'],
    ],
  },
  {
    id: 'data', label: 'State & Data', description: 'Application state and server data in React applications.',
    edges: [
      ['react', 'redux_toolkit'], ['react', 'zustand'], ['react', 'query'],
    ],
  },
  {
    id: 'engineering', label: 'Testing & Tooling', description: 'Testing, source control and build tools.',
    edges: [
      ['react', 'jest'], ['jest', 'rtl'], ['git', 'vite'], ['vite', 'webpack'],
    ],
  },
  {
    id: 'state_forms', label: 'Forms & Validation', description: 'React form handling and schema validation.',
    edges: [
      ['react', 'rhf'], ['rhf', 'zod'],
    ],
  },
]

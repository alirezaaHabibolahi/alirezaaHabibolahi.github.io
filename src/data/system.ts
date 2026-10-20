import type { SystemEdge, SystemNode } from '@/types/content'

/** The hero shows the main tools across front-end and back-end work. */
export const systemNodes: SystemNode[] = [
  { id: 'react', label: 'React.js', role: 'Front-end', description: 'Component-driven interfaces for enterprise and customer-facing products.', level: 'strong', accent: 'blue' },
  { id: 'next', label: 'Next.js', role: 'Front-end framework', description: 'React applications using SSR, SSG and ISR.', level: 'strong', accent: 'blue' },
  { id: 'typescript', label: 'TypeScript', role: 'Front-end & back-end', description: 'Typed applications, reusable components and API integration.', level: 'strong', accent: 'blue' },
  { id: 'tailwind', label: 'Tailwind CSS', role: 'UI styling', description: 'Responsive interfaces and shared visual patterns.', level: 'strong', accent: 'amber' },
  { id: 'node', label: 'Node.js', role: 'Back-end runtime · mid-level', description: 'JavaScript and TypeScript services on the server.', level: 'mid', accent: 'green' },
  { id: 'nest', label: 'NestJS', role: 'Back-end framework · mid-level', description: 'Structured server applications and APIs with NestJS.', level: 'mid', accent: 'green' },
  { id: 'express', label: 'Express.js', role: 'Back-end framework · mid-level', description: 'HTTP APIs and server-side routes with Express.js.', level: 'mid', accent: 'green' },
  { id: 'rest', label: 'REST APIs', role: 'API development · mid-level', description: 'REST endpoints connecting interfaces to server-side functionality.', level: 'mid', accent: 'amber' },
  { id: 'websocket', label: 'WebSockets', role: 'Real-time back-end', description: 'Two-way communication for real-time application features.', level: 'mid', accent: 'amber' },
  { id: 'sql', label: 'SQL', role: 'Relational data · mid-level', description: 'Working with SQL data in back-end applications.', level: 'mid', accent: 'violet' },
  { id: 'mongo', label: 'MongoDB', role: 'Document data · mid-level', description: 'Document database experience from my back-end toolkit.', level: 'mid', accent: 'violet' },
  { id: 'orm', label: 'Prisma · TypeORM', role: 'Data access · mid-level', description: 'TypeScript database tooling used with SQL and MongoDB.', level: 'mid', accent: 'violet' },
]

export const systemEdges: SystemEdge[] = [
  ['typescript', 'react'], ['react', 'next'], ['react', 'tailwind'],
  ['react', 'rest'], ['rest', 'node'], ['node', 'nest'], ['node', 'express'],
  ['node', 'websocket'], ['nest', 'orm'], ['orm', 'sql'], ['orm', 'mongo'],
]

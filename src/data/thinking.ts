import type { Principle, ThinkingStage } from '@/types/content'

export const thinkingStages: ThinkingStage[] = [
  { id: 'understand', label: 'Understand', question: 'What does the workflow need to do?', detail: 'I start with the user journey and business rules, especially for complex ERP and booking flows.', practices: ['Map the workflow', 'Identify edge cases', 'Align with product and design'] },
  { id: 'structure', label: 'Structure', question: 'Which parts should be shared?', detail: 'Reusable components and clear module boundaries make large applications easier to extend.', practices: ['Define component responsibilities', 'Reuse common patterns', 'Keep modules cohesive'] },
  { id: 'integrate', label: 'Integrate', question: 'How does the interface use server data?', detail: 'Typed API clients, query state and deliberate loading or error behavior connect front ends to backend services.', practices: ['Use typed contracts', 'Handle loading and failure', 'Keep server state synchronized'] },
  { id: 'interact', label: 'Interact', question: 'Can the user complete the task clearly?', detail: 'I build responsive interactions for forms, editors, dashboards and multi-step flows.', practices: ['Validate inputs', 'Make feedback clear', 'Support keyboard interaction'] },
  { id: 'realtime', label: 'Real-time', question: 'What changes while someone is looking?', detail: 'SignalR and live data updates support collaborative and operational interfaces where information changes quickly.', practices: ['Show fresh state', 'Handle reconnection', 'Avoid confusing updates'] },
  { id: 'verify', label: 'Verify', question: 'Does it work across real conditions?', detail: 'Critical UI and business logic get tests, while responsive layouts and performance need hands-on checks.', practices: ['Test critical logic', 'Review responsive behavior', 'Check performance'] },
  { id: 'improve', label: 'Improve', question: 'Will the next developer understand it?', detail: 'Code reviews, shared standards and mentoring help a team keep improving a product after launch.', practices: ['Review code', 'Document decisions', 'Refine shared components'] },
]

export const principles: Principle[] = [
  { key: 'clarity', statement: 'Complex workflows should feel clear to the person using them.' },
  { key: 'reuse', statement: 'Shared components keep product interfaces consistent.' },
  { key: 'accessibility', statement: 'Usability includes keyboard and accessible interaction.' },
  { key: 'performance', statement: 'Fast interfaces are part of product quality.' },
  { key: 'maintainability', statement: 'Architecture should make the next feature easier to build.' },
  { key: 'collaboration', statement: 'Good delivery depends on product, design and engineering working together.' },
]

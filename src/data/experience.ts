import type { Experience } from '@/types/content'

export const experience: Experience[] = [
  {
    id: 'behinehsazan', serviceName: 'work.BehinehSazan', title: 'Front-End Developer',
    role: 'Front-End Developer · Full-time', domain: 'Iran, Tehran', organization: 'BehinehSazan',
    period: { start: 'Jan 2026', end: null }, status: 'running', kind: 'professional',
    responsibilities: [
      'Develop and maintain enterprise-scale ERP applications using React, and TypeScript.',
      'Design and implement reusable, component-driven UI architecture to improve consistency, scalability, and maintainability across the platform.',
      'Develop business-critical ERP modules including Financial Accounting, Office Automation, Quotations, Sales Invoicing, Inventory Management, Treasury, Accounts Receivable, and Document Management.',
      'Integrate backend services using Orval-generated API clients, Axios, and TanStack Query to deliver type-safe, maintainable, and efficient data fetching.',
      'Implement real-time application features using SignalR for live data synchronization and collaborative workflows.',
      'Collaborate closely with backend engineers, product managers, and UI/UX designers to deliver enterprise-grade business solutions.',
      'Participate in code reviews, architectural discussions, and frontend best practices to continuously improve code quality and developer experience.',
      'Contribute to product and technical decision-making by evaluating implementation approaches, system constraints, maintainability, and user requirements.',
      'Collaborate with product managers, backend engineers, and UI/UX designers to analyze requirements, define technical solutions, and make implementation decisions for complex ERP features.',
      'Participate in frontend architectural and technical decision-making, including component design, technology selection, API integration strategies, performance considerations, and long-term maintainability.',
      'Apply frontend testing practices using Jest for critical components and business logic to improve code reliability and reduce regressions.',
    ],
    technologies: [], systems: [], problems: [],
  },
  {
    id: 'maroon', serviceName: 'work.Maroon-Moshaver-Arjan', title: 'Front-End Developer',
    role: 'Front-End Developer · Part-time', domain: 'Iran, Ahvaz', organization: 'Maroon Moshaver Arjan',
    period: { start: 'Mar 2025', end: 'Nov 2025' }, status: 'archived', kind: 'professional',
    responsibilities: [
      'Designed and developed a visual workflow automation platform using GoJS, providing an intuitive drag-and-drop interface for modeling complex business processes.',
      'Built a customizable workflow engine with reusable nodes, configurable ports, dynamic connections, validation rules, and interactive editing capabilities.',
      'Implemented advanced editor features including grouping, copy/paste, undo/redo, keyboard shortcuts, context menus, zooming, panning, and JSON import/export.',
      'Developed reusable UI components and responsive interfaces using React, Tailwind CSS, and Material UI to improve development consistency and maintainability.',
      'Collaborated with backend engineers to integrate workflow definitions, synchronize business logic, and deliver enterprise-grade workflow management solutions.',
    ],
    technologies: [], systems: [], problems: [],
  },
  {
    id: 'vista', serviceName: 'work.VistaApp', title: 'Full-Stack Developer',
    role: 'Full-Stack Developer · Full-time', domain: 'Iran, Tehran', organization: 'VistaApp',
    period: { start: 'Feb 2023', end: 'Jan 2026' }, status: 'archived', kind: 'professional',
    responsibilities: [
      'Developed and maintained scalable web applications, enterprise dashboards, and customer-facing platforms using React, Next.js, and TypeScript.',
      'Built reusable, component-driven frontend architectures and shared UI libraries to improve development efficiency, consistency, and long-term maintainability.',
      'Developed responsive, accessible, and high-performance user interfaces with a strong focus on user experience and modern frontend best practices.',
      'Integrated REST APIs and third-party services using Axios and TanStack Query, ensuring efficient data fetching, caching, and synchronization.',
      'Implemented complex business workflows including booking systems, administration panels, analytics dashboards, and offline-first applications.',
      'Mentored junior frontend developers, conducted code reviews, and maintained high engineering standards across the frontend team.',
      'Collaborated closely with backend engineers, designers, and product managers throughout the complete software development lifecycle.',
      'Apply frontend testing practices using Jest for critical components and business logic to improve code reliability and reduce regressions.',
    ],
    technologies: [], systems: [], problems: [],
  },
  {
    id: 'freelance', serviceName: 'work.Freelancer', title: 'Front-End Developer',
    role: 'Front-End Developer', domain: 'Iran, Tehran', organization: 'Freelancer',
    period: { start: 'Jan 2022', end: 'Feb 2023' }, status: 'archived', kind: 'independent',
    responsibilities: ['Design and implementation of admin panel front-ends for internal organizations, emphasizing the creation of responsive user interfaces, enhancing user experience, and integration with backend systems.'],
    technologies: [], systems: [], problems: [],
  },
]

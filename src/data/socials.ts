import type { SocialLink } from '@/types/content'
import { profile } from './profile'

export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/alihhba', handle: '@alihhba' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/alireza-habibolahi', handle: 'Alireza Habibollahi' },
  { id: 'email', label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
]

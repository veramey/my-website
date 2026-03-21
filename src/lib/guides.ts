export type GuideSubcategory =
  | 'Client Onboarding'
  | 'Delivery & Client Work'
  | 'Internal Operations'
  | 'Team Productivity'

export interface GuideArticle {
  slug: string
  title: string
  description: string
  subcategory: GuideSubcategory
  href: string
}

export const guides: GuideArticle[] = [
  {
    slug: 'automate-client-onboarding-small-agency',
    title: 'How to Automate Client Onboarding for a Small Agency',
    description:
      'A practical system for automating your client onboarding process using AI tools — from intake forms to kickoff workflows.',
    subcategory: 'Client Onboarding',
    href: '/guides/automate-client-onboarding-small-agency',
  },
]

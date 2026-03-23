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
  readingTime?: string
  whoItIsFor?: string
}

export const guides: GuideArticle[] = [
  {
    slug: 'automate-client-onboarding-small-agency',
    title: 'How to Automate Client Onboarding for a Small Agency',
    description:
      'A practical system for automating your client onboarding process using AI tools — from intake forms to kickoff workflows.',
    subcategory: 'Client Onboarding',
    href: '/guides/automate-client-onboarding-small-agency',
    readingTime: '8 min read',
    whoItIsFor: 'Agency owners',
  },
  {
    slug: 'discovery-call-to-proposal-workflow-agency',
    title: 'How to Turn Discovery Calls into Proposals with AI',
    description:
      'A step-by-step AI workflow to go from discovery call recording to polished proposal in under 45 minutes.',
    subcategory: 'Delivery & Client Work',
    href: '/guides/discovery-call-to-proposal-workflow-agency',
    readingTime: '5 min read',
  },
  {
    slug: '7-workflows-automate-small-agency',
    title: '7 Workflows Every Small Agency Should Automate with AI',
    description:
      'The 7 highest-ROI automations for small agencies — from client onboarding to weekly reporting.',
    subcategory: 'Internal Operations',
    href: '/guides/7-workflows-automate-small-agency',
    readingTime: '12 min read',
    whoItIsFor: 'Ops leads & founders',
  },
]

export interface Guide {
  title: string
  description: string
  href: string
  subcategory: string
}

export const guides: Guide[] = [
  // Client Onboarding
  {
    title: 'How to Automate Client Onboarding for a Small Agency',
    description: 'A step-by-step workflow to cut onboarding time and reduce manual back-and-forth.',
    href: '/guides/automate-client-onboarding-small-agency',
    subcategory: 'Client Onboarding',
  },
  {
    title: 'The Client Onboarding Checklist Every Agency Needs',
    description: 'A practical checklist to standardize your intake process and avoid missed steps.',
    href: '/guides/client-onboarding-checklist',
    subcategory: 'Client Onboarding',
  },
  {
    title: 'How to Turn Intake Forms into Automated Workflows',
    description: 'Connect your intake forms to your project management tools without manual data entry.',
    href: '/guides/intake-forms-automated-workflows',
    subcategory: 'Client Onboarding',
  },
  // Delivery & Client Work
  {
    title: 'How to Turn Discovery Calls into Proposals with AI',
    description: 'Use AI to convert call notes into polished proposals faster than you thought possible.',
    href: '/guides/discovery-calls-proposals-ai',
    subcategory: 'Delivery & Client Work',
  },
  {
    title: 'AI for Client Reporting Without Sounding Robotic',
    description: 'How to use AI to generate client reports that still sound like you wrote them.',
    href: '/guides/ai-client-reporting',
    subcategory: 'Delivery & Client Work',
  },
  // Internal Operations
  {
    title: 'How to Build an Internal SOP System Using AI',
    description: 'Document your processes once and let AI help maintain and update them over time.',
    href: '/guides/internal-sop-system-ai',
    subcategory: 'Internal Operations',
  },
  {
    title: 'How Small Agencies Can Save 10 Hours a Week with AI',
    description: 'The highest-leverage automations for lean teams who want to reclaim their week.',
    href: '/guides/save-10-hours-week-ai',
    subcategory: 'Internal Operations',
  },
  // Team Productivity
  {
    title: 'Lean Ops for Small Teams: A Practical Guide',
    description: 'How to run a tight operation with a small team using AI-assisted workflows.',
    href: '/guides/lean-ops-small-teams',
    subcategory: 'Team Productivity',
  },
]

export const SUBCATEGORY_ORDER = [
  'Client Onboarding',
  'Delivery & Client Work',
  'Internal Operations',
  'Team Productivity',
]

export function getGuidesGrouped(): { subcategory: string; guides: Guide[] }[] {
  const grouped: Record<string, Guide[]> = {}

  for (const guide of guides) {
    if (!grouped[guide.subcategory]) {
      grouped[guide.subcategory] = []
    }
    grouped[guide.subcategory].push(guide)
  }

  return SUBCATEGORY_ORDER.filter((sub) => grouped[sub]).map((sub) => ({
    subcategory: sub,
    guides: grouped[sub],
  }))
}

export type Guide = {
  title: string
  slug: string
  subcategory: string
  description: string
}

export const guides: Guide[] = [
  {
    title: 'How to Automate Client Onboarding for a Small Agency',
    slug: 'automate-client-onboarding-small-agency',
    subcategory: 'Client Onboarding',
    description: 'Step-by-step workflow to cut onboarding time and reduce manual back-and-forth.',
  },
  {
    title: 'Building an Onboarding Checklist That Actually Gets Used',
    slug: 'client-onboarding-checklist',
    subcategory: 'Client Onboarding',
    description: 'Turn your intake process into a repeatable system with AI-assisted checklists.',
  },
  {
    title: 'How to Turn Discovery Calls into Proposals with AI',
    slug: 'discovery-call-to-proposal-ai',
    subcategory: 'Delivery & Client Work',
    description: 'Extract action items and draft proposals directly from your call transcripts.',
  },
  {
    title: 'AI for Client Reporting Without Sounding Robotic',
    slug: 'ai-client-reporting',
    subcategory: 'Delivery & Client Work',
    description: 'Use AI to draft status updates and reports that still sound like you.',
  },
  {
    title: 'How to Build an Internal SOP System Using AI',
    slug: 'internal-sop-system-ai',
    subcategory: 'Internal Operations',
    description: 'Document your processes once, then let AI keep them updated and searchable.',
  },
  {
    title: 'AI Knowledge Base Workflows for Small Teams',
    slug: 'ai-knowledge-base-workflows',
    subcategory: 'Internal Operations',
    description: 'Build a living knowledge base that your whole team can actually use.',
  },
  {
    title: 'How Small Agencies Can Save 10 Hours a Week with AI',
    slug: 'save-10-hours-week-ai',
    subcategory: 'Team Productivity',
    description: 'Identify and eliminate the repetitive tasks draining your team every week.',
  },
  {
    title: 'Weekly Planning Workflows for Lean Agency Teams',
    slug: 'weekly-planning-workflow',
    subcategory: 'Team Productivity',
    description: 'A simple weekly planning system that keeps small teams aligned without long meetings.',
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

  const ordered = SUBCATEGORY_ORDER.filter((s) => grouped[s]).map((s) => ({
    subcategory: s,
    guides: grouped[s],
  }))

  // Append any subcategories not in the explicit order list
  const remaining = Object.keys(grouped)
    .filter((s) => !SUBCATEGORY_ORDER.includes(s))
    .map((s) => ({ subcategory: s, guides: grouped[s] }))

  return [...ordered, ...remaining]
}

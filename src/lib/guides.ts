export type GuideSubcategory =
  | 'Client Onboarding'
  | 'Delivery & Client Work'
  | 'Internal Operations'
  | 'Team Productivity';

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  subcategory: GuideSubcategory;
  href: string;
}

export const guides: GuideArticle[] = [
  {
    slug: 'automate-client-onboarding-small-agency',
    title: 'How to Automate Client Onboarding for a Small Agency',
    description: 'Step-by-step workflow to cut onboarding time and reduce manual back-and-forth using AI tools your team already has.',
    subcategory: 'Client Onboarding',
    href: '/guides/automate-client-onboarding-small-agency',
  },
];

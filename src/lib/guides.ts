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
    description:
      'A practical guide to building an automated onboarding workflow that saves time and delivers a consistent client experience.',
    subcategory: 'Client Onboarding',
    href: '/guides/automate-client-onboarding-small-agency',
  },
];

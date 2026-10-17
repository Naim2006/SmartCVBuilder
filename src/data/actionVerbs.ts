export interface ActionVerbCategory {
  category: string;
  description: string;
  verbs: string[];
}

export const ACTION_VERBS_CATEGORIES: ActionVerbCategory[] = [
  {
    category: 'Leadership & Management',
    description: 'Words showing direction, delegation, strategy, and team guidance',
    verbs: [
      'Spearheaded',
      'Orchestrated',
      'Architected',
      'Championed',
      'Directed',
      'Supervised',
      'Mentored',
      'Mobilized',
      'Delegated',
      'Pioneered',
      'Empowered',
      'Coordinated',
      'Governed',
      'Steered',
    ],
  },
  {
    category: 'Technical & Engineering',
    description: 'Words highlighting development, system design, and technical mastery',
    verbs: [
      'Engineered',
      'Developed',
      'Architected',
      'Deployed',
      'Refactored',
      'Automated',
      'Containerized',
      'Migrated',
      'Integrated',
      'Optimized',
      'Configured',
      'Implemented',
      'Debugged',
      'Benchmarked',
      'Provisioned',
    ],
  },
  {
    category: 'Impact & Optimization',
    description: 'Words demonstrating performance increases, cost reductions, and scaling',
    verbs: [
      'Accelerated',
      'Maximized',
      'Streamlined',
      'Amplified',
      'Generated',
      'Reduced',
      'Consolidated',
      'Enhanced',
      'Elevated',
      'Boosted',
      'Surpassed',
      'Outperformed',
      'Doubled',
      'Transformed',
    ],
  },
  {
    category: 'Research & Problem Solving',
    description: 'Words proving analytical depth, discovery, and diagnosis',
    verbs: [
      'Diagnosed',
      'Investigated',
      'Formulated',
      'Extracted',
      'Evaluated',
      'Audited',
      'Synthesized',
      'Discovered',
      'Modeled',
      'Uncovered',
      'Validated',
      'Simulated',
      'Surveyed',
    ],
  },
  {
    category: 'Execution & Delivery',
    description: 'Words demonstrating timely completion, launches, and rollouts',
    verbs: [
      'Delivered',
      'Executed',
      'Launched',
      'Dispatched',
      'Standardized',
      'Executed',
      'Produced',
      'Established',
      'Rolled out',
      'Completed',
      'Finalized',
    ],
  },
];

export const WEAK_VERBS: { weak: string; suggested: string[] }[] = [
  { weak: 'responsible for', suggested: ['spearheaded', 'directed', 'executed', 'orchestrated'] },
  { weak: 'helped with', suggested: ['facilitated', 'collaborated to', 'contributed to', 'supported'] },
  { weak: 'worked on', suggested: ['developed', 'engineered', 'implemented', 'designed'] },
  { weak: 'handled', suggested: ['managed', 'resolved', 'negotiated', 'addressed'] },
  { weak: 'assisted in', suggested: ['partnered with', 'collaborated on', 'reinforced'] },
  { weak: 'tried to', suggested: ['formulated', 'engineered', 'implemented'] },
  { weak: 'duties included', suggested: ['championed', 'delivered', 'optimized'] },
  { weak: 'participated in', suggested: ['drove', 'co-engineered', 'accelerated'] },
];

export const ALL_ACTION_VERBS = Array.from(
  new Set(ACTION_VERBS_CATEGORIES.flatMap((c) => c.verbs.map((v) => v.toLowerCase())))
);

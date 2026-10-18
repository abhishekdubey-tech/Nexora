/**
 * Demo data for Idea-to-Income Lab feature
 * All data is clearly labeled as demo/sample content.
 */

import type { StartupProject, ProjectCollaborator } from '../types';

export const demoLabProjects: StartupProject[] = [
  {
    id: 'demo-lab-1',
    owner_id: 'demo-user-3',
    name: 'EduBridge Lab Workspace',
    problem_statement: 'Over 200 million students in rural India lack access to quality education. Best teachers are concentrated in cities. Existing platforms require high-speed internet.',
    proposed_solution: 'Low-bandwidth mobile platform connecting rural students with verified tutors for affordable, interactive learning sessions. Offline-first approach.',
    target_customers: 'Students aged 10-18 in rural/semi-urban India and qualified tutors seeking flexible teaching.',
    industry: 'EdTech',
    business_model: 'Freemium with premium tutoring packages. Revenue from subscription fees and institutional partnerships.',
    required_team_skills: ['React Native', 'Node.js', 'UX Design', 'Content Strategy'],
    current_stage: 3,
    description: 'Building an offline-first mobile education platform to democratize quality tutoring in rural India. Currently validating with pilot schools in Rajasthan.',
    created_at: '2024-01-25T12:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
    stage1: {
      problem_definition: 'Rural students cannot access quality education due to geographic isolation and infrastructure gaps. Urban-rural educational divide is widening.',
      affected_people: 'Primary: ~200M rural school students aged 10-18 in India. Secondary: 500K+ qualified teachers seeking flexible income.',
      existing_alternatives: 'BYJU\'s, Vedantu, Khan Academy — all require stable internet and are priced beyond rural family budgets. Government programs lack interactivity.',
      assumptions: '1. Families have mobile phones (even basic ones). 2. Parents will pay ₹200-500/month for quality tutoring. 3. Rural teachers want to supplement income. 4. Offline content sync is technically feasible.',
      status: 'completed',
      completion_note: 'Completed thorough competitive analysis and field research in 3 rural districts.',
      evidence_links: ['https://drive.google.com/research-notes', 'https://docs.google.com/competitive-analysis'],
      completed_at: '2024-02-01T00:00:00Z',
    },
    stage2: {
      interviews: [
        {
          id: 'interview-1',
          customer_name: 'Ramesh K. (Parent, Rajasthan)',
          date: '2024-02-05',
          key_insights: 'Would pay up to ₹400/month for math and science tutoring. Phone is available 3-4 hours/day.',
          pain_points: 'Nearest coaching center is 40km away. No reliable internet. Existing apps crash on low-end phones.',
        },
        {
          id: 'interview-2',
          customer_name: 'Sunita M. (Teacher, UP)',
          date: '2024-02-07',
          key_insights: 'Currently earns ₹15K/month, would teach 2 extra hours daily for additional ₹8-10K.',
          pain_points: 'No platform for low-bandwidth sessions. Existing platforms take 30-40% commission.',
        },
        {
          id: 'interview-3',
          customer_name: 'Pradeep (Student, Bihar)',
          date: '2024-02-10',
          key_insights: 'Uses WhatsApp for homework help from cousin in city. Wants more structured learning.',
          pain_points: 'Videos buffer constantly. Cannot afford monthly subscriptions.',
        },
        {
          id: 'interview-4',
          customer_name: 'Neha S. (NGO Director)',
          date: '2024-02-12',
          key_insights: 'NGOs would pay for bulk access for rural students. CSR funding available.',
          pain_points: 'Hard to find platforms that work in low-connectivity. Needs content in regional languages.',
        },
      ],
      total_interviews: 4,
      key_findings: 'Strong demand confirmed. Price sensitivity real but willingness exists at ₹200-500/month. Offline-first is table stakes. Teacher supply exists. B2NGO channel is a viable secondary revenue stream.',
      evidence: 'Conducted 4 customer interviews, 2 school visits, online survey with 47 responses. 82% confirmed they would use such a platform.',
      changes_to_idea: 'Added regional language support as P0 feature. Reduced minimum subscription to ₹199/month. Added NGO bulk licensing model.',
      status: 'completed',
      completion_note: '4 interviews completed, recurring patterns identified, idea validated with adjustments.',
      evidence_links: ['https://forms.gle/survey-results'],
      completed_at: '2024-02-15T00:00:00Z',
    },
    stage3: {
      prototype_description: 'React Native app with offline content sync, low-bandwidth video streaming (<100kbps), and simple tutor booking interface. Built for Android 6+ with minimal storage requirements.',
      demo_url: 'https://edubridge-demo.vercel.app',
      repo_url: 'https://github.com/priya/edubridge-app',
      tasks_completed: ['Authentication flow', 'Offline content sync module', 'Tutor profile pages', 'Session booking UI', 'Low-bandwidth video player'],
      tasks_remaining: ['Payment integration', 'Push notifications', 'Regional language toggle', 'Admin dashboard'],
      prototype_feedback: 'Early testers praised the offline sync. Load time on low-end Android is 3.2s (target: <2s). UI needs simplification for first-time smartphone users.',
      status: 'in_progress',
      completion_note: '',
      evidence_links: ['https://github.com/priya/edubridge-app'],
    },
  },
  {
    id: 'demo-lab-2',
    owner_id: 'demo-user-6',
    name: 'HealthPulse Lab',
    problem_statement: 'People wear fitness trackers but get minimal actionable health insights. Most health issues detected too late because preventive monitoring is expensive and inaccessible.',
    proposed_solution: 'AI that aggregates wearable data to detect early health risk patterns and provides personalized recommendations.',
    target_customers: 'Health-conscious adults 25-55 using wearable devices wanting proactive health management.',
    industry: 'HealthTech',
    business_model: 'B2C subscription ($9.99/month) with B2B enterprise wellness plans.',
    required_team_skills: ['React Native', 'Python', 'Machine Learning', 'Healthcare APIs'],
    current_stage: 4,
    description: 'AI-powered health monitoring platform for wearable users. Running pilot with 50 beta users.',
    created_at: '2024-02-10T11:00:00Z',
    updated_at: '2024-03-15T13:00:00Z',
    stage1: {
      problem_definition: 'Wearable data is rich but insights are shallow. Users see steps and calories but miss early warning signs of health issues.',
      affected_people: 'Estimated 500M wearable device users globally. Particularly valuable for ages 35+ managing chronic disease risk.',
      existing_alternatives: 'Apple Health (too generic), Samsung Health (no AI insights), Whoop (fitness-focused, expensive).',
      assumptions: '1. Users will share health data with app. 2. Early risk detection adds enough value for $10/month. 3. Healthcare providers will partner. 4. ML models can be accurate with consumer wearable data.',
      status: 'completed',
      completion_note: 'Problem well-documented with market research.',
      evidence_links: [],
      completed_at: '2024-02-15T00:00:00Z',
    },
    stage2: {
      interviews: [
        {
          id: 'hp-int-1',
          customer_name: 'Michael R. (38, Software Engineer)',
          date: '2024-02-18',
          key_insights: 'Wears Apple Watch, frustrated by generic weekly summaries. Would pay $15/month for actionable insights.',
          pain_points: 'Cannot tell if his resting HR trend is concerning or normal. No doctor consult for minor symptoms.',
        },
        {
          id: 'hp-int-2',
          customer_name: 'Lisa T. (45, Marketing Manager)',
          date: '2024-02-20',
          key_insights: 'Family history of diabetes. Wants early detection. Would share data if proven secure.',
          pain_points: 'Privacy concerns. Existing apps feel like data harvesting.',
        },
        {
          id: 'hp-int-3',
          customer_name: 'Dr. James P. (Cardiologist)',
          date: '2024-02-22',
          key_insights: 'Would recommend to patients if clinically validated. Sees opportunity for remote monitoring.',
          pain_points: 'Regulatory hurdles. Liability if wrong alerts. Needs peer-reviewed validation.',
        },
      ],
      total_interviews: 3,
      key_findings: 'Strong consumer interest. Privacy is major concern — need strong data security messaging. Healthcare provider channel is strategic but requires clinical validation first.',
      evidence: '3 customer interviews, 2 healthcare professional interviews, literature review of wearable health studies.',
      changes_to_idea: 'Added privacy-first design as core differentiator. Healthcare provider partnerships moved to Phase 2. Added transparent data policy as UI feature.',
      status: 'completed',
      completion_note: 'Validation complete. Pivoted privacy approach.',
      evidence_links: [],
      completed_at: '2024-02-28T00:00:00Z',
    },
    stage3: {
      prototype_description: 'React Native app with Fitbit and Apple Watch integration. ML model trained on public health datasets. Dashboard showing 5 key health metrics with trend analysis.',
      demo_url: 'https://healthpulse-demo.app',
      repo_url: 'https://github.com/raj/healthpulse',
      tasks_completed: ['Wearable API integrations (Fitbit, Apple Watch)', 'Core ML risk scoring model', 'Dashboard with 5 health metrics', 'User onboarding flow', 'Data encryption layer'],
      tasks_remaining: ['Push notification system', 'Healthcare provider portal', 'Android Wear integration', 'Subscription payment'],
      prototype_feedback: 'Beta testers engaged daily. Average session 4.2 minutes. ML accuracy 78% vs baseline — needs improvement before medical claims.',
      status: 'completed',
      completion_note: 'Prototype complete and tested with 12 users.',
      evidence_links: ['https://github.com/raj/healthpulse'],
      completed_at: '2024-03-05T00:00:00Z',
    },
    stage4: {
      pilot_activities: [
        {
          id: 'pilot-1',
          activity: 'Closed Beta Launch',
          date: '2024-03-08',
          participants: 50,
          outcome: '43/50 users active after 2 weeks. Average 4.8 app opens/week.',
        },
        {
          id: 'pilot-2',
          activity: 'In-app Survey (Week 2)',
          date: '2024-03-15',
          participants: 38,
          outcome: '31/38 would recommend to friends. NPS score 42.',
        },
      ],
      participant_count: 50,
      user_feedback: 'Users love daily summaries. 73% found at least one insight surprising. Requests for sleep analysis and stress tracking are most common feature requests.',
      problems_discovered: 'ML model gives occasional false positives for elevated HR during intense workouts. Users found it alarming. Android performance is slower than iOS.',
      improvements_made: 'Added workout detection to filter out exercise-related HR spikes. Fixed Android memory leak. Added "Learn More" contextual tooltips to all health insights.',
      status: 'in_progress',
      completion_note: '',
      evidence_links: [],
    },
  },
  {
    id: 'demo-lab-3',
    owner_id: 'demo-user-1',
    name: 'CodeBuddy MVP Lab',
    problem_statement: 'Learning to code alone is isolating. Beginners struggle with debugging, lack motivation, and miss real-world project experience.',
    proposed_solution: 'Pair programmers with experienced developers for live collaborative coding, project-based learning, and code reviews.',
    target_customers: 'Beginner programmers, coding bootcamp students, and developers who want to mentor.',
    industry: 'EdTech',
    business_model: 'Marketplace model with per-session fees and monthly subscription for unlimited sessions.',
    required_team_skills: ['WebRTC', 'React', 'Node.js', 'Code Editor Integration'],
    current_stage: 1,
    description: 'A pair programming marketplace in the idea stage. Validating the problem with potential users before building.',
    created_at: '2024-03-01T15:00:00Z',
    updated_at: '2024-03-10T12:00:00Z',
    stage1: {
      problem_definition: 'Learning to code in isolation leads to high dropout rates. Without access to experienced developers, beginners get stuck and lose motivation.',
      affected_people: 'Estimated 5M active coding learners on platforms like Codecademy, freeCodeCamp, and bootcamps. 40-60% dropout before completion.',
      existing_alternatives: 'Stack Overflow (async, not mentorship), Codementor (expensive, $60-200/hr), Discord communities (unstructured).',
      assumptions: '1. Learners will pay $15-30/hr for paired sessions. 2. Experienced developers want to earn from mentoring. 3. WebRTC-based editor sharing is feasible. 4. Real project work is more motivating than exercises.',
      status: 'in_progress',
      completion_note: '',
      evidence_links: [],
    },
  },
];

export const demoLabCollaborators: ProjectCollaborator[] = [
  {
    id: 'demo-collab-lab-1',
    project_id: 'demo-lab-1',
    user_id: 'demo-user-1',
    role: 'Lead Developer',
    can_edit: true,
    joined_at: '2024-02-01T10:00:00Z',
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getDemoLabProjectsByUser(userId: string): StartupProject[] {
  const stored = localStorage.getItem('nexora_lab_projects');
  let projects = demoLabProjects;
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as StartupProject[];
      const storedIds = parsed.map(p => p.id);
      const baseFiltered = demoLabProjects.filter(p => !storedIds.includes(p.id));
      projects = [...baseFiltered, ...parsed];
    } catch {}
  }
  return projects.filter(p => p.owner_id === userId || demoLabCollaborators.some(c => c.project_id === p.id && c.user_id === userId));
}

export function getDemoLabProjectById(id: string): StartupProject | undefined {
  const stored = localStorage.getItem('nexora_lab_projects');
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as StartupProject[];
      const found = parsed.find(p => p.id === id);
      if (found) return found;
    } catch {}
  }
  return demoLabProjects.find(p => p.id === id);
}

export function saveLabProject(project: StartupProject): void {
  const stored = localStorage.getItem('nexora_lab_projects');
  let projects: StartupProject[] = [];
  if (stored) {
    try { projects = JSON.parse(stored); } catch {}
  }
  const idx = projects.findIndex(p => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem('nexora_lab_projects', JSON.stringify(projects));
}

export function deleteLabProject(id: string): void {
  const stored = localStorage.getItem('nexora_lab_projects');
  if (stored) {
    try {
      const projects = JSON.parse(stored) as StartupProject[];
      localStorage.setItem('nexora_lab_projects', JSON.stringify(projects.filter(p => p.id !== id)));
    } catch {}
  }
}

export function getStageProgress(project: StartupProject): { stage: number; label: string; status: string; pct: number }[] {
  const stageConfigs = [
    { stage: 1, label: 'Problem Discovery', data: project.stage1 },
    { stage: 2, label: 'Customer Validation', data: project.stage2 },
    { stage: 3, label: 'Prototype Development', data: project.stage3 },
    { stage: 4, label: 'Pilot Testing', data: project.stage4 },
    { stage: 5, label: 'Traction & Growth', data: project.stage5 },
  ];

  return stageConfigs.map(({ stage, label, data }) => {
    const s = data as { status?: string } | undefined;
    const status = s?.status || 'not_started';
    const pct = status === 'completed' ? 100 : status === 'in_progress' ? 50 : 0;
    return { stage, label, status, pct };
  });
}

export function getOverallProgress(project: StartupProject): number {
  const progress = getStageProgress(project);
  const total = progress.reduce((acc, s) => acc + s.pct, 0);
  return Math.round(total / (5 * 100) * 100);
}

export function getNextAction(project: StartupProject): string {
  const { current_stage } = project;
  const stageData = [
    project.stage1,
    project.stage2,
    project.stage3,
    project.stage4,
    project.stage5,
  ];
  const currentData = stageData[current_stage - 1] as { status?: string } | undefined;
  const status = currentData?.status || 'not_started';

  if (status === 'not_started') {
    const actions: Record<number, string> = {
      1: 'Start Problem Discovery: define the problem, who it affects, and your assumptions.',
      2: 'Begin Customer Validation: schedule your first customer interview.',
      3: 'Start Prototype Development: describe what you want to build and list tasks.',
      4: 'Launch Pilot Testing: recruit your first pilot participants.',
      5: 'Track Traction: record your first measurable outcomes and set a growth milestone.',
    };
    return actions[current_stage] || 'Continue working on your current stage.';
  }

  if (status === 'in_progress') {
    const stage2Data = project.stage2;
    if (current_stage === 2 && stage2Data) {
      const interviews = stage2Data.interviews?.length || 0;
      if (interviews < 5) return `Customer Validation is in progress. You have recorded ${interviews} interview${interviews !== 1 ? 's' : ''}. Next step: conduct more interviews (aim for 5+) and document recurring pain points.`;
      if (!stage2Data.key_findings) return 'Summarize recurring customer problems and document your key findings.';
    }
    if (current_stage === 3) return 'Prototype in progress. Continue completing tasks and gather early feedback from test users.';
    if (current_stage === 4) return 'Pilot running. Collect structured feedback from participants and document problems found.';
    return `Stage ${current_stage} is in progress. Keep working and mark it complete when ready.`;
  }

  if (status === 'completed' && current_stage < 5) {
    return `Stage ${current_stage} complete! Move to Stage ${current_stage + 1} to continue your startup journey.`;
  }

  return 'All stages complete! Review your progress and plan your next growth phase.';
}

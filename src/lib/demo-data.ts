/**
 * Demo data store for Nexora platform
 * All data here is clearly labeled as demo/sample content.
 * This store is used when Supabase credentials are not configured,
 * providing a fully functional demo experience.
 */

import type {
  Profile, Organization, Opportunity, Application,
  Startup, Mentor, Post, Notification, CollaborationRequest,
  MentorshipRequest, SavedOpportunity, Comment
} from '../types';

// ============================================================
// DEMO PROFILES
// ============================================================
export const demoProfiles: Profile[] = [
  {
    id: 'demo-user-1',
    full_name: 'Aisha Patel',
    role: 'job_seeker',
    headline: 'Full-Stack Developer | React & Node.js Enthusiast',
    bio: 'Computer Science student passionate about building scalable web applications. Looking for internship opportunities in frontend and full-stack development.',
    location: 'Bangalore, India',
    education: 'B.Tech Computer Science, IIT Delhi (2024)',
    experience: '1 year (internships)',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Tailwind CSS', 'Git'],
    interests: ['Web Development', 'Open Source', 'AI/ML', 'Startups'],
    career_goals: 'Become a senior full-stack developer at a high-growth startup',
    work_preference: 'remote',
    experience_level: 'entry',
    portfolio_url: 'https://aishapatel.dev',
    linkedin_url: 'https://linkedin.com/in/aishapatel',
    github_url: 'https://github.com/aishapatel',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-03-01T14:30:00Z',
  },
  {
    id: 'demo-user-2',
    full_name: 'Marcus Chen',
    role: 'job_seeker',
    headline: 'UX Designer & Researcher | Creating Human-Centered Products',
    bio: 'Design graduate with a focus on user research and interaction design. Skilled in Figma, prototyping, and design systems. Seeking full-time UX design roles.',
    location: 'San Francisco, CA',
    education: 'MS Human-Computer Interaction, Carnegie Mellon (2023)',
    experience: '2 years',
    skills: ['UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS', 'Accessibility'],
    interests: ['Product Design', 'Accessibility', 'EdTech', 'Health Tech'],
    career_goals: 'Lead design at a product company focused on social impact',
    work_preference: 'hybrid',
    experience_level: 'mid',
    portfolio_url: 'https://marcuschen.design',
    linkedin_url: 'https://linkedin.com/in/marcuschen',
    github_url: '',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-02-01T08:00:00Z',
    updated_at: '2024-03-10T16:00:00Z',
  },
  {
    id: 'demo-user-3',
    full_name: 'Priya Sharma',
    role: 'entrepreneur',
    headline: 'Founder @ EduBridge | Democratizing Quality Education',
    bio: 'Serial entrepreneur building EduBridge, a platform that connects rural students with quality tutors. Previously co-founded a logistics startup. Looking for a technical co-founder and early team members.',
    location: 'Mumbai, India',
    education: 'MBA, IIM Ahmedabad (2021)',
    experience: '5 years',
    skills: ['Product Strategy', 'Business Development', 'Fundraising', 'Team Building', 'Marketing'],
    interests: ['EdTech', 'Social Impact', 'Rural Development', 'Mentoring'],
    career_goals: 'Build a sustainable EdTech company serving 1M+ students',
    work_preference: 'hybrid',
    experience_level: 'senior',
    portfolio_url: '',
    linkedin_url: 'https://linkedin.com/in/priyasharma',
    github_url: '',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-01-05T12:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 'demo-user-4',
    full_name: 'David Kim',
    role: 'recruiter',
    headline: 'Talent Acquisition Lead @ TechNova Solutions',
    bio: 'Recruiting top engineering and design talent for TechNova Solutions, a Series B enterprise SaaS company. We build tools that help teams collaborate better.',
    location: 'Austin, TX',
    education: 'BA Psychology, UT Austin (2018)',
    experience: '6 years',
    skills: ['Technical Recruiting', 'Talent Strategy', 'Employer Branding', 'Interviewing', 'HR Tech'],
    interests: ['People Operations', 'Diversity & Inclusion', 'Remote Work'],
    career_goals: 'Build world-class engineering teams',
    work_preference: 'hybrid',
    experience_level: 'senior',
    portfolio_url: '',
    linkedin_url: 'https://linkedin.com/in/davidkim',
    github_url: '',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-03-08T11:00:00Z',
  },
  {
    id: 'demo-user-5',
    full_name: 'Dr. Sarah Williams',
    role: 'mentor',
    headline: 'Startup Advisor | Ex-CTO @ CloudScale | 15+ Years in Tech',
    bio: 'Former CTO with experience scaling engineering teams from 5 to 200+. I mentor early-stage founders on technical strategy, team building, and fundraising. Available for weekly 1:1 sessions.',
    location: 'New York, NY',
    education: 'PhD Computer Science, MIT (2010)',
    experience: '15 years',
    skills: ['Technical Leadership', 'System Architecture', 'Cloud Computing', 'Team Building', 'Fundraising'],
    interests: ['Mentoring', 'Startups', 'Cloud Infrastructure', 'AI'],
    career_goals: 'Help 100 startups succeed through mentorship',
    work_preference: 'remote',
    experience_level: 'lead',
    portfolio_url: 'https://sarahwilliams.tech',
    linkedin_url: 'https://linkedin.com/in/drsarahwilliams',
    github_url: 'https://github.com/sarahwilliams',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-01-10T07:00:00Z',
    updated_at: '2024-03-12T09:00:00Z',
  },
  {
    id: 'demo-user-6',
    full_name: 'Raj Mehta',
    role: 'entrepreneur',
    headline: 'Building HealthPulse | AI-Powered Health Monitoring',
    bio: 'Data scientist turned entrepreneur. Building HealthPulse to make preventive healthcare accessible using wearable data and AI. Looking for a mobile developer co-founder.',
    location: 'London, UK',
    education: 'MS Data Science, Imperial College London (2022)',
    experience: '3 years',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'Product Management', 'Healthcare'],
    interests: ['HealthTech', 'AI/ML', 'Wearables', 'Preventive Healthcare'],
    career_goals: 'Launch and scale a HealthTech company',
    work_preference: 'remote',
    experience_level: 'mid',
    portfolio_url: '',
    linkedin_url: 'https://linkedin.com/in/rajmehta',
    github_url: 'https://github.com/rajmehta',
    avatar_url: '',
    is_public: true,
    email_verified: true,
    profile_completed: true,
    created_at: '2024-02-10T11:00:00Z',
    updated_at: '2024-03-15T13:00:00Z',
  },
];

// ============================================================
// DEMO ORGANIZATIONS
// ============================================================
export const demoOrganizations: Organization[] = [
  {
    id: 'demo-org-1',
    owner_id: 'demo-user-4',
    name: 'TechNova Solutions',
    description: 'Enterprise SaaS company building next-generation collaboration tools. Series B funded, 150+ employees across 3 offices.',
    website: 'https://technova.example.com',
    industry: 'Enterprise Software',
    logo_url: '',
    verification_status: 'verified',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'demo-org-2',
    owner_id: 'demo-user-3',
    name: 'EduBridge Foundation',
    description: 'EdTech startup connecting rural students with quality education through an innovative tutoring platform. Pre-seed stage.',
    website: 'https://edubridge.example.com',
    industry: 'EdTech',
    logo_url: '',
    verification_status: 'pending',
    created_at: '2024-01-25T12:00:00Z',
    updated_at: '2024-02-15T14:00:00Z',
  },
];

// ============================================================
// DEMO OPPORTUNITIES
// ============================================================
export const demoOpportunities: Opportunity[] = [
  {
    id: 'demo-opp-1',
    organization_id: 'demo-org-1',
    posted_by: 'demo-user-4',
    title: 'Frontend Engineer (React/TypeScript)',
    description: 'Join our product team to build delightful user experiences for our enterprise collaboration platform. You\'ll work with React, TypeScript, and GraphQL to create performant, accessible interfaces used by thousands of teams worldwide.\n\nResponsibilities:\n- Build and maintain React components and features\n- Collaborate with designers on UI implementation\n- Write unit and integration tests\n- Participate in code reviews and technical discussions\n- Optimize application performance',
    type: 'job',
    required_skills: ['React', 'TypeScript', 'CSS', 'Testing', 'Git'],
    work_mode: 'hybrid',
    location: 'Austin, TX',
    experience_level: 'mid',
    compensation: '$90,000 - $120,000/year + equity',
    compensation_type: 'paid',
    deadline: '2024-04-30T23:59:59Z',
    status: 'active',
    application_count: 24,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'demo-opp-2',
    organization_id: 'demo-org-1',
    posted_by: 'demo-user-4',
    title: 'UX Design Intern - Summer 2024',
    description: 'A 12-week paid internship for aspiring UX designers. Work alongside our design team to research user needs, create wireframes, and prototype new features.\n\nWhat you\'ll learn:\n- User research methods and analysis\n- Design system creation and maintenance\n- Prototyping with Figma\n- Collaboration with engineering teams\n- Presenting design decisions to stakeholders',
    type: 'internship',
    required_skills: ['UX Design', 'Figma', 'User Research', 'Prototyping'],
    work_mode: 'hybrid',
    location: 'Austin, TX',
    experience_level: 'entry',
    compensation: '$30/hour',
    compensation_type: 'paid',
    deadline: '2024-04-15T23:59:59Z',
    status: 'active',
    application_count: 42,
    created_at: '2024-03-05T09:00:00Z',
    updated_at: '2024-03-05T09:00:00Z',
  },
  {
    id: 'demo-opp-3',
    organization_id: null,
    posted_by: 'demo-user-3',
    title: 'Technical Co-Founder - EduBridge',
    description: 'Looking for a passionate technical co-founder to join EduBridge, an EdTech startup connecting rural students with quality tutors.\n\nWhat we need:\n- Someone who can build and lead the technical vision\n- Experience with mobile-first development (React Native or Flutter)\n- Passion for education and social impact\n- Willingness to work with equity compensation initially\n\nWhat we offer:\n- Equal co-founder equity (negotiable)\n- Opportunity to impact millions of students\n- Existing mentor network and initial funding conversations',
    type: 'cofounder',
    required_skills: ['React Native', 'Node.js', 'System Design', 'Mobile Development'],
    work_mode: 'remote',
    location: 'India (Remote)',
    experience_level: 'senior',
    compensation: 'Equity: 20-30% co-founder stake',
    compensation_type: 'equity',
    deadline: null,
    status: 'active',
    application_count: 8,
    created_at: '2024-02-20T12:00:00Z',
    updated_at: '2024-02-20T12:00:00Z',
  },
  {
    id: 'demo-opp-4',
    organization_id: null,
    posted_by: 'demo-user-6',
    title: 'Mobile Developer - HealthPulse Startup',
    description: 'Join HealthPulse as our founding mobile developer. Build the iOS/Android app that connects with wearable devices to provide personalized health insights.\n\nIdeal candidate:\n- Experience with React Native or Flutter\n- Interest in health tech and wearable APIs\n- Comfortable working in a fast-paced startup\n- Data visualization skills are a plus',
    type: 'startup_role',
    required_skills: ['React Native', 'Flutter', 'Mobile Development', 'API Integration'],
    work_mode: 'remote',
    location: 'Remote (UK timezone preferred)',
    experience_level: 'mid',
    compensation: 'Competitive salary + 5-10% equity',
    compensation_type: 'equity',
    deadline: '2024-05-01T23:59:59Z',
    status: 'active',
    application_count: 12,
    created_at: '2024-03-10T08:00:00Z',
    updated_at: '2024-03-10T08:00:00Z',
  },
  {
    id: 'demo-opp-5',
    organization_id: null,
    posted_by: 'demo-user-5',
    title: 'Build a Portfolio Website - Freelance Project',
    description: 'Looking for a developer to build a clean, modern portfolio website for a tech professional. Should include:\n- About section with bio\n- Project showcase with filtering\n- Blog section\n- Contact form\n- Responsive design\n- Dark/light mode\n\nBudget: $500-800\nTimeline: 2 weeks',
    type: 'freelance',
    required_skills: ['React', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    work_mode: 'remote',
    location: 'Remote',
    experience_level: 'entry',
    compensation: '$500 - $800',
    compensation_type: 'paid',
    deadline: '2024-04-01T23:59:59Z',
    status: 'active',
    application_count: 15,
    created_at: '2024-03-08T14:00:00Z',
    updated_at: '2024-03-08T14:00:00Z',
  },
  {
    id: 'demo-opp-6',
    organization_id: null,
    posted_by: 'demo-user-4',
    title: 'Global Innovation Hackathon 2024',
    description: 'A 48-hour hackathon focused on building solutions for sustainable development goals. Open to students, developers, designers, and entrepreneurs.\n\nPrizes:\n- 1st Place: $5,000 + mentorship\n- 2nd Place: $2,500\n- 3rd Place: $1,000\n- Best Social Impact: $1,500\n\nTracks: Climate Tech, EdTech, HealthTech, FinTech\nDate: April 20-22, 2024',
    type: 'hackathon',
    required_skills: ['Problem Solving', 'Teamwork', 'Prototyping'],
    work_mode: 'remote',
    location: 'Virtual',
    experience_level: 'any',
    compensation: 'Prizes up to $5,000',
    compensation_type: 'paid',
    deadline: '2024-04-18T23:59:59Z',
    status: 'active',
    application_count: 156,
    created_at: '2024-03-12T10:00:00Z',
    updated_at: '2024-03-12T10:00:00Z',
  },
  {
    id: 'demo-opp-7',
    organization_id: 'demo-org-1',
    posted_by: 'demo-user-4',
    title: 'Backend Engineer (Node.js/PostgreSQL)',
    description: 'We\'re looking for a backend engineer to help scale our API infrastructure. You\'ll work with Node.js, PostgreSQL, and Redis to build reliable, performant services.\n\nRequirements:\n- 3+ years of backend development\n- Strong SQL and database design skills\n- Experience with RESTful API design\n- Familiarity with cloud services (AWS/GCP)\n- Testing and CI/CD experience',
    type: 'job',
    required_skills: ['Node.js', 'PostgreSQL', 'REST APIs', 'AWS', 'Docker'],
    work_mode: 'remote',
    location: 'Remote (US)',
    experience_level: 'mid',
    compensation: '$100,000 - $140,000/year + equity',
    compensation_type: 'paid',
    deadline: '2024-05-15T23:59:59Z',
    status: 'active',
    application_count: 31,
    created_at: '2024-03-14T11:00:00Z',
    updated_at: '2024-03-14T11:00:00Z',
  },
  {
    id: 'demo-opp-8',
    organization_id: 'demo-org-2',
    posted_by: 'demo-user-3',
    title: 'Content & Community Intern',
    description: 'Help EduBridge create educational content and build our student community. Perfect for someone passionate about education and content creation.\n\nResponsibilities:\n- Create social media content\n- Write blog posts about education access\n- Manage student community forums\n- Assist with tutor onboarding\n\nThis is a remote, part-time internship (20 hrs/week) with a monthly stipend.',
    type: 'internship',
    required_skills: ['Content Writing', 'Social Media', 'Community Management', 'Communication'],
    work_mode: 'remote',
    location: 'Remote (India)',
    experience_level: 'entry',
    compensation: '₹10,000/month stipend',
    compensation_type: 'stipend',
    deadline: '2024-04-10T23:59:59Z',
    status: 'active',
    application_count: 28,
    created_at: '2024-03-06T13:00:00Z',
    updated_at: '2024-03-06T13:00:00Z',
  },
];

// ============================================================
// DEMO STARTUPS
// ============================================================
export const demoStartups: Startup[] = [
  {
    id: 'demo-startup-1',
    founder_id: 'demo-user-3',
    name: 'EduBridge',
    tagline: 'Connecting rural students with quality tutors through technology',
    problem: 'Over 200 million students in rural India lack access to quality education. The best teachers are concentrated in cities, and existing online platforms are too expensive or require high-speed internet.',
    solution: 'EduBridge uses a low-bandwidth mobile platform to connect rural students with verified tutors for affordable, interactive learning sessions. Our offline-first approach works even in areas with limited connectivity.',
    target_audience: 'Students aged 10-18 in rural and semi-urban India, and qualified tutors looking for flexible teaching opportunities.',
    industry: 'EdTech',
    business_model: 'Freemium with premium tutoring packages. Revenue from subscription fees and institutional partnerships.',
    stage: 'validation',
    required_skills: ['React Native', 'Node.js', 'Mobile Development', 'UI/UX Design', 'Content Creation'],
    team_size: 2,
    funding_status: 'seeking',
    website_url: 'https://edubridge.example.com',
    pitch_deck_url: '',
    status: 'active',
    has_problem: true,
    has_target_users: true,
    has_solution: true,
    has_market_research: true,
    has_prototype: false,
    created_at: '2024-01-25T12:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 'demo-startup-2',
    founder_id: 'demo-user-6',
    name: 'HealthPulse',
    tagline: 'AI-powered preventive health insights from your wearable data',
    problem: 'People wear fitness trackers and smartwatches but get minimal actionable health insights. Most health issues are detected too late because preventive monitoring is expensive and inaccessible.',
    solution: 'HealthPulse aggregates data from popular wearables and uses machine learning to detect early health risk patterns, providing personalized recommendations and connecting users with healthcare providers when needed.',
    target_audience: 'Health-conscious adults aged 25-55 who use wearable devices and want proactive health management.',
    industry: 'HealthTech',
    business_model: 'B2C subscription ($9.99/month) with B2B enterprise wellness plans.',
    stage: 'mvp',
    required_skills: ['React Native', 'Python', 'Machine Learning', 'Data Visualization', 'Healthcare APIs'],
    team_size: 3,
    funding_status: 'bootstrapped',
    website_url: '',
    pitch_deck_url: '',
    status: 'active',
    has_problem: true,
    has_target_users: true,
    has_solution: true,
    has_market_research: false,
    has_prototype: true,
    created_at: '2024-02-10T11:00:00Z',
    updated_at: '2024-03-15T13:00:00Z',
  },
  {
    id: 'demo-startup-3',
    founder_id: 'demo-user-1',
    name: 'CodeBuddy',
    tagline: 'Pair programming platform for learners and mentors',
    problem: 'Learning to code alone is isolating. Beginners struggle with debugging, lack motivation, and don\'t get real-world project experience.',
    solution: 'CodeBuddy pairs beginner programmers with experienced developers for live collaborative coding sessions, project-based learning, and code reviews.',
    target_audience: 'Beginner programmers, coding bootcamp students, and experienced developers who want to mentor.',
    industry: 'EdTech',
    business_model: 'Marketplace model with per-session fees and monthly subscription for unlimited sessions.',
    stage: 'idea',
    required_skills: ['WebRTC', 'React', 'Node.js', 'Code Editor Integration'],
    team_size: 1,
    funding_status: 'bootstrapped',
    website_url: '',
    pitch_deck_url: '',
    status: 'active',
    has_problem: true,
    has_target_users: true,
    has_solution: true,
    has_market_research: false,
    has_prototype: false,
    created_at: '2024-03-01T15:00:00Z',
    updated_at: '2024-03-10T12:00:00Z',
  },
];

// ============================================================
// DEMO MENTORS
// ============================================================
export const demoMentors: Mentor[] = [
  {
    id: 'demo-mentor-1',
    user_id: 'demo-user-5',
    expertise: ['Technical Leadership', 'System Architecture', 'Cloud Computing', 'Fundraising', 'Team Building'],
    experience_years: 15,
    availability: 'available',
    topics: ['Technical Strategy', 'Startup Scaling', 'Engineering Management', 'Cloud Architecture', 'Fundraising Preparation'],
    max_mentees: 5,
    current_mentees: 3,
    bio: 'Former CTO with 15+ years of experience. I help early-stage founders with technical strategy, team building, and preparing for fundraising.',
    created_at: '2024-01-10T07:00:00Z',
    updated_at: '2024-03-12T09:00:00Z',
  },
  {
    id: 'demo-mentor-2',
    user_id: 'demo-user-3',
    expertise: ['Business Strategy', 'EdTech', 'Product Management', 'Fundraising', 'Go-to-Market'],
    experience_years: 5,
    availability: 'busy',
    topics: ['Startup Validation', 'Business Model Design', 'EdTech Trends', 'Social Enterprise', 'Pitch Preparation'],
    max_mentees: 3,
    current_mentees: 2,
    bio: 'EdTech founder and MBA graduate. I mentor aspiring entrepreneurs on idea validation, business model design, and social impact strategies.',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
  },
];

// ============================================================
// DEMO APPLICATIONS
// ============================================================
export const demoApplications: Application[] = [
  {
    id: 'demo-app-1',
    opportunity_id: 'demo-opp-1',
    applicant_id: 'demo-user-1',
    cover_note: 'I\'m excited about the Frontend Engineer role at TechNova. I have hands-on experience with React and TypeScript from my internship and personal projects. I\'d love to contribute to your collaboration platform.',
    resume_url: '',
    status: 'reviewing',
    created_at: '2024-03-02T14:00:00Z',
    updated_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 'demo-app-2',
    opportunity_id: 'demo-opp-5',
    applicant_id: 'demo-user-1',
    cover_note: 'I can build a clean, responsive portfolio website using React and Tailwind CSS. I\'ve built several portfolio sites for my own projects and would love to help.',
    resume_url: '',
    status: 'pending',
    created_at: '2024-03-09T16:00:00Z',
    updated_at: '2024-03-09T16:00:00Z',
  },
  {
    id: 'demo-app-3',
    opportunity_id: 'demo-opp-2',
    applicant_id: 'demo-user-2',
    cover_note: 'As a recent HCI graduate, I\'m passionate about creating accessible, user-centered designs. This internship aligns perfectly with my career goals in UX design.',
    resume_url: '',
    status: 'shortlisted',
    created_at: '2024-03-06T11:00:00Z',
    updated_at: '2024-03-10T09:00:00Z',
  },
];

// ============================================================
// DEMO SAVED OPPORTUNITIES
// ============================================================
export const demoSavedOpportunities: SavedOpportunity[] = [
  {
    id: 'demo-saved-1',
    user_id: 'demo-user-1',
    opportunity_id: 'demo-opp-6',
    created_at: '2024-03-12T11:00:00Z',
  },
  {
    id: 'demo-saved-2',
    user_id: 'demo-user-1',
    opportunity_id: 'demo-opp-7',
    created_at: '2024-03-14T12:00:00Z',
  },
  {
    id: 'demo-saved-3',
    user_id: 'demo-user-2',
    opportunity_id: 'demo-opp-1',
    created_at: '2024-03-03T08:00:00Z',
  },
];

// ============================================================
// DEMO COLLABORATION REQUESTS
// ============================================================
export const demoCollaborationRequests: CollaborationRequest[] = [
  {
    id: 'demo-collab-1',
    startup_id: 'demo-startup-1',
    requester_id: 'demo-user-1',
    message: 'I\'d love to help build EduBridge! I have experience with React Native and Node.js, and I\'m passionate about making education accessible.',
    skills_offered: ['React Native', 'Node.js', 'TypeScript'],
    status: 'pending',
    created_at: '2024-03-08T10:00:00Z',
    updated_at: '2024-03-08T10:00:00Z',
  },
  {
    id: 'demo-collab-2',
    startup_id: 'demo-startup-2',
    requester_id: 'demo-user-2',
    message: 'I can help design the user experience for HealthPulse. I have experience with health tech interfaces and data visualization.',
    skills_offered: ['UX Design', 'Data Visualization', 'Prototyping'],
    status: 'accepted',
    created_at: '2024-03-11T14:00:00Z',
    updated_at: '2024-03-12T09:00:00Z',
  },
];

// ============================================================
// DEMO MENTORSHIP REQUESTS
// ============================================================
export const demoMentorshipRequests: MentorshipRequest[] = [
  {
    id: 'demo-mentorship-1',
    mentor_id: 'demo-mentor-1',
    requester_id: 'demo-user-3',
    message: 'I need guidance on building the technical architecture for EduBridge, particularly around offline-first mobile development and scaling.',
    topic: 'Technical Strategy',
    requested_time: '2024-03-20T10:00:00Z',
    status: 'accepted',
    created_at: '2024-03-05T08:00:00Z',
    updated_at: '2024-03-06T10:00:00Z',
  },
  {
    id: 'demo-mentorship-2',
    mentor_id: 'demo-mentor-1',
    requester_id: 'demo-user-6',
    message: 'I\'d love your advice on our ML pipeline architecture and how to approach fundraising for HealthPulse.',
    topic: 'Cloud Architecture',
    requested_time: '2024-03-22T15:00:00Z',
    status: 'pending',
    created_at: '2024-03-10T12:00:00Z',
    updated_at: '2024-03-10T12:00:00Z',
  },
];

// ============================================================
// DEMO POSTS
// ============================================================
export const demoPosts: Post[] = [
  {
    id: 'demo-post-1',
    author_id: 'demo-user-1',
    title: 'Built my first open-source project! 🎉',
    content: 'After 3 months of learning React and TypeScript, I just published my first open-source project — a task management app with real-time collaboration. It\'s not perfect, but I learned so much about state management, WebSocket, and deployment. Would love feedback and contributions!\n\n[Demo] This is sample community content.',
    category: 'showcase',
    likes_count: 24,
    comments_count: 8,
    created_at: '2024-03-10T14:00:00Z',
    updated_at: '2024-03-10T14:00:00Z',
  },
  {
    id: 'demo-post-2',
    author_id: 'demo-user-3',
    title: 'Looking for EdTech collaborators in India',
    content: 'We\'re building EduBridge and looking for passionate people who want to make education accessible. We need developers, content creators, and community managers. If you care about education equity, let\'s connect!\n\n[Demo] This is sample community content.',
    category: 'collaboration',
    likes_count: 18,
    comments_count: 5,
    created_at: '2024-03-08T10:00:00Z',
    updated_at: '2024-03-08T10:00:00Z',
  },
  {
    id: 'demo-post-3',
    author_id: 'demo-user-5',
    title: '5 things I wish I knew before my first tech interview',
    content: '1. **Practice system design, not just algorithms** — Most companies test for practical thinking.\n2. **Ask clarifying questions** — It shows maturity and real-world experience.\n3. **Talk about failures** — Interviewers value self-awareness.\n4. **Research the team, not just the company** — Understanding team dynamics matters.\n5. **Follow up meaningfully** — A thoughtful thank-you email stands out.\n\nWhat would you add to this list?\n\n[Demo] This is sample community content.',
    category: 'resource',
    likes_count: 45,
    comments_count: 12,
    created_at: '2024-03-06T09:00:00Z',
    updated_at: '2024-03-06T09:00:00Z',
  },
  {
    id: 'demo-post-4',
    author_id: 'demo-user-6',
    title: 'From data scientist to startup founder — my journey',
    content: 'A year ago I was comfortable in my data science role. Today I\'m building HealthPulse, an AI-powered health monitoring platform. The transition from employee to founder has been challenging but incredibly rewarding. Here\'s what I\'ve learned about making the leap...\n\n[Demo] This is sample community content.',
    category: 'discussion',
    likes_count: 32,
    comments_count: 9,
    created_at: '2024-03-04T16:00:00Z',
    updated_at: '2024-03-04T16:00:00Z',
  },
  {
    id: 'demo-post-5',
    author_id: 'demo-user-2',
    title: 'Free UX design resources for beginners',
    content: 'Here are my top picks for learning UX design:\n\n📚 **Books**: Don\'t Make Me Think, The Design of Everyday Things\n🎓 **Courses**: Google UX Design Certificate, Interaction Design Foundation\n🛠️ **Tools**: Figma (free tier), Maze for usability testing\n📱 **Practice**: Daily UI Challenge, Redesign real apps\n\nHappy to chat if anyone wants guidance on starting a UX career!\n\n[Demo] This is sample community content.',
    category: 'resource',
    likes_count: 56,
    comments_count: 15,
    created_at: '2024-03-02T11:00:00Z',
    updated_at: '2024-03-02T11:00:00Z',
  },
];

// ============================================================
// DEMO COMMENTS
// ============================================================
export const demoComments: Comment[] = [
  {
    id: 'demo-comment-1',
    post_id: 'demo-post-1',
    author_id: 'demo-user-5',
    content: 'Great work! The code structure looks clean. Consider adding error boundaries and loading states for a more polished UX.',
    created_at: '2024-03-10T15:00:00Z',
  },
  {
    id: 'demo-comment-2',
    post_id: 'demo-post-1',
    author_id: 'demo-user-2',
    content: 'The UI looks great! If you want, I can help with the design system. DM me!',
    created_at: '2024-03-10T16:30:00Z',
  },
  {
    id: 'demo-comment-3',
    post_id: 'demo-post-3',
    author_id: 'demo-user-1',
    content: 'This is super helpful! I\'d add: prepare real examples from your projects, not hypotheticals.',
    created_at: '2024-03-06T11:00:00Z',
  },
];

// ============================================================
// DEMO NOTIFICATIONS
// ============================================================
export const demoNotifications: Notification[] = [
  {
    id: 'demo-notif-1',
    user_id: 'demo-user-1',
    title: 'Application Update',
    message: 'Your application for "Frontend Engineer" at TechNova is now being reviewed.',
    type: 'application',
    link: '/dashboard/applications',
    is_read: false,
    created_at: '2024-03-05T10:00:00Z',
  },
  {
    id: 'demo-notif-2',
    user_id: 'demo-user-1',
    title: 'New Opportunity Match',
    message: 'A new opportunity "Backend Engineer (Node.js)" matches your skills! 82% match.',
    type: 'info',
    link: '/opportunities/demo-opp-7',
    is_read: false,
    created_at: '2024-03-14T11:30:00Z',
  },
  {
    id: 'demo-notif-3',
    user_id: 'demo-user-3',
    title: 'New Collaboration Interest',
    message: 'Aisha Patel is interested in joining EduBridge as a developer.',
    type: 'collaboration',
    link: '/dashboard/startups',
    is_read: true,
    created_at: '2024-03-08T10:30:00Z',
  },
];

// ============================================================
// DEMO DATA STATISTICS (for landing page)
// ============================================================
export const demoStats = {
  opportunities: demoOpportunities.length,
  startups: demoStartups.length,
  members: demoProfiles.length,
  connections: 47, // sample number
  label: 'Sample/Demo Data',
};

// ============================================================
// HELPER: Get profile by ID
// ============================================================
export function getDemoProfile(id: string): Profile | undefined {
  return demoProfiles.find(p => p.id === id);
}

// ============================================================
// HELPER: Get opportunities with joined data
// ============================================================
export function getDemoOpportunitiesWithDetails(): Opportunity[] {
  return demoOpportunities.map(opp => ({
    ...opp,
    organization: demoOrganizations.find(o => o.id === opp.organization_id),
    poster: demoProfiles.find(p => p.id === opp.posted_by),
  }));
}

// ============================================================
// HELPER: Get startups with founder info
// ============================================================
export function getDemoStartupsWithDetails(): Startup[] {
  return demoStartups.map(s => ({
    ...s,
    founder: demoProfiles.find(p => p.id === s.founder_id),
  }));
}

// ============================================================
// HELPER: Get mentors with profile info
// ============================================================
export function getDemoMentorsWithDetails(): Mentor[] {
  return demoMentors.map(m => ({
    ...m,
    profile: demoProfiles.find(p => p.id === m.user_id),
  }));
}

// ============================================================
// HELPER: Get posts with author info
// ============================================================
export function getDemoPostsWithDetails(): Post[] {
  return demoPosts.map(p => ({
    ...p,
    author: demoProfiles.find(pr => pr.id === p.author_id),
  }));
}

export type UserRole = 'job_seeker' | 'entrepreneur' | 'recruiter' | 'mentor';
export type WorkMode = 'remote' | 'onsite' | 'hybrid';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'any';
export type OpportunityType = 'job' | 'internship' | 'freelance' | 'hackathon' | 'startup_role' | 'cofounder';
export type CompensationType = 'paid' | 'unpaid' | 'equity' | 'stipend';
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'accepted' | 'rejected';
export type StartupStage = 'idea' | 'validation' | 'mvp' | 'early_traction' | 'growth';
export type MentorAvailability = 'available' | 'busy' | 'unavailable';
export type PostCategory = 'general' | 'showcase' | 'collaboration' | 'resource' | 'discussion' | 'question';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  headline: string;
  bio: string;
  location: string;
  education: string;
  experience: string;
  skills: string[];
  interests: string[];
  career_goals: string;
  work_preference: WorkMode;
  experience_level: ExperienceLevel;
  portfolio_url: string;
  linkedin_url: string;
  github_url: string;
  avatar_url: string;
  is_public: boolean;
  email_verified: boolean;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  website: string;
  industry: string;
  logo_url: string;
  verification_status: 'unverified' | 'pending' | 'verified';
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  organization_id: string | null;
  posted_by: string;
  title: string;
  description: string;
  type: OpportunityType;
  required_skills: string[];
  work_mode: WorkMode;
  location: string;
  experience_level: ExperienceLevel;
  compensation: string;
  compensation_type: CompensationType;
  deadline: string | null;
  status: 'active' | 'closed' | 'draft';
  application_count: number;
  created_at: string;
  updated_at: string;
  // Joined fields
  organization?: Organization;
  poster?: Profile;
  match_score?: number;
  match_reasons?: string[];
}

export interface Application {
  id: string;
  opportunity_id: string;
  applicant_id: string;
  cover_note: string;
  resume_url: string;
  status: ApplicationStatus;
  created_at: string;
  updated_at: string;
  // Joined
  opportunity?: Opportunity;
  applicant?: Profile;
}

export interface SavedOpportunity {
  id: string;
  user_id: string;
  opportunity_id: string;
  created_at: string;
  opportunity?: Opportunity;
}

export interface Startup {
  id: string;
  founder_id: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  target_audience: string;
  industry: string;
  business_model: string;
  stage: StartupStage;
  required_skills: string[];
  team_size: number;
  funding_status: 'bootstrapped' | 'seeking' | 'funded';
  website_url: string;
  pitch_deck_url: string;
  status: 'active' | 'inactive' | 'acquired';
  has_problem: boolean;
  has_target_users: boolean;
  has_solution: boolean;
  has_market_research: boolean;
  has_prototype: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  founder?: Profile;
}

export interface CollaborationRequest {
  id: string;
  startup_id: string;
  requester_id: string;
  message: string;
  skills_offered: string[];
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  updated_at: string;
  // Joined
  startup?: Startup;
  requester?: Profile;
}

export interface Mentor {
  id: string;
  user_id: string;
  expertise: string[];
  experience_years: number;
  availability: MentorAvailability;
  topics: string[];
  max_mentees: number;
  current_mentees: number;
  bio: string;
  created_at: string;
  updated_at: string;
  // Joined
  profile?: Profile;
}

export interface MentorshipRequest {
  id: string;
  mentor_id: string;
  requester_id: string;
  message: string;
  topic: string;
  requested_time: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  created_at: string;
  updated_at: string;
  // Joined
  mentor?: Mentor;
  requester?: Profile;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: PostCategory;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  // Joined
  author?: Profile;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  // Joined
  author?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'application' | 'collaboration' | 'mentorship';
  link: string;
  is_read: boolean;
  created_at: string;
}

export interface MatchScore {
  overall: number;
  skills_match: number;
  interests_match: number;
  career_goals_match: number;
  location_match: number;
  experience_match: number;
  reasons: string[];
}

// ============================================================
// IDEA-TO-INCOME LAB TYPES
// ============================================================

export type LabStage = 1 | 2 | 3 | 4 | 5;
export type MilestoneStatus = 'not_started' | 'in_progress' | 'completed';

export interface StartupProject {
  id: string;
  owner_id: string;
  name: string;
  problem_statement: string;
  proposed_solution: string;
  target_customers: string;
  industry: string;
  business_model: string;
  required_team_skills: string[];
  current_stage: LabStage;
  description: string;
  created_at: string;
  updated_at: string;
  // Stage data
  stage1?: ProblemDiscoveryData;
  stage2?: CustomerValidationData;
  stage3?: PrototypeDevelopmentData;
  stage4?: PilotTestingData;
  stage5?: TractionGrowthData;
  // Collaborators
  collaborators?: ProjectCollaborator[];
}

export interface ProblemDiscoveryData {
  problem_definition: string;
  affected_people: string;
  existing_alternatives: string;
  assumptions: string;
  status: MilestoneStatus;
  completion_note: string;
  evidence_links: string[];
  completed_at?: string;
}

export interface CustomerValidationData {
  interviews: CustomerInterview[];
  total_interviews: number;
  key_findings: string;
  evidence: string;
  changes_to_idea: string;
  status: MilestoneStatus;
  completion_note: string;
  evidence_links: string[];
  completed_at?: string;
}

export interface CustomerInterview {
  id: string;
  customer_name: string;
  date: string;
  key_insights: string;
  pain_points: string;
}

export interface PrototypeDevelopmentData {
  prototype_description: string;
  demo_url: string;
  repo_url: string;
  tasks_completed: string[];
  tasks_remaining: string[];
  prototype_feedback: string;
  status: MilestoneStatus;
  completion_note: string;
  evidence_links: string[];
  completed_at?: string;
}

export interface PilotTestingData {
  pilot_activities: PilotActivity[];
  participant_count: number;
  user_feedback: string;
  problems_discovered: string;
  improvements_made: string;
  status: MilestoneStatus;
  completion_note: string;
  evidence_links: string[];
  completed_at?: string;
}

export interface PilotActivity {
  id: string;
  activity: string;
  date: string;
  participants: number;
  outcome: string;
}

export interface TractionGrowthData {
  active_users?: number;
  repeat_usage_rate?: string;
  paying_customers?: number;
  revenue?: string;
  supporting_evidence: string;
  next_milestone: string;
  lessons_learned: string;
  status: MilestoneStatus;
  completion_note: string;
  evidence_links: string[];
  completed_at?: string;
}

export interface ProjectCollaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: string;
  can_edit: boolean;
  joined_at: string;
  profile?: Profile;
}

// ============================================================
// OPPORTUNITY TRANSPARENCY SCORE TYPES
// ============================================================

export interface TransparencyBreakdown {
  organization_verification: number;    // Max 25
  compensation_disclosure: number;       // Max 20
  responsibilities_described: number;   // Max 20
  eligibility_specified: number;         // Max 15
  deadline_and_process: number;          // Max 10
  application_method: number;            // Max 10
}

export interface TransparencyScore {
  total: number;             // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  label: string;
  breakdown: TransparencyBreakdown;
  improvements: string[];    // Actionable suggestions to improve the score
  highlights: string[];      // What the listing does well
}

export interface OpportunityReport {
  id: string;
  reporter_id: string;
  target_id: string;
  target_type: 'opportunity';
  reason: string;
  details: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}


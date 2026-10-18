-- ============================================================
-- NEXORA PLATFORM — COMPLETE DATABASE SCHEMA
-- Run this file in the Supabase SQL Editor to set up all tables,
-- indexes, RLS policies, and triggers.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. EXTENSIONS
-- ────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- 2. TABLES
-- ────────────────────────────────────────────────────────────

-- profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'job_seeker'
    CHECK (role IN ('job_seeker', 'entrepreneur', 'recruiter', 'mentor')),
  headline TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  location TEXT DEFAULT '',
  education TEXT DEFAULT '',
  experience TEXT DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  career_goals TEXT DEFAULT '',
  work_preference TEXT DEFAULT 'remote'
    CHECK (work_preference IN ('remote', 'onsite', 'hybrid')),
  experience_level TEXT DEFAULT 'entry'
    CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead')),
  portfolio_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  profile_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  website TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  verification_status TEXT DEFAULT 'unverified'
    CHECK (verification_status IN ('unverified', 'pending', 'verified')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- opportunities
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  posted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL
    CHECK (type IN ('job', 'internship', 'freelance', 'hackathon', 'startup_role', 'cofounder')),
  required_skills TEXT[] DEFAULT '{}',
  work_mode TEXT DEFAULT 'remote'
    CHECK (work_mode IN ('remote', 'onsite', 'hybrid')),
  location TEXT DEFAULT '',
  experience_level TEXT DEFAULT 'entry'
    CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead', 'any')),
  compensation TEXT DEFAULT '',
  compensation_type TEXT DEFAULT 'paid'
    CHECK (compensation_type IN ('paid', 'unpaid', 'equity', 'stipend')),
  deadline TIMESTAMPTZ,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active', 'closed', 'draft')),
  application_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- applications
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_note TEXT DEFAULT '',
  resume_url TEXT DEFAULT '',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(opportunity_id, applicant_id)
);

-- saved_opportunities
CREATE TABLE saved_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

-- startups
CREATE TABLE startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tagline TEXT DEFAULT '',
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  target_audience TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  business_model TEXT DEFAULT '',
  stage TEXT DEFAULT 'idea'
    CHECK (stage IN ('idea', 'validation', 'mvp', 'early_traction', 'growth')),
  required_skills TEXT[] DEFAULT '{}',
  team_size INTEGER DEFAULT 1,
  funding_status TEXT DEFAULT 'bootstrapped'
    CHECK (funding_status IN ('bootstrapped', 'seeking', 'funded')),
  website_url TEXT DEFAULT '',
  pitch_deck_url TEXT DEFAULT '',
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'acquired')),
  -- Validation checklist
  has_problem BOOLEAN DEFAULT false,
  has_target_users BOOLEAN DEFAULT false,
  has_solution BOOLEAN DEFAULT false,
  has_market_research BOOLEAN DEFAULT false,
  has_prototype BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- collaboration_requests
CREATE TABLE collaboration_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  startup_id UUID NOT NULL REFERENCES startups(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT DEFAULT '',
  skills_offered TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(startup_id, requester_id)
);

-- mentors
CREATE TABLE mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  expertise TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  availability TEXT DEFAULT 'available'
    CHECK (availability IN ('available', 'busy', 'unavailable')),
  topics TEXT[] DEFAULT '{}',
  max_mentees INTEGER DEFAULT 5,
  current_mentees INTEGER DEFAULT 0,
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- mentorship_requests
CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  topic TEXT DEFAULT '',
  requested_time TIMESTAMPTZ,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- posts (community)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT DEFAULT '',
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general'
    CHECK (category IN ('general', 'showcase', 'collaboration', 'resource', 'discussion', 'question')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info'
    CHECK (type IN ('info', 'success', 'warning', 'application', 'collaboration', 'mentorship')),
  link TEXT DEFAULT '',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- reports
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL
    CHECK (target_type IN ('opportunity', 'startup', 'profile', 'post', 'comment')),
  target_id UUID NOT NULL,
  reason TEXT NOT NULL,
  details TEXT DEFAULT '',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────
-- 3. INDEXES
-- ────────────────────────────────────────────────────────────

-- profiles
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_skills ON profiles USING GIN(skills);
CREATE INDEX idx_profiles_is_public ON profiles(is_public);

-- opportunities
CREATE INDEX idx_opportunities_type ON opportunities(type);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_required_skills ON opportunities USING GIN(required_skills);
CREATE INDEX idx_opportunities_posted_by ON opportunities(posted_by);

-- applications
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX idx_applications_opportunity_id ON applications(opportunity_id);

-- startups
CREATE INDEX idx_startups_founder_id ON startups(founder_id);
CREATE INDEX idx_startups_industry ON startups(industry);
CREATE INDEX idx_startups_stage ON startups(stage);

-- mentors
CREATE INDEX idx_mentors_user_id ON mentors(user_id);
CREATE INDEX idx_mentors_expertise ON mentors USING GIN(expertise);

-- notifications
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- posts
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_author_id ON posts(author_id);

-- ────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ────────────────────────────────────────────────────────────

-- Enable RLS on every table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- ── profiles ──────────────────────────────────────────────
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── organizations ─────────────────────────────────────────
CREATE POLICY "Organizations are viewable by everyone"
  ON organizations FOR SELECT
  USING (true);

CREATE POLICY "Owners can create organizations"
  ON organizations FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their organizations"
  ON organizations FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their organizations"
  ON organizations FOR DELETE
  USING (auth.uid() = owner_id);

-- ── opportunities ─────────────────────────────────────────
CREATE POLICY "Active opportunities are viewable by everyone"
  ON opportunities FOR SELECT
  USING (status = 'active');

CREATE POLICY "Posters can view their own opportunities regardless of status"
  ON opportunities FOR SELECT
  USING (auth.uid() = posted_by);

CREATE POLICY "Authenticated users can create opportunities"
  ON opportunities FOR INSERT
  WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Posters can update their own opportunities"
  ON opportunities FOR UPDATE
  USING (auth.uid() = posted_by)
  WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Posters can delete their own opportunities"
  ON opportunities FOR DELETE
  USING (auth.uid() = posted_by);

-- ── applications ──────────────────────────────────────────
CREATE POLICY "Applicants can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Applicants can view their own applications"
  ON applications FOR SELECT
  USING (auth.uid() = applicant_id);

CREATE POLICY "Opportunity posters can view applications for their opportunities"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = applications.opportunity_id
        AND opportunities.posted_by = auth.uid()
    )
  );

CREATE POLICY "Opportunity posters can update application status"
  ON applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = applications.opportunity_id
        AND opportunities.posted_by = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = applications.opportunity_id
        AND opportunities.posted_by = auth.uid()
    )
  );

-- ── saved_opportunities ───────────────────────────────────
CREATE POLICY "Users can view their own saved opportunities"
  ON saved_opportunities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save opportunities"
  ON saved_opportunities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave opportunities"
  ON saved_opportunities FOR DELETE
  USING (auth.uid() = user_id);

-- ── startups ──────────────────────────────────────────────
CREATE POLICY "Active startups are viewable by everyone"
  ON startups FOR SELECT
  USING (status = 'active');

CREATE POLICY "Founders can view their own startups regardless of status"
  ON startups FOR SELECT
  USING (auth.uid() = founder_id);

CREATE POLICY "Authenticated users can create startups"
  ON startups FOR INSERT
  WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Founders can update their own startups"
  ON startups FOR UPDATE
  USING (auth.uid() = founder_id)
  WITH CHECK (auth.uid() = founder_id);

CREATE POLICY "Founders can delete their own startups"
  ON startups FOR DELETE
  USING (auth.uid() = founder_id);

-- ── collaboration_requests ────────────────────────────────
CREATE POLICY "Requesters can create collaboration requests"
  ON collaboration_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Requesters can view their own collaboration requests"
  ON collaboration_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "Startup founders can view collaboration requests for their startups"
  ON collaboration_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM startups
      WHERE startups.id = collaboration_requests.startup_id
        AND startups.founder_id = auth.uid()
    )
  );

CREATE POLICY "Startup founders can update collaboration requests"
  ON collaboration_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM startups
      WHERE startups.id = collaboration_requests.startup_id
        AND startups.founder_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM startups
      WHERE startups.id = collaboration_requests.startup_id
        AND startups.founder_id = auth.uid()
    )
  );

-- ── mentors ───────────────────────────────────────────────
CREATE POLICY "Mentors are viewable by everyone"
  ON mentors FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own mentor profile"
  ON mentors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentor profile"
  ON mentors FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mentor profile"
  ON mentors FOR DELETE
  USING (auth.uid() = user_id);

-- ── mentorship_requests ───────────────────────────────────
CREATE POLICY "Requesters can create mentorship requests"
  ON mentorship_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Requesters can view their own mentorship requests"
  ON mentorship_requests FOR SELECT
  USING (auth.uid() = requester_id);

CREATE POLICY "Mentors can view requests sent to them"
  ON mentorship_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM mentors
      WHERE mentors.id = mentorship_requests.mentor_id
        AND mentors.user_id = auth.uid()
    )
  );

CREATE POLICY "Mentors can update requests sent to them"
  ON mentorship_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM mentors
      WHERE mentors.id = mentorship_requests.mentor_id
        AND mentors.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM mentors
      WHERE mentors.id = mentorship_requests.mentor_id
        AND mentors.user_id = auth.uid()
    )
  );

-- ── posts ─────────────────────────────────────────────────
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = author_id);

-- ── comments ──────────────────────────────────────────────
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own comments"
  ON comments FOR DELETE
  USING (auth.uid() = author_id);

-- ── notifications ─────────────────────────────────────────
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can insert notifications for any user"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- ── reports ───────────────────────────────────────────────
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
  ON reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- ────────────────────────────────────────────────────────────
-- 5. TRIGGERS — Auto-create profile on signup
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 6. TRIGGERS — Auto-update updated_at timestamp
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to every table that has an updated_at column
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON startups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON collaboration_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON mentors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON mentorship_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SCHEMA COMPLETE ✓
-- Next: run seed.sql to populate demo data.
-- ============================================================

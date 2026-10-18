-- ============================================================
-- NEXORA MIGRATION 002: IDEA-TO-INCOME LAB & TRANSPARENCY SCORE
-- ============================================================

-- 1. STARTUP LAB PROJECTS
CREATE TABLE IF NOT EXISTS startup_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  proposed_solution TEXT NOT NULL,
  target_customers TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  business_model TEXT DEFAULT '',
  required_team_skills TEXT[] DEFAULT '{}',
  current_stage INTEGER NOT NULL DEFAULT 1 CHECK (current_stage BETWEEN 1 AND 5),
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LAB STAGE DATA & MILESTONES
CREATE TABLE IF NOT EXISTS startup_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL CHECK (stage BETWEEN 1 AND 5),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  stage_data JSONB DEFAULT '{}'::jsonb,
  completion_note TEXT DEFAULT '',
  evidence_links TEXT[] DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, stage)
);

-- 3. CUSTOMER INTERVIEWS (STAGE 2)
CREATE TABLE IF NOT EXISTS customer_interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  key_insights TEXT DEFAULT '',
  pain_points TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PILOT ACTIVITIES (STAGE 4)
CREATE TABLE IF NOT EXISTS pilot_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  participants INTEGER DEFAULT 0,
  outcome TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECT COLLABORATORS
CREATE TABLE IF NOT EXISTS project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES startup_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'Collaborator',
  can_edit BOOLEAN DEFAULT false,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- 6. OPPORTUNITY QUALITY & TRANSPARENCY METRICS
ALTER TABLE opportunities 
  ADD COLUMN IF NOT EXISTS transparency_score INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS transparency_grade TEXT DEFAULT 'B';

-- Enable RLS on all new tables
ALTER TABLE startup_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE startup_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_collaborators ENABLE ROW LEVEL SECURITY;

-- Policies for startup_projects
CREATE POLICY "Users can view own or collaborated lab projects"
  ON startup_projects FOR SELECT
  USING (
    auth.uid() = owner_id OR 
    EXISTS (SELECT 1 FROM project_collaborators WHERE project_id = startup_projects.id AND user_id = auth.uid())
  );

CREATE POLICY "Users can insert own lab projects"
  ON startup_projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners and editors can update lab projects"
  ON startup_projects FOR UPDATE
  USING (
    auth.uid() = owner_id OR 
    EXISTS (SELECT 1 FROM project_collaborators WHERE project_id = startup_projects.id AND user_id = auth.uid() AND can_edit = true)
  );

CREATE POLICY "Owners can delete lab projects"
  ON startup_projects FOR DELETE
  USING (auth.uid() = owner_id);

-- Policies for milestones, interviews, pilot_activities
CREATE POLICY "Authorized project users can view milestones"
  ON startup_milestones FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM startup_projects 
      WHERE startup_projects.id = startup_milestones.project_id 
        AND (startup_projects.owner_id = auth.uid() OR EXISTS (SELECT 1 FROM project_collaborators WHERE project_id = startup_projects.id AND user_id = auth.uid()))
    )
  );

CREATE POLICY "Authorized project users can view/manage interviews"
  ON customer_interviews FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM startup_projects 
      WHERE startup_projects.id = customer_interviews.project_id 
        AND (startup_projects.owner_id = auth.uid() OR EXISTS (SELECT 1 FROM project_collaborators WHERE project_id = startup_projects.id AND user_id = auth.uid()))
    )
  );

CREATE POLICY "Authorized project users can view/manage pilots"
  ON pilot_activities FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM startup_projects 
      WHERE startup_projects.id = pilot_activities.project_id 
        AND (startup_projects.owner_id = auth.uid() OR EXISTS (SELECT 1 FROM project_collaborators WHERE project_id = startup_projects.id AND user_id = auth.uid()))
    )
  );

CREATE POLICY "Project members can view collaborators"
  ON project_collaborators FOR SELECT
  USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM startup_projects WHERE id = project_collaborators.project_id AND owner_id = auth.uid())
  );

CREATE POLICY "Project owners can manage collaborators"
  ON project_collaborators FOR ALL
  USING (
    EXISTS (SELECT 1 FROM startup_projects WHERE id = project_collaborators.project_id AND owner_id = auth.uid())
  );

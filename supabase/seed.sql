-- ============================================================
-- NEXORA PLATFORM — SEED DATA
-- All demo data is prefixed with [Demo] where appropriate.
-- Run this AFTER schema.sql in the Supabase SQL Editor.
--
-- NOTE: Because profiles reference auth.users, we insert
-- directly into profiles with fixed UUIDs. In production
-- the handle_new_user() trigger creates profiles automatically.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- Fixed UUIDs for demo users
-- ────────────────────────────────────────────────────────────
-- user_1  = '11111111-1111-1111-1111-111111111111'  (Job Seeker)
-- user_2  = '22222222-2222-2222-2222-222222222222'  (Job Seeker)
-- user_3  = '33333333-3333-3333-3333-333333333333'  (Entrepreneur)
-- user_4  = '44444444-4444-4444-4444-444444444444'  (Recruiter)
-- user_5  = '55555555-5555-5555-5555-555555555555'  (Mentor)
-- user_6  = '66666666-6666-6666-6666-666666666666'  (Multi-role)

-- ────────────────────────────────────────────────────────────
-- Create matching auth.users entries for seed data
-- (required because profiles FK → auth.users)
-- ────────────────────────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'priya.sharma@demo.nexora.dev',   crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "Priya Sharma"}'::jsonb,   NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'james.okonkwo@demo.nexora.dev',  crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "James Okonkwo"}'::jsonb,  NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'sara.chen@demo.nexora.dev',      crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "Sara Chen"}'::jsonb,      NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'marcus.johnson@demo.nexora.dev', crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "Marcus Johnson"}'::jsonb, NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'elena.rodriguez@demo.nexora.dev',crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "Elena Rodriguez"}'::jsonb,NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'alex.kimura@demo.nexora.dev',   crypt('DemoPass123!', gen_salt('bf')), NOW(), '{"full_name": "Alex Kimura"}'::jsonb,    NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- PROFILES (6 demo users)
-- ────────────────────────────────────────────────────────────
INSERT INTO profiles (id, full_name, role, headline, bio, location, education, experience, skills, interests, career_goals, work_preference, experience_level, portfolio_url, linkedin_url, github_url, is_public, email_verified, profile_completed)
VALUES
  -- 1 · Priya Sharma — Job Seeker (Frontend Developer)
  (
    '11111111-1111-1111-1111-111111111111',
    '[Demo] Priya Sharma',
    'job_seeker',
    'Frontend Developer · React & TypeScript Enthusiast',
    'Recent CS graduate passionate about building beautiful, accessible web applications. Experienced with React, TypeScript, and modern CSS. Looking for my first full-time role where I can grow as a developer and contribute to meaningful products.',
    'Bangalore, India',
    'B.Tech Computer Science, IIT Delhi (2024)',
    'Frontend Intern at TechCorp (6 months), Open-source contributor to React libraries',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Git', 'Figma'],
    ARRAY['Web Development', 'UI/UX Design', 'Open Source', 'Accessibility'],
    'Land a frontend developer role at a product company and eventually transition into a senior/lead position within 3-5 years.',
    'remote',
    'entry',
    'https://priyasharma.dev',
    'https://linkedin.com/in/priyasharma-demo',
    'https://github.com/priyasharma-demo',
    true, true, true
  ),

  -- 2 · James Okonkwo — Job Seeker (Data Science)
  (
    '22222222-2222-2222-2222-222222222222',
    '[Demo] James Okonkwo',
    'job_seeker',
    'Data Scientist · ML & Python',
    'Data science professional with 2 years of experience in machine learning, statistical analysis, and data visualization. Skilled at turning complex datasets into actionable insights. Currently seeking mid-level data science opportunities.',
    'Lagos, Nigeria',
    'M.Sc Data Science, University of Lagos (2023)',
    'Data Analyst at FinSight Analytics (2 years), Research Assistant in NLP Lab (1 year)',
    ARRAY['Python', 'TensorFlow', 'Pandas', 'SQL', 'Scikit-learn', 'Tableau', 'R', 'Docker'],
    ARRAY['Machine Learning', 'NLP', 'Data Visualization', 'AI Ethics'],
    'Grow into a senior data scientist role, contribute to AI research, and eventually lead a data team.',
    'hybrid',
    'mid',
    'https://jamesokonkwo.com',
    'https://linkedin.com/in/jamesokonkwo-demo',
    'https://github.com/jamesokonkwo-demo',
    true, true, true
  ),

  -- 3 · Sara Chen — Entrepreneur
  (
    '33333333-3333-3333-3333-333333333333',
    '[Demo] Sara Chen',
    'entrepreneur',
    'Founder & CEO @ GreenLoop · Circular Economy Advocate',
    'Serial entrepreneur focused on sustainability tech. Built and exited a food-waste tracking SaaS. Now building GreenLoop, a platform that connects businesses for material exchange and waste reduction. Looking for co-founders and technical talent.',
    'San Francisco, CA',
    'MBA, Stanford Graduate School of Business (2021)',
    'Founded WasteNot (exited 2022), Product Manager at Salesforce (3 years)',
    ARRAY['Product Strategy', 'Fundraising', 'Business Development', 'Go-to-Market', 'Lean Startup', 'Public Speaking'],
    ARRAY['Sustainability', 'Circular Economy', 'CleanTech', 'Impact Investing'],
    'Scale GreenLoop to 1,000 businesses and raise Series A funding within 18 months.',
    'hybrid',
    'senior',
    'https://greenloop.io',
    'https://linkedin.com/in/sarachen-demo',
    '',
    true, true, true
  ),

  -- 4 · Marcus Johnson — Recruiter
  (
    '44444444-4444-4444-4444-444444444444',
    '[Demo] Marcus Johnson',
    'recruiter',
    'Senior Technical Recruiter @ NovaTech Solutions',
    'Experienced tech recruiter specializing in engineering and product roles. Helping startups and scale-ups find exceptional talent. Passionate about diversity hiring and building inclusive teams.',
    'Austin, TX',
    'B.A. Human Resources, University of Texas (2018)',
    'Senior Recruiter at NovaTech Solutions (3 years), Recruiter at Google (2 years)',
    ARRAY['Technical Recruiting', 'Sourcing', 'Employer Branding', 'Diversity Hiring', 'ATS', 'Interview Design'],
    ARRAY['Talent Acquisition', 'HR Tech', 'Startup Culture', 'Diversity & Inclusion'],
    'Build the most efficient talent pipeline for early-stage startups.',
    'remote',
    'senior',
    '',
    'https://linkedin.com/in/marcusjohnson-demo',
    '',
    true, true, true
  ),

  -- 5 · Elena Rodriguez — Mentor
  (
    '55555555-5555-5555-5555-555555555555',
    '[Demo] Elena Rodriguez',
    'mentor',
    'VP of Engineering @ CloudScale · Mentor to Aspiring Tech Leaders',
    'Engineering leader with 12+ years building distributed systems and leading teams of 50+. Passionate about mentoring early-career developers, helping them navigate career growth, system design interviews, and leadership transitions.',
    'New York, NY',
    'M.S. Computer Science, MIT (2012)',
    'VP Engineering at CloudScale (4 years), Engineering Manager at Stripe (3 years), Senior SWE at Amazon (5 years)',
    ARRAY['System Design', 'Leadership', 'Distributed Systems', 'Go', 'Kubernetes', 'AWS', 'Team Building', 'Architecture'],
    ARRAY['Engineering Leadership', 'Mentorship', 'System Design', 'Career Growth'],
    'Help 100 engineers reach their first leadership role through structured mentorship.',
    'remote',
    'lead',
    '',
    'https://linkedin.com/in/elenarodriguez-demo',
    'https://github.com/elenarodriguez-demo',
    true, true, true
  ),

  -- 6 · Alex Kimura — Multi-role (Entrepreneur + Job Seeker)
  (
    '66666666-6666-6666-6666-666666666666',
    '[Demo] Alex Kimura',
    'entrepreneur',
    'Full-Stack Developer & Indie Hacker · Building SkillSwap',
    'Full-stack developer by day, indie hacker by night. Currently building SkillSwap — a peer-to-peer skill exchange platform. Open to freelance projects and part-time roles while bootstrapping my startup.',
    'Tokyo, Japan',
    'B.S. Computer Engineering, University of Tokyo (2022)',
    'Full-Stack Developer at Mercari (2 years), Freelance Web Developer (1 year)',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS', 'GraphQL', 'Prisma', 'Next.js', 'Stripe API'],
    ARRAY['Indie Hacking', 'SaaS', 'EdTech', 'Developer Tools'],
    'Grow SkillSwap to 10K users, achieve ramen profitability, and eventually go full-time on the startup.',
    'remote',
    'mid',
    'https://alexkimura.dev',
    'https://linkedin.com/in/alexkimura-demo',
    'https://github.com/alexkimura-demo',
    true, true, true
  )
ON CONFLICT (id) DO NOTHING;

-- ────────────────────────────────────────────────────────────
-- ORGANIZATIONS (2)
-- ────────────────────────────────────────────────────────────
INSERT INTO organizations (id, owner_id, name, description, website, industry, verification_status)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    '[Demo] NovaTech Solutions',
    'NovaTech Solutions is a fast-growing technology consulting firm specializing in cloud infrastructure, AI integration, and digital transformation for mid-market companies. We help businesses modernize their tech stacks and scale efficiently.',
    'https://novatech-demo.com',
    'Technology Consulting',
    'verified'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '33333333-3333-3333-3333-333333333333',
    '[Demo] GreenLoop',
    'GreenLoop connects businesses for sustainable material exchange and waste reduction. Our platform uses AI-powered matching to help companies find circular economy partners, reducing landfill waste by up to 60%.',
    'https://greenloop-demo.io',
    'Sustainability / CleanTech',
    'pending'
  );

-- ────────────────────────────────────────────────────────────
-- OPPORTUNITIES (8 — mix of types)
-- ────────────────────────────────────────────────────────────
INSERT INTO opportunities (id, organization_id, posted_by, title, description, type, required_skills, work_mode, location, experience_level, compensation, compensation_type, deadline, status, application_count)
VALUES
  -- 1 · Job — Frontend at NovaTech
  (
    'aaaa0001-0001-0001-0001-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    '[Demo] Frontend Developer — React & TypeScript',
    'Join our product team to build modern web applications using React 18, TypeScript, and Tailwind CSS. You''ll work on our flagship SaaS dashboard, collaborating closely with designers and backend engineers. Ideal for developers who care about clean code, accessibility, and performance.',
    'job',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Git', 'REST APIs'],
    'remote',
    'Austin, TX (Remote OK)',
    'entry',
    '$70,000 – $90,000 / year',
    'paid',
    NOW() + INTERVAL '30 days',
    'active',
    3
  ),

  -- 2 · Job — Data Scientist at NovaTech
  (
    'aaaa0001-0001-0001-0001-000000000002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    '[Demo] Data Scientist — ML & Analytics',
    'We''re looking for a data scientist to build predictive models for our enterprise clients. You''ll work with large datasets, develop machine learning pipelines, and present insights to stakeholders. Experience with Python, TensorFlow, and SQL is essential.',
    'job',
    ARRAY['Python', 'TensorFlow', 'SQL', 'Pandas', 'Data Visualization'],
    'hybrid',
    'Austin, TX',
    'mid',
    '$95,000 – $120,000 / year',
    'paid',
    NOW() + INTERVAL '45 days',
    'active',
    5
  ),

  -- 3 · Internship — Marketing at GreenLoop
  (
    'aaaa0001-0001-0001-0001-000000000003',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '33333333-3333-3333-3333-333333333333',
    '[Demo] Marketing Intern — Sustainability Content',
    'Help us tell the story of circular economy through compelling content. You''ll create blog posts, social media campaigns, and case studies about how businesses are reducing waste with GreenLoop. Great for students passionate about sustainability and marketing.',
    'internship',
    ARRAY['Content Writing', 'Social Media', 'SEO', 'Canva', 'Research'],
    'remote',
    'San Francisco, CA (Remote)',
    'entry',
    '$2,000 / month stipend',
    'stipend',
    NOW() + INTERVAL '20 days',
    'active',
    7
  ),

  -- 4 · Freelance — Mobile App Design
  (
    'aaaa0001-0001-0001-0001-000000000004',
    NULL,
    '33333333-3333-3333-3333-333333333333',
    '[Demo] Freelance UI/UX Designer — Mobile App Redesign',
    'Looking for an experienced UI/UX designer to redesign our mobile app. The project involves user research, wireframing, prototyping, and delivering a complete design system in Figma. 4-6 week engagement.',
    'freelance',
    ARRAY['Figma', 'UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
    'remote',
    'Remote',
    'mid',
    '$5,000 – $8,000 project-based',
    'paid',
    NOW() + INTERVAL '14 days',
    'active',
    2
  ),

  -- 5 · Hackathon — AI for Good
  (
    'aaaa0001-0001-0001-0001-000000000005',
    NULL,
    '55555555-5555-5555-5555-555555555555',
    '[Demo] AI for Good Hackathon 2025',
    'Join a 48-hour virtual hackathon focused on using AI to solve social challenges! Build solutions in healthcare, education, or environmental sustainability. Teams of 3-5 members. Top 3 teams win prizes and mentorship from industry leaders.',
    'hackathon',
    ARRAY['Python', 'Machine Learning', 'Teamwork', 'Problem Solving', 'Presentation'],
    'remote',
    'Virtual',
    'any',
    '$10,000 in prizes',
    'unpaid',
    NOW() + INTERVAL '60 days',
    'active',
    12
  ),

  -- 6 · Startup Role — CTO at GreenLoop
  (
    'aaaa0001-0001-0001-0001-000000000006',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '33333333-3333-3333-3333-333333333333',
    '[Demo] CTO / Technical Co-Founder — GreenLoop',
    'Seeking a technical co-founder to lead engineering for GreenLoop. You''ll architect our platform, build the founding engineering team, and shape technical strategy. Equity-based compensation with salary after Series A. Must be passionate about sustainability.',
    'startup_role',
    ARRAY['System Design', 'Node.js', 'React', 'PostgreSQL', 'AWS', 'Leadership'],
    'hybrid',
    'San Francisco, CA',
    'senior',
    '4-8% equity + salary post-funding',
    'equity',
    NOW() + INTERVAL '90 days',
    'active',
    1
  ),

  -- 7 · Cofounder — EdTech Platform
  (
    'aaaa0001-0001-0001-0001-000000000007',
    NULL,
    '66666666-6666-6666-6666-666666666666',
    '[Demo] Co-Founder Wanted — SkillSwap EdTech Platform',
    'Building SkillSwap, a peer-to-peer skill exchange platform. Looking for a co-founder with strong product/design skills to complement my technical background. We have an MVP with 200 beta users. Need someone who can drive product strategy, user acquisition, and community building.',
    'cofounder',
    ARRAY['Product Management', 'UI/UX Design', 'Growth Hacking', 'Community Building', 'Marketing'],
    'remote',
    'Remote (Global)',
    'mid',
    '20-30% equity',
    'equity',
    NULL,
    'active',
    4
  ),

  -- 8 · Internship — Backend at NovaTech
  (
    'aaaa0001-0001-0001-0001-000000000008',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    '[Demo] Backend Engineering Intern — Node.js & PostgreSQL',
    'Summer internship in our backend team. You''ll work on real features — building APIs, writing database migrations, and improving system performance. Mentorship included. Great for students or career changers learning server-side development.',
    'internship',
    ARRAY['Node.js', 'PostgreSQL', 'REST APIs', 'Git', 'JavaScript'],
    'onsite',
    'Austin, TX',
    'entry',
    '$3,000 / month stipend',
    'stipend',
    NOW() + INTERVAL '25 days',
    'active',
    9
  );

-- ────────────────────────────────────────────────────────────
-- STARTUPS (3 at different stages)
-- ────────────────────────────────────────────────────────────
INSERT INTO startups (id, founder_id, name, tagline, problem, solution, target_audience, industry, business_model, stage, required_skills, team_size, funding_status, website_url, status, has_problem, has_target_users, has_solution, has_market_research, has_prototype)
VALUES
  -- 1 · GreenLoop — Early Traction
  (
    'cccccccc-cccc-cccc-cccc-cccccccccc01',
    '33333333-3333-3333-3333-333333333333',
    '[Demo] GreenLoop',
    'Connecting businesses for a circular economy',
    'Businesses generate tons of reusable waste materials (packaging, electronics, textiles) that end up in landfills because there is no efficient marketplace to exchange or repurpose them between companies.',
    'An AI-powered B2B marketplace that matches businesses based on their waste outputs and material needs, enabling seamless material exchange and dramatically reducing landfill waste.',
    'Mid-size manufacturing companies, retail chains, and logistics firms with significant material waste',
    'Sustainability / CleanTech',
    'SaaS subscription + transaction fee on exchanges',
    'early_traction',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'AI/ML', 'Supply Chain'],
    3,
    'seeking',
    'https://greenloop-demo.io',
    'active',
    true, true, true, true, true
  ),

  -- 2 · SkillSwap — MVP
  (
    'cccccccc-cccc-cccc-cccc-cccccccccc02',
    '66666666-6666-6666-6666-666666666666',
    '[Demo] SkillSwap',
    'Trade skills, not money — peer-to-peer learning',
    'Traditional learning platforms are expensive and one-directional. People have valuable skills they could teach others but lack a structured way to exchange knowledge without monetary transactions.',
    'A peer-to-peer skill exchange platform where users trade skills using a time-credit system. Teach React for 1 hour, earn 1 credit to learn guitar. Built-in scheduling, video calls, and skill verification.',
    'Students, career changers, lifelong learners, and freelancers who want to learn without spending money',
    'EdTech',
    'Freemium — free basic exchanges, premium for group sessions, certificates, and priority matching',
    'mvp',
    ARRAY['Product Design', 'Growth Marketing', 'Community Management', 'Mobile Development'],
    1,
    'bootstrapped',
    'https://skillswap-demo.app',
    'active',
    true, true, true, false, true
  ),

  -- 3 · MindBridge — Idea Stage
  (
    'cccccccc-cccc-cccc-cccc-cccccccccc03',
    '22222222-2222-2222-2222-222222222222',
    '[Demo] MindBridge',
    'AI-powered mental health check-ins for remote teams',
    'Remote workers often suffer from isolation, burnout, and undetected mental health decline. Managers lack visibility into team well-being, and traditional surveys are infrequent and impersonal.',
    'An AI-powered Slack/Teams bot that conducts daily micro-check-ins, detects early signs of burnout through sentiment analysis, and provides managers with anonymized team wellness dashboards.',
    'Remote-first companies with 50-500 employees, HR leaders, and team managers',
    'HealthTech / HR Tech',
    'B2B SaaS — per-seat pricing',
    'idea',
    ARRAY['NLP', 'Python', 'Slack API', 'React', 'Data Visualization', 'Psychology'],
    1,
    'bootstrapped',
    '',
    'active',
    true, true, true, false, false
  );

-- ────────────────────────────────────────────────────────────
-- MENTORS (2)
-- ────────────────────────────────────────────────────────────
INSERT INTO mentors (id, user_id, expertise, experience_years, availability, topics, max_mentees, current_mentees, bio)
VALUES
  (
    'dddddddd-dddd-dddd-dddd-dddddddddd01',
    '55555555-5555-5555-5555-555555555555',
    ARRAY['System Design', 'Engineering Leadership', 'Distributed Systems', 'Career Growth', 'Interview Prep'],
    12,
    'available',
    ARRAY['How to get promoted to Staff Engineer', 'System design interview prep', 'Transitioning from IC to management', 'Building high-performing teams', 'Architecture reviews'],
    5,
    2,
    'I''ve spent 12 years building distributed systems at Amazon, Stripe, and CloudScale. Now I help engineers navigate career growth, ace system design interviews, and make the leap into leadership. I offer weekly 30-minute sessions and async code/design reviews.'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddd02',
    '33333333-3333-3333-3333-333333333333',
    ARRAY['Startup Strategy', 'Fundraising', 'Product-Market Fit', 'Pitching', 'Go-to-Market'],
    8,
    'busy',
    ARRAY['Finding product-market fit', 'How to pitch to investors', 'Building an MVP on a budget', 'Lean startup methodology', 'First-time founder advice'],
    3,
    3,
    'Founded and exited a sustainability SaaS startup. Currently building GreenLoop. I mentor first-time founders on finding PMF, fundraising, and building lean MVPs. Currently at capacity but feel free to join the waitlist.'
  );

-- ────────────────────────────────────────────────────────────
-- APPLICATIONS (sample)
-- ────────────────────────────────────────────────────────────
INSERT INTO applications (opportunity_id, applicant_id, cover_note, status)
VALUES
  (
    'aaaa0001-0001-0001-0001-000000000001',
    '11111111-1111-1111-1111-111111111111',
    'Hi! I''m a recent CS graduate with strong React and TypeScript skills. I built several projects during my internship at TechCorp and contribute to open-source React libraries. I''d love to bring my passion for clean, accessible UI to your team.',
    'reviewing'
  ),
  (
    'aaaa0001-0001-0001-0001-000000000002',
    '22222222-2222-2222-2222-222222222222',
    'With 2 years of experience in ML and data analytics, I''m excited about this opportunity. I''ve built predictive models for financial services and have strong skills in Python, TensorFlow, and SQL. I''d love to discuss how I can contribute.',
    'shortlisted'
  ),
  (
    'aaaa0001-0001-0001-0001-000000000005',
    '11111111-1111-1111-1111-111111111111',
    'I''d love to participate in the AI for Good Hackathon! I have experience with Python and ML basics, and I''m passionate about using technology to solve social challenges.',
    'pending'
  ),
  (
    'aaaa0001-0001-0001-0001-000000000007',
    '11111111-1111-1111-1111-111111111111',
    'I''m very interested in the co-founder role at SkillSwap. While I''m primarily a frontend developer, I''ve been learning product management and have experience with community building through open-source projects.',
    'pending'
  ),
  (
    'aaaa0001-0001-0001-0001-000000000008',
    '22222222-2222-2222-2222-222222222222',
    'Although my background is in data science, I have solid Node.js and PostgreSQL skills from personal projects. I''d welcome the chance to deepen my backend engineering skills through this internship.',
    'pending'
  );

-- ────────────────────────────────────────────────────────────
-- SAVED OPPORTUNITIES
-- ────────────────────────────────────────────────────────────
INSERT INTO saved_opportunities (user_id, opportunity_id)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'aaaa0001-0001-0001-0001-000000000002'),
  ('11111111-1111-1111-1111-111111111111', 'aaaa0001-0001-0001-0001-000000000006'),
  ('22222222-2222-2222-2222-222222222222', 'aaaa0001-0001-0001-0001-000000000001'),
  ('22222222-2222-2222-2222-222222222222', 'aaaa0001-0001-0001-0001-000000000005'),
  ('66666666-6666-6666-6666-666666666666', 'aaaa0001-0001-0001-0001-000000000004');

-- ────────────────────────────────────────────────────────────
-- COLLABORATION REQUESTS
-- ────────────────────────────────────────────────────────────
INSERT INTO collaboration_requests (startup_id, requester_id, message, skills_offered, status)
VALUES
  (
    'cccccccc-cccc-cccc-cccc-cccccccccc01',
    '11111111-1111-1111-1111-111111111111',
    'Hi Sara! I love what you''re building with GreenLoop. I''m a frontend developer with strong React skills and would love to help build the marketplace UI. Sustainability is one of my passions!',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    'accepted'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccc02',
    '22222222-2222-2222-2222-222222222222',
    'Hey Alex! SkillSwap sounds amazing. I could help integrate data analytics and recommendation algorithms to improve skill matching. I have experience with Python ML pipelines.',
    ARRAY['Python', 'Machine Learning', 'Data Analytics', 'SQL'],
    'pending'
  );

-- ────────────────────────────────────────────────────────────
-- MENTORSHIP REQUESTS
-- ────────────────────────────────────────────────────────────
INSERT INTO mentorship_requests (mentor_id, requester_id, message, topic, requested_time, status)
VALUES
  (
    'dddddddd-dddd-dddd-dddd-dddddddddd01',
    '11111111-1111-1111-1111-111111111111',
    'Hi Elena! I''m an entry-level frontend developer looking to grow into a senior role. I''d love your guidance on system design thinking and how to eventually transition into engineering leadership.',
    'Career Growth & System Design',
    NOW() + INTERVAL '7 days',
    'accepted'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddd01',
    '22222222-2222-2222-2222-222222222222',
    'Hello! I''m preparing for system design interviews for senior data scientist positions. Would love to get your feedback on my approach to designing ML pipelines at scale.',
    'System Design Interview Prep',
    NOW() + INTERVAL '10 days',
    'pending'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddd02',
    '66666666-6666-6666-6666-666666666666',
    'Hi Sara! I''m building SkillSwap and struggling with finding product-market fit. Would love to learn from your experience with WasteNot. How did you know you had PMF?',
    'Finding Product-Market Fit',
    NOW() + INTERVAL '14 days',
    'accepted'
  );

-- ────────────────────────────────────────────────────────────
-- POSTS (5 community posts)
-- ────────────────────────────────────────────────────────────
INSERT INTO posts (id, author_id, title, content, category, likes_count, comments_count)
VALUES
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee01',
    '11111111-1111-1111-1111-111111111111',
    '[Demo] My journey from bootcamp to first dev job — tips that actually helped',
    'After 6 months of intense self-study and a coding bootcamp, I finally landed my first frontend developer internship. Here are the things that actually made a difference:

1. **Build real projects, not tutorials** — I built 3 full apps (a task manager, a recipe finder, and a portfolio site) that I could demo in interviews.
2. **Contribute to open source** — Even small PRs to docs or fixing typos got me noticed. I eventually contributed a real feature to a React component library.
3. **Network authentically** — I joined Twitter/X dev communities and genuinely engaged with people''s work. Two of my interviews came from connections I made online.
4. **Practice system design early** — Even as a junior, understanding how frontend apps scale impressed interviewers.
5. **Don''t neglect soft skills** — Communication and teamwork were asked about in every interview.

Hope this helps someone else on the journey! Happy to answer questions. 🚀',
    'resource',
    24,
    8
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee02',
    '33333333-3333-3333-3333-333333333333',
    '[Demo] Looking for a technical co-founder — GreenLoop (Sustainability SaaS)',
    'Hey Nexora community! 👋

I''m Sara, founder of GreenLoop — a B2B marketplace for circular economy material exchange. We''re at the early traction stage with 15 pilot businesses and growing.

**What I''m looking for:**
- A technical co-founder (CTO) who can own the engineering vision
- Strong backend skills (Node.js, PostgreSQL, or similar)
- Passionate about sustainability / climate tech
- Willing to start with equity, transitioning to salary after Series A

**What I bring:**
- Product & business strategy (MBA, Stanford)
- Previous exit (WasteNot, food-waste SaaS)
- Active investor pipeline

DM me or check out the opportunity listing on my profile. Let''s build something that matters! 🌍',
    'collaboration',
    18,
    5
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee03',
    '55555555-5555-5555-5555-555555555555',
    '[Demo] System Design Interview Cheat Sheet — from someone who''s been on both sides',
    'After conducting 200+ system design interviews and taking a few myself, here''s my condensed cheat sheet:

**The Framework (use this every time):**
1. **Clarify requirements** (5 min) — Ask about scale, features, constraints
2. **High-level design** (10 min) — Draw the main components
3. **Deep dive** (15 min) — Pick 2-3 components to detail
4. **Trade-offs & scaling** (5 min) — Discuss bottlenecks and alternatives

**Common patterns:**
- Load balancing → consistent hashing for distributed caches
- Database → read replicas for read-heavy, sharding for write-heavy
- Async processing → message queues (SQS, Kafka)
- Caching → Redis/Memcached with TTL and cache invalidation strategy

**#1 mistake I see:** Jumping into the solution without understanding requirements. Always spend the first 5 minutes asking questions.

Bookmark this and refer to it before your next interview! 💪',
    'resource',
    42,
    12
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee04',
    '66666666-6666-6666-6666-666666666666',
    '[Demo] Show & Tell: SkillSwap MVP — peer-to-peer skill exchange platform',
    'Excited to share what I''ve been building! 🎉

**SkillSwap** is a peer-to-peer skill exchange platform where you trade skills instead of money. Teach someone React for 1 hour → earn 1 credit → use it to learn guitar.

**Current features (MVP):**
- Skill matching algorithm
- Time-credit system
- Built-in scheduling with calendar integration
- Video call rooms (WebRTC)
- Skill verification via peer reviews

**Tech stack:** Next.js, TypeScript, PostgreSQL, Prisma, Stripe (for premium), WebRTC

**Traction:** 200 beta users, 150+ skill exchanges completed

I''d love feedback on the concept and any ideas for growth! Also looking for a co-founder with product/marketing skills. Check the listing on my profile. 🙌',
    'showcase',
    31,
    9
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeee05',
    '22222222-2222-2222-2222-222222222222',
    '[Demo] Discussion: Is a master''s degree still worth it for data science in 2025?',
    'I recently completed my M.Sc in Data Science and I''m reflecting on whether it was worth the investment. Here are my honest thoughts:

**Pros:**
- Structured learning in statistics, ML theory, and research methodology
- Access to academic labs and research projects (my NLP research led to a publication)
- University career fairs and alumni network opened doors
- Some senior roles still list it as a requirement

**Cons:**
- 2 years of opportunity cost (could have been working and learning on the job)
- Expensive — even with a scholarship, it cost significant money
- Many of the practical skills (Python, SQL, tools) I learned outside of class
- Bootcamps and self-study can cover 80% of what you need

**My verdict:** It depends on your goals. For research-heavy or academic-adjacent roles, yes. For applied data science, a strong portfolio + experience might be enough.

What do you all think? Would love to hear different perspectives! 💬',
    'discussion',
    15,
    6
  );

-- ────────────────────────────────────────────────────────────
-- COMMENTS (sample)
-- ────────────────────────────────────────────────────────────
INSERT INTO comments (post_id, author_id, content)
VALUES
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee01', '22222222-2222-2222-2222-222222222222', 'Great tips, Priya! The open-source contribution advice resonates with me — it''s how I got noticed too. Congrats on the internship! 🎉'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee01', '55555555-5555-5555-5555-555555555555', 'Solid advice. I''d add: don''t underestimate the power of writing about what you learn. Blog posts and tech articles are a great way to demonstrate expertise and build your personal brand.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee02', '66666666-6666-6666-6666-666666666666', 'This sounds like an amazing opportunity, Sara! GreenLoop''s mission is inspiring. I''m currently building my own startup but if timing aligns in the future, I''d love to chat.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee03', '11111111-1111-1111-1111-111111111111', 'This is incredibly helpful! Bookmarked. The framework approach is exactly what I needed — I always get overwhelmed trying to design everything at once.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee03', '22222222-2222-2222-2222-222222222222', 'Great resource, Elena! For data-intensive systems, would you recommend starting with the data model or the API layer when discussing the design?'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee04', '11111111-1111-1111-1111-111111111111', 'Love the concept, Alex! The time-credit system is clever. Have you thought about adding skill trees or learning paths to gamify the experience?'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee05', '55555555-5555-5555-5555-555555555555', 'As someone who hires data scientists, I''ll say this: a degree opens doors, but your portfolio and practical skills are what close the deal. The best candidates I''ve hired had a mix of formal education and real-world projects.'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeee05', '33333333-3333-3333-3333-333333333333', 'From a startup perspective, I care more about what you can build than your credentials. Show me a cool project with real data and you''re hired. Degrees are just a signal.');

-- ────────────────────────────────────────────────────────────
-- NOTIFICATIONS (sample)
-- ────────────────────────────────────────────────────────────
INSERT INTO notifications (user_id, title, message, type, link, is_read)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Application Update', 'Your application for "Frontend Developer — React & TypeScript" is now being reviewed.', 'application', '/opportunities/aaaa0001-0001-0001-0001-000000000001', true),
  ('11111111-1111-1111-1111-111111111111', 'Collaboration Accepted!', 'Sara Chen accepted your collaboration request for GreenLoop. Welcome to the team!', 'collaboration', '/startups/cccccccc-cccc-cccc-cccc-cccccccccc01', false),
  ('11111111-1111-1111-1111-111111111111', 'Mentorship Session Confirmed', 'Elena Rodriguez accepted your mentorship request. Session scheduled for next week.', 'mentorship', '/mentors', false),
  ('22222222-2222-2222-2222-222222222222', 'Application Shortlisted!', 'Congratulations! Your application for "Data Scientist — ML & Analytics" has been shortlisted.', 'success', '/opportunities/aaaa0001-0001-0001-0001-000000000002', false),
  ('33333333-3333-3333-3333-333333333333', 'New Collaboration Request', 'Priya Sharma wants to join GreenLoop as a frontend developer.', 'collaboration', '/startups/cccccccc-cccc-cccc-cccc-cccccccccc01', true),
  ('66666666-6666-6666-6666-666666666666', 'New Application', 'You have a new application for "Co-Founder Wanted — SkillSwap EdTech Platform".', 'application', '/opportunities/aaaa0001-0001-0001-0001-000000000007', false),
  ('55555555-5555-5555-5555-555555555555', 'New Mentorship Request', 'James Okonkwo has requested mentorship on "System Design Interview Prep".', 'mentorship', '/mentors', false);

-- ============================================================
-- SEED DATA COMPLETE ✓
-- 6 profiles, 2 organizations, 8 opportunities, 3 startups,
-- 2 mentors, 5 posts, 8 comments, 5 applications,
-- 5 saved opportunities, 2 collaboration requests,
-- 3 mentorship requests, 7 notifications
-- ============================================================

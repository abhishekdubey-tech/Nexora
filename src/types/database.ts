export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: string;
          headline: string;
          bio: string;
          location: string;
          education: string;
          experience: string;
          skills: string[];
          interests: string[];
          career_goals: string;
          work_preference: string;
          experience_level: string;
          portfolio_url: string;
          linkedin_url: string;
          github_url: string;
          avatar_url: string;
          is_public: boolean;
          email_verified: boolean;
          profile_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      organizations: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string;
          website: string;
          industry: string;
          logo_url: string;
          verification_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['organizations']['Row']>;
        Update: Partial<Database['public']['Tables']['organizations']['Row']>;
      };
      opportunities: {
        Row: {
          id: string;
          organization_id: string | null;
          posted_by: string;
          title: string;
          description: string;
          type: string;
          required_skills: string[];
          work_mode: string;
          location: string;
          experience_level: string;
          compensation: string;
          compensation_type: string;
          deadline: string | null;
          status: string;
          application_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['opportunities']['Row']>;
        Update: Partial<Database['public']['Tables']['opportunities']['Row']>;
      };
      applications: {
        Row: {
          id: string;
          opportunity_id: string;
          applicant_id: string;
          cover_note: string;
          resume_url: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['applications']['Row']>;
        Update: Partial<Database['public']['Tables']['applications']['Row']>;
      };
      saved_opportunities: {
        Row: {
          id: string;
          user_id: string;
          opportunity_id: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['saved_opportunities']['Row']>;
        Update: Partial<Database['public']['Tables']['saved_opportunities']['Row']>;
      };
      startups: {
        Row: {
          id: string;
          founder_id: string;
          name: string;
          tagline: string;
          problem: string;
          solution: string;
          target_audience: string;
          industry: string;
          business_model: string;
          stage: string;
          required_skills: string[];
          team_size: number;
          funding_status: string;
          website_url: string;
          pitch_deck_url: string;
          status: string;
          has_problem: boolean;
          has_target_users: boolean;
          has_solution: boolean;
          has_market_research: boolean;
          has_prototype: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['startups']['Row']>;
        Update: Partial<Database['public']['Tables']['startups']['Row']>;
      };
      collaboration_requests: {
        Row: {
          id: string;
          startup_id: string;
          requester_id: string;
          message: string;
          skills_offered: string[];
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['collaboration_requests']['Row']>;
        Update: Partial<Database['public']['Tables']['collaboration_requests']['Row']>;
      };
      mentors: {
        Row: {
          id: string;
          user_id: string;
          expertise: string[];
          experience_years: number;
          availability: string;
          topics: string[];
          max_mentees: number;
          current_mentees: number;
          bio: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['mentors']['Row']>;
        Update: Partial<Database['public']['Tables']['mentors']['Row']>;
      };
      mentorship_requests: {
        Row: {
          id: string;
          mentor_id: string;
          requester_id: string;
          message: string;
          topic: string;
          requested_time: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['mentorship_requests']['Row']>;
        Update: Partial<Database['public']['Tables']['mentorship_requests']['Row']>;
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          content: string;
          category: string;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database['public']['Tables']['posts']['Row']>;
        Update: Partial<Database['public']['Tables']['posts']['Row']>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['comments']['Row']>;
        Update: Partial<Database['public']['Tables']['comments']['Row']>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          link: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['notifications']['Row']>;
        Update: Partial<Database['public']['Tables']['notifications']['Row']>;
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          target_type: string;
          target_id: string;
          reason: string;
          details: string;
          status: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['reports']['Row']>;
        Update: Partial<Database['public']['Tables']['reports']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

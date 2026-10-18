/**
 * Opportunity Matching Algorithm for Nexora
 * 
 * Transparent scoring system that ranks opportunities based on:
 * - Skills match: 40%
 * - User interests: 25%
 * - Career goals: 20%
 * - Location & work preferences: 10%
 * - Experience level: 5%
 * 
 * Scores are normalized to 0-100 and include human-readable explanations.
 * This is a simple, honest algorithm — not AI/ML.
 */

import type { Profile, Opportunity, MatchScore } from '../types';

const WEIGHTS = {
  skills: 0.40,
  interests: 0.25,
  career_goals: 0.20,
  location: 0.10,
  experience: 0.05,
};

/**
 * Calculate how many items from array A appear in array B (case-insensitive)
 */
function arrayOverlap(a: string[], b: string[]): { matched: string[]; total: number; score: number } {
  const normalizedB = b.map(s => s.toLowerCase().trim());
  const matched = a.filter(skill => 
    normalizedB.some(bSkill => 
      bSkill.includes(skill.toLowerCase().trim()) || 
      skill.toLowerCase().trim().includes(bSkill)
    )
  );
  const score = a.length > 0 ? (matched.length / a.length) * 100 : 0;
  return { matched, total: a.length, score };
}

/**
 * Check if a text contains any of the given keywords
 */
function textContainsKeywords(text: string, keywords: string[]): { matched: string[]; score: number } {
  const normalizedText = text.toLowerCase();
  const matched = keywords.filter(k => normalizedText.includes(k.toLowerCase().trim()));
  const score = keywords.length > 0 ? (matched.length / keywords.length) * 100 : 0;
  return { matched, score };
}

/**
 * Calculate match score between a user profile and an opportunity
 */
export function calculateMatchScore(profile: Profile, opportunity: Opportunity): MatchScore {
  const reasons: string[] = [];

  // 1. Skills Match (40%)
  const skillsResult = arrayOverlap(opportunity.required_skills, profile.skills);
  const skillsScore = skillsResult.score;
  
  if (skillsResult.matched.length > 0) {
    reasons.push(
      `Your ${skillsResult.matched.join(', ')} skill${skillsResult.matched.length > 1 ? 's' : ''} match${skillsResult.matched.length === 1 ? 'es' : ''} the requirements`
    );
  } else if (opportunity.required_skills.length > 0) {
    reasons.push('Your skills don\'t directly match the listed requirements — but you might still be a great fit');
  }

  // 2. Interests Match (25%)
  const interestKeywords = [
    ...profile.interests,
    ...(opportunity.type === 'hackathon' ? ['competition', 'hackathon'] : []),
    ...(opportunity.type === 'internship' ? ['learning', 'growth'] : []),
    ...(opportunity.type === 'startup_role' || opportunity.type === 'cofounder' ? ['startup', 'entrepreneurship'] : []),
  ];
  
  const interestsInDesc = textContainsKeywords(
    `${opportunity.title} ${opportunity.description} ${opportunity.type}`,
    interestKeywords
  );
  const interestsScore = Math.min(interestsInDesc.score * 1.5, 100); // Boost since interests are broad
  
  if (interestsInDesc.matched.length > 0) {
    reasons.push(
      `Aligns with your interest in ${interestsInDesc.matched.slice(0, 3).join(', ')}`
    );
  }

  // 3. Career Goals Match (20%)
  let careerGoalsScore = 0;
  if (profile.career_goals) {
    const goalKeywords = profile.career_goals.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const goalMatch = textContainsKeywords(
      `${opportunity.title} ${opportunity.description}`,
      goalKeywords
    );
    careerGoalsScore = Math.min(goalMatch.score * 2, 100);
    
    if (careerGoalsScore > 30) {
      reasons.push('This opportunity aligns with your career goals');
    }
  } else {
    // Fallback: give partial score based on opportunity type relevance
    const roleTypeMap: Record<string, string[]> = {
      job_seeker: ['job', 'internship', 'freelance'],
      entrepreneur: ['cofounder', 'startup_role', 'hackathon'],
      recruiter: [],
      mentor: [],
    };
    if (roleTypeMap[profile.role]?.includes(opportunity.type)) {
      careerGoalsScore = 50;
      reasons.push(`This ${opportunity.type.replace('_', ' ')} matches your profile type`);
    }
  }

  // 4. Location & Work Preferences (10%)
  let locationScore = 0;
  if (opportunity.work_mode === 'remote') {
    locationScore = profile.work_preference === 'remote' ? 100 : 70;
    if (profile.work_preference === 'remote') {
      reasons.push('This is a remote role, matching your preference');
    }
  } else if (opportunity.work_mode === profile.work_preference) {
    locationScore = 100;
    reasons.push(`Work mode (${opportunity.work_mode}) matches your preference`);
  } else if (opportunity.work_mode === 'hybrid') {
    locationScore = 60;
  } else {
    // Check location match
    if (profile.location && opportunity.location) {
      const profileLoc = profile.location.toLowerCase();
      const oppLoc = opportunity.location.toLowerCase();
      if (profileLoc.includes(oppLoc) || oppLoc.includes(profileLoc)) {
        locationScore = 90;
        reasons.push(`Located in ${opportunity.location}, near your location`);
      } else {
        locationScore = 20;
      }
    } else {
      locationScore = 30;
    }
  }

  // 5. Experience Level Match (5%)
  let experienceScore = 0;
  if (opportunity.experience_level === 'any') {
    experienceScore = 100;
  } else if (opportunity.experience_level === profile.experience_level) {
    experienceScore = 100;
    reasons.push(`Your experience level matches the ${opportunity.experience_level}-level requirement`);
  } else {
    const levels = ['entry', 'mid', 'senior', 'lead'];
    const userIdx = levels.indexOf(profile.experience_level);
    const oppIdx = levels.indexOf(opportunity.experience_level);
    const diff = Math.abs(userIdx - oppIdx);
    experienceScore = diff === 1 ? 60 : diff === 2 ? 30 : 10;
  }

  // Calculate weighted overall score
  const overall = Math.round(
    skillsScore * WEIGHTS.skills +
    interestsScore * WEIGHTS.interests +
    careerGoalsScore * WEIGHTS.career_goals +
    locationScore * WEIGHTS.location +
    experienceScore * WEIGHTS.experience
  );

  // Add fallback reason if profile is incomplete
  if (reasons.length === 0) {
    reasons.push('Complete your profile to get more accurate match scores');
  }

  return {
    overall: Math.min(overall, 100),
    skills_match: Math.round(skillsScore),
    interests_match: Math.round(interestsScore),
    career_goals_match: Math.round(careerGoalsScore),
    location_match: Math.round(locationScore),
    experience_match: Math.round(experienceScore),
    reasons,
  };
}

/**
 * Get a human-readable match summary
 */
export function getMatchSummary(score: MatchScore): string {
  const { overall, reasons } = score;
  const topReasons = reasons.slice(0, 3).join(', ');
  
  if (overall >= 80) {
    return `${overall}% match — Strong fit! ${topReasons}.`;
  } else if (overall >= 60) {
    return `${overall}% match — Good potential. ${topReasons}.`;
  } else if (overall >= 40) {
    return `${overall}% match — Partial match. ${topReasons}.`;
  } else {
    return `${overall}% match — ${topReasons}.`;
  }
}

/**
 * Sort opportunities by match score for a given profile
 */
export function rankOpportunities(
  profile: Profile,
  opportunities: Opportunity[]
): (Opportunity & { match_score: number; match_reasons: string[] })[] {
  return opportunities
    .map(opp => {
      const score = calculateMatchScore(profile, opp);
      return {
        ...opp,
        match_score: score.overall,
        match_reasons: score.reasons,
      };
    })
    .sort((a, b) => b.match_score - a.match_score);
}

/**
 * Get the match score color based on percentage
 */
export function getMatchColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-teal-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-gray-500';
}

export function getMatchBgColor(score: number): string {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-teal-100 text-teal-800';
  if (score >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-gray-100 text-gray-600';
}

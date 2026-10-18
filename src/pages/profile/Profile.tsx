import React, { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Pencil,
  Save,
  X,
  MapPin,
  FileText,
  Tag,
  Target,
  Briefcase,
  Globe,
  Github,
  Linkedin,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Editable fields
  const [headline, setHeadline] = useState(profile?.headline || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [location, setLocation] = useState(profile?.location || '');
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [interests, setInterests] = useState<string[]>(profile?.interests || []);
  const [careerGoals, setCareerGoals] = useState(profile?.career_goals || '');
  const [workPreference, setWorkPreference] = useState(profile?.work_preference || '');
  const [experienceLevel, setExperienceLevel] = useState(profile?.experience_level || '');
  const [portfolioUrl, setPortfolioUrl] = useState(profile?.portfolio_url || '');
  const [linkedinUrl, setLinkedinUrl] = useState(profile?.linkedin_url || '');
  const [githubUrl, setGithubUrl] = useState(profile?.github_url || '');

  // Tag input states
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  // Profile completion
  const completion = useMemo(() => {
    const fields = [
      headline,
      bio,
      location,
      skills.length > 0,
      interests.length > 0,
      careerGoals,
      workPreference,
      experienceLevel,
      portfolioUrl,
      linkedinUrl,
      githubUrl,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [
    headline,
    bio,
    location,
    skills,
    interests,
    careerGoals,
    workPreference,
    experienceLevel,
    portfolioUrl,
    linkedinUrl,
    githubUrl,
  ]);

  const handleEdit = () => {
    // Sync from profile
    setHeadline(profile?.headline || '');
    setBio(profile?.bio || '');
    setLocation(profile?.location || '');
    setSkills(profile?.skills || []);
    setInterests(profile?.interests || []);
    setCareerGoals(profile?.career_goals || '');
    setWorkPreference(profile?.work_preference || '');
    setExperienceLevel(profile?.experience_level || '');
    setPortfolioUrl(profile?.portfolio_url || '');
    setLinkedinUrl(profile?.linkedin_url || '');
    setGithubUrl(profile?.github_url || '');
    setEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditing(false);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateProfile({
        headline: headline.trim(),
        bio: bio.trim(),
        location: location.trim(),
        skills,
        interests,
        career_goals: careerGoals.trim(),
        work_preference: (workPreference || 'remote') as any,
        experience_level: (experienceLevel || 'entry') as any,
        portfolio_url: portfolioUrl.trim(),
        linkedin_url: linkedinUrl.trim(),
        github_url: githubUrl.trim(),
      });
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  const addTag = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput('');
  };

  const removeTag = (
    tag: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(value, list, setList, setInput);
    }
  };

  const displayName = profile?.full_name || user?.email || 'User';
  const displayRole = profile?.role
    ? profile.role.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
    : 'Member';

  const completionColor =
    completion >= 80
      ? 'text-green-400'
      : completion >= 50
      ? 'text-amber-400'
      : 'text-red-400';

  const completionBg =
    completion >= 80
      ? 'from-green-400 to-green-500'
      : completion >= 50
      ? 'from-amber-400 to-amber-500'
      : 'from-red-400 to-red-500';

  const renderLinkItem = (
    label: string,
    url: string,
    icon: React.FC<{ className?: string }>
  ) => {
    const Icon = icon;
    if (!url) return null;
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-teal-500/40 hover:bg-slate-800 transition-all group"
      >
        <Icon className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors" />
        <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate flex-1">
          {url}
        </span>
        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-teal-400 transition-colors flex-shrink-0" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Messages */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-start gap-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl px-4 py-3 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Profile header card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {displayName}
                </h1>
                <p className="text-teal-400 text-sm font-medium">
                  {displayRole}
                </p>
                {(editing ? headline : profile?.headline) && (
                  <p className="text-slate-400 text-sm mt-1">
                    {editing ? headline : profile?.headline}
                  </p>
                )}
                {(editing ? location : profile?.location) && (
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{editing ? location : profile?.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Edit / Save buttons */}
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/20 transition-all disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-all"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Completion indicator */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">
                Profile Completion
              </span>
              <span className={`text-sm font-bold ${completionColor}`}>
                {completion}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${completionBg} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bio card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-semibold text-white">About</h2>
            </div>
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="Your headline..."
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-300 text-sm leading-relaxed">
                {profile?.bio || (
                  <span className="text-slate-600 italic">
                    No bio added yet.
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Skills card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Skills</h2>
            </div>
            {editing ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/15 text-teal-300 rounded-full text-sm border border-teal-500/30"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeTag(skill, skills, setSkills)}
                        className="hover:text-teal-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) =>
                    handleTagKeyDown(e, skillInput, skills, setSkills, setSkillInput)
                  }
                  placeholder="Type a skill and press Enter"
                  className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || []).length > 0 ? (
                  (profile?.skills || []).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-teal-500/10 text-teal-300 rounded-full text-sm border border-teal-500/20"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-600 italic text-sm">
                    No skills added yet.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Interests card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">Interests</h2>
            </div>
            {editing ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/15 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() =>
                          removeTag(interest, interests, setInterests)
                        }
                        className="hover:text-purple-100"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) =>
                    handleTagKeyDown(
                      e,
                      interestInput,
                      interests,
                      setInterests,
                      setInterestInput
                    )
                  }
                  placeholder="Type an interest and press Enter"
                  className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(profile?.interests || []).length > 0 ? (
                  (profile?.interests || []).map((interest: string) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm border border-purple-500/20"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-600 italic text-sm">
                    No interests added yet.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Career card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-teal-400" />
              <h2 className="text-lg font-semibold text-white">Career</h2>
            </div>
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Career Goals
                  </label>
                  <textarea
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    placeholder="What are you working towards?"
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Work Preference
                  </label>
                  <select
                    value={workPreference}
                    onChange={(e) => setWorkPreference(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none"
                  >
                    <option value="" className="bg-slate-800">
                      Select...
                    </option>
                    <option value="remote" className="bg-slate-800">
                      Remote
                    </option>
                    <option value="onsite" className="bg-slate-800">
                      On-site
                    </option>
                    <option value="hybrid" className="bg-slate-800">
                      Hybrid
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none"
                  >
                    <option value="" className="bg-slate-800">
                      Select...
                    </option>
                    <option value="student" className="bg-slate-800">
                      Student / Beginner
                    </option>
                    <option value="junior" className="bg-slate-800">
                      Junior (0-2 years)
                    </option>
                    <option value="mid" className="bg-slate-800">
                      Mid-level (2-5 years)
                    </option>
                    <option value="senior" className="bg-slate-800">
                      Senior (5+ years)
                    </option>
                    <option value="lead" className="bg-slate-800">
                      Lead / Manager
                    </option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {profile?.career_goals ? (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {profile.career_goals}
                  </p>
                ) : (
                  <p className="text-slate-600 italic text-sm">
                    No career goals added yet.
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {profile?.work_preference && (
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs border border-slate-700">
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      {profile.work_preference.charAt(0).toUpperCase() +
                        profile.work_preference.slice(1)}
                    </span>
                  )}
                  {profile?.experience_level && (
                    <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs border border-slate-700">
                      {profile.experience_level.charAt(0).toUpperCase() +
                        profile.experience_level.slice(1).replace(/_/g, ' ')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Links card - spans full width */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Links</h2>
            </div>
            {editing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://yoursite.com"
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {renderLinkItem('Portfolio', profile?.portfolio_url || '', Globe)}
                {renderLinkItem('LinkedIn', profile?.linkedin_url || '', Linkedin)}
                {renderLinkItem('GitHub', profile?.github_url || '', Github)}
                {!profile?.portfolio_url &&
                  !profile?.linkedin_url &&
                  !profile?.github_url && (
                    <p className="text-slate-600 italic text-sm">
                      No links added yet.
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

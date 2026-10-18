import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  User,
  Sparkles,
  MapPin,
  FileText,
  Tag,
  Target,
  Briefcase,
  Link as LinkIcon,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Github,
  Linkedin,
  SkipForward,
} from 'lucide-react';

const STEPS = [
  { label: 'Basic Info', icon: User },
  { label: 'Skills & Interests', icon: Tag },
  { label: 'Career', icon: Target },
  { label: 'Links', icon: LinkIcon },
];

const EXPERIENCE_LEVELS = [
  { value: 'student', label: 'Student / Beginner' },
  { value: 'junior', label: 'Junior (0-2 years)' },
  { value: 'mid', label: 'Mid-level (2-5 years)' },
  { value: 'senior', label: 'Senior (5+ years)' },
  { value: 'lead', label: 'Lead / Manager' },
];

const WORK_PREFERENCES = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
];

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Basic Info
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  // Step 2: Skills & Interests
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');

  // Step 3: Career
  const [careerGoals, setCareerGoals] = useState('');
  const [workPreference, setWorkPreference] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  // Step 4: Links
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

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

  const handleKeyDown = (
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

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setError('');
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
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Failed to save profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  const renderTagInput = (
    label: string,
    placeholder: string,
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/15 text-teal-300 rounded-full text-sm border border-teal-500/30"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag, tags, setTags)}
              className="hover:text-teal-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) =>
          handleKeyDown(e, inputValue, tags, setTags, setInputValue)
        }
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
      />
      <p className="text-xs text-slate-500 mt-1">
        Press Enter to add a tag
      </p>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="headline"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Headline
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. Full-Stack Developer | Open Source Enthusiast"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself, your passions, and what you're working on..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {renderTagInput(
              'Skills',
              'e.g. React, Python, UI Design...',
              skills,
              setSkills,
              skillInput,
              setSkillInput
            )}
            {renderTagInput(
              'Interests',
              'e.g. AI, Web3, Education...',
              interests,
              setInterests,
              interestInput,
              setInterestInput
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="careerGoals"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Career Goals
              </label>
              <textarea
                id="careerGoals"
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                placeholder="What are you working towards? Where do you see yourself in the next few years?"
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="workPreference"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Work Preference
              </label>
              <select
                id="workPreference"
                value={workPreference}
                onChange={(e) => setWorkPreference(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-800">
                  Select preference...
                </option>
                {WORK_PREFERENCES.map((pref) => (
                  <option
                    key={pref.value}
                    value={pref.value}
                    className="bg-slate-800"
                  >
                    {pref.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Experience Level
              </label>
              <select
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-800">
                  Select level...
                </option>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option
                    key={level.value}
                    value={level.value}
                    className="bg-slate-800"
                  >
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="portfolioUrl"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Portfolio / Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="portfolioUrl"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="linkedinUrl"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                LinkedIn
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourname"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                GitHub
              </label>
              <div className="relative">
                <Github className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/yourname"
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Nexora</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-slate-400">
            Help us personalize your experience
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-teal-500 text-white'
                        : isActive
                        ? 'bg-teal-500/20 text-teal-400 ring-2 ring-teal-500/50'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      isActive
                        ? 'text-teal-400'
                        : isCompleted
                        ? 'text-slate-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1.5 text-right">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white mb-1">
            {STEPS[currentStep].label}
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            {currentStep === 0 &&
              'Tell us a bit about who you are.'}
            {currentStep === 1 &&
              'What are you good at? What excites you?'}
            {currentStep === 2 &&
              'Where are you headed in your career?'}
            {currentStep === 3 &&
              'Share your online presence (all optional).'}
          </p>

          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-6">
          <div>
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-xl transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
                Skip for now
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < STEPS.length - 1 && (
              <button
                type="button"
                onClick={handleSkip}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                Skip
              </button>
            )}

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/20 transition-all"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {loading ? 'Saving...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;

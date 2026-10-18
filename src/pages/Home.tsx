import { Link } from 'react-router-dom';
import {
  Search,
  Briefcase,
  Rocket,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Star,
  Sparkles,
  ChevronRight,
  Quote,
  Zap,
  Shield,
  Calendar,
} from 'lucide-react';
import {
  demoStats,
  demoOpportunities,
  demoStartups,
  getDemoMentorsWithDetails,
  demoOrganizations,
  demoProfiles,
} from '@/lib/demo-data';

// ============================================================
// TYPE BADGE COLOR MAP
// ============================================================
const typeBadgeColors: Record<string, string> = {
  job: 'bg-blue-100 text-blue-700',
  internship: 'bg-green-100 text-green-700',
  freelance: 'bg-purple-100 text-purple-700',
  hackathon: 'bg-orange-100 text-orange-700',
  startup_role: 'bg-teal-100 text-teal-700',
  cofounder: 'bg-pink-100 text-pink-700',
};

const stageBadgeColors: Record<string, string> = {
  idea: 'bg-yellow-100 text-yellow-700',
  validation: 'bg-blue-100 text-blue-700',
  mvp: 'bg-green-100 text-green-700',
  early_traction: 'bg-purple-100 text-purple-700',
  growth: 'bg-teal-100 text-teal-700',
};

// ============================================================
// TESTIMONIALS DATA (clearly marked as demo)
// ============================================================
const demoTestimonials = [
  {
    id: 1,
    name: 'Ananya Gupta',
    role: 'Software Developer at InnoTech',
    quote:
      '[Demo Testimonial] Nexora helped me find my dream internship which turned into a full-time role. The skill-matching feature connected me with opportunities I never would have found on traditional job boards.',
    avatar: 'AG',
  },
  {
    id: 2,
    name: 'James O\'Brien',
    role: 'Co-Founder, GreenLogistics',
    quote:
      '[Demo Testimonial] I found my technical co-founder through Nexora\'s startup section. The platform made it easy to connect with talented people who shared my vision for sustainable supply chains.',
    avatar: 'JO',
  },
  {
    id: 3,
    name: 'Fatima Al-Rashid',
    role: 'UX Design Lead at PixelCraft',
    quote:
      '[Demo Testimonial] The mentorship feature on Nexora was a game-changer for my career. My mentor helped me transition from graphic design to UX and land a leadership role within a year.',
    avatar: 'FA',
  },
];

// ============================================================
// HOME PAGE COMPONENT
// ============================================================
export default function Home() {
  const mentors = getDemoMentorsWithDetails();
  const featuredOpportunities = demoOpportunities.slice(0, 4);
  const trendingStartups = demoStartups.slice(0, 3);
  const recommendedMentors = mentors.slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* ============================== */}
      {/* HERO SECTION */}
      {/* ============================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 sm:py-32">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Decorative gradient blobs */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-300">
              <Sparkles className="h-4 w-4" />
              <span>Your all-in-one opportunity ecosystem</span>
            </div>

            {/* Main Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Skills. Your Ideas.{' '}
              <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                Your Next Opportunity.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Nexora connects students, entrepreneurs, recruiters, and mentors
              in one powerful ecosystem. Discover opportunities, build teams,
              and turn ideas into careers or businesses.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/opportunities"
                className="group inline-flex items-center gap-2 rounded-xl bg-teal-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-200 hover:bg-teal-400 hover:shadow-teal-500/40"
              >
                Explore Opportunities
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/startups"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-teal-500 bg-transparent px-8 py-3.5 text-base font-semibold text-teal-400 transition-all duration-200 hover:bg-teal-500/10"
              >
                <Rocket className="h-4 w-4" />
                Launch Your Startup
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mx-auto mt-12 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs, internships, startups, mentors..."
                  className="w-full rounded-2xl border border-slate-600 bg-slate-800/80 py-4 pl-12 pr-6 text-white placeholder-slate-400 backdrop-blur-sm transition-all duration-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* STATS SECTION */}
      {/* ============================== */}
      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              {
                icon: Briefcase,
                value: demoStats.opportunities,
                label: 'Opportunities',
              },
              {
                icon: Rocket,
                value: demoStats.startups,
                label: 'Active Startups',
              },
              {
                icon: Users,
                value: demoStats.members,
                label: 'Community Members',
              },
              {
                icon: Sparkles,
                value: demoStats.connections,
                label: 'Successful Connections',
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="text-3xl font-bold text-teal-600 sm:text-4xl">
                  {stat.value}+
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">
            ✦ {demoStats.label}
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/* HOW IT WORKS */}
      {/* ============================== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Three simple steps to unlock your potential
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                step: '01',
                title: 'Discover',
                description:
                  'Browse opportunities, startups, and mentors tailored to your skills and goals.',
                color: 'bg-teal-500',
              },
              {
                icon: Users,
                step: '02',
                title: 'Connect',
                description:
                  'Apply to opportunities, join startup teams, or book mentoring sessions.',
                color: 'bg-purple-500',
              },
              {
                icon: TrendingUp,
                step: '03',
                title: 'Grow',
                description:
                  'Build your career, launch your venture, and track your progress.',
                color: 'bg-teal-600',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Step Number */}
                <span className="text-5xl font-bold text-slate-100">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`mt-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color} text-white`}
                >
                  <item.icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* DUAL CAREER PATH SECTION */}
      {/* ============================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Choose Your Path
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Whether you want to land your dream job or build the next big
              thing, Nexora has you covered.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Find Employment */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Find Employment
              </h3>
              <p className="mt-4 leading-relaxed text-slate-500">
                Discover jobs, internships, freelance projects, and hackathons
                that match your skills. Build career-ready skills and get hired
                by top companies and startups.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {[
                  'Browse curated job opportunities',
                  'Apply with one click',
                  'Track your applications',
                  'Build career-ready skills',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/opportunities"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Explore Opportunities
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Build a Venture */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Build a Venture
              </h3>
              <p className="mt-4 leading-relaxed text-slate-500">
                Validate your startup idea, find co-founders, assemble a team,
                and connect with mentors who've been there. Launch your venture
                with the right support.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {[
                  'Validate your startup idea',
                  'Find technical co-founders',
                  'Connect with experienced mentors',
                  'Build and grow your team',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/startups"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Launch Your Startup
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* FEATURED OPPORTUNITIES */}
      {/* ============================== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Featured Opportunities
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Hand-picked opportunities waiting for someone like you
              </p>
            </div>
            <Link
              to="/opportunities"
              className="hidden items-center gap-1 font-semibold text-teal-600 transition-colors hover:text-teal-700 sm:flex"
            >
              View All Opportunities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Horizontal scrollable cards */}
          <div className="mt-10 flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
            {featuredOpportunities.map((opp) => {
              const org = demoOrganizations.find(
                (o) => o.id === opp.organization_id
              );
              const poster = demoProfiles.find(
                (p) => p.id === opp.posted_by
              );
              const companyName = org?.name || poster?.full_name || 'Unknown';

              return (
                <div
                  key={opp.id}
                  className="w-80 flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Type Badge + Title */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize ${typeBadgeColors[opp.type] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {opp.type.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-lg font-bold text-slate-900">
                    {opp.title}
                  </h3>

                  {/* Company & Location */}
                  <p className="mt-2 text-sm font-medium text-teal-600">
                    {companyName}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {opp.location}
                  </div>

                  {/* Skills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {opp.required_skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Compensation & Deadline */}
                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <DollarSign className="h-3.5 w-3.5 text-green-500" />
                      <span className="truncate">{opp.compensation}</span>
                    </div>
                    {opp.deadline && (
                      <div className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        Deadline:{' '}
                        {new Date(opp.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: View All link */}
          <Link
            to="/opportunities"
            className="mt-6 flex items-center gap-1 font-semibold text-teal-600 sm:hidden"
          >
            View All Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ============================== */}
      {/* TRENDING STARTUPS */}
      {/* ============================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Trending Startups
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Join innovative teams building the future
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {trendingStartups.map((startup) => {
              const founder = demoProfiles.find(
                (p) => p.id === startup.founder_id
              );
              return (
                <div
                  key={startup.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-lg font-bold text-white">
                      {startup.name.charAt(0)}
                    </div>
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize ${stageBadgeColors[startup.stage] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {startup.stage.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Name & Tagline */}
                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {startup.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {startup.tagline}
                  </p>

                  {/* Industry */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="h-4 w-4 text-slate-400" />
                    {startup.industry}
                  </div>

                  {/* Skills Needed */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {startup.required_skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {startup.required_skills.length > 3 && (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        +{startup.required_skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Team Size & CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Users className="h-4 w-4" />
                      {startup.team_size} member{startup.team_size !== 1 ? 's' : ''}
                    </div>
                    <Link
                      to="/startups"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
                    >
                      View Startup
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* RECOMMENDED MENTORS */}
      {/* ============================== */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Recommended Mentors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Learn from industry experts who want to help you grow
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {recommendedMentors.map((mentor) => {
              const profile = mentor.profile;
              const initials = profile?.full_name
                ? profile.full_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : '??';

              return (
                <div
                  key={mentor.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                >
                  {/* Avatar & Info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-xl font-bold text-white">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {profile?.full_name || 'Mentor'}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {profile?.headline || ''}
                      </p>

                      {/* Availability badge */}
                      <span
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          mentor.availability === 'available'
                            ? 'bg-green-50 text-green-700'
                            : mentor.availability === 'busy'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            mentor.availability === 'available'
                              ? 'bg-green-500'
                              : mentor.availability === 'busy'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          }`}
                        />
                        {mentor.availability === 'available'
                          ? 'Available for mentoring'
                          : mentor.availability === 'busy'
                            ? 'Limited availability'
                            : 'Unavailable'}
                      </span>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {mentor.expertise.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Experience */}
                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    {mentor.experience_years}+ years of experience
                  </div>

                  {/* CTA */}
                  <button className="mt-6 w-full rounded-xl border-2 border-purple-500 bg-transparent py-2.5 text-sm font-semibold text-purple-600 transition-all duration-200 hover:bg-purple-500 hover:text-white">
                    Request Mentoring
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* TESTIMONIALS */}
      {/* ============================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              What People Are Saying
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Hear from our community members
            </p>
            <p className="mt-2 text-xs text-slate-400">
              ✦ Demo testimonials for illustration purposes
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {demoTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:shadow-md sm:p-8"
              >
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-teal-200" />

                {/* Quote text */}
                <p className="mt-4 leading-relaxed text-slate-600">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-sm font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* CTA SECTION */}
      {/* ============================== */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        {/* Background accent */}
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Star className="mx-auto h-10 w-10 text-teal-400" />
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to find your next opportunity?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Join Nexora today and connect with opportunities, startups, and
            mentors that match your potential.
          </p>
          <Link
            to="/auth/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-500/25 transition-all duration-200 hover:bg-teal-400 hover:shadow-teal-500/40"
          >
            Get Started for Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

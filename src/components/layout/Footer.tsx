import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Github, Twitter, Linkedin, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-900">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-navy-950 font-bold shadow-md">
                <Rocket className="w-4 h-4 text-navy-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Nexora <span className="text-teal-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The unified ecosystem for entrepreneurship and employment. Bridging talented students, ambitious
              founders, forward-thinking recruiters, and dedicated mentors.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400/90 bg-navy-900/80 px-3 py-1.5 rounded-lg border border-teal-500/20 w-fit">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Transparent Matching & Verified Legitimacy</span>
            </div>
          </div>

          {/* Opportunities Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Opportunities</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/opportunities?type=job" className="hover:text-teal-400 transition-colors">
                  Full-Time Jobs
                </Link>
              </li>
              <li>
                <Link to="/opportunities?type=internship" className="hover:text-teal-400 transition-colors">
                  Internships
                </Link>
              </li>
              <li>
                <Link to="/opportunities?type=cofounder" className="hover:text-teal-400 transition-colors">
                  Co-Founder Openings
                </Link>
              </li>
              <li>
                <Link to="/opportunities?type=hackathon" className="hover:text-teal-400 transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/opportunities?type=freelance" className="hover:text-teal-400 transition-colors">
                  Freelance Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/startups" className="hover:text-teal-400 transition-colors">
                  Startup Launchpad
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="hover:text-teal-400 transition-colors">
                  Mentor Connect
                </Link>
              </li>
              <li>
                <Link to="/talent" className="hover:text-teal-400 transition-colors">
                  Talent Directory
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-teal-400 transition-colors">
                  Community Discussions
                </Link>
              </li>
              <li>
                <Link to="/startups/new" className="hover:text-teal-400 transition-colors">
                  Validate an Idea
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Project Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Hackathon Edition</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built for <span className="text-teal-300 font-semibold">HACKHIFT 2026</span> under the theme:
              <br />
              <em className="text-slate-300">Entrepreneurship & Employment</em>
            </p>
            <div className="text-[11px] bg-navy-900 border border-navy-800 p-2.5 rounded-xl text-slate-400 space-y-1">
              <span className="font-semibold text-teal-400 block">✦ Fully Functional MVP</span>
              <span>Includes live mock persistent store & Supabase SQL schema.</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Nexora Platform. All rights reserved. Sample data clearly tagged.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Verification Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

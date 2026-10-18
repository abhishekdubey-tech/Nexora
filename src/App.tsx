import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public & Discovery Pages
import Home from './pages/Home';
import OpportunityList from './pages/opportunities/OpportunityList';
import OpportunityDetail from './pages/opportunities/OpportunityDetail';
import PostOpportunity from './pages/opportunities/PostOpportunity';
import StartupList from './pages/startups/StartupList';
import StartupDetail from './pages/startups/StartupDetail';
import CreateStartup from './pages/startups/CreateStartup';
import MentorList from './pages/mentors/MentorList';
import MentorDetail from './pages/mentors/MentorDetail';
import TalentDirectory from './pages/talent/TalentDirectory';
import Community from './pages/community/Community';

// Idea-to-Income Lab
import IdeaLabDashboard from './pages/lab/IdeaLabDashboard';
import LabProjectCreate from './pages/lab/LabProjectCreate';
import LabProjectDetail from './pages/lab/LabProjectDetail';

// Auth & Onboarding
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ProfileSetup from './pages/profile/ProfileSetup';
import Profile from './pages/profile/Profile';

// Dashboard Views
import Dashboard from './pages/dashboard/Dashboard';
import Applications from './pages/dashboard/Applications';
import SavedOpportunities from './pages/dashboard/SavedOpportunities';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Standard Pages with Main Navigation */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/opportunities" element={<OpportunityList />} />
              <Route path="/opportunities/:id" element={<OpportunityDetail />} />
              <Route path="/opportunities/new" element={<PostOpportunity />} />
              <Route path="/startups" element={<StartupList />} />
              <Route path="/startups/:id" element={<StartupDetail />} />
              <Route path="/startups/new" element={<CreateStartup />} />
              <Route path="/lab" element={<IdeaLabDashboard />} />
              <Route path="/lab/new" element={<LabProjectCreate />} />
              <Route path="/lab/:id" element={<LabProjectDetail />} />
              <Route path="/mentors" element={<MentorList />} />
              <Route path="/mentors/:id" element={<MentorDetail />} />
              <Route path="/talent" element={<TalentDirectory />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />

              {/* Role-Based Authenticated Dashboards */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
                <Route path="saved" element={<SavedOpportunities />} />
              </Route>
            </Route>

            {/* Standalone Auth & Onboarding Flow */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/profile/setup" element={<ProfileSetup />} />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

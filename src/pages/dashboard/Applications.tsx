import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle2, AlertCircle, ArrowLeft, Building } from 'lucide-react';
import { demoApplications, demoOpportunities } from '../../lib/demo-data';
import Badge from '../../components/ui/Badge';

export const Applications: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const applications = demoApplications.map((app) => ({
    ...app,
    opportunity: demoOpportunities.find((o) => o.id === app.opportunity_id),
  }));

  const filtered = applications.filter((app) => {
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'shortlisted':
        return <Badge variant="teal">Shortlisted</Badge>;
      case 'reviewing':
        return <Badge variant="info">In Review</Badge>;
      case 'rejected':
        return <Badge variant="danger">Declined</Badge>;
      case 'pending':
      default:
        return <Badge variant="warning">Submitted</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-navy-900">Application Status Tracker</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates on your submitted applications across jobs, internships, and startup positions.
          </p>
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Submitted</option>
          <option value="reviewing">In Review</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-600 block">
                  {app.opportunity?.type.replace('_', ' ')}
                </span>
                <h3 className="font-bold text-sm text-navy-900 mt-0.5">
                  {app.opportunity?.title || 'Engineering Opportunity'}
                </h3>
                <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  TechNova Solutions • Applied {new Date(app.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {getStatusBadge(app.status)}
                <Link
                  to={`/opportunities/${app.opportunity_id}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  View Role
                </Link>
              </div>
            </div>

            {app.cover_note && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Your Cover Note:
                </span>
                <p className="line-clamp-2 italic">"{app.cover_note}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;

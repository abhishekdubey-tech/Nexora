import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';
import { demoSavedOpportunities, demoOpportunities } from '../../lib/demo-data';
import Badge from '../../components/ui/Badge';

export const SavedOpportunities: React.FC = () => {
  const [saved, setSaved] = useState(() => {
    return demoSavedOpportunities.map((s) => ({
      ...s,
      opp: demoOpportunities.find((o) => o.id === s.opportunity_id),
    }));
  });

  const handleRemove = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-navy-900">Saved Opportunities</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Keep track of roles and ventures you plan to apply to or follow up with.
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="font-bold text-sm text-slate-700">No saved opportunities yet</h3>
          <p className="text-xs text-slate-500">
            Click the bookmark icon on any opportunity card to save it here.
          </p>
          <Link
            to="/opportunities"
            className="inline-block px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold"
          >
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map(
            (item) =>
              item.opp && (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="teal">{item.opp.type.toUpperCase()}</Badge>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-sm text-navy-900">{item.opp.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{item.opp.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.opp.compensation || 'Open'}</span>
                    <Link
                      to={`/opportunities/${item.opp.id}`}
                      className="text-teal-600 font-bold hover:underline"
                    >
                      View & Apply →
                    </Link>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SavedOpportunities;

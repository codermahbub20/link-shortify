import React, { useState } from 'react';
import { Link2, BarChart3, TrendingUp, Copy, Check } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAppSelector } from '../../redux/hooks';
import { useGetMyUrlsQuery } from '../../redux/features/url/urlApi';

const DashboardHome: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  const {
    data: urlsData,
    isLoading,
    isError,
  } = useGetMyUrlsQuery(undefined);

  const urls = urlsData?.data || [];

  const totalClicks = urls.reduce((sum, url) => sum + (url.clickCount || 0), 0);
  const activeLinks = urls.length;
  const avgClickRate = activeLinks > 0 ? ((totalClicks / activeLinks) * 100).toFixed(1) : '0.0';

  const recentLinks = [...urls]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (shortCode: string, id: string) => {
    const shortUrl = `http://localhost:5000/${shortCode}`; // Change domain if needed
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      toast.success('Copied!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userName}</h1>
            <p className="text-sm text-gray-500 mt-1">Here's what's happening with your links today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Last 30 Days
            </button>
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Compact */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs text-green-600 font-medium">+12.5%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Total Clicks</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-100 rounded-lg">
                <Link2 className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs text-green-600 font-medium">+{activeLinks}</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{activeLinks}</p>
            <p className="text-sm text-gray-600 mt-1">Active Links</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-xs text-red-600 font-medium">-0.2%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{avgClickRate}%</p>
            <p className="text-sm text-gray-600 mt-1">Avg. Click Rate</p>
          </div>
        </div>
      </div>

      {/* Recent Activity Table - No Scroll, Compact */}
      <div className="px-6 pb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage your latest shortened URLs.</p>
            </div>
            <a href="/dashboard/my-links" className="text-indigo-600 text-sm font-medium hover:underline">
              View All →
            </a>
          </div>

          {recentLinks.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No shortened links yet.</p>
              <p className="text-gray-400 text-sm mt-1">Create your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-hidden"> {/* Prevents any horizontal scroll */}
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Original URL</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Short Link</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentLinks.map((link) => (
                    <tr key={link._id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-xs text-gray-700 max-w-xs">
                        <div className="truncate" title={link.originalUrl}>
                          {link.originalUrl}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-indigo-600">
                            short.ly/{link.shortCode}
                          </span>
                          <button
                            onClick={() => handleCopy(link.shortCode, link._id)}
                            className="p-1 rounded hover:bg-indigo-50 text-indigo-600"
                          >
                            {copiedId === link._id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">
                        {format(new Date(link.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-gray-900">
                        {link.clickCount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="text-xs text-indigo-600 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {recentLinks.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-200 text-xs text-gray-500">
              Showing {recentLinks.length} of {urls.length} links
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Components/Pages/Dashboard/DashboardHome.tsx

import React, { useState } from 'react';
import { Link2, BarChart3, TrendingUp, Copy, Check, Trash2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAppSelector } from '../../redux/hooks';
import { useDeleteUrlMutation, useGetMyUrlsQuery } from '../../redux/features/url/urlApi';


const DashboardHome: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  const {
    data: urlsData,
    isLoading,
    isError,
    refetch, // Add refetch to manually refresh data
  } = useGetMyUrlsQuery({});

  const [deleteUrl, { isLoading: isDeleting }] = useDeleteUrlMutation();

  const urls = urlsData?.data || [];

  const totalClicks = urls.reduce((sum: any, url: { clickCount: any; }) => sum + (url.clickCount || 0), 0);
  const activeLinks = urls.length;
  const avgClickRate = activeLinks > 0 ? ((totalClicks / activeLinks) * 100).toFixed(1) : '0.0';

  const recentLinks = [...urls]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<{ id: string; shortCode: string } | null>(null);

  const handleCopy = async (shortCode: string, id: string) => {
    const shortUrl = `http://localhost:5000/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      toast.success('Copied!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  const openDeleteModal = (id: string, shortCode: string) => {
    setLinkToDelete({ id, shortCode });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!linkToDelete) return;

    try {
      // Delete the URL
      await deleteUrl(linkToDelete.id).unwrap();

      // Refetch the data to update the UI
      await refetch();

      toast.success(`Link short.ly/${linkToDelete.shortCode} deleted successfully!`);

      // Close modal
      setDeleteModalOpen(false);
      setLinkToDelete(null);
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error?.data?.message || 'Failed to delete link. Please try again.');
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

      {/* Stats Cards */}
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

      {/* Recent Activity Table */}
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
            <div className="overflow-x-hidden">
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
                        <button
                          onClick={() => openDeleteModal(link._id, link.shortCode)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition disabled:opacity-50"
                          title="Delete link"
                        >
                          {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
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

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && linkToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Delete Short Link?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-indigo-600">
                short.ly/{linkToDelete.shortCode}
              </span>
              ?<br />
              <span className="text-sm text-red-600">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setLinkToDelete(null);
                }}
                disabled={isDeleting}
                className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-70 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Permanently'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
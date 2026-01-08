/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Components/Pages/Dashboard/MyLinks.tsx

import React, { useState } from 'react';
import { Copy, Check, Trash2, Loader2, ExternalLink, Link2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useGetMyUrlsQuery, useDeleteUrlMutation } from '../../../redux/features/url/urlApi';

interface ILink {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clickCount: number;
  createdAt: string;
}

const MyLinks: React.FC = () => {
  const {
    data: urlsData,
    isLoading,
    isError,
    refetch,
  } = useGetMyUrlsQuery(undefined);

  const [deleteUrl, { isLoading: isDeleting }] = useDeleteUrlMutation();

  const urls = urlsData?.data || [];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<{ id: string; shortCode: string } | null>(null);

  const handleCopy = async (shortCode: string, id: string) => {
    const fullUrl = `http://localhost:5000/${shortCode}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      toast.success('Short URL copied!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const openDeleteModal = (id: string, shortCode: string) => {
    setLinkToDelete({ id, shortCode });
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!linkToDelete) return;

    try {
      await deleteUrl(linkToDelete.id).unwrap();
      
      // Immediately refetch to update UI
      await refetch();
      
      toast.success(`Link short.ly/${linkToDelete.shortCode} deleted permanently`);
      setDeleteModalOpen(false);
      setLinkToDelete(null);
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error?.data?.message || 'Failed to delete link');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-gray-500 text-lg ml-3">Loading your links...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load links</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Links</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Manage all your shortened URLs in one place.
          </p>
        </div>

        {urls.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 size={28} className="text-gray-400 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No links yet</h3>
            <p className="text-gray-500 text-sm sm:text-base">Create your first short link to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Mobile Card View */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {urls.map((link: ILink) => (
                <div key={link._id} className="p-4 hover:bg-gray-50 transition">
                  {/* Original URL */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">Original URL</p>
                    <p className="text-sm text-gray-700 truncate" title={link.originalUrl}>
                      {link.originalUrl}
                    </p>
                  </div>

                  {/* Short Code */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">Short Code</p>
                    <code className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">
                      {link.shortCode}
                    </code>
                  </div>

                  {/* Short URL with Actions */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-1">Short URL</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`http://localhost:5000/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline flex items-center gap-1 flex-1 truncate"
                      >
                        short.ly/{link.shortCode}
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => handleCopy(link.shortCode, link._id)}
                        className="p-2 rounded hover:bg-indigo-50 text-indigo-600 transition flex-shrink-0"
                        title="Copy short URL"
                      >
                        {copiedId === link._id ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Stats and Delete */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="font-medium text-gray-900">{link.clickCount} clicks</span>
                      <span>{format(new Date(link.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                    <button
                      onClick={() => openDeleteModal(link._id, link.shortCode)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition disabled:opacity-50"
                      title="Delete link"
                    >
                      {isDeleting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original URL
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short URL
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {urls.map((link: ILink) => (
                    <tr key={link._id} className="hover:bg-gray-50 transition">
                      {/* Original URL - Truncated with Tooltip */}
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-md">
                        <div className="truncate" title={link.originalUrl}>
                          {link.originalUrl}
                        </div>
                      </td>

                      {/* Short Code */}
                      <td className="px-6 py-4">
                        <code className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {link.shortCode}
                        </code>
                      </td>

                      {/* Full Short URL + Copy */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <a
                            href={`http://localhost:5000/${link.shortCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
                          >
                            short.ly/{link.shortCode}
                            <ExternalLink size={14} />
                          </a>
                          <button
                            onClick={() => handleCopy(link.shortCode, link._id)}
                            className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 transition"
                            title="Copy short URL"
                          >
                            {copiedId === link._id ? (
                              <Check size={16} className="text-green-600" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Clicks */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {link.clickCount.toLocaleString()}
                      </td>

                      {/* Created Date */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {format(new Date(link.createdAt), 'MMM d, yyyy')}
                      </td>

                      {/* Delete Action */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openDeleteModal(link._id, link.shortCode)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition disabled:opacity-50"
                          title="Delete link"
                        >
                          {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 text-sm text-gray-500 bg-gray-50">
              Total: {urls.length} link{urls.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && linkToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-6 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              Delete Short Link?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold text-indigo-600 break-all">
                short.ly/{linkToDelete.shortCode}
              </span>
              ?<br />
              <span className="text-xs sm:text-sm text-red-600">This action cannot be undone.</span>
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setLinkToDelete(null);
                }}
                disabled={isDeleting}
                className="w-full sm:w-auto px-5 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full sm:w-auto px-5 py-2.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
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

export default MyLinks;
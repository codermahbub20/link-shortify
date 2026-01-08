/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link2, Copy, Check, Loader2 } from 'lucide-react';
import { useAppSelector } from '../../../redux/hooks';
import { useCreateShortUrlMutation } from '../../../redux/features/url/urlApi';
import { toast } from 'sonner';


export const UrlShortenerSection: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortened, setShortened] = useState<{ shortUrl: string; shortCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const { token } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!token;

  const [createShortUrl, { isLoading }] = useCreateShortUrlMutation();

  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!isLoggedIn) {
      toast.error('Please login first to shorten URLs', {
        description: 'You need to be signed in to create short links.',
      });
      return;
    }

    try {
      const result = await createShortUrl({ originalUrl: originalUrl.trim() }).unwrap();

      setShortened({
        shortUrl: result.data.shortUrl,
        shortCode: result.data.shortCode,
      });

      toast.success('Short URL created successfully!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to shorten URL. Try again.');
    }
  };

  const handleCopy = async () => {
    if (!shortened) return;

    try {
      await navigator.clipboard.writeText(shortened.shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleShorten();
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* Hero Text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Shorten your links,<br />
          <span className="text-indigo-600">expand your reach.</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Shortly is the easiest way to manage your links, track your audience, 
          and boost your brand recognition with just a few clicks.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition shadow-lg">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-300 hover:bg-gray-50 transition">
            Learn More
          </button>
        </div>

        {/* URL Input Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Paste your long link here to shorten it..."
                  className="w-full pl-12 pr-4 py-4 text-gray-700 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 transition"
                />
              </div>

              <button
                onClick={handleShorten}
                disabled={isLoading}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-70 flex items-center gap-2 min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Shortening...
                  </>
                ) : (
                  'Shorten It'
                )}
              </button>
            </div>

            {/* Success Result */}
            {shortened && (
              <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
                  <div className="text-left">
                    <p className="text-sm text-green-700 font-medium">Your short link is ready!</p>
                    <a
                      href={shortened.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-mono text-lg break-all hover:underline"
                    >
                      {shortened.shortUrl}
                    </a>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md"
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlShortenerSection;
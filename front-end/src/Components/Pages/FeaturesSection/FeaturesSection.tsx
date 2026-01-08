import React from 'react';
import { Link2, BarChart3, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FeaturesAndCTASection: React.FC = () => {
  return (
    <>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: URL Shortening */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
                <Link2 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">URL Shortening</h3>
              <p className="text-gray-600 leading-relaxed">
                Create short, memorable, and powerful links in seconds. Enhance your brand's look on every platform.
              </p>
            </div>

            {/* Feature 2: Analytics */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
                <BarChart3 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track real-time clicks, geographic data, and device types to understand your audience better.
              </p>
            </div>

            {/* Feature 3: Easy Sharing */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6">
                <Share2 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Sharing</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your links instantly across social media, SMS, and email with integrated sharing tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-950">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Boost your links today
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Get started with Shortly and take your link sharing to the next level. Sign up for free and start tracking your success.
          </p>
          <Link to="/signup">
            <button className="px-10 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-full hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/30">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FeaturesAndCTASection;
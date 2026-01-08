import React from 'react';
import { Link } from 'react-router-dom';
import { Link2, Mail, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Link2 className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-white">Shortly</span>
            </div>
            <p className="text-sm text-gray-400">
              The easiest way to shorten links, track clicks, and boost your brand's reach.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © 2026 Shortly. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-indigo-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Have questions? Reach out at
              <br />
              <a href="mailto:support@shortly.app" className="text-indigo-400 hover:underline">
                support@shortly.app
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          Made with ❤️ in Bangladesh
        </div>
      </div>
    </footer>
  );
};

export default Footer;
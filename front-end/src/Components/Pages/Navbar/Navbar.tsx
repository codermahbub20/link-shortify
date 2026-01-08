/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Menu, X, User, LogOut, Home, LayoutDashboard, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logOut } from '../../../redux/features/auth/authSlice';

interface NavbarProps {
  className?: string;
}

interface User {
  name?: string;
  email?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get auth state from Redux
  const { user, token } = useAppSelector((state) => state.auth) as { user: User | null; token: string | null };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    dispatch(logOut());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className={`bg-white shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Shortly</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <Home size={18} />
              <span>Home</span>
            </a>

            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </a>

                {/* User Menu */}
                <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {user?.name || user?.email?.split('@')[0] || 'User'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center space-x-1 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center space-x-1 px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a
              href="/"
              className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition block"
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </a>

            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition block"
                >
                  <LayoutDashboard size={20} />
                  <span className="font-medium">Dashboard</span>
                </a>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3 mb-4 px-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name || user?.email?.split('@')[0] || 'User'}
                      </p>
                      {user?.email && (
                        <p className="text-xs text-gray-500">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition text-left"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition block"
                >
                  <LogIn size={20} />
                  <span className="font-medium">Login</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center space-x-3 px-4 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition block shadow-md"
                >
                  <UserPlus size={20} />
                  <span className="font-medium">Sign Up</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
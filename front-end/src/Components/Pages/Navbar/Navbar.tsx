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

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get auth state from Redux
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = !!token && !!user;

  const handleLogout = () => {
    dispatch(logOut()); // This should clear user & token from Redux
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className={`bg-white shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mini-CRM</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              <Home size={18} />
              <span>Home</span>
            </a>

            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </a>

                {/* User Menu */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name || user?.email || 'User'}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition"
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
                  className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
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
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition block"
            >
              <Home size={18} />
              <span>Home</span>
            </a>

            {isAuthenticated ? (
              <>
                <a
                  href="/dashboard"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition block"
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </a>

                <div className="px-3 py-2 border-t border-gray-200 mt-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || user?.email || 'User'}
                      </p>
                      {user?.email && (
                        <p className="text-xs text-gray-500">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition text-left"
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition block"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </a>
                <a
                  href="/signup"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition block"
                >
                  <UserPlus size={18} />
                  <span>Sign Up</span>
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
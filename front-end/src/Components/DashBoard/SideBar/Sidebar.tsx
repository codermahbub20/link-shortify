// src/components/dashboard/Sidebar.tsx
import React from 'react';
import { LayoutDashboard, Link2,  LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logOut } from '../../../redux/features/auth/authSlice';

interface User {
  name?: string;
  email?: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ← Added to highlight active link
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth) as { user?: User };

  const handleLogout = () => {
    dispatch(logOut());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Link2, label: 'My Links', path: '/dashboard/my-links' },
    // { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    // { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Determine if a menu item is active
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col overflow-y-auto">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-200">
        <Link to='/'>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Shortly</span>
        </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition group font-medium
                  ${isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
              >
                <item.icon
                  size={20}
                  className={`group-hover:text-indigo-700 ${
                    isActive(item.path) ? 'text-indigo-700' : 'text-indigo-600'
                  }`}
                />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white font-semibold text-lg">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.name || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'user@shortly.app'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useLoginMutation } from '../../../../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch } from '../../../../redux/hooks';
import { setUser } from '../../../../redux/features/auth/authSlice';
import { verifyToken } from '../../../../utils/verifyToken';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const user = verifyToken(res?.data?.token);

      dispatch(setUser({ user, token: res?.data?.token }));

      // Optional: persist token if "Remember me" is checked
      if (data.rememberMe && res?.data?.token) {
        localStorage.setItem('authToken', res.data.token); // or use secure method
      }

      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to your Mini-CRM account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-2.5 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                {...register('rememberMe')}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Lock size={12} />
            Your information is securely encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
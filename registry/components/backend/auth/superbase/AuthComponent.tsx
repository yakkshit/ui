// AuthComponent.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { createClient, Provider } from '@supabase/supabase-js';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthComponent: React.FC = () => {
  const handleOAuthLogin = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) console.error('Error: ', error.message);
  };

  const handleEmailLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.error('Error: ', error.message);
  };

  return (
      <motion.div
        className="p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleOAuthLogin('google' as Provider)}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>
          <button
            onClick={() => handleOAuthLogin('facebook' as Provider)}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <FaFacebook />
            <span>Sign in with Facebook</span>
          </button>
          <button
            onClick={() => handleOAuthLogin('github' as Provider)}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-gray-800 rounded hover:bg-gray-900"
          >
            <FaGithub />
            <span>Sign in with GitHub</span>
          </button>
          <button
            onClick={() => handleOAuthLogin('linkedin' as Provider)}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-blue-700 rounded hover:bg-blue-800"
          >
            <FaLinkedin />
            <span>Sign in with LinkedIn</span>
          </button>
          <div className="relative flex items-center justify-center">
            <span className="absolute px-2 text-gray-500 bg-white">or</span>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.target as any).email.value;
              const password = (e.target as any).password.value;
              handleEmailLogin(email, password);
            }}
            className="flex flex-col space-y-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </motion.div>
  );
};

export default AuthComponent;

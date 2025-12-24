
import React, { useState } from 'react';
import { User } from '../types';
import { PRIMARY_RED } from '../constants';

interface Props {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone.length >= 10) {
      onLogin({ name, phone });
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-8 mt-20 flex flex-col items-center">
        <div 
          className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-lg"
          style={{ backgroundColor: PRIMARY_RED }}
        >
          <span className="text-white text-4xl font-black italic">FD</span>
        </div>
        <h1 className="italic-bold-headline text-3xl mb-2">FoodieDash</h1>
        <p className="text-gray-500 text-center mb-10">Premium food delivery at your fingertips.</p>
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-[1.5rem] focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <input 
              required
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full p-4 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-[1.5rem] focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 rounded-[2.5rem] text-white font-bold text-lg shadow-xl active:scale-95 transition-transform"
            style={{ backgroundColor: PRIMARY_RED }}
          >
            Get Started
          </button>
        </form>
      </div>
      <div className="mt-auto p-8 text-center text-xs text-gray-400">
        By continuing, you agree to our Terms and Privacy Policy.
      </div>
    </div>
  );
};

export default LoginView;

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';

interface NavbarProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export default function Navbar({ users, onEditUser, onDeleteUser }: NavbarProps) {
  const { logout } = useAuth();
  const [selectedEditId, setSelectedEditId] = useState('');
  const [selectedDeleteId, setSelectedDeleteId] = useState('');

  const handleEditSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = users.find((u) => u.id === userId);
    if (user) {
      onEditUser(user);
      setSelectedEditId(''); // Reset selector
    }
  };

  const handleDeleteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = users.find((u) => u.id === userId);
    if (user) {
      onDeleteUser(user);
      setSelectedDeleteId(''); // Reset selector
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
            D
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            TestDashboard
          </span>
        </div>

        {/* Top List Menu (Edit / Delete from top bar) */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200/40 dark:border-slate-700/30">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
            เมนูด้านบน (Quick List Menu):
          </span>
          
          {/* Edit User Selector */}
          <div className="relative">
            <select
              value={selectedEditId}
              onChange={handleEditSelect}
              aria-label="เลือกผู้ใช้เพื่อแก้ไขข้อมูล"
              className="appearance-none pl-3 pr-8 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="" disabled>✏️ เลือกผู้ใช้เพื่อแก้ไข...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} (ID: {user.id})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Delete User Selector */}
          <div className="relative">
            <select
              value={selectedDeleteId}
              onChange={handleDeleteSelect}
              aria-label="เลือกผู้ใช้เพื่อลบออกจากระบบ"
              className="appearance-none pl-3 pr-8 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="" disabled>🗑️ เลือกผู้ใช้เพื่อลบ...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} (ID: {user.id})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section: Logout */}
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:text-white border border-rose-200 hover:border-rose-500 hover:bg-rose-500 dark:border-rose-900/50 dark:hover:bg-rose-600 dark:hover:border-rose-600 rounded-xl transition-all cursor-pointer shadow-sm shadow-rose-500/5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>ออกจากระบบ</span>
          </button>
        </div>

      </div>
    </nav>
  );
}

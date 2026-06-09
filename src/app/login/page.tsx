'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '@/components/ui/Toast';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({ message: 'กรุณากรอกอีเมลและรหัสผ่าน', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      setToast({ message: 'เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ...', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ', type: 'error' });
      setIsSubmitting(false);
    }
  };

  const useDemoAccount = () => {
    setEmail('eve.holt@reqres.in');
    setPassword('cityslicka');
    setToast({ message: 'กรอกบัญชีทดสอบเรียบร้อยแล้ว กดเข้าสู่ระบบได้ทันที', type: 'info' });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-50 via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-zinc-900 px-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 shadow-2xl transition-all duration-300 animate-scale-up">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent">
            ยินดีต้อนรับกลับมา
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            ลงชื่อเข้าใช้จัดการระบบสมาชิกผ่าน ReqRes API
          </p>
        </div>

        {/* Demo Alert Box */}
        <div className="mb-6 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs flex flex-col gap-2">
          <div className="flex items-center gap-1.5 font-semibold">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>การใช้งานร่วมกับ API Key</span>
          </div>
          <p>
            ระบบจะดึง API Key จากตัวแปร `REQRES_API_KEY` ในไฟล์ `src/services/api.ts` มาใช้งานโดยตรง
          </p>
          <button
            type="button"
            onClick={useDemoAccount}
            className="self-start text-xs font-bold underline hover:opacity-85 text-indigo-600 dark:text-indigo-400 cursor-pointer"
          >
            คลิกเพื่อใช้บัญชีทดสอบอัตโนมัติ
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              อีเมล (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eve.holt@reqres.in"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white/50 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
          ยังไม่มีบัญชีสมาชิก?{' '}
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            สมัครสมาชิก
          </Link>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

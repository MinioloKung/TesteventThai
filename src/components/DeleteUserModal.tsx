'use client';

import React, { useState } from 'react';
import { User } from '@/types';
import { apiService } from '@/services/api';

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (deletedUserId: number) => void;
  onError: (message: string) => void;
}

export default function DeleteUserModal({ user, isOpen, onClose, onDeleteSuccess, onError }: DeleteUserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await apiService.deleteUser(user.id);
      onDeleteSuccess(user.id);
      onClose();
    } catch (err: any) {
      onError(err.message || 'เกิดข้อผิดพลาดในการลบผู้ใช้');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <h3 className="text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>ยืนยันการลบผู้ใช้</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* User Preview */}
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-rose-50/20 dark:bg-rose-950/10 border border-rose-100/30 dark:border-rose-900/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-500/10 mb-3"
            />
            <h4 className="font-bold text-slate-800 dark:text-slate-100">
              {user.first_name} {user.last_name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {user.email} (ID: {user.id})
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/40 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            ⚠️ **คำเตือน:** การลบสมาชิกรายนี้จะยิง API ไปยังระบบหลังบ้านของ ReqRes (`DELETE /api/users/${user.id}`) เมื่อกดยืนยันแล้ว บัญชีนี้จะถูกนำออกจากรายการบนหน้าจอทันที
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/15 hover:shadow-rose-600/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'ยืนยันการลบสมาชิก'
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

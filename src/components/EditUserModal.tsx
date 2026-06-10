'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { User, UserUpdateRequest, UserUpdateResponse } from '@/types';
import { apiService } from '@/services/api';
import { getErrorMessage } from '@/utils/errors';

interface EditUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: (updatedUser: User, updatedInfo: UserUpdateResponse) => void;
  onError: (message: string) => void;
}

export default function EditUserModal({ user, isOpen, onClose, onSaveSuccess, onError }: EditUserModalProps) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('Developer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      queueMicrotask(() => {
        setName(`${user.first_name} ${user.last_name}`);
        setJob('Software Engineer');
      });
    }
  }, [user]);

  // Escape key handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !job.trim()) {
      onError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: UserUpdateRequest = { name, job };
      const response = await apiService.updateUser(user.id, payload);

      const nameParts = name.trim().split(' ');
      const first_name = nameParts[0] || '';
      const last_name = nameParts.slice(1).join(' ') || '';

      const updatedUser: User = { ...user, first_name, last_name };
      onSaveSuccess(updatedUser, response);
      onClose();
    } catch (error) {
      onError(getErrorMessage(error, 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
      className="animate-fade-in"
      style={{
        position: 'fixed', inset: 0,
        zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(29, 27, 82, 0.35)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="animate-scale-up"
        style={{
          width: '100%', maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid rgba(29,27,82,0.10)',
          boxShadow: '0 24px 64px rgba(29,27,82,0.16)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1.5px solid rgba(29,27,82,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(29,27,82,0.02)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '30px', height: '30px',
              background: '#1D1B52',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 id="edit-modal-title" style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1D1B52', margin: 0 }}>
              แก้ไขข้อมูลผู้ใช้{' '}
              <span style={{
                fontSize: '0.6875rem', fontWeight: 700,
                background: 'rgba(29,27,82,0.08)', color: 'rgba(29,27,82,0.6)',
                padding: '2px 6px', borderRadius: '5px', letterSpacing: '0.04em',
              }}>
                ID {user.id}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิด"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(29,27,82,0.35)', padding: '4px', borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
              display: 'flex', alignItems: 'center',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#1D1B52'; e.currentTarget.style.background = 'rgba(29,27,82,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(29,27,82,0.35)'; e.currentTarget.style.background = 'none'; }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {/* User preview */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem',
            background: 'rgba(29,27,82,0.03)',
            border: '1.5px solid rgba(29,27,82,0.07)',
            borderRadius: '10px',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.first_name}
              onError={(e) => {
                e.currentTarget.src = `https://i.pravatar.cc/150?img=${user.id}`;
              }}
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'rgba(29,27,82,0.45)', marginBottom: '2px' }}>
                อีเมลสมาชิก
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1D1B52' }}>{user.email}</p>
            </div>
          </div>

          <div>
            <label htmlFor="edit-name" className="label">ชื่อ - นามสกุล (Name)</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-base"
              required
            />
          </div>

          <div>
            <label htmlFor="edit-job" className="label">ตำแหน่งงาน (Job)</label>
            <input
              id="edit-job"
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="input-base"
              required
            />
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            gap: '0.625rem',
            paddingTop: '0.75rem',
            borderTop: '1.5px solid rgba(29,27,82,0.06)',
          }}>
            <button type="button" onClick={onClose} className="btn-ghost">
              ยกเลิก
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ minWidth: '100px' }}>
              {isSubmitting ? (
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.75s linear infinite',
                }} />
              ) : 'บันทึกข้อมูล'}
            </button>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

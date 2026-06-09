'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
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
          width: '100%', maxWidth: '400px',
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
          borderBottom: '1.5px solid rgba(220,38,38,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(220,38,38,0.02)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '30px', height: '30px',
              background: '#dc2626',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 id="delete-modal-title" style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#dc2626', margin: 0 }}>
              ยืนยันการลบผู้ใช้
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

        {/* Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {/* User preview */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '1.25rem',
            background: 'rgba(220,38,38,0.03)',
            border: '1.5px solid rgba(220,38,38,0.10)',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.avatar}
              alt={user.first_name}
              style={{
                width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover',
                border: '2px solid rgba(220,38,38,0.15)',
                marginBottom: '0.75rem',
              }}
            />
            <p style={{ fontWeight: 800, color: '#1D1B52', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
              {user.first_name} {user.last_name}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(29,27,82,0.45)' }}>
              {user.email}
            </p>
            <span style={{
              display: 'inline-flex', marginTop: '0.5rem',
              padding: '2px 8px',
              background: 'rgba(220,38,38,0.08)',
              color: '#dc2626',
              fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
              borderRadius: '5px',
            }}>
              ID: {user.id}
            </span>
          </div>

          {/* Warning note */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(220,38,38,0.04)',
            border: '1.5px solid rgba(220,38,38,0.10)',
            borderRadius: '10px',
            fontSize: '0.8125rem',
            color: 'rgba(29,27,82,0.6)',
            lineHeight: 1.6,
          }}>
            การดำเนินการนี้จะส่ง <code style={{ background: 'rgba(29,27,82,0.06)', padding: '1px 4px', borderRadius: '4px', fontSize: '0.75rem' }}>DELETE /api/users/{user.id}</code> ไปยัง ReqRes API และนำออกจากรายการทันที
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
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="btn-danger"
              style={{ minWidth: '120px' }}
            >
              {isSubmitting ? (
                <div style={{
                  width: '16px', height: '16px',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.75s linear infinite',
                }} />
              ) : 'ยืนยันการลบ'}
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

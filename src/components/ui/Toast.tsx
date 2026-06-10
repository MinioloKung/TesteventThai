'use client';

import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const typeConfig = {
  success: {
    bg: '#059669',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    ),
    label: 'สำเร็จ',
  },
  error: {
    bg: '#dc2626',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    label: 'ข้อผิดพลาด',
  },
  info: {
    bg: '#1D1B52',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'ข้อมูล',
  },
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const cfg = typeConfig[type];

  return (
    <div
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        role="alert"
        aria-live="assertive"
        className="animate-slide-down"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.75rem 1rem',
          background: cfg.bg,
          color: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          maxWidth: 'calc(100vw - 2rem)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ flexShrink: 0 }}>{cfg.icon}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          aria-label="ปิดการแจ้งเตือน"
          style={{
            marginLeft: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.75)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

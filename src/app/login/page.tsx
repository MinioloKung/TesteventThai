'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '@/components/ui/Toast';
import { getErrorMessage } from '@/utils/errors';

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
    } catch (error) {
      setToast({ message: getErrorMessage(error, 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'), type: 'error' });
      setIsSubmitting(false);
    }
  };

  const useDemoAccount = () => {
    setEmail('eve.holt@reqres.in');
    setPassword('cityslicka');
    setToast({ message: 'กรอกบัญชีทดสอบเรียบร้อยแล้ว กดเข้าสู่ระบบได้ทันที', type: 'info' });
  };

  return (
    <>
      {/* Full-height split layout */}
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'stretch',
          background: '#ffffff',
        }}
      >
        {/* Left decorative panel — hidden on mobile */}
        <div
          aria-hidden="true"
          style={{
            display: 'none',
            flex: '0 0 420px',
            background: 'linear-gradient(160deg, #1D1B52 0%, #2d2a7a 100%)',
            padding: '3rem 2.5rem',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}
          className="md-panel"
        >
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '320px', height: '320px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '50%',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '240px', height: '240px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '50%',
          }} />

          {/* Brand mark */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '44px', height: '44px',
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}>
              <svg width="22" height="22" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
              TestDashboard
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              ระบบจัดการผู้ใช้งาน<br />ผ่าน ReqRes API
            </p>
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              'ดูรายชื่อผู้ใช้งานทั้งหมด',
              'แก้ไขและอัปเดตข้อมูลผู้ใช้',
              'ลบผู้ใช้ออกจากระบบ',
              'ระบบแจ้งเตือนแบบ Real-time',
            ].map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <div style={{
                  width: '20px', height: '20px',
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8125rem' }}>{text}</span>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            © 2026 TestDashboard
          </p>
        </div>

        {/* Right form panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.25rem',
        }}>
          <div className="animate-scale-up" style={{ width: '100%', maxWidth: '400px' }}>

            {/* Mobile brand */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
                marginBottom: '0.5rem',
              }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: '#1D1B52',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#1D1B52' }}>
                  TestDashboard
                </span>
              </div>
              <h1 style={{
                fontSize: '1.625rem',
                fontWeight: 800,
                color: '#1D1B52',
                margin: '0 0 0.375rem',
                lineHeight: 1.2,
              }}>
                ยินดีต้อนรับ
              </h1>
              <p style={{ color: 'rgba(29,27,82,0.5)', fontSize: '0.875rem' }}>
                ลงชื่อเข้าใช้เพื่อจัดการระบบสมาชิก
              </p>
            </div>

            {/* Demo info box */}
            <div style={{
              marginBottom: '1.5rem',
              padding: '0.875rem 1rem',
              background: 'rgba(29,27,82,0.05)',
              border: '1.5px solid rgba(29,27,82,0.10)',
              borderRadius: '10px',
              fontSize: '0.8125rem',
              color: 'rgba(29,27,82,0.65)',
              lineHeight: 1.6,
            }}>
              <button
                type="button"
                onClick={useDemoAccount}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1D1B52',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                  fontFamily: 'inherit',
                }}
              >
                → ใช้บัญชีทดสอบอัตโนมัติ
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              <div>
                <label htmlFor="login-email" className="label">อีเมล (Email)</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eve.holt@reqres.in"
                  className="input-base"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="label">รหัสผ่าน (Password)</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base"
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.375rem', padding: '0.875rem 1.5rem' }}
              >
                {isSubmitting ? (
                  <div style={{
                    width: '18px', height: '18px',
                    border: '2px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    animation: 'spin 0.75s linear infinite',
                  }} />
                ) : 'เข้าสู่ระบบ'}
              </button>
            </form>

            {/* Footer */}
            <p style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'rgba(29,27,82,0.5)',
            }}>
              ยังไม่มีบัญชีสมาชิก?{' '}
              <Link href="/register" style={{ color: '#1D1B52', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Responsive styles for left panel */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .md-panel { display: flex !important; }
        }
      `}</style>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '@/components/ui/Toast';

export default function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setToast({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setToast({ message: 'รหัสผ่านไม่ตรงกัน', type: 'error' });
      return;
    }

    if (password.length < 4) {
      setToast({ message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      setToast({ message: 'สมัครสมาชิกสำเร็จ! กำลังนำคุณเข้าสู่ระบบ...', type: 'success' });
    } catch (error: any) {
      setToast({ message: error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'stretch',
        background: '#ffffff',
      }}>
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
              สมัครสมาชิก
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              สร้างบัญชีใหม่เพื่อเข้าใช้งาน<br />TestDashboard
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              'กรอกอีเมลและรหัสผ่าน',
              'ยืนยันข้อมูลการสมัคร',
              'เข้าสู่ระบบและจัดการสมาชิก',
            ].map((text, i) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '24px', height: '24px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.9)',
                }}>
                  {i + 1}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8125rem' }}>{text}</span>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
            © 2025 TestDashboard
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

            {/* Header */}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                สร้างบัญชีใหม่
              </h1>
              <p style={{ color: 'rgba(29,27,82,0.5)', fontSize: '0.875rem' }}>
                ลงทะเบียนเข้าสู่ระบบทดสอบสำหรับจัดการสมาชิก
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
              <div>
                <label htmlFor="reg-email" className="label">อีเมล (Email)</label>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@reqres.in"
                  className="input-base"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-password" className="label">รหัสผ่าน (Password)</label>
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base"
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label htmlFor="reg-confirm" className="label">ยืนยันรหัสผ่าน (Confirm Password)</label>
                <input
                  id="reg-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base"
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                id="register-submit"
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
                ) : 'สมัครสมาชิก'}
              </button>
            </form>

            {/* Footer */}
            <p style={{
              marginTop: '1.5rem',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'rgba(29,27,82,0.5)',
            }}>
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" style={{ color: '#1D1B52', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .md-panel { display: flex !important; }
        }
      `}</style>
    </>
  );
}

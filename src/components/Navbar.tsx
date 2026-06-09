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
    if (user) { onEditUser(user); setSelectedEditId(''); }
  };

  const handleDeleteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = users.find((u) => u.id === userId);
    if (user) { onDeleteUser(user); setSelectedDeleteId(''); }
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 40, width: '100%',
      background: 'rgba(255,255,255,0.94)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1.5px solid rgba(29,27,82,0.08)',
      boxShadow: '0 1px 0 rgba(29,27,82,0.04)',
    }}>
      <div style={{
        maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem',
        height: '60px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1rem',
      }}>

        {/* ── Brand ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px', background: '#1D1B52',
            borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="17" height="17" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#1D1B52', letterSpacing: '-0.01em' }}>
            TestDashboard
          </span>
        </div>

        {/* ── Bulk Actions ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.3125rem',
          background: 'rgba(29,27,82,0.04)',
          border: '1.5px solid rgba(29,27,82,0.08)',
          borderRadius: '10px',
          overflowX: 'auto',
          flexShrink: 1,
        }}>


          {/* Edit selector — styled as a solid pill-button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              id="nav-edit-select"
              value={selectedEditId}
              onChange={handleEditSelect}
              aria-label="เลือกผู้ใช้เพื่อแก้ไขข้อมูล"
              style={{
                appearance: 'none',
                width: '160px',
                textOverflow: 'ellipsis',
                paddingLeft: '1.875rem', paddingRight: '1.75rem',
                paddingTop: '0.4rem', paddingBottom: '0.4rem',
                background: '#1D1B52',
                border: 'none',
                borderRadius: '7px',
                fontSize: '0.75rem', fontWeight: 700,
                color: '#ffffff', fontFamily: 'inherit',
                cursor: 'pointer', outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <option value="" disabled style={{ background: '#fff', color: '#1D1B52' }}>
                แก้ไขผู้ใช้...
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id} style={{ background: '#fff', color: '#1D1B52' }}>
                  {user.first_name} {user.last_name} — ID {user.id}
                </option>
              ))}
            </select>
            {/* Pencil icon */}
            <div style={{
              position: 'absolute', left: '0.5625rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(255,255,255,0.75)',
            }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            {/* Chevron */}
            <div style={{
              position: 'absolute', right: '0.4375rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(255,255,255,0.6)',
            }}>
              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Delete selector — solid red */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              id="nav-delete-select"
              value={selectedDeleteId}
              onChange={handleDeleteSelect}
              aria-label="เลือกผู้ใช้เพื่อลบออกจากระบบ"
              style={{
                appearance: 'none',
                width: '160px',
                textOverflow: 'ellipsis',
                paddingLeft: '1.875rem', paddingRight: '1.75rem',
                paddingTop: '0.4rem', paddingBottom: '0.4rem',
                background: '#dc2626',
                border: 'none',
                borderRadius: '7px',
                fontSize: '0.75rem', fontWeight: 700,
                color: '#ffffff', fontFamily: 'inherit',
                cursor: 'pointer', outline: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <option value="" disabled style={{ background: '#fff', color: '#dc2626' }}>
                ลบผู้ใช้...
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id} style={{ background: '#fff', color: '#1D1B52' }}>
                  {user.first_name} {user.last_name} — ID {user.id}
                </option>
              ))}
            </select>
            {/* Trash icon */}
            <div style={{
              position: 'absolute', left: '0.5625rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(255,255,255,0.75)',
            }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            {/* Chevron */}
            <div style={{
              position: 'absolute', right: '0.4375rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(255,255,255,0.6)',
            }}>
              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── Logout — formal grey button ── */}
        <LogoutButton onLogout={logout} />

      </div>
    </nav>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      id="nav-logout"
      onClick={onLogout}
      aria-label="ออกจากระบบ"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.375rem',
        padding: '0.4375rem 0.875rem',
        background: hov ? '#4b5563' : '#6b7280',
        border: 'none',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '0.8125rem', fontWeight: 700,
        fontFamily: 'inherit', cursor: 'pointer',
        transition: 'background 0.15s',
        flexShrink: 0, whiteSpace: 'nowrap',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      }}
    >
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>ออกจากระบบ</span>
    </button>
  );
}

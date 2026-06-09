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
      setSelectedEditId('');
    }
  };

  const handleDeleteSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = Number(e.target.value);
    const user = users.find((u) => u.id === userId);
    if (user) {
      onDeleteUser(user);
      setSelectedDeleteId('');
    }
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1.5px solid rgba(29, 27, 82, 0.08)',
      }}
    >
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px',
            background: '#1D1B52',
            borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
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

        {/* Quick Actions – center */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          overflowX: 'auto',
        }}>
          <span style={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'rgba(29,27,82,0.35)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Quick Menu
          </span>

          {/* Edit selector */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              id="nav-edit-select"
              value={selectedEditId}
              onChange={handleEditSelect}
              aria-label="เลือกผู้ใช้เพื่อแก้ไขข้อมูล"
              style={{
                appearance: 'none',
                paddingLeft: '2rem',
                paddingRight: '1.875rem',
                paddingTop: '0.4375rem',
                paddingBottom: '0.4375rem',
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.12)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#1D1B52',
                fontFamily: 'inherit',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <option value="" disabled>✏️ แก้ไขผู้ใช้...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} — ID {user.id}
                </option>
              ))}
            </select>
            {/* Pencil icon left */}
            <div style={{
              position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: '#1D1B52', opacity: 0.5,
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            {/* Chevron right */}
            <div style={{
              position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(29,27,82,0.35)',
            }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Delete selector */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <select
              id="nav-delete-select"
              value={selectedDeleteId}
              onChange={handleDeleteSelect}
              aria-label="เลือกผู้ใช้เพื่อลบออกจากระบบ"
              style={{
                appearance: 'none',
                paddingLeft: '2rem',
                paddingRight: '1.875rem',
                paddingTop: '0.4375rem',
                paddingBottom: '0.4375rem',
                background: '#ffffff',
                border: '1.5px solid rgba(220,38,38,0.15)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#dc2626',
                fontFamily: 'inherit',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <option value="" disabled>🗑️ ลบผู้ใช้...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} — ID {user.id}
                </option>
              ))}
            </select>
            {/* Trash icon left */}
            <div style={{
              position: 'absolute', left: '0.625rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: '#dc2626', opacity: 0.6,
            }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            {/* Chevron right */}
            <div style={{
              position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', color: 'rgba(220,38,38,0.4)',
            }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          id="nav-logout"
          onClick={logout}
          aria-label="ออกจากระบบ"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.4375rem 0.875rem',
            background: 'transparent',
            border: '1.5px solid rgba(220,38,38,0.20)',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '0.8125rem',
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
            transition: 'background 0.15s, border-color 0.15s, color 0.15s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.borderColor = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.borderColor = 'rgba(220,38,38,0.20)';
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>ออกจากระบบ</span>
        </button>

      </div>
    </nav>
  );
}

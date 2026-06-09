'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';

interface NavbarProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

/* ─────────────────────────────────────────────
   Custom Dropdown — reusable
───────────────────────────────────────────── */
interface DropdownProps {
  id: string;
  placeholder: string;
  users: User[];
  accentColor: string;         // e.g. '#1D1B52'
  iconPath: string;
  onSelect: (user: User) => void;
}

function CustomDropdown({ id, placeholder, users, accentColor, iconPath, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (user: User) => {
    onSelect(user);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger button */}
      <button
        id={id}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '270px',
          padding: '0.4rem 0.625rem',
          background: open ? accentColor : 'transparent',
          border: `1.5px solid ${open ? accentColor : 'rgba(29,27,82,0.12)'}`,
          borderRadius: '8px',
          color: open ? '#ffffff' : '#1D1B52',
          fontSize: '0.75rem',
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.15s ease',
          overflow: 'hidden',
        }}
      >
        {/* Leading icon */}
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: '20px', height: '20px',
          borderRadius: '6px',
          background: open ? 'rgba(255,255,255,0.15)' : `${accentColor}18`,
          color: open ? '#fff' : accentColor,
          transition: 'all 0.15s ease',
        }}>
          <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={iconPath} />
          </svg>
        </span>
        {/* Label */}
        <span style={{
          flex: 1,
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
        }}>
          {placeholder}
        </span>
        {/* Chevron */}
        <svg
          width="11" height="11"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity: 0.6,
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 200,
            width: '270px',
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid rgba(29,27,82,0.08)',
            boxShadow: '0 8px 32px rgba(29,27,82,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            animation: 'dropdownIn 0.15s ease',
          }}
        >
          {/* Panel header */}
          <div style={{
            padding: '0.625rem 0.875rem 0.5rem',
            borderBottom: '1px solid rgba(29,27,82,0.06)',
          }}>
            <span style={{
              fontSize: '0.625rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: accentColor,
              opacity: 0.7,
            }}>
              {placeholder}
            </span>
          </div>

          {/* User list */}
          <div style={{ maxHeight: '220px', overflowY: 'auto', padding: '0.375rem' }}>
            {users.length === 0 ? (
              <div style={{
                padding: '0.75rem 0.5rem',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'rgba(29,27,82,0.35)',
              }}>
                ไม่มีข้อมูลผู้ใช้
              </div>
            ) : (
              users.map((user) => (
                <button
                  key={user.id}
                  role="option"
                  onClick={() => handleSelect(user)}
                  onMouseEnter={() => setHovered(user.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    width: '100%',
                    padding: '0.4375rem 0.5rem',
                    background: hovered === user.id ? `${accentColor}0e` : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                    outline: 'none',
                  }}
                >
                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    style={{
                      width: '28px', height: '28px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      objectFit: 'cover',
                      border: `1.5px solid ${hovered === user.id ? accentColor + '44' : 'rgba(29,27,82,0.08)'}`,
                      transition: 'border-color 0.1s',
                    }}
                  />
                  {/* Name + id */}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#1D1B52',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em',
                    }}>
                      {user.first_name} {user.last_name}
                    </div>
                    <div style={{
                      fontSize: '0.6875rem',
                      color: 'rgba(29,27,82,0.40)',
                      fontWeight: 500,
                    }}>
                      ID {user.id} · {user.email.split('@')[0]}
                    </div>
                  </div>
                  {/* Action arrow */}
                  <svg
                    width="12" height="12"
                    fill="none" stroke={accentColor}
                    viewBox="0 0 24 24"
                    style={{
                      flexShrink: 0,
                      opacity: hovered === user.id ? 0.8 : 0,
                      transition: 'opacity 0.1s',
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Keyframe animation injected once */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
export default function Navbar({ users, onEditUser, onDeleteUser }: NavbarProps) {
  const { logout } = useAuth();

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
          background: 'rgba(29,27,82,0.03)',
          border: '1.5px solid rgba(29,27,82,0.08)',
          borderRadius: '10px',
          flexShrink: 0,
        }}>
          {/* Edit dropdown */}
          <CustomDropdown
            id="nav-edit-dropdown"
            placeholder="แก้ไขผู้ใช้"
            users={users}
            accentColor="#1D1B52"
            iconPath="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            onSelect={onEditUser}
          />

          {/* Divider */}
          <div style={{ width: '1px', height: '22px', background: 'rgba(29,27,82,0.08)', flexShrink: 0 }} />

          {/* Delete dropdown */}
          <CustomDropdown
            id="nav-delete-dropdown"
            placeholder="ลบผู้ใช้"
            users={users}
            accentColor="#dc2626"
            iconPath="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            onSelect={onDeleteUser}
          />
        </div>

        {/* ── Logout ── */}
        <LogoutButton onLogout={logout} />

      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   Logout Button
───────────────────────────────────────────── */
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

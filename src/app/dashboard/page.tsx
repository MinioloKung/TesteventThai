'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, UserUpdateResponse } from '@/types';
import { apiService } from '@/services/api';
import Navbar from '@/components/Navbar';
import EditUserModal from '@/components/EditUserModal';
import DeleteUserModal from '@/components/DeleteUserModal';
import { Toast } from '@/components/ui/Toast';

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers(currentPage);
    }
  }, [currentPage, isAuthenticated]);

  const fetchUsers = async (page: number) => {
    setIsDataLoading(true);
    try {
      const response = await apiService.getUsers(page);
      setUsers(response.data);
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
    } catch (err: any) {
      showToast(err.message || 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้', 'error');
    } finally {
      setIsDataLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const handleEditSuccess = (updatedUser: User, info: UserUpdateResponse) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    showToast(`อัปเดต "${info.name}" (${info.job}) เรียบร้อยแล้ว`, 'success');
  };

  const handleDeleteSuccess = (deletedId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== deletedId));
    showToast(`ลบสมาชิก ID ${deletedId} เรียบร้อยแล้ว`, 'success');
  };

  /* ── Loading / auth guard ── */
  if (isAuthLoading || !isAuthenticated) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#ffffff',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
        }}>
          <div style={{
            width: '40px', height: '40px',
            border: '3px solid rgba(29,27,82,0.12)',
            borderTopColor: '#1D1B52',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }} />
          <p style={{ color: 'rgba(29,27,82,0.45)', fontSize: '0.875rem' }}>กำลังโหลด...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#f7f7fa', display: 'flex', flexDirection: 'column' }}>
      <Navbar users={users} onEditUser={setEditUser} onDeleteUser={setDeleteUser} />

      <main style={{
        flex: 1,
        maxWidth: '80rem',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}>

        {/* Page header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#1D1B52',
            margin: '0 0 0.375rem',
            lineHeight: 1.2,
          }}>
            รายชื่อผู้ใช้งานระบบ
          </h1>
          <p style={{ color: 'rgba(29,27,82,0.45)', fontSize: '0.875rem', margin: 0 }}>
            ข้อมูลผู้ใช้จาก ReqRes API — หน้า {currentPage} จาก {totalPages}
          </p>
        </div>

        {/* Divider */}
        <hr className="divider" style={{ marginTop: 0, marginBottom: '1.75rem' }} />

        {/* User cards */}
        {isDataLoading ? (
          /* Skeleton */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.07)',
                borderRadius: '16px',
                padding: '1.625rem',
                boxShadow: '0 2px 8px rgba(29,27,82,0.04)',
              }}>
                {/* Avatar skeleton */}
                <div className="skeleton" style={{ width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1rem' }} />
                {/* Text skeletons */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <div className="skeleton" style={{ height: '14px', width: '65%' }} />
                  <div className="skeleton" style={{ height: '11px', width: '80%' }} />
                  <div className="skeleton" style={{ height: '10px', width: '30%' }} />
                </div>
                {/* Button skeletons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div className="skeleton" style={{ height: '34px', borderRadius: '8px' }} />
                  <div className="skeleton" style={{ height: '34px', borderRadius: '8px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          /* Empty state */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '5rem 2rem',
            border: '1.5px dashed rgba(29,27,82,0.15)',
            borderRadius: '16px',
            background: '#ffffff',
            textAlign: 'center',
          }}>
            <div style={{
              width: '56px', height: '56px',
              background: 'rgba(29,27,82,0.06)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem',
            }}>
              <svg width="26" height="26" fill="none" stroke="#1D1B52" viewBox="0 0 24 24" style={{ opacity: 0.4 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p style={{ fontWeight: 700, color: '#1D1B52', marginBottom: '0.375rem' }}>
              ไม่พบข้อมูลผู้ใช้งาน
            </p>
            <p style={{ color: 'rgba(29,27,82,0.45)', fontSize: '0.8125rem' }}>
              ลองรีเฟรชหน้าหรือตรวจสอบการเชื่อมต่อ API
            </p>
          </div>
        ) : (
          /* Cards grid — 4-column balanced */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => setEditUser(user)}
                onDelete={() => setDeleteUser(user)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isDataLoading && totalPages > 1 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
            width: '100%',
            maxWidth: '360px',
            margin: '2.5rem auto 0',
          }}>
            <button
              id="pagination-prev"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem',
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.12)',
                borderRadius: '8px',
                color: '#1D1B52',
                fontSize: '0.8125rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.15s',
                visibility: currentPage > 1 ? 'visible' : 'hidden',
                justifySelf: 'end',
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              ก่อนหน้า
            </button>

            <span style={{
              padding: '0.5rem 1rem',
              background: '#1D1B52',
              color: '#ffffff',
              fontSize: '0.8125rem',
              fontWeight: 700,
              borderRadius: '8px',
              minWidth: '80px',
              textAlign: 'center',
              justifySelf: 'center',
            }}>
              {currentPage} / {totalPages}
            </span>

            <button
              id="pagination-next"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem',
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.12)',
                borderRadius: '8px',
                color: '#1D1B52',
                fontSize: '0.8125rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.15s',
                visibility: currentPage < totalPages ? 'visible' : 'hidden',
                justifySelf: 'start',
              }}
            >
              ถัดไป
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>

      <EditUserModal
        user={editUser}
        isOpen={editUser !== null}
        onClose={() => setEditUser(null)}
        onSaveSuccess={handleEditSuccess}
        onError={(msg) => showToast(msg, 'error')}
      />

      <DeleteUserModal
        user={deleteUser}
        isOpen={deleteUser !== null}
        onClose={() => setDeleteUser(null)}
        onDeleteSuccess={handleDeleteSuccess}
        onError={(msg) => showToast(msg, 'error')}
      />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

/* ── UserCard sub-component ── */
interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: `1.5px solid ${hovered ? 'rgba(29,27,82,0.18)' : 'rgba(29,27,82,0.08)'}`,
        borderRadius: '16px',
        padding: '1.625rem 1.5rem 1.375rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
        boxShadow: hovered
          ? '0 8px 28px rgba(29,27,82,0.10)'
          : '0 2px 8px rgba(29,27,82,0.05)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* ── Avatar — clean, no overlay text ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        style={{
          width: '64px', height: '64px',
          borderRadius: '50%', objectFit: 'cover',
          border: '2.5px solid rgba(29,27,82,0.08)',
          marginBottom: '1rem',
          flexShrink: 0,
        }}
      />

      {/* ── Text hierarchy ── */}
      <div style={{ width: '100%', marginBottom: '1.125rem' }}>
        {/* Full name — primary */}
        <p style={{
          fontWeight: 800, fontSize: '0.9375rem', color: '#1D1B52',
          margin: '0 0 0.25rem',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.first_name} {user.last_name}
        </p>
        {/* Email — secondary */}
        <p style={{
          fontSize: '0.75rem', color: 'rgba(29,27,82,0.45)',
          margin: '0 0 0.5rem',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.email}
        </p>
        {/* ID — tertiary, small grey */}
        <span style={{
          fontSize: '0.625rem', fontWeight: 600,
          color: 'rgba(29,27,82,0.28)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          ID {user.id}
        </span>
      </div>

      {/* ── Solid action buttons ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem', width: '100%',
        paddingTop: '1rem',
        borderTop: '1.5px solid rgba(29,27,82,0.06)',
      }}>
        <SolidActionButton
          onClick={onEdit}
          color="#1D1B52"
          hoverColor="#2d2a7a"
          icon={
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          label="แก้ไข"
        />
        <SolidActionButton
          onClick={onDelete}
          color="#dc2626"
          hoverColor="#b91c1c"
          icon={
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
          label="ลบออก"
        />
      </div>
    </div>
  );
}

/* ── Solid Action Button ── */
interface SolidActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
}

function SolidActionButton({ onClick, icon, label, color, hoverColor }: SolidActionButtonProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.3125rem',
        padding: '0.5625rem 0',
        background: hov ? hoverColor : color,
        border: 'none',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '0.75rem', fontWeight: 700,
        fontFamily: 'inherit', cursor: 'pointer',
        transition: 'background 0.15s, transform 0.12s',
        transform: hov ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hov ? `0 4px 12px ${color}44` : `0 1px 3px ${color}33`,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

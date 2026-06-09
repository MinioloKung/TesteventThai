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
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="skeleton" style={{ width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="skeleton" style={{ height: '14px', width: '70%' }} />
                    <div className="skeleton" style={{ height: '11px', width: '55%' }} />
                  </div>
                </div>
                <div className="skeleton" style={{ height: '36px', borderRadius: '8px' }} />
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
          /* Cards grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '2.5rem',
          }}>
            <button
              id="pagination-prev"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem',
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.12)',
                borderRadius: '8px',
                color: currentPage === 1 ? 'rgba(29,27,82,0.25)' : '#1D1B52',
                fontSize: '0.8125rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
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
            }}>
              {currentPage} / {totalPages}
            </span>

            <button
              id="pagination-next"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem',
                background: '#ffffff',
                border: '1.5px solid rgba(29,27,82,0.12)',
                borderRadius: '8px',
                color: currentPage === totalPages ? 'rgba(29,27,82,0.25)' : '#1D1B52',
                fontSize: '0.8125rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: 'all 0.15s',
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
      className="card"
      style={{
        padding: '1.25rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderColor: hovered ? 'rgba(29,27,82,0.22)' : undefined,
        boxShadow: hovered ? '0 4px 20px rgba(29,27,82,0.07)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* User info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.avatar}
          alt={user.first_name}
          style={{
            width: '52px', height: '52px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${hovered ? 'rgba(29,27,82,0.15)' : 'rgba(29,27,82,0.08)'}`,
            transition: 'border-color 0.2s',
            flexShrink: 0,
          }}
        />
        <div style={{ overflow: 'hidden' }}>
          <p style={{
            fontWeight: 800, fontSize: '0.9375rem',
            color: '#1D1B52', margin: '0 0 0.25rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {user.first_name} {user.last_name}
          </p>
          <p style={{
            fontSize: '0.75rem', color: 'rgba(29,27,82,0.45)',
            margin: '0 0 0.375rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {user.email}
          </p>
          <span className="badge">ID: {user.id}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem',
        paddingTop: '0.875rem',
        borderTop: '1.5px solid rgba(29,27,82,0.06)',
      }}>
        <ActionButton
          onClick={onEdit}
          icon={
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          label="แก้ไข"
          baseColor="rgba(29,27,82,0.55)"
          hoverBg="rgba(29,27,82,0.06)"
          hoverColor="#1D1B52"
        />
        <ActionButton
          onClick={onDelete}
          icon={
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
          label="ลบออก"
          baseColor="rgba(220,38,38,0.55)"
          hoverBg="rgba(220,38,38,0.06)"
          hoverColor="#dc2626"
        />
      </div>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  baseColor: string;
  hoverBg: string;
  hoverColor: string;
}

function ActionButton({ onClick, icon, label, baseColor, hoverBg, hoverColor }: ActionButtonProps) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.375rem',
        padding: '0.5rem 0',
        background: hov ? hoverBg : 'transparent',
        border: '1.5px solid rgba(29,27,82,0.08)',
        borderRadius: '8px',
        color: hov ? hoverColor : baseColor,
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

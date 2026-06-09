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

  // User list state
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Modals state
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  // Notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isAuthLoading, router]);

  // Fetch users when page changes
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
    // Update local state to show updated name
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    showToast(`อัปเดตสมาชิก "${info.name}" (Job: ${info.job}) เรียบร้อยแล้ว`, 'success');
  };

  const handleDeleteSuccess = (deletedId: number) => {
    // Remove deleted user from local state to visually represent deletion
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== deletedId));
    showToast(`ลบสมาชิก ID ${deletedId} เรียบร้อยแล้ว (จำลอง)`, 'success');
  };

  // Auth checking loading state
  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        users={users}
        onEditUser={(user) => setEditUser(user)}
        onDeleteUser={(user) => setDeleteUser(user)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              รายชื่อผู้ใช้งานระบบ (User List)
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              แสดงข้อมูลและจัดการรายชื่อผู้ใช้อิงจากข้อมูลหลังบ้านของ ReqRes API
            </p>
          </div>
        </div>

        {/* Users Grid */}
        {isDataLoading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200/40 dark:border-slate-800 animate-pulse space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : users.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
            <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-slate-500 dark:text-slate-400 font-medium">ไม่พบข้อมูลผู้ใช้งาน</p>
          </div>
        ) : (
          /* User Grid Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="group bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* User Info Header */}
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-700 group-hover:ring-indigo-500/10 transition-all duration-300"
                  />
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {user.email}
                    </p>
                    <span className="inline-block px-2 py-0.5 mt-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-md uppercase">
                      ID: {user.id}
                    </span>
                  </div>
                </div>

                {/* Card Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => setEditUser(user)}
                    className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-indigo-900/70 hover:text-indigo-700 dark:text-indigo-300/70 dark:hover:text-indigo-300 text-xs font-semibold rounded-xl transition-all border border-slate-200/30 dark:border-slate-800/40 hover:border-indigo-500/20 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>แก้ไข</span>
                  </button>

                  <button
                    onClick={() => setDeleteUser(user)}
                    className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 dark:bg-slate-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-900/70 hover:text-rose-700 dark:text-rose-300/70 dark:hover:text-rose-300 text-xs font-semibold rounded-xl transition-all border border-slate-200/30 dark:border-slate-800/40 hover:border-rose-500/20 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>ลบออก</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!isDataLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              <span>ก่อนหน้า</span>
            </button>

            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/40 dark:border-slate-700/30 px-3.5 py-2 rounded-xl">
              หน้า {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all disabled:opacity-40 cursor-pointer"
            >
              <span>ถัดไป</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </main>

      {/* Edit User Modal */}
      <EditUserModal
        user={editUser}
        isOpen={editUser !== null}
        onClose={() => setEditUser(null)}
        onSaveSuccess={handleEditSuccess}
        onError={(msg) => showToast(msg, 'error')}
      />

      {/* Delete User Modal */}
      <DeleteUserModal
        user={deleteUser}
        isOpen={deleteUser !== null}
        onClose={() => setDeleteUser(null)}
        onDeleteSuccess={handleDeleteSuccess}
        onError={(msg) => showToast(msg, 'error')}
      />

      {/* Toast Notification Container */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

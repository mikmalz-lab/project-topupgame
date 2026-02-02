"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { User, Shield, MoreHorizontal, Mail } from 'lucide-react';

const MOCK_USERS = [
    { id: 'USR-001', name: 'Admin Super', email: 'admin@topup.com', role: 'ADMIN', balance: 0, joined: '2023-01-01' },
    { id: 'USR-002', name: 'Jhon Doe', email: 'jhon@gmail.com', role: 'MEMBER', balance: 50000, joined: '2024-01-10' },
    { id: 'USR-003', name: 'Siti Aminah', email: 'siti@yahoo.com', role: 'RESELLER', balance: 1250000, joined: '2024-01-15' },
    { id: 'USR-004', name: 'Budi Santoso', email: 'budi@gmail.com', role: 'MEMBER', balance: 0, joined: '2024-01-18' },
];

export default function UsersPage() {
    return (
        <div>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>User Management</h1>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>User Info</th>
                                <th>Role</th>
                                <th>Balance (IDR)</th>
                                <th>Joined Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_USERS.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: 40, height: 40, borderRadius: '50%', background: '#27272a',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <User size={20} color="#a1a1aa" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: 'white' }}>{user.name}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            style={{
                                                padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: '700',
                                                background: user.role === 'ADMIN' ? 'rgba(189, 0, 255, 0.2)' :
                                                    user.role === 'RESELLER' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255,255,255,0.1)',
                                                color: user.role === 'ADMIN' ? '#bd00ff' :
                                                    user.role === 'RESELLER' ? '#00f0ff' : '#a1a1aa'
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: '700', color: 'white' }}>
                                        Rp {user.balance.toLocaleString()}
                                    </td>
                                    <td style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{user.joined}</td>
                                    <td>
                                        <button style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}>
                                            <MoreHorizontal />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

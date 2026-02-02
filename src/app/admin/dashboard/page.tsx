"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

// Mock Data for Dashboard
const RECENT_TRANSACTIONS = [
    { id: 'TRX-001', user: 'Guest_99', game: 'Mobile Legends', item: '100 Diamonds', amount: 28000, status: 'Success', date: '2024-01-20 13:45' },
    { id: 'TRX-002', user: 'Member_A', game: 'Free Fire', item: '140 Diamonds', amount: 20000, status: 'Success', date: '2024-01-20 13:30' },
    { id: 'TRX-003', user: 'Guest_12', game: 'PUBG Mobile', item: '60 UC', amount: 15000, status: 'Pending', date: '2024-01-20 13:15' },
    { id: 'TRX-004', user: 'Guest_55', game: 'Genshin Impact', item: 'Welkin Moon', amount: 79000, status: 'Success', date: '2024-01-20 12:50' },
    { id: 'TRX-005', user: 'Member_B', game: 'Mobile Legends', item: 'Weekly Pass', amount: 30000, status: 'Success', date: '2024-01-20 12:10' },
];

export default function AdminDashboard() {
    return (
        <div>
            <AdminSidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Dashboard Overview</h1>
                </div>

                {/* Stats Grid */}
                <div className={styles.statGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total Revenue</span>
                        <span className={styles.statValue}>Rp 15.4M</span>
                        <span className={styles.statTrend}><TrendingUp size={14} /> +12% from last month</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total Orders</span>
                        <span className={styles.statValue}>1,240</span>
                        <span className={styles.statTrend}><TrendingUp size={14} /> +5% from last month</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Active Members</span>
                        <span className={styles.statValue}>854</span>
                        <span className={styles.statTrend} style={{ color: '#666' }}>0% from last month</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Success Rate</span>
                        <span className={styles.statValue}>98.5%</span>
                        <span className={styles.statTrend}><TrendingUp size={14} /> System Healthy</span>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Recent Transactions</h2>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>TRX ID</th>
                                <th>User</th>
                                <th>Game</th>
                                <th>Item</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RECENT_TRANSACTIONS.map((trx) => (
                                <tr key={trx.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>{trx.id}</td>
                                    <td>{trx.user}</td>
                                    <td>{trx.game}</td>
                                    <td>{trx.item}</td>
                                    <td>Rp {trx.amount.toLocaleString()}</td>
                                    <td>
                                        <span className={`${styles.status} ${trx.status === 'Success' ? styles.statusSuccess : styles.statusPending}`}>
                                            {trx.status}
                                        </span>
                                    </td>
                                    <td style={{ color: '#666', fontSize: '0.8rem' }}>{trx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

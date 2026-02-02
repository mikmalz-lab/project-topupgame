"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { MemberSidebar } from '@/components/member/MemberSidebar';
import { Wallet, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import Link from 'next/link';

export default function MemberDashboard() {
    return (
        <div>
            <MemberSidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Dashboard Member</h1>
                    <Link href="/" className={styles.menuItem} style={{ background: 'var(--neon-blue)', color: 'black', fontWeight: '700', border: 'none' }}>
                        + Order Baru
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className={styles.statGrid}>
                    <div className={styles.statCard} style={{ background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(189, 0, 255, 0.1))', borderColor: 'var(--neon-blue)' }}>
                        <span className={styles.statLabel}>Sisa Saldo</span>
                        <span className={styles.statValue}>Rp 150.000</span>
                        <Link href="/member/deposit" style={{ fontSize: '0.8rem', color: '#00f0ff', marginTop: '0.5rem', textDecoration: 'underline' }}>
                            Isi Saldo
                        </Link>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Total Transaksi</span>
                        <span className={styles.statValue}>12</span>
                        <span className={styles.statTrend}>lifetime</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Pengeluaran Bulan Ini</span>
                        <span className={styles.statValue}>Rp 450.000</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statLabel}>Level Member</span>
                        <span className={styles.statValue} style={{ color: '#eab308' }}>Gold</span>
                        <span className={styles.statTrend}>Diskon 5%</span>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white' }}>Transaksi Terakhir</h2>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Game</th>
                                <th>Item</th>
                                <th>Harga</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>INV-8823</td>
                                <td>Mobile Legends</td>
                                <td>366 Diamonds</td>
                                <td>Rp 100.000</td>
                                <td><span className={styles.statusSuccess}>Success</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>INV-1123</td>
                                <td>Free Fire</td>
                                <td>140 Diamonds</td>
                                <td>Rp 20.000</td>
                                <td><span className={styles.statusPending}>Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                        <Link href="/member/history" style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Lihat Semua Transaksi</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

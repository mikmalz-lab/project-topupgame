"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { MemberSidebar } from '@/components/member/MemberSidebar';

export default function HistoryPage() {
    return (
        <div>
            <MemberSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Riwayat Transaksi</h1>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Tanggal</th>
                                <th>Game/Produk</th>
                                <th>Metode</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>INV-8823</td>
                                <td>20 Jan 2024, 14:30</td>
                                <td>
                                    <div style={{ fontWeight: '600' }}>Mobile Legends</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>366 Diamonds</div>
                                </td>
                                <td>Saldo Akun</td>
                                <td>Rp 100.000</td>
                                <td><span className={styles.statusSuccess}>Success</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>INV-1123</td>
                                <td>20 Jan 2024, 10:15</td>
                                <td>
                                    <div style={{ fontWeight: '600' }}>Deposit Saldo</div>
                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>Top Up Wallet</div>
                                </td>
                                <td>QRIS</td>
                                <td>Rp 50.000</td>
                                <td><span className={styles.statusPending}>Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Save, Globe, CreditCard, Percent } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>System Settings</h1>
                    <button className={styles.menuItem} style={{ background: '#22c55e', color: 'black', border: 'none', fontWeight: 700 }}>
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>

                    {/* General Settings */}
                    <section className={styles.statCard} style={{ gridColumn: '1 / -1' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={20} color="#00f0ff" /> General Information
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Website Name</label>
                                <input type="text" defaultValue="TopUpGame Store" className={styles.tableHeader} style={{ width: '100%', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.5rem', padding: '0.75rem' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Admin WhatsApp</label>
                                <input type="text" defaultValue="081234567890" className={styles.tableHeader} style={{ width: '100%', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.5rem', padding: '0.75rem' }} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Running Text Announcement</label>
                                <input type="text" defaultValue="Promo Spesial! Top Up Mobile Legends diskon 10% hari ini." className={styles.tableHeader} style={{ width: '100%', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', color: 'white', borderRadius: '0.5rem', padding: '0.75rem' }} />
                            </div>
                        </div>
                    </section>

                    {/* DigiFlazz Config */}
                    <section className={styles.statCard}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={20} color="#bd00ff" /> DigiFlazz Integration
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Username</label>
                                <input type="text" defaultValue="user1234" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Production Key</label>
                                <input type="password" defaultValue="****************" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                        </div>
                    </section>

                    {/* Profit Settings */}
                    <section className={styles.statCard}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Percent size={20} color="#eab308" /> Global Profit Margin
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Member Margin (%)</label>
                                <input type="number" defaultValue="5" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Reseller Margin (%)</label>
                                <input type="number" defaultValue="2" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Guest Margin (%)</label>
                                <input type="number" defaultValue="10" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

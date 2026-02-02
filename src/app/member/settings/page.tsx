"use client";
import React from 'react';
import styles from '@/components/admin/Admin.module.css';
import { MemberSidebar } from '@/components/member/MemberSidebar';
import { Save, Lock, User } from 'lucide-react';

export default function MemberSettingsPage() {
    return (
        <div>
            <MemberSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Pengaturan Akun</h1>
                    <button className={styles.menuItem} style={{ background: '#22c55e', color: 'black', border: 'none', fontWeight: 700 }}>
                        <Save size={18} />
                        Simpan Perubahan
                    </button>
                </div>

                <div style={{ maxWidth: '600px' }}>

                    {/* Profile Info */}
                    <section className={styles.statCard} style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} color="#00f0ff" /> Informasi Pribadi
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Nama Lengkap</label>
                                <input type="text" defaultValue="Jhon Doe" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Nomor WhatsApp</label>
                                <input type="text" defaultValue="08123456789" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                        </div>
                    </section>

                    {/* Password Info */}
                    <section className={styles.statCard}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Lock size={20} color="#bd00ff" /> Ganti Password
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Password Lama</label>
                                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa' }}>Password Baru</label>
                                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', borderRadius: '0.5rem', color: 'white' }} />
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

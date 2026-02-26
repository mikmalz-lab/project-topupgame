"use client";
import React, { useState } from 'react';
import styles from '@/components/admin/Admin.module.css';
import { MemberSidebar } from '@/components/member/MemberSidebar';
import { Wallet, QrCode, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DEPOSIT_AMOUNTS = [
    10000, 25000, 50000, 100000, 250000, 500000, 1000000
];

export default function DepositPage() {
    const [amount, setAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [method, setMethod] = useState('');

    const finalAmount = amount || (customAmount ? parseInt(customAmount) : 0);

    return (
        <div>
            <MemberSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Deposit Saldo</h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) 1fr', gap: '2rem' }}>

                    {/* Left: Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Amount Selection */}
                        <section className={styles.statCard}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>1. Pilih Nominal Deposit</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {DEPOSIT_AMOUNTS.map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                                        style={{
                                            padding: '1rem', borderRadius: '0.5rem',
                                            background: amount === amt ? 'var(--neon-blue)' : 'rgba(255,255,255,0.05)',
                                            border: '1px solid var(--glass-border)',
                                            color: amount === amt ? 'black' : 'white',
                                            fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                                        }}
                                    >
                                        Rp {amt.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>Atau Masukkan Nominal Lain</label>
                                <input
                                    type="number"
                                    placeholder="Min. Rp 10.000"
                                    value={customAmount}
                                    onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                                    style={{
                                        width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
                                        borderRadius: '0.5rem', color: 'white', outline: 'none'
                                    }}
                                />
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section className={styles.statCard}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>2. Pilih Metode Pembayaran</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div
                                    onClick={() => setMethod('qris')}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '1rem', borderRadius: '0.5rem',
                                        background: method === 'qris' ? 'rgba(0,240,255,0.1)' : 'rgba(255,255,255,0.05)',
                                        border: method === 'qris' ? '1px solid var(--neon-blue)' : '1px solid var(--glass-border)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>🏷️</span>
                                        <div>
                                            <div style={{ fontWeight: '600', color: 'white' }}>QRIS (Instant)</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>GoPay, OVO, DANA, ShopeePay</div>
                                        </div>
                                    </div>
                                    {method === 'qris' && <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--neon-blue)' }} />}
                                </div>

                                <div
                                    onClick={() => setMethod('bank')}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '1rem', borderRadius: '0.5rem',
                                        background: method === 'bank' ? 'rgba(0,240,255,0.1)' : 'rgba(255,255,255,0.05)',
                                        border: method === 'bank' ? '1px solid var(--neon-blue)' : '1px solid var(--glass-border)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>🏦</span>
                                        <div>
                                            <div style={{ fontWeight: '600', color: 'white' }}>Virtual Account</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>BCA, Mandiri, BNI, BRI</div>
                                        </div>
                                    </div>
                                    {method === 'bank' && <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--neon-blue)' }} />}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Summary */}
                    <div>
                        <div className={styles.statCard} style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '1.5rem' }}>Ringkasan Deposit</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#a1a1aa' }}>
                                <span>Nominal</span>
                                <span style={{ color: 'white' }}>Rp {finalAmount.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#a1a1aa' }}>
                                <span>Biaya Admin</span>
                                <span style={{ color: 'white' }}>Rp 0</span>
                            </div>

                            <div style={{ borderTop: '1px dashed var(--glass-border)', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: '600', color: 'white' }}>Total Bayar</span>
                                <span style={{ fontWeight: '700', color: 'var(--neon-blue)', fontSize: '1.25rem' }}>Rp {finalAmount.toLocaleString()}</span>
                            </div>

                            <button
                                disabled={finalAmount < 10000 || !method}
                                style={{
                                    width: '100%', padding: '1rem', borderRadius: '0.5rem',
                                    background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                                    border: 'none', color: 'black', fontWeight: '800', cursor: 'pointer',
                                    opacity: (finalAmount < 10000 || !method) ? 0.5 : 1
                                }}
                            >
                                Buat Pesanan Deposit
                            </button>
                            <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
                                Min. Deposit Rp 10.000
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

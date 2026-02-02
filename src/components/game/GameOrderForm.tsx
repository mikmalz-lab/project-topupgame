"use client";
import { useState } from 'react';
import { User, Smartphone, CreditCard, ChevronRight, Check } from 'lucide-react';
import styles from '@/app/games/[slug]/page.module.css'; // Re-using the page module for now
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const ITEMS = [
    { id: 'd-5', name: '5 Diamonds', price: 1500 },
    { id: 'd-10', name: '10 Diamonds', price: 2900 },
    { id: 'd-50', name: '50 Diamonds', price: 14000 },
    { id: 'd-100', name: '100 + 10 Diamonds', price: 28000 },
    { id: 'd-250', name: '250 + 25 Diamonds', price: 70000 },
    { id: 'd-500', name: '500 + 60 Diamonds', price: 135000 },
    { id: 'sl-1', name: 'Starlight Membership', price: 145000 },
    { id: 'sl-plus', name: 'Starlight Plus', price: 290000 },
    { id: 'tw-1', name: 'Twilight Pass', price: 150000 },
];

const PAYMENTS = [
    { id: 'qris', name: 'QRIS (All E-Wallet)', fee: 0, icon: '🏷️' },
    { id: 'gopay', name: 'GoPay', fee: 2, icon: '🟢' },
    { id: 'dana', name: 'DANA', fee: 0, icon: '🔵' },
];

export function GameOrderForm({ gameName }: { gameName: string }) {
    const [userId, setUserId] = useState('');
    const [serverId, setServerId] = useState('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Payment Modal State
    const [paymentModal, setPaymentModal] = useState<{ open: boolean, data: any }>({ open: false, data: null });

    const activeItem = ITEMS.find(i => i.id === selectedItem);
    const activePayment = PAYMENTS.find(p => p.id === selectedPayment);

    // Calculate total
    const subtotal = activeItem ? activeItem.price : 0;
    const fee = activePayment ? (activePayment.fee / 100) * subtotal : 0;
    const total = subtotal + fee;

    const handleBuy = async () => {
        if (!userId || !selectedItem || !selectedPayment) return;

        setIsProcessing(true);

        try {
            // Call Mock Create API
            const res = await fetch('/api/transaction/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    serverId,
                    itemId: selectedItem,
                    paymentMethod: selectedPayment,
                    amount: total
                })
            });

            const result = await res.json();

            if (result.success) {
                // Open Payment Modal instead of simulated success directly
                setPaymentModal({ open: true, data: result.data });
            }
        } catch (error) {
            console.error('Order failed', error);
            alert('Failed to connect to server');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSimulatePayment = () => {
        // Simulate Success from inside Modal
        setPaymentModal({ open: false, data: null });
        setShowSuccess(true);
    };

    if (showSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.section}
                style={{ textAlign: 'center', padding: '3rem' }}
            >
                <div style={{
                    width: 80, height: 80, background: '#22c55e', borderRadius: '50%',
                    margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Check size={40} color="white" />
                </div>
                <h2 className={styles.sectionTitle} style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment Successful!</h2>
                <p style={{ color: '#a1a1aa' }}>
                    Your order for <strong>{activeItem?.name}</strong> has been processed.<br />
                    Diamonds will be added to ID: <strong>{userId} ({serverId})</strong> shortly.
                </p>
                <button
                    className={styles.buttonGhost}
                    style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
                    onClick={() => window.location.href = '/'}
                >
                    Back to Home
                </button>
            </motion.div>
        );
    }

    // Payment Modal Overlay
    if (paymentModal.open) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: '#18181b', border: '1px solid var(--glass-border)',
                        borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '100%',
                        textAlign: 'center', position: 'relative'
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>Scan to Pay</h2>
                    <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>Total: <span style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>Rp {paymentModal.data.amount.toLocaleString()}</span></p>

                    <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', margin: '0 auto 1.5rem', width: 'fit-content' }}>
                        {/* Using img tag for generic QR code from API */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={paymentModal.data.payment.qrisUrl} alt="QRIS" width={200} height={200} />
                    </div>

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.9rem', color: '#ccc', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Instructions:</p>
                        <ol style={{ paddingLeft: '1.2rem', gap: '0.25rem', display: 'flex', flexDirection: 'column' }}>
                            {paymentModal.data.payment.instructions.map((inst: string, i: number) => (
                                <li key={i}>{inst}</li>
                            ))}
                        </ol>
                    </div>

                    <button
                        onClick={handleSimulatePayment}
                        style={{
                            width: '100%', padding: '0.8rem', borderRadius: '0.5rem',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            border: 'none', color: 'white', fontWeight: '700', cursor: 'pointer',
                            marginBottom: '0.5rem'
                        }}
                    >
                        Simulate Success (Check Status)
                    </button>
                    <button
                        onClick={() => setPaymentModal({ open: false, data: null })}
                        className={styles.buttonGhost}
                        style={{ width: '100%', border: 'none', background: 'transparent', color: '#666', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className={styles.content}>
            {/* Left Column: Form Steps */}
            <div className={styles.leftColumn}>

                {/* Step 1: User ID */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.stepNumber}>1</div>
                        <h2 className={styles.sectionTitle}>Account Data</h2>
                    </div>
                    <div className={styles.inputGroup}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a1a1aa' }}>User ID</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. 12345678"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a1a1aa' }}>Server ID</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. 1234"
                                value={serverId}
                                onChange={(e) => setServerId(e.target.value)}
                            />
                        </div>
                    </div>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
                        *Click your avatar in-game to find your ID.
                    </p>
                </section>

                {/* Step 2: Select Item */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.stepNumber}>2</div>
                        <h2 className={styles.sectionTitle}>Select Item</h2>
                    </div>
                    <div className={styles.grid}>
                        {ITEMS.map((item) => (
                            <div
                                key={item.id}
                                className={`${styles.itemCard} ${selectedItem === item.id ? styles.selected : ''}`}
                                onClick={() => setSelectedItem(item.id)}
                            >
                                <span className={styles.itemAmount}>{item.name}</span>
                                <span className={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Step 3: Payment */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.stepNumber}>3</div>
                        <h2 className={styles.sectionTitle}>Select Payment</h2>
                    </div>
                    <div className={styles.paymentMethods}>
                        {PAYMENTS.map((payment) => (
                            <div
                                key={payment.id}
                                className={`${styles.paymentCard} ${selectedPayment === payment.id ? styles.selected : ''}`}
                                onClick={() => setSelectedPayment(payment.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{payment.icon}</span>
                                    <span style={{ fontWeight: '600' }}>{payment.name}</span>
                                </div>
                                {activeItem && (
                                    <span style={{ fontWeight: '700' }}>
                                        Rp {Math.floor(activeItem.price * (1 + payment.fee / 100)).toLocaleString('id-ID')}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Column: Checkout Summary (Sticky) */}
            <div className={styles.rightColumn}>
                <div className={styles.checkoutCard}>
                    <h3 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Order Summary</h3>

                    <div className={styles.summaryRow}>
                        <span>Product:</span>
                        <span style={{ color: 'white' }}>{activeItem ? activeItem.name : '-'}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Payment:</span>
                        <span style={{ color: 'white' }}>{activePayment ? activePayment.name : '-'}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Account:</span>
                        <span style={{ color: 'white' }}>{userId ? `${userId} (${serverId})` : '-'}</span>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total Pay</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>

                    <button
                        className={styles.payButton}
                        disabled={!userId || !selectedItem || !selectedPayment || isProcessing}
                        onClick={handleBuy}
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>

                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <User size={14} color="#666" />
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Login to save this transaction</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    {
        id: 'ewallet',
        name: 'E-Wallet',
        items: [
            { id: 'qris', name: 'QRIS (All E-Wallet)', fee: 0.7, feeType: 'percent', icon: '🏷️' },
            { id: 'gopay', name: 'GoPay', fee: 2, feeType: 'percent', icon: '🟢' },
            { id: 'dana', name: 'DANA', fee: 1.5, feeType: 'percent', icon: '🔵' },
        ]
    },
    {
        id: 'va',
        name: 'Virtual Account',
        items: [
            { id: 'va_bca', name: 'BCA Virtual Account', fee: 4000, feeType: 'flat', icon: '🏦' },
            { id: 'va_bni', name: 'BNI Virtual Account', fee: 3500, feeType: 'flat', icon: '🏦' },
            { id: 'va_bri', name: 'BRI Virtual Account', fee: 3000, feeType: 'flat', icon: '🏦' },
            { id: 'va_mandiri', name: 'Mandiri Virtual Account', fee: 3500, feeType: 'flat', icon: '🏦' },
        ]
    }
];

export function GameOrderForm({ gameName, products = [] }: { gameName: string, products?: any[] }) {
    const [userId, setUserId] = useState('');
    const [serverId, setServerId] = useState('');
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('ewallet');
    const [lastTransaction, setLastTransaction] = useState<any>(null);

    // Payment Modal State
    const [paymentModal, setPaymentModal] = useState<{ open: boolean, data: any }>({ open: false, data: null });
    const [errors, setErrors] = useState<{ userId?: string; serverId?: string }>({});

    // Use products prop if available, otherwise fallback to mock ITEMS
    const activeProducts = products.length > 0 ? products : ITEMS;

    const activeItem = activeProducts.find(i => i.id === selectedItem);

    // Helper to find selected payment object
    const findPayment = (id: string | null) => {
        if (!id) return null;
        for (const group of PAYMENTS) {
            const found = group.items.find(p => p.id === id);
            if (found) return found;
        }
        return null;
    };

    const activePayment = findPayment(selectedPayment);

    // Calculate total
    // Apply discount if activeItem has isDiscount set to true AND discountPercent > 0
    let subtotal = 0;
    if (activeItem) {
        subtotal = activeItem.sellingPrice || activeItem.price; // fallback to .price for mock data
        if (activeItem.isDiscount && activeItem.discountPercent > 0) {
            subtotal = subtotal - (subtotal * (activeItem.discountPercent / 100));
        }
    }
    const fee = activePayment
        ? (activePayment.feeType === 'percent' ? (activePayment.fee / 100) * subtotal : activePayment.fee)
        : 0;
    const total = subtotal + fee;

    const handleInputChange = (setter: (val: string) => void, field: 'userId' | 'serverId') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Numbers only allowed' }));
            return;
        }

        setErrors(prev => ({ ...prev, [field]: undefined }));
        setter(value);
    };

    const validate = () => {
        const newErrors: { userId?: string; serverId?: string } = {};
        if (!userId) newErrors.userId = 'User ID is required';
        if (!serverId) newErrors.serverId = 'Server ID is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBuy = async () => {
        if (!validate() || !selectedItem || !selectedPayment) return;

        setIsProcessing(true);

        try {
            // Simulate API Call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate dummy data
            const isVA = selectedPayment.startsWith('va_');
            const generatedInvoiceId = `INV-${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`;

            const data = {
                invoiceId: generatedInvoiceId, // Add Invoice ID
                amount: total,
                payment: {
                    type: isVA ? 'VA' : 'QRIS',
                    // Dummy VA Number or QRIS URL
                    vaNumber: isVA ? `88${Math.floor(Math.random() * 1000000000)}` : null,
                    qrisUrl: isVA ? null : 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ExampleQRIS',
                    checkoutUrl: isVA ? null : 'https://example.com/pay',
                    instructions: isVA
                        ? ['Open your Mobile Banking App', `Select ${activePayment?.name}`, `Enter Virtual Account Number: 88...`, 'Confirm Payment']
                        : ['Open any E-Wallet app', 'Scan QR Code shown below', 'Check details and Confirm', 'Payment accepted automatically']
                }
            };

            setPaymentModal({ open: true, data });

        } catch (error) {
            console.error('Order failed', error);
            alert('Failed to connect to server');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSimulatePayment = () => {
        // Simulate Success from inside Modal
        setLastTransaction(paymentModal.data); // Store data for success screen
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

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', display: 'inline-block' }}>
                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.25rem' }}>Invoice ID</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--neon-blue)', letterSpacing: '1px' }}>
                        {lastTransaction?.invoiceId}
                    </p>
                </div>

                <p style={{ color: '#a1a1aa' }}>
                    Your order for <strong>{activeItem?.name}</strong> has been processed.<br />
                    Diamonds will be added to ID: <strong>{userId} ({serverId})</strong> shortly.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    <button
                        className={styles.buttonGhost}
                        style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}
                        onClick={() => window.location.href = '/'}
                    >
                        Back to Home
                    </button>
                    <button
                        className={styles.buttonGhost} // Reusing ghost style but maybe giving it a border
                        style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)' }}
                        onClick={() => window.location.href = '/status'}
                    >
                        Check Status
                    </button>
                </div>
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
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                        {paymentModal.data.payment.type === 'VA' ? 'Complete Payment' : 'Scan to Pay'}
                    </h2>
                    <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>Total: <span style={{ color: 'var(--neon-blue)', fontWeight: 'bold' }}>Rp {paymentModal.data.amount.toLocaleString()}</span></p>

                    <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', margin: '0 auto 1.5rem', width: 'fit-content', color: 'black' }}>
                        {paymentModal.data.payment.type === 'VA' ? (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: '#666' }}>Virtual Account Number:</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>{paymentModal.data.payment.vaNumber}</p>
                            </div>
                        ) : (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={paymentModal.data.payment.qrisUrl} alt="QRIS" width={200} height={200} />
                        )}
                    </div>

                    <div style={{ marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.9rem', color: '#ccc', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '0.5rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Instructions:</p>
                        <ol style={{ paddingLeft: '1.2rem', gap: '0.25rem', display: 'flex', flexDirection: 'column' }}>
                            {paymentModal.data.payment.instructions.map((inst: string, i: number) => (
                                <li key={i}>{inst.includes('88...') ? inst.replace('88...', paymentModal.data.payment.vaNumber) : inst}</li>
                            ))}
                        </ol>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                        Checking payment status automatically... (Simulated 60s)
                    </p>

                    <button
                        onClick={handleSimulatePayment}
                        style={{
                            width: '100%', padding: '0.8rem', borderRadius: '0.5rem',
                            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                            border: 'none', color: 'white', fontWeight: '700', cursor: 'pointer',
                            marginBottom: '0.5rem'
                        }}
                    >
                        I Have Paid (Simulate Success)
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
                                onChange={handleInputChange(setUserId, 'userId')}
                                style={errors.userId ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.userId && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.userId}</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#a1a1aa' }}>Server ID</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g. 1234"
                                value={serverId}
                                onChange={handleInputChange(setServerId, 'serverId')}
                                style={errors.serverId ? { borderColor: '#ef4444' } : {}}
                            />
                            {errors.serverId && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.serverId}</span>}
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
                        {activeProducts.map((item) => {
                            const originalPrice = item.sellingPrice || item.price;
                            const isDiscounted = item.isDiscount && item.discountPercent > 0;
                            const currentPrice = isDiscounted
                                ? originalPrice - (originalPrice * (item.discountPercent / 100))
                                : originalPrice;

                            return (
                                <div
                                    key={item.id}
                                    className={`${styles.itemCard} ${selectedItem === item.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedItem(item.id)}
                                    style={{ position: 'relative' }}
                                >
                                    {isDiscounted && (
                                        <div style={{
                                            position: 'absolute', top: '-10px', right: '-10px',
                                            background: '#ef4444', color: 'white', padding: '0.2rem 0.5rem',
                                            borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold'
                                        }}>
                                            -{item.discountPercent}%
                                        </div>
                                    )}
                                    <span className={styles.itemAmount}>{item.name}</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        {isDiscounted && (
                                            <span style={{ textDecoration: 'line-through', color: '#666', fontSize: '0.8rem' }}>
                                                Rp {Math.floor(originalPrice).toLocaleString('id-ID')}
                                            </span>
                                        )}
                                        <span className={styles.itemPrice}>Rp {Math.floor(currentPrice).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Step 3: Payment */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.stepNumber}>3</div>
                        <h2 className={styles.sectionTitle}>Select Payment</h2>
                    </div>

                    {/* Payment Group Toggles */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '0.75rem' }}>
                        {PAYMENTS.map(group => (
                            <button
                                key={group.id}
                                onClick={() => setSelectedGroup(group.id)}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    background: selectedGroup === group.id ? 'var(--neon-blue)' : 'transparent',
                                    color: selectedGroup === group.id ? 'black' : 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {group.name}
                            </button>
                        ))}
                    </div>

                    <div className={styles.paymentMethods}>
                        {PAYMENTS.find(g => g.id === selectedGroup)?.items.map((payment) => (
                            <div
                                key={payment.id}
                                className={`${styles.paymentCard} ${selectedPayment === payment.id ? styles.selected : ''}`}
                                onClick={() => setSelectedPayment(payment.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{payment.icon}</span>
                                    <span style={{ fontWeight: '600' }}>{payment.name}</span>
                                </div>
                                {activeItem && (() => {
                                    let baseP = activeItem.sellingPrice || activeItem.price;
                                    if (activeItem.isDiscount && activeItem.discountPercent > 0) {
                                        baseP = baseP - (baseP * (activeItem.discountPercent / 100));
                                    }
                                    const paymentFee = payment.feeType === 'percent' ? (payment.fee / 100) * baseP : payment.fee;
                                    return (
                                        <span style={{ fontWeight: '700' }}>
                                            Rp {Math.floor(baseP + paymentFee).toLocaleString('id-ID')}
                                        </span>
                                    );
                                })()}
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

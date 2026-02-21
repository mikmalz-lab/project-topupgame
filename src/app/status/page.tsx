"use client";
import { Navbar } from '@/components/layout/Navbar';
import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function StatusPage() {
    const [invoiceId, setInvoiceId] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');
    const [txData, setTxData] = useState<any>(null);

    const handleCheck = async () => {
        if (!invoiceId) return;
        setStatus('loading');
        setTxData(null);

        try {
            const res = await fetch(`/api/transaction/status/${encodeURIComponent(invoiceId)}`);
            const json = await res.json();

            if (json.success && json.data) {
                setTxData(json.data);
                setStatus('found');
            } else {
                setStatus('not-found');
            }
        } catch (error) {
            console.error("Error checking status:", error);
            setStatus('not-found');
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', paddingTop: '80px' }}>
            <Navbar />

            <div className="container" style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
                    Track Order
                </h1>

                <div style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    padding: '2rem', borderRadius: '1rem', backdropFilter: 'blur(10px)'
                }}>
                    <label style={{ display: 'block', marginBottom: '1rem', color: '#a1a1aa' }}>Invoice Number / Phone Number</label>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            placeholder="INV-XXXXX or 0812..."
                            style={{
                                flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1rem', borderRadius: '0.5rem', color: 'white', outline: 'none'
                            }}
                            value={invoiceId}
                            onChange={(e) => setInvoiceId(e.target.value)}
                        />
                        <button
                            onClick={handleCheck}
                            disabled={status === 'loading'}
                            style={{
                                background: 'linear-gradient(135deg, #00f0ff, #bd00ff)',
                                border: 'none', borderRadius: '0.5rem', padding: '0 2rem', fontWeight: '700', cursor: 'pointer',
                                color: 'black'
                            }}
                        >
                            {status === 'loading' ? <Loader2 className="animate-spin" /> : <Search />}
                        </button>
                    </div>

                    {/* Result */}
                    {status === 'found' && txData && (
                        <div style={{ marginTop: '2rem', padding: '1rem', background: txData.status === 'SUCCESS' ? 'rgba(34, 197, 94, 0.1)' : txData.status === 'FAILED' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)', border: `1px solid ${txData.status === 'SUCCESS' ? '#22c55e' : txData.status === 'FAILED' ? '#ef4444' : '#eab308'}`, borderRadius: '0.5rem' }}>
                            <h3 style={{ color: txData.status === 'SUCCESS' ? '#22c55e' : txData.status === 'FAILED' ? '#ef4444' : '#eab308', fontWeight: '700', marginBottom: '0.5rem' }}>Transaction Found!</h3>
                            <p style={{ color: '#ddd' }}>Invoice: {txData.invoiceId}</p>
                            <p style={{ color: '#ddd' }}>Target: {txData.targetId}</p>
                            <p style={{ color: '#ddd' }}>Product: {txData.productName}</p>
                            <p style={{ color: '#ddd' }}>Amount: Rp {txData.amount.toLocaleString('id-ID')}</p>

                            <p style={{ color: '#ddd', marginTop: '0.5rem' }}>Payment Status: <span style={{ fontWeight: 'bold' }}>{txData.paymentStatus}</span></p>
                            <p style={{ color: '#ddd' }}>Order Status: <span style={{ color: txData.status === 'SUCCESS' ? '#22c55e' : txData.status === 'FAILED' ? '#ef4444' : '#eab308', fontWeight: 'bold' }}>{txData.status}</span></p>
                        </div>
                    )}

                    {status === 'not-found' && (
                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '0.5rem' }}>
                            <h3 style={{ color: '#ef4444', fontWeight: '700', marginBottom: '0.5rem' }}>Transaction Not Found</h3>
                            <p style={{ color: '#ddd' }}>Please check your invoice ID and try again.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

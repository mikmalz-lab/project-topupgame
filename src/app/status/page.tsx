"use client";
import { Navbar } from '@/components/layout/Navbar';
import { Search, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function StatusPage() {
    const [invoiceId, setInvoiceId] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

    const handleCheck = () => {
        if (!invoiceId) return;
        setStatus('loading');

        // Mock API Call
        setTimeout(() => {
            if (invoiceId.length > 5) setStatus('found');
            else setStatus('not-found');
        }, 1500);
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

                    {/* Result Mockup */}
                    {status === 'found' && (
                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '0.5rem' }}>
                            <h3 style={{ color: '#22c55e', fontWeight: '700', marginBottom: '0.5rem' }}>Transaction Found!</h3>
                            <p style={{ color: '#ddd' }}>Product: 100 Diamonds (MLBB)</p>
                            <p style={{ color: '#ddd' }}>Status: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Success</span></p>
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

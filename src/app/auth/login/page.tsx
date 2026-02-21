"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gamepad2, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import styles from '@/app/page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await res.json();

            if (result.success) {
                // Redirect based on role
                if (result.data.role === 'ADMIN') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/member/dashboard');
                }
                router.refresh();
            } else {
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #1a0b2e 0%, #000000 100%)',
            padding: '1rem'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'rgba(20, 20, 20, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Glow Effects */}
                <div style={{
                    position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
                    width: '200px', height: '200px',
                    background: 'var(--neon-blue)', filter: 'blur(80px)', opacity: 0.3, pointerEvents: 'none'
                }} />

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', marginBottom: '1.5rem' }}>
                        <Gamepad2 color="#bd00ff" />
                        <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>TopUp<span style={{ color: '#bd00ff' }}>Game</span></span>
                    </Link>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: '#a1a1aa' }}>Please sign in to your account</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444',
                        color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem',
                        marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#666" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.75rem', outline: 'none'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="new-email" // Prevent browser autofill weirdness
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} color="#666" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            style={{
                                width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.75rem', outline: 'none'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password" // Prevent browser autofill weirdness
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link href="#" style={{ fontSize: '0.85rem', color: '#bd00ff', textDecoration: 'none' }}>Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            background: 'linear-gradient(90deg, #00f0ff, #bd00ff)',
                            border: 'none',
                            color: 'black',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            marginTop: '0.5rem',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Signing In...' : (
                            <>Sign In <ArrowRight size={18} /></>
                        )}
                    </button>

                </form>

                {/* Footer */}
                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#a1a1aa' }}>
                    Don&apos;t have an account? <Link href="/auth/register" style={{ color: 'white', fontWeight: 600 }}>Create new</Link>
                </div>

            </div>
        </div>
    );
}

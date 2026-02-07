
import React from 'react';

export default async function PromotionPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const path = slug.join('/');

    const titles: Record<string, string> = {
        'flash-sale/settings': 'Flash Sale Settings',
        'flash-sale/products': 'Flash Sale Products',
        'vouchers': 'Manage Vouchers',
        'banners': 'Homepage Banners',
        'news': 'News & Updates',
        'icons': 'Product Icons',
    };

    // Capitalize slug parts for fallback title
    const fallbackTitle = slug.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const title = titles[path] || fallbackTitle;

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>{title}</h1>

            <div style={{
                background: 'rgba(25, 25, 25, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '3rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#a1a1aa'
            }}>
                <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem'
                }}>
                    <span style={{ fontSize: '2rem' }}>🚧</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: '0.5rem' }}>Feature Under Construction</h2>
                <p style={{ maxWidth: '400px' }}>
                    The <strong>{title}</strong> module is currently being developed.
                    Please check back later for updates.
                </p>
            </div>
        </div>
    );
}

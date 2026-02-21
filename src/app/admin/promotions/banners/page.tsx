"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function BannersPage() {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await fetch('/api/admin/banners');
            const json = await res.json();
            if (json.success) {
                setBanners(json.data);
            }
        } catch (error) {
            console.error("Failed to fetch banners", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageUrl) return;
        setIsSaving(true);

        try {
            const res = await fetch('/api/admin/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: newImageUrl })
            });
            const json = await res.json();

            if (json.success) {
                setNewImageUrl('');
                fetchBanners(); // Reload list
            } else {
                alert(json.message || "Failed to add banner");
            }
        } catch (error) {
            alert("Error adding banner");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;

        try {
            const res = await fetch(`/api/admin/banners/${id}`, {
                method: 'DELETE'
            });
            const json = await res.json();

            if (json.success) {
                fetchBanners(); // Reload list
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            alert("Error deleting banner");
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>Homepage Banners</h1>

            {/* Add Banner Form */}
            <div style={{
                background: 'rgba(25, 25, 25, 0.6)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem',
                padding: '2rem', marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Plus size={20} /> Add New Banner
                </h2>

                <form onSubmit={handleAddBanner} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>Banner Image URL</label>
                        <input
                            type="url"
                            placeholder="https://example.com/banner-image.jpg"
                            style={{
                                width: '100%', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '0.5rem', outline: 'none'
                            }}
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{
                                padding: '0.75rem 2rem', borderRadius: '0.5rem',
                                background: 'linear-gradient(90deg, #00f0ff, #bd00ff)', border: 'none',
                                color: 'black', fontWeight: 'bold', cursor: isSaving ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                            Upload Banner
                        </button>
                    </div>
                </form>

                {newImageUrl && (
                    <div style={{ marginTop: '1rem' }}>
                        <p style={{ color: '#a1a1aa', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Preview:</p>
                        <img
                            src={newImageUrl}
                            alt="Preview"
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}
            </div>

            {/* Banner List */}
            <div style={{
                background: 'rgba(25, 25, 25, 0.6)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '1rem',
                padding: '2rem'
            }}>
                <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ImageIcon size={20} /> Active Banners
                </h2>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#a1a1aa' }}>Loading banners...</div>
                ) : banners.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#a1a1aa', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                        No banners found. Add one above to display it on the homepage.
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {banners.map((banner: any) => (
                            <div key={banner.id} style={{
                                background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '0.75rem', overflow: 'hidden', position: 'relative',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
                                    {/* 16:9 Aspect Ratio Container Placeholder */}
                                    <img
                                        src={banner.imageUrl}
                                        alt="Banner"
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>ID: {banner.id.slice(-6)}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Added: {new Date(banner.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        style={{
                                            padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444',
                                            color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        title="Delete Banner"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

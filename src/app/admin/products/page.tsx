"use client";
import React, { useState, useEffect } from 'react';
import styles from '@/components/admin/Admin.module.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function AdminProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleUpdateDiscount = async (id: string, isDiscount?: boolean, discountPercent?: number) => {
        // Optimistic UI update
        setProducts(products.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    isDiscount: isDiscount !== undefined ? isDiscount : p.isDiscount,
                    discountPercent: discountPercent !== undefined ? discountPercent : p.discountPercent
                };
            }
            return p;
        }));

        const body: any = {};
        if (isDiscount !== undefined) body.isDiscount = isDiscount;
        if (discountPercent !== undefined) body.discountPercent = discountPercent;

        try {
            await fetch(`/api/admin/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.error(error);
            // In case of error, re-fetch products to get the real state
            fetchProducts();
        }
    };

    // Filter logic
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.game?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <AdminSidebar />

            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Product Management</h1>
                    <button className={styles.menuItem} style={{
                        background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))',
                        color: 'black', fontWeight: '700', border: 'none'
                    }}>
                        <Plus size={18} />
                        Add Product
                    </button>
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                        background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                        padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1
                    }}>
                        <Search size={18} color="#666" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select style={{
                        background: '#18181b', border: '1px solid var(--glass-border)', color: 'white',
                        padding: '0 1rem', borderRadius: '0.5rem', cursor: 'pointer'
                    }}>
                        <option value="all">All Games</option>
                    </select>
                </div>

                {/* Products Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>SKU/Code</th>
                                <th>Game</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Selling Price</th>
                                <th>Discount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</td></tr>
                            ) : filteredProducts.map((p) => {
                                const currentSellingPrice = (p.isDiscount && p.discountPercent > 0)
                                    ? p.sellingPrice - (p.sellingPrice * (p.discountPercent / 100))
                                    : p.sellingPrice;

                                return (
                                    <tr key={p.id}>
                                        <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>{p.code}</td>
                                        <td>{p.game?.name}</td>
                                        <td style={{ fontWeight: '600' }}>{p.name}</td>
                                        <td style={{ color: '#ef4444' }}>Rp {p.price.toLocaleString()}</td>
                                        <td style={{ color: '#22c55e' }}>
                                            {p.isDiscount && p.discountPercent > 0 ? (
                                                <div>
                                                    <span style={{ textDecoration: 'line-through', color: '#666', fontSize: '0.8rem', display: 'block' }}>
                                                        Rp {Math.floor(p.sellingPrice).toLocaleString()}
                                                    </span>
                                                    <span style={{ fontWeight: 'bold' }}>Rp {Math.floor(currentSellingPrice).toLocaleString()}</span>
                                                </div>
                                            ) : (
                                                <span style={{ fontWeight: 'bold' }}>Rp {Math.floor(p.sellingPrice).toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.5rem' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={p.isDiscount || false}
                                                        onChange={(e) => handleUpdateDiscount(p.id, e.target.checked, undefined)}
                                                    />
                                                    <span style={{ fontSize: '0.8rem', color: p.isDiscount ? '#22c55e' : '#666' }}>Active</span>
                                                </label>

                                                {p.isDiscount && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="99"
                                                            value={p.discountPercent || ''}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val) && val >= 1 && val <= 99) {
                                                                    handleUpdateDiscount(p.id, undefined, val);
                                                                } else if (e.target.value === '') {
                                                                    handleUpdateDiscount(p.id, undefined, 0); // Allow empty temporarily
                                                                }
                                                            }}
                                                            onBlur={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (isNaN(val) || val < 1 || val > 99) {
                                                                    // Re-fetch to reset on invalid blur, or reset to 1
                                                                    handleUpdateDiscount(p.id, undefined, 1);
                                                                }
                                                            }}
                                                            style={{
                                                                width: '50px', background: '#27272a', border: '1px solid var(--glass-border)',
                                                                color: 'white', padding: '0.2rem', borderRadius: '0.25rem', textAlign: 'center'
                                                            }}
                                                        />
                                                        <span style={{ fontSize: '0.8rem' }}>%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#27272a', border: 'none', color: 'white', cursor: 'pointer' }}>
                                                    <Edit size={16} />
                                                </button>
                                                <button style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

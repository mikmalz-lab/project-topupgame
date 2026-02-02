"use client";
import React, { useState } from 'react';
import styles from '@/components/admin/Admin.module.css';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

// Mock Data
const MOCK_PRODUCTS = [
    { id: 'P-001', game: 'Mobile Legends', code: 'ML-5', name: '5 Diamonds', vendorPrice: 1400, sellingPrice: 1500, stock: 'Unlimited' },
    { id: 'P-002', game: 'Mobile Legends', code: 'ML-10', name: '10 Diamonds', vendorPrice: 2800, sellingPrice: 2900, stock: 'Unlimited' },
    { id: 'P-003', game: 'Free Fire', code: 'FF-140', name: '140 Diamonds', vendorPrice: 19500, sellingPrice: 20000, stock: 'Unlimited' },
    { id: 'P-004', game: 'PUBG Mobile', code: 'PUBG-60', name: '60 UC', vendorPrice: 14000, sellingPrice: 15000, stock: 'Unlimited' },
    { id: 'P-005', game: 'Genshin Impact', code: 'GI-WELKIN', name: 'Welkin Moon', vendorPrice: 75000, sellingPrice: 79000, stock: 'Unlimited' },
];

export default function AdminProducts() {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter logic
    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.game.toLowerCase().includes(searchTerm.toLowerCase())
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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select style={{
                        background: '#18181b', border: '1px solid var(--glass-border)', color: 'white',
                        padding: '0 1rem', borderRadius: '0.5rem', cursor: 'pointer'
                    }}>
                        <option value="all">All Games</option>
                        <option value="ml">Mobile Legends</option>
                        <option value="ff">Free Fire</option>
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
                                <th>Vendor Price</th>
                                <th>Selling Price</th>
                                <th>Profit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p) => (
                                <tr key={p.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>{p.code}</td>
                                    <td>{p.game}</td>
                                    <td style={{ fontWeight: '600' }}>{p.name}</td>
                                    <td style={{ color: '#ef4444' }}>Rp {p.vendorPrice.toLocaleString()}</td>
                                    <td style={{ color: '#22c55e' }}>Rp {p.sellingPrice.toLocaleString()}</td>
                                    <td style={{ fontWeight: '700' }}>Rp {(p.sellingPrice - p.vendorPrice).toLocaleString()}</td>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

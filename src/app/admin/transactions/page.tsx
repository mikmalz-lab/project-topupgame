import Link from 'next/link';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import styles from '@/components/admin/Admin.module.css';
import { RefreshCw, Search } from 'lucide-react';
import prisma from '@/lib/prisma';

// Force dynamic fetch so data is always fresh (Live)
export const dynamic = 'force-dynamic';

export default async function TransactionsPage({
    searchParams
}: {
    searchParams?: Promise<{ q?: string; status?: string }>;
}) {
    const params = await searchParams;
    const query = params?.q || '';
    const statusFilter = params?.status || 'All';

    // Build Filter Logic
    const whereCondition: any = {};

    if (statusFilter !== 'All') {
        const mapStatus: Record<string, string> = {
            'Success': 'SUCCESS',
            'Pending': 'PENDING',
            'Failed': 'FAILED'
        };
        if (mapStatus[statusFilter]) {
            whereCondition.status = mapStatus[statusFilter];
        }
    }

    if (query) {
        whereCondition.OR = [
            { invoiceId: { contains: query, mode: 'insensitive' } },
            { user: { name: { contains: query, mode: 'insensitive' } } }
        ];
    }

    // Fetch Real Data from Database
    const transactions = await prisma.transaction.findMany({
        where: whereCondition,
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
            product: {
                include: {
                    game: true
                }
            },
            paymentMethod: true
        }
    });

    return (
        <div>
            <AdminSidebar />
            <main className={styles.mainContent}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>Transaction History</h1>
                    <Link href="/admin/transactions" className={styles.menuItem} style={{ border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'white', textDecoration: 'none' }}>
                        <RefreshCw size={18} />
                        Sync Status
                    </Link>
                </div>

                {/* Filter Section (Server-Side Navigation) */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <form
                        action="/admin/transactions"
                        method="GET"
                        style={{ flex: 1, position: 'relative', minWidth: '300px' }}
                    >
                        <Search size={18} color="#666" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="search"
                            name="q"
                            defaultValue={query}
                            placeholder="Search Invoice ID or User..."
                            style={{
                                width: '100%', padding: '1rem', paddingLeft: '3rem',
                                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
                                borderRadius: '0.75rem', color: 'white', outline: 'none'
                            }}
                        />
                    </form>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['All', 'Success', 'Pending', 'Failed'].map(name => (
                            <Link
                                key={name}
                                href={`/admin/transactions?status=${name}${query ? `&q=${query}` : ''}`}
                                className={styles.menuItem}
                                style={{
                                    background: statusFilter === name ? 'var(--neon-blue)' : 'transparent',
                                    color: statusFilter === name ? 'black' : '#a1a1aa',
                                    border: statusFilter === name ? 'none' : '1px solid var(--glass-border)',
                                    fontWeight: 600,
                                    textDecoration: 'none'
                                }}
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Payment</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                                        No transaction data found in database.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((trx) => (
                                    <tr key={trx.id}>
                                        <td style={{ fontFamily: 'monospace', color: '#a1a1aa' }}>
                                            {trx.invoiceId}
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '0.9rem' }}>
                                                {new Date(trx.createdAt).toLocaleDateString()}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>
                                                {new Date(trx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{trx.user?.name || 'Guest'}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>ID: {trx.targetId}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{trx.product?.game?.name || 'Unknown Game'}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>{trx.product?.name || 'Item'}</div>
                                        </td>
                                        <td>
                                            {trx.paymentMethod?.code || 'QRIS'}
                                        </td>
                                        <td style={{ fontWeight: 700 }}>
                                            Rp {trx.totalAmount.toLocaleString()}
                                        </td>
                                        <td>
                                            <span className={`${styles.status} ${trx.status === 'SUCCESS' ? styles.statusSuccess :
                                                trx.status === 'PENDING' ? styles.statusPending :
                                                    ''
                                                }`}
                                                style={trx.status === 'FAILED' ? { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' } : {}}
                                            >
                                                {trx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
}

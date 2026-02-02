"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Wallet,
    History,
    Settings,
    LogOut,
    User
} from 'lucide-react';
import styles from '@/components/admin/Admin.module.css'; // Reuse Admin styles for consistency

const MENU_ITEMS = [
    { name: 'Dashboard', href: '/member/dashboard', icon: LayoutDashboard },
    { name: 'Deposit Saldo', href: '/member/deposit', icon: Wallet },
    { name: 'Riwayat Transaksi', href: '/member/history', icon: History },
    { name: 'Pengaturan Akun', href: '/member/settings', icon: Settings },
];

export function MemberSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #bd00ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} color="black" />
                </div>
                <span>Member Area</span>
            </div>

            <div style={{ padding: '0 1rem 1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ color: '#a1a1aa', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Welcome back,</div>
                <div style={{ fontWeight: '700', color: 'white' }}>Jhon Doe</div>
                <div style={{ color: '#22c55e', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: '600' }}>
                    Rp 150.000
                </div>
            </div>

            <nav className={styles.menu}>
                {MENU_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.logout}>
                <button className={styles.menuItem} style={{ width: '100%', border: 'none', background: 'transparent' }} onClick={() => window.location.href = '/'}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

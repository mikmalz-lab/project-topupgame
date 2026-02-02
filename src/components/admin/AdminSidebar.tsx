"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Gamepad2,
    Wallet,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import styles from './Admin.module.css';

const MENU_ITEMS = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', href: '/admin/transactions', icon: Wallet },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Simple effect to adjust main content margin
    useEffect(() => {
        const main = document.querySelector(`.${styles.mainContent}`);
        if (main) {
            if (isCollapsed) main.classList.add(styles.expanded);
            else main.classList.remove(styles.expanded);
        }
    }, [isCollapsed]);

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                    position: 'absolute', right: '-12px', top: '28px',
                    background: 'var(--neon-blue)', border: 'none', borderRadius: '50%',
                    width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 10,
                    boxShadow: '0 0 10px rgba(0,240,255,0.5)'
                }}
            >
                {isCollapsed ? <ChevronRight size={14} color="black" /> : <ChevronLeft size={14} color="black" />}
            </button>

            <div className={styles.logo}>
                <Gamepad2 className={styles.logoIcon} color="#00f0ff" />
                <span>AdminPanel</span>
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
                            title={isCollapsed ? item.name : ''}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.logout}>
                <Link href="/" className={styles.menuItem} style={{ width: '100%', border: 'none', background: 'transparent', textDecoration: 'none' }}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
}

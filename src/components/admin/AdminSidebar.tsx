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
    Megaphone,
    Ticket,
    Image as ImageIcon,
    Zap,
    FileText,
    Star
} from 'lucide-react';

import styles from './Admin.module.css';

const MENU_ITEMS = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', href: '/admin/transactions', icon: Wallet },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    {
        name: 'Promotions',
        icon: Megaphone,
        href: '#', // Submenu trigger
        subItems: [
            { name: 'Flash Sale Settings', href: '/admin/promotions/flash-sale/settings', icon: Zap },
            { name: 'Flash Sale Products', href: '/admin/promotions/flash-sale/products', icon: Star },
            { name: 'Vouchers', href: '/admin/promotions/vouchers', icon: Ticket },
            { name: 'Banners', href: '/admin/promotions/banners', icon: ImageIcon },
            { name: 'News', href: '/admin/promotions/news', icon: FileText },
            { name: 'Product Icons', href: '/admin/promotions/icons', icon: Gamepad2 },
        ]
    },
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
                    const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href));

                    // Simple state for open/close submenu? 
                    // ideally we should use state, but we are inside map.
                    // We can check if active to open by default or use a details/summary approach, 
                    // but for a smooth transition a state at the parent level is better.
                    // However, to keep it simple and modifying existing structure:

                    return (
                        <div key={item.name}>
                            <Link
                                href={item.href === '#' ? '#' : item.href}
                                className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                                title={isCollapsed ? item.name : ''}
                                onClick={(e) => {
                                    if (item.subItems) {
                                        e.preventDefault();
                                        // Toggle logic could go here via a state, 
                                        // but for now let's just show them if active or maybe always expand?
                                        // Let's rely on CSS hover or a separate component?
                                        // Actually, let's just render them if it's the Promotions tab.
                                    }
                                }}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>

                            {/* Submenu */}
                            {!isCollapsed && item.subItems && (
                                <div style={{
                                    paddingLeft: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem',
                                    marginTop: '-0.5rem'
                                }}>
                                    {item.subItems.map((sub) => {
                                        const SubIcon = sub.icon;
                                        const isSubActive = pathname === sub.href;
                                        return (
                                            <Link
                                                key={sub.href}
                                                href={sub.href}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: isSubActive ? 'var(--neon-blue)' : '#a1a1aa',
                                                    fontSize: '0.9rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                {SubIcon && <SubIcon size={14} />}
                                                <span>{sub.name}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
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

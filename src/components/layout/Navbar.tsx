"use client";
import Link from 'next/link';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Gamepad2 className={styles.logoIcon} />
          <span>TopUp<span className={styles.highlight}>Game</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.links}>
          <Link href="/#games" className={styles.link}>Games</Link>
          <Link href="/status" className={styles.link}>Check Order</Link>
          <Link href="/auth/login" className={styles.buttonGhost}>
            Login
          </Link>
          <Link href="/auth/register" className={styles.buttonPrimary}>
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link href="/#games" className={styles.link} onClick={() => setIsOpen(false)}>Games</Link>
            <Link href="/status" className={styles.link} onClick={() => setIsOpen(false)}>Check Order</Link>
            <Link href="/auth/login" className={styles.buttonGhost} onClick={() => setIsOpen(false)}>Login</Link>
            <Link href="/auth/register" className={styles.buttonPrimary} onClick={() => setIsOpen(false)}>Sign Up</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

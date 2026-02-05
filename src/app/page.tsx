"use client";
import styles from './page.module.css';
import { Navbar } from '@/components/layout/Navbar';
import { Search, Flame, Zap, Gamepad2, Trophy, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Data for "Popular" section to demonstrate layout
const POPULAR_GAMES = [
  { id: 1, name: 'Mobile Legends', publisher: 'Moonton', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, name: 'Free Fire', publisher: 'Garena', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
  { id: 3, name: 'PUBG Mobile', publisher: 'Tencent', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 4, name: 'Genshin Impact', publisher: 'HoYoverse', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 5, name: 'Valorant', publisher: 'Riot Games', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { id: 6, name: 'Honor of Kings', publisher: 'Tencent', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
];

export default function Home() {
  return (
    <div className={styles.main}>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Top Up Your <br />
            <span>Favorite Games</span>
          </h1>
          <p className={styles.subtitle}>
            Instant delivery, secure payment, and 24/7 support.
            The most trusted platform for gamers.
          </p>

          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search games (e.g. Mobile Legends)..." className={styles.searchInput} />
          </div>
        </div>

        {/* Background Atmosphere */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)',
          zIndex: 1, pointerEvents: 'none'
        }} />
      </section>

      {/* Popular Section */}
      <section className={styles.section} id="games">
        <h2 className={styles.sectionTitle}>
          <Flame size={24} color="#bd00ff" />
          Popular Now
        </h2>

        <div className={styles.grid}>
          {POPULAR_GAMES.map((game) => (
            <Link href={`/games/${game.name.toLowerCase().replace(/\s+/g, '-')}`} key={game.id} className={styles.card}>
              <div className={styles.cardImage} style={{ background: game.gradient }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gamepad2 size={48} color="rgba(0,0,0,0.2)" />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{game.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p className={styles.cardPublisher}>{game.publisher}</p>
                  <Star size={14} fill="#fdc" color="#fdc" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <Trophy size={24} color="#00f0ff" />
          Featured Promotions
        </h2>
        <div style={{
          width: '100%', height: '200px', borderRadius: '1rem',
          background: 'linear-gradient(to right, #222, #333)',
          border: '1px solid var(--glass-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <p style={{ color: '#666' }}>Main Promo Banner Slider Space</p>
        </div>
      </section>

      {/* Footer Stub */}
      <footer style={{
        marginTop: 'auto', padding: '3rem 2rem',
        borderTop: '1px solid var(--glass-border)',
        background: 'rgba(0,0,0,0.5)',
        width: '100%', textAlign: 'center'
      }}>
        <p style={{ color: '#666' }}>
          &copy; 2024 TopUpGame. Secure Payments via QRIS, E-Wallet, and Bank Transfer.
        </p>
      </footer>
    </div>
  );
}

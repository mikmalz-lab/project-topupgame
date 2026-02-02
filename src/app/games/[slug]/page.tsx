import { Navbar } from '@/components/layout/Navbar';
import styles from './page.module.css';
import { Gamepad2, ShieldCheck, Zap } from 'lucide-react';
import { GameOrderForm } from '@/components/game/GameOrderForm';

export default async function GameDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // Format slug back to Title (mock logic)
    const gameTitle = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className={styles.container}>
            <Navbar />

            {/* Hero Banner */}
            <div className={styles.banner}>
                {/* Placeholder Gradient BG since we don't have real images yet */}
                <div className={styles.bannerImage} style={{
                    background: 'linear-gradient(to bottom, #2b1055, #7597de)',
                    width: '100%', height: '100%'
                }} />

                <div className={styles.headerContent}>
                    <div className={styles.gameIcon}>
                        <Gamepad2 size={64} color="white" />
                    </div>
                    <div className={styles.gameInfo}>
                        <h1 className={styles.gameTitle}>{gameTitle}</h1>
                        <div className={styles.gamePublisher}>
                            <ShieldCheck size={18} />
                            <span>Official Distributor</span>
                            <span style={{ margin: '0 0.5rem', color: '#666' }}>•</span>
                            <Zap size={18} color="#ebaf00" />
                            <span style={{ color: '#ebaf00' }}>Instant Delivery</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form Area */}
            <GameOrderForm gameName={gameTitle} />

        </div>
    );
}

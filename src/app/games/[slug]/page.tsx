import { Navbar } from '@/components/layout/Navbar';
import styles from './page.module.css';
import { Gamepad2, ShieldCheck, Zap } from 'lucide-react';
import { GameOrderForm } from '@/components/game/GameOrderForm';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';


export default async function GameDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const prisma = new PrismaClient();

    const game = await prisma.game.findUnique({
        where: { slug },
        include: {
            products: {
                where: { isActive: true },
                orderBy: { price: 'asc' }
            }
        }
    });

    if (!game) {
        notFound();
    }

    // Format slug back to Title (mock logic if needed, but we have game.name)
    const gameTitle = game.name;

    return (
        <div className={styles.container}>
            <Navbar />

            {/* Hero Banner */}
            <div className={styles.banner}>
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
            <GameOrderForm gameName={gameTitle} products={game.products} />

        </div>
    );
}

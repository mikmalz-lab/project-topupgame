
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // 1. Create Game: Mobile Legends
    const game = await prisma.game.create({
        data: {
            name: 'Mobile Legends',
            slug: 'mobile-legends',
            publisher: 'Moonton',
            description: '5v5 MOBA Game',
            thumbnailUrl: '/images/games/mlbb.jpg',
            bannerUrl: '/images/games/mlbb-banner.jpg',
        }
    });

    console.log('Created Game:', game.name);

    // 2. Create Category (Diamonds)
    const catDiamonds = await prisma.category.create({
        data: { name: 'Diamonds', gameId: game.id }
    });
    const catMembership = await prisma.category.create({
        data: { name: 'Membership', gameId: game.id }
    });

    // 3. Create Products (Matching IDs from Frontend as 'code')
    const products = [
        { code: 'd-5', name: '5 Diamonds', price: 1400, sellingPrice: 1500, categoryId: catDiamonds.id },
        { code: 'd-10', name: '10 Diamonds', price: 2800, sellingPrice: 2900, categoryId: catDiamonds.id },
        { code: 'd-50', name: '50 Diamonds', price: 13500, sellingPrice: 14000, categoryId: catDiamonds.id },
        { code: 'd-100', name: '100 + 10 Diamonds', price: 27000, sellingPrice: 28000, categoryId: catDiamonds.id },
        { code: 'd-250', name: '250 + 25 Diamonds', price: 68000, sellingPrice: 70000, categoryId: catDiamonds.id },
        { code: 'd-500', name: '500 + 60 Diamonds', price: 130000, sellingPrice: 135000, categoryId: catDiamonds.id },
        { code: 'sl-1', name: 'Starlight Membership', price: 140000, sellingPrice: 145000, categoryId: catMembership.id },
        { code: 'sl-plus', name: 'Starlight Plus', price: 280000, sellingPrice: 290000, categoryId: catMembership.id },
        { code: 'tw-1', name: 'Twilight Pass', price: 145000, sellingPrice: 150000, categoryId: catMembership.id },
    ];

    for (const p of products) {
        await prisma.product.create({
            data: {
                code: p.code,
                name: p.name,
                price: p.price,
                sellingPrice: p.sellingPrice,
                gameId: game.id,
                categoryId: p.categoryId
            }
        });
    }
    console.log(`Created ${products.length} products.`);

    // 4. Create Payment Methods
    const payments = [
        { code: 'qris', name: 'QRIS (All E-Wallet)', feeCustom: 0, feePercent: 0.7 },
        { code: 'gopay', name: 'GoPay', feeCustom: 1000, feePercent: 2 },
        { code: 'dana', name: 'DANA', feeCustom: 0, feePercent: 1.5 },
    ];

    for (const p of payments) {
        await prisma.paymentMethod.create({
            data: {
                code: p.code,
                name: p.name,
                feeCustom: p.feeCustom,
                feePercent: p.feePercent
            }
        });
    }
    console.log(`Created ${payments.length} payment methods.`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

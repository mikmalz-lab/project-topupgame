import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    const password = "$2b$10$9aAoxGPmo8q.dlGjfCVcde7rhqMWLaLkYOC14rh572bGgeI8NFHO."; // pre-hashed "p@ssw0rd"

    // 1. Create Admins
    const admin1 = await prisma.user.upsert({
        where: { email: 'admin1@topup.com' },
        update: { password: password },
        create: {
            email: 'admin1@topup.com',
            name: 'Super Admin',
            password: password,
            role: 'ADMIN',
            balance: 0,
        },
    });

    const owner = await prisma.user.upsert({
        where: { email: 'owner@topup.com' },
        update: { password: password },
        create: {
            email: 'owner@topup.com',
            name: 'Owner Bos',
            password: password,
            role: 'ADMIN',
            balance: 100000000,
        },
    });

    const staff = await prisma.user.upsert({
        where: { email: 'staff@topup.com' },
        update: { password: password },
        create: {
            email: 'staff@topup.com',
            name: 'Support Staff',
            password: password,
            role: 'ADMIN',
            balance: 0,
        },
    });

    // 2. Create Members
    const member1 = await prisma.user.upsert({
        where: { email: 'member1@gmail.com' },
        update: { password: password },
        create: {
            email: 'member1@gmail.com',
            name: 'Sultan Gaming',
            password: password,
            role: 'USER',
            balance: 500000,
        },
    });

    const member2 = await prisma.user.upsert({
        where: { email: 'member2@gmail.com' },
        update: { password: password },
        create: {
            email: 'member2@gmail.com',
            name: 'Player Gratisan',
            password: password,
            role: 'USER',
            balance: 0,
        },
    });

    console.log({ admin1, owner, staff, member1, member2 });

    // 3. Create a Game
    const gameML = await prisma.game.upsert({
        where: { slug: 'mobile-legends' },
        update: {},
        create: {
            name: 'Mobile Legends',
            slug: 'mobile-legends',
            publisher: 'Moonton',
            isActive: true,
        }
    });

    // 4. Create Products for ML
    const productsData = [
        { code: 'ML-5', name: '5 Diamonds', price: 1400, sellingPrice: 1500, gameId: gameML.id },
        { code: 'ML-10', name: '10 Diamonds', price: 2800, sellingPrice: 2900, gameId: gameML.id },
        { code: 'ML-50', name: '50 Diamonds', price: 13500, sellingPrice: 14000, gameId: gameML.id },
        { code: 'ML-100', name: '100 + 10 Diamonds', price: 27000, sellingPrice: 28000, gameId: gameML.id },
        { code: 'ML-250', name: '250 + 25 Diamonds', price: 68000, sellingPrice: 70000, gameId: gameML.id },
    ];

    for (const p of productsData) {
        await prisma.product.upsert({
            where: { code: p.code },
            update: { price: p.price, sellingPrice: p.sellingPrice, gameId: p.gameId },
            create: p,
        });
    }

    console.log({ gameML, productsCreated: productsData.length });
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    const password = "$2b$10$9aAoxGPmo8q.dlGjfCVcde7rhqMWLaLkYOC14rh572bGgeI8NFHO."; // pre-hashed "p@ssw0rd"

    // 1. Create Admins
    await prisma.user.upsert({
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

    await prisma.user.upsert({
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

    await prisma.user.upsert({
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
    await prisma.user.upsert({
        where: { email: 'member1@gmail.com' },
        update: { password: password },
        create: {
            email: 'member1@gmail.com',
            name: 'Sultan Gaming',
            password: password,
            role: 'USER', // or MEMBER
            balance: 500000, // Saldo awal 500rb
        },
    });

    await prisma.user.upsert({
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

    console.log('Seeding finished successfully.');
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

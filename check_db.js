
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- DB Check ---');
    const games = await prisma.game.findMany();
    console.log(`Games found: ${games.length}`);
    games.forEach(g => console.log(` - ${g.name} (${g.slug})`));

    const products = await prisma.product.findMany();
    console.log(`Products found: ${products.length}`);
    products.forEach(p => console.log(` - ${p.name} (Code: ${p.code})`));

    const payments = await prisma.paymentMethod.findMany();
    console.log(`PaymentMethods found: ${payments.length}`);
    payments.forEach(p => console.log(` - ${p.name} (Code: ${p.code})`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

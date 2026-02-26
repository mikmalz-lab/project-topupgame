import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                game: true
            },
            orderBy: {
                price: 'asc'
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const updateData: any = {};
        if (typeof body.isDiscount === 'boolean') updateData.isDiscount = body.isDiscount;
        if (typeof body.discountPercent === 'number') updateData.discountPercent = body.discountPercent;

        const product = await prisma.product.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product discount' }, { status: 500 });
    }
}

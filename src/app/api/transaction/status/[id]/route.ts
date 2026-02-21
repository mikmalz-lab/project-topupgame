import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        const transaction = await prisma.transaction.findFirst({
            where: {
                OR: [
                    { invoiceId: id },
                    { targetId: id } // Allows searching by Phone Number/Player ID too
                ]
            },
            include: {
                product: {
                    include: {
                        game: true
                    }
                }
            }
        });

        if (!transaction) {
            return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                invoiceId: transaction.invoiceId,
                status: transaction.status,
                paymentStatus: transaction.paymentStatus,
                productName: `${transaction.product.name} (${transaction.product.game.name})`,
                amount: transaction.amount,
                targetId: transaction.targetId
            }
        });
    } catch (error) {
        console.error("Error fetching transaction:", error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

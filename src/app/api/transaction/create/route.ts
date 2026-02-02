import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ensure this path is correct based on project structure

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, serverId, itemId, paymentMethod, amount } = body;

        // 1. Validate Product
        const product = await prisma.product.findUnique({
            where: { code: itemId },
            include: { game: true }
        });

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 400 });
        }

        // 2. Validate Payment Method
        const payment = await prisma.paymentMethod.findUnique({
            where: { code: paymentMethod }
        });

        if (!payment) {
            return NextResponse.json({ success: false, message: 'Payment method not found' }, { status: 400 });
        }

        // 3. Calculate Fees (Server-side validation)
        const itemPrice = product.sellingPrice;
        const fee = (itemPrice * (payment.feePercent / 100)) + payment.feeCustom;
        const totalAmount = itemPrice + fee;

        // 4. Generate Invoice ID
        const invoiceId = `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

        // 5. Create Transaction in DB
        const transaction = await prisma.transaction.create({
            data: {
                invoiceId,
                targetId: userId,
                targetServer: serverId,
                productId: product.id,
                gameId: product.gameId, // Store gameId directly as per schema
                paymentMethodId: payment.id,
                amount: itemPrice,
                fee: fee,
                totalAmount: totalAmount,
                status: 'PENDING',
                paymentStatus: 'UNPAID',
                paymentUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=PAY-MOCK-${invoiceId}`
            }
        });

        return NextResponse.json({
            success: true,
            data: {
                id: transaction.id,
                invoiceId: transaction.invoiceId,
                status: transaction.status,
                amount: transaction.totalAmount,
                expiredAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
                payment: {
                    method: payment.name,
                    qrisUrl: transaction.paymentUrl,
                    instructions: [
                        "Buka aplikasi E-Wallet (GoPay/OVO/DANA/ShopeePay).",
                        "Scan QR Code di atas.",
                        "Periksa nominal pembayaran.",
                        "Selesaikan pembayaran."
                    ]
                }
            }
        });

    } catch (error) {
        console.error('Transaction Create Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

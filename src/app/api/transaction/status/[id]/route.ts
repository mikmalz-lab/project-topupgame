import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // In a real app, we would query the Database here.
    // user = await prisma.transaction.findUnique(...)

    // For Mock Demo:
    // We assume it's pending unless we pass a query param ?sim=success (handled by frontend logic mostly)

    return NextResponse.json({
        success: true,
        data: {
            status: 'PENDING', // Default to pending
            message: 'Waiting for payment...'
        }
    });
}

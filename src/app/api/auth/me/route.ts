import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ success: false, data: null }, { status: 401 });
    }

    // Fetch fresh data from DB
    const user = await prisma.user.findUnique({
        where: { id: session.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            balance: true,
            whatsapp: true
        }
    });

    if (!user) {
        // Invalid session? clear cookie
        const cookieStore = await cookies();
        cookieStore.delete('auth_token');
        return NextResponse.json({ success: false, data: null }, { status: 401 });
    }

    return NextResponse.json({
        success: true,
        data: user
    });
}

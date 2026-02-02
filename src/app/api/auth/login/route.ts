import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, message: 'Missing email or password' }, { status: 400 });
        }

        // Find User
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        // Validate Password (Plain text check for seeded data)
        // In real app: await bcrypt.compare(password, user.password)
        if (user.password !== password) {
            return NextResponse.json({ success: false, message: 'Invalid Credentials' }, { status: 401 });
        }

        // Generate Token
        const token = signToken({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        });

        // Set Cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return NextResponse.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                balance: user.balance
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

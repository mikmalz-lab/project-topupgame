import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const banners = await prisma.banner.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ success: true, data: banners });
    } catch (error) {
        console.error('Error fetching banners:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return NextResponse.json({ success: false, message: 'Image URL is required' }, { status: 400 });
        }

        // Auto-fix Github blob URLs to raw image URLs
        let finalImageUrl = imageUrl;
        if (finalImageUrl.includes('github.com') && finalImageUrl.includes('/blob/')) {
            finalImageUrl = finalImageUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
        }

        const newBanner = await prisma.banner.create({
            data: { imageUrl: finalImageUrl }
        });

        return NextResponse.json({ success: true, data: newBanner });
    } catch (error) {
        console.error('Error creating banner:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

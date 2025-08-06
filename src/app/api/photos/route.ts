import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/photos - Get all non-deleted photos
export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      where: {
        isDeleted: false
      },
      orderBy: {
        uploadedAt: 'desc'
      }
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// POST /api/photos - Upload new photo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, phoneNumber } = body;

    if (!url || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate that url is a proper base64 image
    if (!url.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image format. Please upload a valid image file.' },
        { status: 400 }
      );
    }

    // Validate mobile number
    if (phoneNumber !== '7016418231') {
      return NextResponse.json(
        { error: 'Unauthorized mobile number. Only 7016418231 can upload photos.' },
        { status: 401 }
      );
    }

    const photo = await prisma.photo.create({
      data: {
        url,
        phoneNumber
      }
    });

    return NextResponse.json(photo);
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
} 
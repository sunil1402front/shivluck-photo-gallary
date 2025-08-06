import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
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
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const phoneNumber = formData.get('phoneNumber') as string;

    if (!file || !phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload an image.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Please upload an image smaller than 10MB.' },
        { status: 400 }
      );
    }



    
    // Validate mobile number
    if (phoneNumber !== '7016418231') {
      return NextResponse.json(
        { error: 'Unauthorized mobile number. Only 7016418231 can upload photos.' },
        { status: 400 }
      );
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `shivluck-${timestamp}.${fileExtension}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: 'public',
    });

    // Save to database with the Vercel Blob URL
    const photo = await prisma.photo.create({
      data: {
        url: blob.url,
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
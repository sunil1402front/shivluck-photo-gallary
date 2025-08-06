import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE /api/photos/[id] - Delete photo by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const mobileNumber = searchParams.get('mobileNumber');

    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    // Check if mobile number is authorized
    if (mobileNumber !== '7016418231') {
      return NextResponse.json(
        { error: 'Unauthorized mobile number. Only 7016418231 can delete photos.' },
        { status: 401 }
      );
    }

    const photo = await prisma.photo.findUnique({
      where: { id: params.id }
    });

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    // Soft delete the photo
    await prisma.photo.update({
      where: { id: params.id },
      data: { isDeleted: true }
    });

    return NextResponse.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
} 
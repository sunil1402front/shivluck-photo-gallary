import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE /api/photos/[id] - Delete photo by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Check if password is authorized
    if (password !== '123' && password !== '456') {
      return NextResponse.json(
        { error: 'Invalid password. Please enter 123 or 456' },
        { status: 401 }
      );
    }

    const photo = await prisma.photo.findUnique({
      where: { id }
    });

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }

    // Soft delete the photo
    await prisma.photo.update({
      where: { id },
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
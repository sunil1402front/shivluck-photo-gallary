'use client';

import { useState, useEffect } from 'react';
import { UploadedPhoto } from '../types';
import { Navbar, Footer, PhotoGallery, UploadModal, DeleteModal } from '../components';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [selectedPhotoForDelete, setSelectedPhotoForDelete] = useState<UploadedPhoto | null>(null);

  // Load photos from database on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/photos');
      if (response.ok) {
        const photos = await response.json();
        setUploadedPhotos(photos);
      } else {
        console.error('Failed to fetch photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleUploadClick = () => {
    setIsModalOpen(true);
    setError('');
  };

  const handleDeleteClick = (photo: UploadedPhoto) => {
    setSelectedPhotoForDelete(photo);
    setIsDeleteModalOpen(true);
    setDeleteError('');
  };

  const handleUploadSubmit = async (file: File, phoneNumber: string) => {
    if (!file) {
      setError('Please select an image');
      return;
    }

    if (phoneNumber !== 'interior' && phoneNumber !== 'certificate') {
      setError('Invalid password. Please enter 123 for Interior or 456 for Certificate');
      return;
    }

    setIsLoading(true);
    
    try {
      // Create FormData for file upload to Vercel Blob
      const formData = new FormData();
      formData.append('file', file);
      formData.append('phoneNumber', phoneNumber);
      
      const response = await fetch('/api/photos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newPhoto = await response.json();
        setUploadedPhotos(prev => [newPhoto, ...prev]);
        setIsModalOpen(false);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to upload photo');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async (photoId: string, password: string) => {
    if (password !== '123456') {
      setDeleteError('Invalid admin password. Please enter 123456');
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/photos/${photoId}?password=${password}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the photo from the local state
        setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoId));
        setIsDeleteModalOpen(false);
        setSelectedPhotoForDelete(null);
        setDeleteError('');
      } else {
        const errorData = await response.json();
        setDeleteError(errorData.error || 'Failed to delete photo');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setDeleteError('Failed to delete photo. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPhotoForDelete(null);
    setDeleteError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <Navbar onUploadClick={handleUploadClick} />

      {/* Main Content */}
      <main className="pt-8">
        {/* Gallery Section */}
        <PhotoGallery
          photos={uploadedPhotos}
          onDeleteClick={handleDeleteClick}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUploadSubmit}
        isLoading={isLoading}
        error={error}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        photo={selectedPhotoForDelete}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteSubmit}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  );
}
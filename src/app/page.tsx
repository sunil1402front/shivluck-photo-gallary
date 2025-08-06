'use client';

import { useState, useEffect } from 'react';

interface UploadedPhoto {
  id: string;
  url: string;
  phoneNumber: string;
  uploadedAt: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [deleteMobileNumber, setDeleteMobileNumber] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [photoToDelete, setPhotoToDelete] = useState<UploadedPhoto | null>(null);

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
    setPhotoToDelete(photo);
    setIsDeleteModalOpen(true);
    setDeleteError('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (JPEG, PNG, GIF, etc.)');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size too large. Please select an image smaller than 10MB.');
        return;
      }

      setSelectedImage(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image');
      return;
    }

    if (mobileNumber !== '7016418231') {
      setError('Invalid mobile number. Please enter 7016418231');
      return;
    }

    setIsLoading(true);
    
    try {
      // Convert image to base64 for storage
      const base64 = await convertFileToBase64(selectedImage);
      
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: base64,
          phoneNumber: mobileNumber
        }),
      });

      if (response.ok) {
        const newPhoto = await response.json();
        setUploadedPhotos(prev => [newPhoto, ...prev]);
        setIsModalOpen(false);
        setSelectedImage(null);
        setMobileNumber('');
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

  const handleDeleteSubmit = async () => {
    if (!photoToDelete) return;

    if (deleteMobileNumber !== '7016418231') {
      setDeleteError('Sorry, you are not a SHIVLUCK Organizer');
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/photos/${photoToDelete.id}?mobileNumber=${deleteMobileNumber}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the photo from the local state
        setUploadedPhotos(prev => prev.filter(photo => photo.id !== photoToDelete.id));
        setIsDeleteModalOpen(false);
        setPhotoToDelete(null);
        setDeleteMobileNumber('');
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

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setMobileNumber('');
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPhotoToDelete(null);
    setDeleteMobileNumber('');
    setDeleteError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header with Logo and Round Upload Button */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        {/* Round Upload Button - Fixed at top */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={handleUploadClick}
            className="group relative w-16 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-500 rounded-full"></div>
            <svg className="relative w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Shivluck Logo */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
                SHIVLUCK
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-light">
              Professional Photo Gallery
            </p>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {uploadedPhotos.length > 0 ? (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
              <p className="text-xl text-gray-600">Your uploaded memories</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {uploadedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative"
                >
                  <div className="relative aspect-square">
                    <img
                      src={photo.url}
                      alt="Uploaded photo"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Delete Button - Only visible on hover */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleDeleteClick(photo)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(photo.uploadedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Manage By : <span className="font-bold  bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-500 mb-4 text-white px-2 py-1 rounded-md">SHIVLUCK Interior</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="max-w-lg mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-white/20">
                <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Photos Yet</h3>
                <p className="text-gray-600 mb-8">Start building your photo gallery by uploading your first image</p>
                <button
                  onClick={handleUploadClick}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload First Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Upload Photo</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8">
                {/* Image Upload */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Select Photo
                  </label>
                  <div className="border-3 border-dashed border-indigo-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors bg-gradient-to-br from-indigo-50 to-purple-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {selectedImage ? selectedImage.name : 'Click to select photo'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedImage ? `Size: ${(selectedImage.size / 1024 / 1024).toFixed(2)} MB` : 'All image formats supported'}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter 7016418231"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 text-lg"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Uploading...
                    </div>
                  ) : (
                    'Upload Photo'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && photoToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Delete Photo</h2>
                <button
                  onClick={handleCloseDeleteModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8">
                {/* Warning Message */}
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Are you sure?</h3>
                  <p className="text-red-700">This action cannot be undone. The photo will be permanently deleted.</p>
                </div>

                {/* Mobile Number Verification */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4">
                    Verify Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={deleteMobileNumber}
                    onChange={(e) => setDeleteMobileNumber(e.target.value)}
                    placeholder="Enter 7016418231 to confirm"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-200 text-lg"
                  />
                </div>

                {/* Error Message */}
                {deleteError && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">{deleteError}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteSubmit}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {isDeleting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete Photo'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

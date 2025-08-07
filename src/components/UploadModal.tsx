'use client';

import { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function UploadModal({ isOpen, onClose, onSubmit, isLoading, error }: UploadModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<'interior' | 'certificate'>('interior');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Filter valid images and size
    const validFiles = files.filter(file =>
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024
    );
    setSelectedImages(validFiles);
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) return;
    
    // Validate password based on selected category
    if (category === 'interior' && password !== '123') {
      return;
    }
    if (category === 'certificate' && password !== '456') {
      return;
    }

    // Determine phone number based on category
    const phoneNumber = category;

    await onSubmit(selectedImages, phoneNumber);
    
    // Reset form on successful submission
    setSelectedImages([]);
    setPassword('');
    setCategory('interior');
  };

  const handleClose = () => {
    setSelectedImages([]);
    setPassword('');
    setCategory('interior');
    onClose();
  };

  // Check if password is valid for selected category
  const isPasswordValid = () => {
    if (category === 'interior') {
      return password === '123';
    }
    if (category === 'certificate') {
      return password === '456';
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm transition-all">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upload Photos</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Photos
              </label>
              <div className="border-2 border-dashed border-indigo-200 rounded-lg p-3 text-center bg-gradient-to-br from-indigo-50 to-purple-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {selectedImages.length > 0
                      ? selectedImages.map(img => img.name).join(', ')
                      : 'Click to select photo(s)'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedImages.length > 0
                      ? `Total: ${selectedImages.length} image(s)`
                      : 'All image formats supported'}
                  </p>
                </label>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'interior' | 'certificate')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm bg-white cursor-pointer"
                >
                  <option value="interior">🏠 Interior Image</option>
                  <option value="certificate">🏆 Certificate</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-1 p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${category === 'interior' ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
                  <span className="text-xs font-medium text-gray-700">
                    {category === 'interior' ? 'Interior Design Projects' : 'Professional Certificates'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-4">
                  {category === 'interior'
                    ? 'Showcase your interior design work'
                    : 'Display your professional certifications'}
                </p>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 text-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-2">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || selectedImages.length === 0 || !isPasswordValid()}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-2 px-3 rounded-md hover:shadow-md hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                `Upload ${selectedImages.length} Photo${selectedImages.length !== 1 ? 's' : ''}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
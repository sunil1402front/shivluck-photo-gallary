'use client';

import { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File, phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function UploadModal({ isOpen, onClose, onSubmit, isLoading, error }: UploadModalProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState<'interior' | 'certificate'>('interior');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        return;
      }

      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;
    
    // Validate password based on selected category
    if (category === 'interior' && password !== '123') {
      return;
    }
    if (category === 'certificate' && password !== '456') {
      return;
    }

    // Determine phone number based on category
    const phoneNumber = category;

    await onSubmit(selectedImage, phoneNumber);
    
    // Reset form on successful submission
    setSelectedImage(null);
    setPassword('');
    setCategory('interior');
  };

  const handleClose = () => {
    setSelectedImage(null);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-500 scale-100">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upload Photo</h2>
            <button
              onClick={handleClose}
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

            {/* Category Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as 'interior' | 'certificate')}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 text-lg appearance-none bg-white cursor-pointer hover:border-indigo-300"
                >
                  <option value="interior" className="py-2">🏠 Interior Image</option>
                  <option value="certificate" className="py-2">🏆 Certificate</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category === 'interior' ? 'bg-indigo-500' : 'bg-purple-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">
                    {category === 'interior' ? 'Interior Design Projects' : 'Professional Certificates'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  {category === 'interior' 
                    ? 'Showcase your interior design work and projects' 
                    : 'Display your professional certifications and achievements'
                  }
                </p>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
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
              disabled={isLoading || !selectedImage || !isPasswordValid()}
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
  );
} 
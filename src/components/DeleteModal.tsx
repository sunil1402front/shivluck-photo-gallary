'use client';

import { useState } from 'react';

import { UploadedPhoto } from '../types';

interface DeleteModalProps {
  isOpen: boolean;
  photo: UploadedPhoto | null;
  onClose: () => void;
  onDelete: (photoId: string, mobileNumber: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function DeleteModal({ isOpen, photo, onClose, onDelete, isLoading, error }: DeleteModalProps) {
  const [deleteMobileNumber, setDeleteMobileNumber] = useState('');

  const handleSubmit = async () => {
    if (!photo) return;
    if (deleteMobileNumber !== '7016418231') return;

    await onDelete(photo.id, deleteMobileNumber);
    
    // Reset form on successful deletion
    setDeleteMobileNumber('');
  };

  const handleClose = () => {
    setDeleteMobileNumber('');
    onClose();
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-500 scale-100 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Delete Photo</h2>
          <p className="text-white/90">Enter your mobile number to confirm deletion</p>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {/* Mobile Number Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Mobile Number Verification
              </label>
              <input
                type="tel"
                value={deleteMobileNumber}
                onChange={(e) => setDeleteMobileNumber(e.target.value)}
                placeholder="Enter 7016418231"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-200 text-lg"
              />
            </div>

            {/* Error Message with Lottie-like Animation */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 text-center animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-900 mb-2 animate-pulse">Access Denied!</h3>
                <p className="text-red-700 font-medium text-lg">{error}</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300 text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || deleteMobileNumber !== '7016418231'}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
              >
                {isLoading ? (
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
  );
} 
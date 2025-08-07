'use client';

import { useState } from 'react';

import { UploadedPhoto } from '../types';

interface DeleteModalProps {
  isOpen: boolean;
  photo: UploadedPhoto | null;
  onClose: () => void;
  onDelete: (photoId: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function DeleteModal({ isOpen, photo, onClose, onDelete, isLoading, error }: DeleteModalProps) {
  const [deletePassword, setDeletePassword] = useState('');

  const handleSubmit = async () => {
    if (!photo) return;
    if (deletePassword !== '123456') return;

    await onDelete(photo.id, deletePassword);
    
    // Reset form on successful deletion
    setDeletePassword('');
  };

  const handleClose = () => {
    setDeletePassword('');
    onClose();
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm transition-all">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-4 sm:p-5 text-white text-center rounded-t-xl">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-1">Delete Photo</h2>
          <p className="text-white/90 text-xs">Enter admin password to confirm deletion</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="space-y-3">
            {/* Password Input */}
            <div>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-red-100 focus:border-red-400 text-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-2 text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold text-red-900 mb-1">Access Denied!</h3>
                <p className="text-xs text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 px-2 rounded-md hover:bg-gray-300 transition-all text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || deletePassword !== '123456'}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-2 rounded-md hover:from-red-600 hover:to-pink-600 transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Deleting...
                  </div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
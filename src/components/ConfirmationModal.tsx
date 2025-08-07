'use client';

import { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({ isOpen, onClose, onConfirm }: ConfirmationModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (password === 'shivluck@1402') {
      setError('');
      setPassword('');
      onConfirm();
      onClose();
    } else {
      setError('That password is not correct. Please try again!');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-sm transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-t-2xl text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0Zm2 0a6 6 0 1 0-12 0 6 6 0 0 0 12 0Zm-6 6v2m0 0h.01M12 18h-.01" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Organizer Confirmation</h2>
          <p className="text-xs text-white/90">This action is for <span className="font-semibold">Shivluck Organizers</span> only.</p>
        </div>
        {/* Body */}
        <div className="p-4">
          <p className="text-sm text-gray-700 mb-3 text-center">
            Please enter the organizer password to continue.
          </p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter organizer password"
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm mb-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-2 text-center">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 rounded-md text-xs hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 rounded-md text-xs hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

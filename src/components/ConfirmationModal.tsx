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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-xl">
      <div className="w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/50 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="p-4 rounded-t-2xl text-center">
          <div className="w-12 h-12 bg-white/60 backdrop-blur-md border border-white/60 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0Zm2 0a6 6 0 1 0-12 0 6 6 0 0 0 12 0Zm-6 6v2m0 0h.01M12 18h-.01" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Organizer Confirmation</h2>
          <p className="text-xs text-gray-600">This action is for <span className="font-semibold">Shivluck Organizers</span> only.</p>
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
            className="w-full px-3 py-2 rounded-md text-sm mb-2 border border-white/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-orange-100 focus:border-orange-300"
          />
          {error && (
            <div className="rounded-md p-2 mb-2 text-center border border-red-200/60 bg-red-50/60 backdrop-blur-md">
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleClose}
              className="flex-1 rounded-full text-xs font-semibold text-gray-900 bg-white/60 backdrop-blur-md border border-white/60 py-2 hover:bg-white/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-orange-400/80 to-orange-300/80 backdrop-blur-md border border-white/40 py-2 hover:from-orange-400 hover:to-orange-300 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

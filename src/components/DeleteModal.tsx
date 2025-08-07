"use client";

import { UploadedPhoto } from "../types";

interface DeleteModalProps {
  isOpen: boolean;
  photo: UploadedPhoto | null;
  onClose: () => void;
  onDelete: (photoId: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function DeleteModal({
  isOpen,
  photo,
  onClose,
  onDelete,
  isLoading,
}: DeleteModalProps) {
  const handleSubmit = async () => {
    if (!photo) return;

    await onDelete(photo.id);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm transition-all">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-4 sm:p-5 text-white text-center rounded-t-xl">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-1">Delete Photo</h2>
          <p className="text-white/90 text-xs">
            Enter admin password to confirm deletion
          </p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="space-y-3">
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
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-2 px-2 rounded-md hover:from-red-600 hover:to-pink-600 transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Deleting...
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

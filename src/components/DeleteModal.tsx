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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-xl">
      <div className="w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/50 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="p-4 sm:p-5 text-gray-900 text-center rounded-t-2xl">
          <div className="w-12 h-12 bg-white/60 backdrop-blur-md border border-white/60 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg
              className="w-6 h-6 text-red-500"
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
          <p className="text-gray-600 text-xs">Confirm deletion to remove this photo.</p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="space-y-3">
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleClose}
                className="flex-1 rounded-full text-xs font-semibold text-gray-900 bg-white/60 backdrop-blur-md border border-white/60 py-2 px-2 hover:bg-white/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-red-500/80 to-pink-500/80 backdrop-blur-md border border-white/40 py-2 px-2 hover:from-red-500 hover:to-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

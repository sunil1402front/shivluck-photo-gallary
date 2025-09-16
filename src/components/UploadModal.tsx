"use client";

import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], phoneNumber: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function UploadModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
}: UploadModalProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState<"interior" | "certificate">(
    "interior"
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Filter valid images and size
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024
    );
    setSelectedImages(validFiles);
  };

  const handleSubmit = async () => {
    if (selectedImages.length === 0) return;

    // Validate password based on selected category
    if (category === "interior" && password !== "123") {
      return;
    }
    if (category === "certificate" && password !== "456") {
      return;
    }

    // Determine phone number based on category
    const phoneNumber = category;

    await onSubmit(selectedImages, phoneNumber);

    // Reset form on successful submission
    setSelectedImages([]);
    setPassword("");
    setCategory("interior");
  };

  const handleClose = () => {
    setSelectedImages([]);
    setPassword("");
    setCategory("interior");
    onClose();
  };

  // Check if password is valid for selected category
  const isPasswordValid = () => {
    if (category === "interior") {
      return password === "123";
    }
    if (category === "certificate") {
      return password === "456";
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-xl dark:bg-black/30">
      <div className="w-full max-w-xs sm:max-w-sm rounded-2xl border border-white/50 bg-white/30 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:bg-white/10 dark:border-white/10">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Upload Photos</h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 p-1 rounded-full bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 transition-colors dark:text-gray-300 dark:hover:text-gray-100 dark:bg-white/10 dark:border-white/10 dark:hover:bg-white/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Select Photos
              </label>
              <div className="border-2 border-dashed border-orange-200/70 rounded-lg p-3 text-center bg-gradient-to-br from-orange-50/80 to-white/70 dark:from-white/5 dark:to-white/10">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-white/60 backdrop-blur-md border border-white/60">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {selectedImages.length > 0
                      ? selectedImages.map((img) => img.name).join(", ")
                      : "Click to select photo(s)"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedImages.length > 0
                      ? `Total: ${selectedImages.length} image(s)`
                      : "All image formats supported"}
                  </p>
                </label>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as "interior" | "certificate")
                  }
                  className="w-full px-3 py-2 rounded-md text-sm cursor-pointer appearance-none border border-white/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-orange-100 focus:border-orange-300 dark:bg-white/10 dark:border-white/10 dark:text-gray-100"
                >
                  <option value="interior">🏠 Interior Image</option>
                  <option value="certificate">🏆 Certificate</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-1 p-2 rounded-md border border-white/60 bg-white/50 backdrop-blur-md dark:bg-white/10 dark:border-white/10">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      category === "interior" ? "bg-orange-500" : "bg-emerald-500"
                    }`}
                  ></div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                    {category === "interior"
                      ? "Interior Design Projects"
                      : "Professional Certificates"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-4">
                  {category === "interior"
                    ? "Showcase your interior design work"
                    : "Display your professional certifications"}
                </p>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-3 py-2 rounded-md text-sm border border-white/60 bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-orange-100 focus:border-orange-300 dark:bg-white/10 dark:border-white/10 dark:text-gray-100"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md p-2 border border-red-200/60 bg-red-50/60 backdrop-blur-md dark:bg-red-900/30">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={
                isLoading || selectedImages.length === 0 || !isPasswordValid()
              }
              className="relative w-full rounded-full text-sm font-semibold text-gray-900 bg-gradient-to-r from-orange-300/80 to-white/70 backdrop-blur-md border border-white/60 py-2 px-3 shadow-sm hover:shadow transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-100 dark:from-orange-400/30 dark:to-white/10 dark:border-white/10"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                `Upload ${selectedImages.length} Photo${
                  selectedImages.length !== 1 ? "s" : ""
                }`
              )}
              <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full opacity-70 [mask-image:radial-gradient(60%_60%_at_20%_20%,white,transparent)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

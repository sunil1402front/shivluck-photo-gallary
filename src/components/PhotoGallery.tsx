import { motion } from "framer-motion";
import { useState } from "react";
import { UploadedPhoto } from "../types";
import PhotoCard from "./PhotoCard";

interface PhotoGalleryProps {
  photos: UploadedPhoto[];
  onDeleteClick: (photo: UploadedPhoto) => void;
}

export default function PhotoGallery({
  photos,
  onDeleteClick,
}: PhotoGalleryProps) {
  const [activeTab, setActiveTab] = useState<"interior" | "certificate">(
    "interior"
  );

  // Filter photos based on active tab
  const filteredPhotos = photos.filter((photo) => {
    if (activeTab === "interior") {
      return photo.phoneNumber === "interior";
    } else {
      return photo.phoneNumber === "certificate";
    }
  });

  // Count photos for each category
  const interiorCount = photos.filter(
    (photo) => photo.phoneNumber === "interior"
  ).length;
  const certificateCount = photos.filter(
    (photo) => photo.phoneNumber === "certificate"
  ).length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          SHIVLUCK Photo Gallery
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Curated interiors and milestones — minimal, elegant, and distinctly
          yours.
        </p>
      </div>

      {/* Compact Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full p-1 bg-white/40 backdrop-blur-md shadow-sm border border-gray-200/70 dark:bg-white/10 dark:border-white/10">
          <button
            onClick={() => setActiveTab("interior")}
            className={`relative overflow-hidden px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === "interior"
                ? "bg-gradient-to-br from-orange-200/60 to-white/60 text-gray-900 backdrop-blur-xl border border-white/60 shadow-sm ring-1 ring-white/40 dark:from-white/10 dark:to-white/5 dark:text-gray-100 dark:border-white/10 dark:ring-white/10"
                : "text-gray-700 hover:text-gray-900 hover:bg-white/40 hover:backdrop-blur-md hover:border hover:border-white/40 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-white/10 dark:hover:border-white/10"
            }`}
          >
            <span>Interior Images</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === "interior"
                  ? "bg-white/60 text-gray-900 backdrop-blur-md border border-white/50 dark:bg-white/10 dark:text-gray-100 dark:border-white/10"
                  : "bg-white/40 text-gray-700 dark:bg-white/10 dark:text-gray-300"
              }`}
            >
              {interiorCount}
            </span>
            {activeTab === "interior" && (
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_60%_at_20%_10%,white,transparent)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("certificate")}
            className={`relative overflow-hidden px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === "certificate"
                ? "bg-gradient-to-br from-orange-200/60 to-white/60 text-gray-900 backdrop-blur-xl border border-white/60 shadow-sm ring-1 ring-white/40 dark:from-white/10 dark:to-white/5 dark:text-gray-100 dark:border-white/10 dark:ring-white/10"
                : "text-gray-700 hover:text-gray-900 hover:bg-white/40 hover:backdrop-blur-md hover:border hover:border-white/40 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-white/10 dark:hover:border-white/10"
            }`}
          >
            <span>Certificates</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === "certificate"
                  ? "bg-white/60 text-gray-900 backdrop-blur-md border border-white/50 dark:bg-white/10 dark:text-gray-100 dark:border-white/10"
                  : "bg-white/40 text-gray-700 dark:bg-white/10 dark:text-gray-300"
              }`}
            >
              {certificateCount}
            </span>
            {activeTab === "certificate" && (
              <span aria-hidden className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_60%_at_20%_10%,white,transparent)]" />
            )}
          </button>
        </div>
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-5 break-inside-avoid"
            >
              <PhotoCard photo={photo} onDeleteClick={onDeleteClick} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="max-w-lg mx-auto">
            <div className="bg-white/80 dark:bg-white/10 dark:border-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-white/10 dark:to-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-indigo-600 dark:text-indigo-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                No{" "}
                {activeTab === "interior" ? "Interior Images" : "Certificates"}{" "}
                Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Start building your{" "}
                {activeTab === "interior" ? "interior design" : "certificate"}{" "}
                gallery by uploading your first image
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { UploadedPhoto } from '../types';
import { motion } from 'framer-motion';

interface PhotoCardProps {
  photo: UploadedPhoto;
  onDeleteClick: (photo: UploadedPhoto) => void;
}

export default function PhotoCard({ photo, onDeleteClick }: PhotoCardProps) {
  const isInterior = photo.phoneNumber === 'interior';
  const tagText = isInterior ? 'Interior Design' : 'Certificate';
  const tagClasses = 'bg-white/30 backdrop-blur-md border border-white/50 text-gray-900 px-3 py-1';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative w-full overflow-hidden rounded-2xl shadow-md">
      <div className="relative">
        <img
          src={photo.url}
          alt="Uploaded photo"
          className="w-full h-auto object-cover transition-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-100/60 via-white/30 to-transparent backdrop-blur-xl opacity-0 transition-opacity duration-300" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(255,255,255,0.5)_0%,transparent_60%)]" />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full text-xs font-semibold ${tagClasses} shadow`}>{tagText}</span>

          <div className="pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(photo);
              }}
              aria-label="Delete image"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-gray-700 hover:text-red-600 hover:bg-white/50 transition-colors shadow-sm"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
import { UploadedPhoto } from '../types';

interface PhotoCardProps {
  photo: UploadedPhoto;
  onDeleteClick: (photo: UploadedPhoto) => void;
}

export default function PhotoCard({ photo, onDeleteClick }: PhotoCardProps) {
  // Determine the overlay text based on photo category
  const overlayText = photo.phoneNumber === 'interior' ? 'Interior By Shivluck' : 'Certified By Shivluck';
  const overlayColor = photo.phoneNumber === 'interior' ? 'from-indigo-600/90 to-purple-600/90' : 'from-green-600/90 to-emerald-600/90';

  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative cursor-pointer">
      <div className="relative aspect-square">
        <img
          src={photo.url}
          alt="Uploaded photo"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Overlay Text */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`bg-gradient-to-r ${overlayColor} text-white px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm`}>
            <p className="text-sm font-bold text-center">{overlayText}</p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Action Buttons - Only visible on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
          <div className="flex space-x-4">
            {/* Open Image Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(photo.url, '_blank');
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-3xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(photo);
              }}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-3xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mt-2">
          {new Date(photo.uploadedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Manage By : <span className="font-bold bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-500 text-white px-2 py-1 rounded-md">SHIVLUCK Interior</span>
        </p>
      </div>
    </div>
  );
} 
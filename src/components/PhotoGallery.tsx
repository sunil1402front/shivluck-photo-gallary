import { useState } from 'react';
import { UploadedPhoto } from '../types';
import PhotoCard from './PhotoCard';

interface PhotoGalleryProps {
  photos: UploadedPhoto[];
  onDeleteClick: (photo: UploadedPhoto) => void;
  onUploadClick: () => void;
}

export default function PhotoGallery({ photos, onDeleteClick, onUploadClick }: PhotoGalleryProps) {
  const [activeTab, setActiveTab] = useState<'interior' | 'certificate'>('interior');

  // Filter photos based on active tab
  const filteredPhotos = photos.filter(photo => {
    if (activeTab === 'interior') {
      return photo.phoneNumber === 'interior';
    } else {
      return photo.phoneNumber === 'certificate';
    }
  });

  // Count photos for each category
  const interiorCount = photos.filter(photo => photo.phoneNumber === 'interior').length;
  const certificateCount = photos.filter(photo => photo.phoneNumber === 'certificate').length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6">
          SHIVLUCK Photo Gallery
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Professional Interior Design Portfolio - Showcasing Our Latest Projects and Creative Transformations
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-pink-600 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Compact Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/20">
          <button
            onClick={() => setActiveTab('interior')}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'interior'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>Interior Images</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === 'interior' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
            }`}>
              {interiorCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'certificate'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span>Certificates</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              activeTab === 'certificate' ? 'bg-white/20' : 'bg-indigo-100 text-indigo-600'
            }`}>
              {certificateCount}
            </span>
          </button>
        </div>
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="max-w-lg mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-16 border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No {activeTab === 'interior' ? 'Interior Images' : 'Certificates'} Yet
              </h3>
              <p className="text-gray-600 mb-8">
                Start building your {activeTab === 'interior' ? 'interior design' : 'certificate'} gallery by uploading your first image
              </p>
              <button
                onClick={onUploadClick}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload {activeTab === 'interior' ? 'Interior Image' : 'Certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 
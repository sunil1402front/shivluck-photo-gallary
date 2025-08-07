# Components Documentation

This directory contains all the reusable components for the SHIVLUCK Photo Gallery application.

## Component Structure

### Core Components

#### `Navbar.tsx`
- **Purpose**: Navigation bar with logo, menu items, and mobile menu
- **Props**: 
  - `onUploadClick: () => void` - Callback for upload button click
- **Features**: 
  - Responsive design with mobile menu
  - Links to website and Instagram
  - Upload button integration

#### `Footer.tsx`
- **Purpose**: Footer section with company info and social links
- **Props**: None (static content)
- **Features**: 
  - Company branding
  - Contact information
  - Social media links

#### `PhotoGallery.tsx`
- **Purpose**: Main gallery section displaying photos or empty state
- **Props**:
  - `photos: UploadedPhoto[]` - Array of photos to display
  - `onDeleteClick: (photo: UploadedPhoto) => void` - Callback for delete action
  - `onUploadClick: () => void` - Callback for upload action
- **Features**:
  - Grid layout for photos
  - Empty state with upload prompt
  - Gallery header with title and description

#### `PhotoCard.tsx`
- **Purpose**: Individual photo card with hover effects and actions
- **Props**:
  - `photo: UploadedPhoto` - Photo data to display
  - `onDeleteClick: (photo: UploadedPhoto) => void` - Callback for delete action
- **Features**:
  - Hover effects with action buttons
  - View and delete functionality
  - Date formatting
  - Responsive design

#### `UploadModal.tsx`
- **Purpose**: Modal for uploading new photos
- **Props**:
  - `isOpen: boolean` - Modal visibility state
  - `onClose: () => void` - Callback to close modal
  - `onSubmit: (file: File, mobileNumber: string) => Promise<void>` - Upload handler
  - `isLoading: boolean` - Loading state
  - `error: string` - Error message
- **Features**:
  - File upload with validation
  - Mobile number verification
  - Error handling
  - Loading states

#### `DeleteModal.tsx`
- **Purpose**: Modal for confirming photo deletion
- **Props**:
  - `isOpen: boolean` - Modal visibility state
  - `photo: UploadedPhoto | null` - Photo to delete
  - `onClose: () => void` - Callback to close modal
  - `onDelete: (photoId: string, mobileNumber: string) => Promise<void>` - Delete handler
  - `isLoading: boolean` - Loading state
  - `error: string` - Error message
- **Features**:
  - Mobile number verification for deletion
  - Animated error messages
  - Confirmation dialog

## Types

### `UploadedPhoto`
```typescript
interface UploadedPhoto {
  id: string;
  url: string;
  phoneNumber: string;
  uploadedAt: string;
}
```

## Usage

### Importing Components
```typescript
// Individual imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Or use the index file for cleaner imports
import { Navbar, Footer, PhotoGallery, UploadModal, DeleteModal } from '../components';
```

### Example Usage
```typescript
import { useState } from 'react';
import { Navbar, PhotoGallery, UploadModal } from '../components';
import { UploadedPhoto } from '../types';

export default function Home() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar onUploadClick={handleUploadClick} />
      <PhotoGallery 
        photos={photos}
        onDeleteClick={(photo) => console.log('Delete:', photo)}
        onUploadClick={handleUploadClick}
      />
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (file, mobileNumber) => {
          // Handle upload logic
        }}
        isLoading={false}
        error=""
      />
    </div>
  );
}
```

## Styling

All components use Tailwind CSS for styling and include:
- Responsive design
- Hover effects and animations
- Gradient backgrounds
- Modern UI elements
- Consistent spacing and typography

## Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- No external UI libraries required 
"use client";

import { useEffect, useState } from "react";
import {
  DeleteModal,
  Footer,
  Navbar,
  PhotoGallery,
  UploadModal,
} from "../components";
import { UploadedPhoto } from "../types";
import ConfirmationModal from '../components/ConfirmationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [selectedPhotoForDelete, setSelectedPhotoForDelete] =
    useState<UploadedPhoto | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'upload' | 'delete' | null>(null);

  // Load photos from database on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/photos");
      if (response.ok) {
        const photos = await response.json();
        setUploadedPhotos(photos);
      } else {
        console.error("Failed to fetch photos");
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleUploadClick = () => {
    setConfirmAction('upload');
    setIsConfirmModalOpen(true);
  };

  const handleDeleteClick = (photo: UploadedPhoto) => {
    setSelectedPhotoForDelete(photo);
    setConfirmAction('delete');
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    if (confirmAction === 'upload') {
      setIsModalOpen(true);
    } else if (confirmAction === 'delete') {
      setIsDeleteModalOpen(true);
    }
    setConfirmAction(null);
  };

  const handleUploadSubmit = async (files: File[], phoneNumber: string) => {
    if (files.length === 0) {
      setError("Please select at least one image");
      return;
    }

    if (phoneNumber !== "interior" && phoneNumber !== "certificate") {
      setError(
        "Invalid password. Please enter 123 for Interior or 456 for Certificate"
      );
      return;
    }

    setIsLoading(true);

    try {
      const uploadedPhotos: UploadedPhoto[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("phoneNumber", phoneNumber);

        const response = await fetch("/api/photos", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const newPhoto = await response.json();
          uploadedPhotos.push(newPhoto);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to upload photo");
        }
      }
      if (uploadedPhotos.length > 0) {
        setUploadedPhotos((prev) => [...uploadedPhotos, ...prev]);
        setIsModalOpen(false);
        setError("");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload photo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmit = async (photoId: string) => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the photo from the local state
        setUploadedPhotos((prev) =>
          prev.filter((photo) => photo.id !== photoId)
        );
        setIsDeleteModalOpen(false);
        setSelectedPhotoForDelete(null);
        setDeleteError("");
      } else {
        const errorData = await response.json();
        setDeleteError(errorData.error || "Failed to delete photo");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setDeleteError("Failed to delete photo. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPhotoForDelete(null);
    setDeleteError("");
  };

  return (
    <div className="bg-transparent">
      {/* Navbar */}
      <Navbar onUploadClick={handleUploadClick} />

      {/* Main Content */}
      <main className="pt-8">
        {/* Gallery Section */}
        <PhotoGallery
          photos={uploadedPhotos}
          onDeleteClick={handleDeleteClick}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setConfirmAction(null);
        }}
        onConfirm={handleConfirm}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUploadSubmit}
        isLoading={isLoading}
        error={error}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        photo={selectedPhotoForDelete}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteSubmit}
        isLoading={isDeleting}
        error={deleteError}
      />
    </div>
  );
}

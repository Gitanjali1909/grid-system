import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const FullView = ({ images, selectedImage, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images, onClose]);

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    onNavigate(images[newIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
          <motion.button
            onClick={() => navigateImage(-1)}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={36} />
          </motion.button>
          <motion.button
            onClick={() => navigateImage(1)}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={36} />
          </motion.button>
          <motion.img
            key={selectedImage.id}
            src={selectedImage.fullUrl}
            alt={`Full view of image ${selectedImage.id}`}
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          <motion.a
            href={selectedImage.downloadUrl}
            download={`image-${selectedImage.id}.jpg`}
            className="absolute bottom-4 right-4 bg-white bg-opacity-75 text-black px-4 py-2 rounded-full flex items-center hover:bg-opacity-100 transition-colors z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} className="mr-2" />
            Download
          </motion.a>
          <div className="absolute bottom-4 left-4 text-white text-lg font-semibold">
            Image {selectedImage.id} of {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullView;


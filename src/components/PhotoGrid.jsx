import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const PhotoGrid = ({ images, onImageClick, onLoadMore }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [onLoadMore]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((image) => (
        <motion.div
          key={image.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => onImageClick(image)}
          className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={image.url}
            alt={`Image ${image.id}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
      <div ref={observerRef} className="h-10 col-span-full" />
    </div>
  );
};

export default PhotoGrid;


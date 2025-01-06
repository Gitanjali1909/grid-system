import React, { useState, useCallback } from 'react';
import PhotoGrid from './components/PhotoGrid';
import FullView from './components/FullView';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const loadMoreImages = useCallback(() => {
    const newImages = Array.from({ length: 30 }, (_, i) => {
      const id = (page - 1) * 30 + i + 1;
      return {
        id,
        url: `https://placehold.co/200x200/jpg?text=${id}`,
        fullUrl: `https://placehold.co/2000x2000/jpg?text=${id}`,
        downloadUrl: `https://placehold.co/3900x3900/jpg?text=${id}`,
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PhotoGrid
          images={images}
          onImageClick={setSelectedImage}
          onLoadMore={loadMoreImages}
        />
      </main>
      {selectedImage && (
        <FullView
          images={images}
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </div>
  );
};

export default App;


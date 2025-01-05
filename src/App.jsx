import React, { useState, useEffect } from 'react';
import PhotoGrid from './components/PhotoGrid';
import FullView from './components/FullView';

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const loadMoreImages = () => {
    if (images.length >= 29) return; 

    const startIndex = images.length + 1;
    const endIndex = Math.min(startIndex +  119);

    const newImages = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => ({
      id: startIndex + i,
      url: `https://placehold.co/200x200/jpg?text=${startIndex + i}`,
      fullUrl: `https://placehold.co/2000x2000/jpg?text=${startIndex + i}`,
      downloadUrl: `https://placehold.co/3900x3900/jpg?text=${startIndex + i}`,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreImages();
  }, []);

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


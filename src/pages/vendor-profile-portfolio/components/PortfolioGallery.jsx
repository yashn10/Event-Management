import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PortfolioGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images?.length
      : (currentIndex - 1 + images?.length) % images?.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images?.[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') closeLightbox();
    if (e?.key === 'ArrowRight') navigateImage('next');
    if (e?.key === 'ArrowLeft') navigateImage('prev');
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (!images || images?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No portfolio images available</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
          Portfolio Gallery
        </h2>
        <p className="text-muted-foreground">
          Browse through our previous work and event setups
        </p>
      </div>
      {/* Mobile Carousel */}
      <div className="block lg:hidden">
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 p-4">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-48 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <Image
                    src={image?.url}
                    alt={image?.title || `Portfolio image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Grid */}
      <div className="hidden lg:block p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image?.url}
                alt={image?.title || `Portfolio image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
              {image?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {image?.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Navigation Buttons */}
            {images?.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage?.url}
                alt={selectedImage?.title || 'Portfolio image'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              {selectedImage?.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-lg font-semibold mb-1">
                    {selectedImage?.title}
                  </h3>
                  {selectedImage?.description && (
                    <p className="text-white/80 text-sm">
                      {selectedImage?.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Image Counter */}
            {images?.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images?.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;
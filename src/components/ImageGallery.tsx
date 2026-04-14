import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  sectionTitle: string;
}

const ImageGallery = ({ images, sectionTitle }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) return null;

  return (
    <div className="space-y-3">
      <div className="rounded-xl overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={images[selectedIndex]}
          alt={`${sectionTitle} at Nyandungu Eco Park, photo ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === selectedIndex ? "border-primary ring-2 ring-primary/30" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${sectionTitle} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

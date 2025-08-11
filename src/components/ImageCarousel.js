'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';

const ImageCarousel = ({
  images,
  autoplayDelay = 4000,
  showDots = true,
  className = '',
  slideClassName = '',
  imageClassName = '',
}) => {
  const {
    containerRef,
    emblaRef,
    selectedIndex,
    scrollTo,
    initializeAnimations,
  } = useCarousel({
    autoplayDelay,
    animationDuration: 300,
    animationEasing: 'power2.out',
    staggerDelay: 0.08,
    scrollTriggerStart: 'top 85%',
    enableAutoplay: true,
    loop: true,
  });

  useEffect(() => {
    if (!images || images.length === 0) return;

    const cleanup = initializeAnimations(images.length);
    return cleanup;
  }, [images, initializeAnimations]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className='embla overflow-hidden' ref={emblaRef}>
        <div className='embla__container flex'>
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className={`carousel-slide embla__slide flex-shrink-0 ${slideClassName}`}
              style={{
                flex: '0 0 auto',
                width: 'clamp(280px, 90vw, 350px)',
                marginRight: 'clamp(12px, 2vw, 20px)',
              }}
            >
              <div className='group relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-out hover:scale-[1.02]'>
                <Image
                  src={image.src}
                  alt={image.alt || `Slide ${index + 1}`}
                  fill
                  className={`object-cover select-none transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
                  draggable='false'
                  sizes='(max-width: 640px) 90vw, (max-width: 1024px) 350px, 380px'
                  priority={index < 2}
                />

                {image.title && (
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-4 left-4 right-4'>
                      <h3 className='text-white font-semibold text-lg mb-1'>
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className='text-white/90 text-sm'>
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDots && images.length > 1 && (
        <div className='flex justify-center mt-6 md:hidden'>
          <div className='flex items-center gap-2'>
            {images.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? 'w-2.5 h-2.5 bg-gray-800 scale-110'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;

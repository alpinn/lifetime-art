'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(ScrollTrigger);

const ImageCarousel = ({ images }) => {
  const carouselContainerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayOptions = {
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    playOnInit: true,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: 'trimSnaps',
      dragFree: false,
      slidesToScroll: 1,
      skipSnaps: false,
    },
    [Autoplay(autoplayOptions)]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.carousel-slide',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, carouselContainerRef);

    return () => ctx.revert();
  }, [images]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div ref={carouselContainerRef} className='py-8 w-full overflow-hidden'>
      <div className='embla w-full' ref={emblaRef}>
        <div className='embla__container flex'>
          {images.map((image) => (
            <div
              key={image.id}
              className='embla__slide carousel-slide flex-shrink-0 w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] mx-2 first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0'
            >
              <div className='w-full h-[350px] sm:h-[380px] md:h-[400px] bg-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative mx-auto'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='object-cover select-none'
                  draggable='false'
                  sizes='(max-width: 640px) 280px, (max-width: 768px) 300px, 320px'
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile dots indicator */}
      <div className='flex justify-center mt-6 md:hidden'>
        <div className='flex space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-[#28282C] scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .embla {
          overflow: hidden;
        }
        .embla__container {
          display: flex;
        }
        .embla__slide {
          position: relative;
          min-width: 0;
        }

        /* Mobile-first responsive adjustments */
        @media (max-width: 640px) {
          .embla__slide {
            flex: 0 0 calc(100vw - 2rem);
            max-width: 280px;
            margin: 0 0.5rem;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .embla__slide {
            flex: 0 0 300px;
            margin: 0 0.625rem;
          }
        }

        @media (min-width: 769px) {
          .embla__slide {
            flex: 0 0 320px;
            margin: 0 0.625rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';

import Button from '@/atoms/Button';
import TestimonialCard from '@/components/TestimonialCard';

const Hero = () => {
  const containerRef = useRef(null);
  const statusRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);
  const testimonialRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        backgroundRef.current,
        {
          opacity: 0,
          scale: 1.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(
        statusRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );

      tl.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      tl.fromTo(
        paragraphRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );

      tl.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      if (testimonialRef.current) {
        tl.fromTo(
          testimonialRef.current,
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.2'
        );
      }

      const buttonContainer = buttonRef.current;
      const button = buttonContainer?.querySelector('button');
      const buttonArrow = buttonContainer?.querySelector('.button-arrow');

      if (button && buttonArrow) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, { y: -3, duration: 0.2, ease: 'power2.out' });
          gsap.to(buttonArrow, { x: 4, duration: 0.2, ease: 'power2.out' });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, { y: 0, duration: 0.2, ease: 'power2.out' });
          gsap.to(buttonArrow, { x: 0, duration: 0.2, ease: 'power2.out' });
        });
      }

      const handleScroll = () => {
        const scrolled = window.pageYOffset;
        const heroRect = containerRef.current?.getBoundingClientRect();

        if (heroRect && heroRect.bottom > 0 && backgroundRef.current) {
          gsap.to(backgroundRef.current, {
            y: scrolled * 0.15,
            duration: 0.1,
            ease: 'none',
          });
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className='bg-primary min-h-screen prevent-overflow'
    >
      <div className='safe-width mx-auto px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl py-20 sm:py-12 lg:py-[90px]'>
        <div className='relative min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl'>
          <div
            ref={backgroundRef}
            className='absolute inset-0 w-full h-full'
            style={{
              backgroundImage: "url('/images/dining.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.1)',
              transformOrigin: 'center center',
            }}
          />

          <div ref={overlayRef} className='absolute inset-0 bg-black/70' />

          <div className='relative z-10 h-full flex items-center'>
            <div className='w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-8 sm:py-12 lg:py-16'>
              <div className='grid grid-cols-1 xl:grid-cols-12 gap-8 items-center'>
                <div className='xl:col-span-7 2xl:col-span-6'>
                  <div className='max-w-xl xl:max-w-none'>
                    <div ref={statusRef} className='mb-6 sm:mb-8'>
                      <div className='bg-black/50 backdrop-blur-sm w-fit px-3 sm:px-4 py-2 rounded-full'>
                        <div className='flex items-center gap-2'>
                          <Image
                            src='/items/pill.png'
                            alt='LifetimeArt Logo'
                            width={16}
                            height={16}
                            className='sm:w-[18px] sm:h-[18px] flex-shrink-0'
                          />
                          <span className='text-xs sm:text-sm font-normal text-white whitespace-nowrap'>
                            Available for work
                          </span>
                        </div>
                      </div>
                    </div>

                    <h1
                      ref={headlineRef}
                      className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-medium text-white mb-4 sm:mb-6 leading-tight break-words'
                    >
                      Your trusted partner for quality home improvement
                    </h1>
                    <p
                      ref={paragraphRef}
                      className='text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-md lg:max-w-lg xl:max-w-lg'
                    >
                      LifetimeArt delivers expert home improvements, creating
                      beautiful and functional spaces with quality
                      craftsmanship.
                    </p>

                    <div ref={buttonRef}>
                      <Button
                        text='Work with us'
                        className='bg-white/10 backdrop-blur-xs text-white hover:bg-black/70 text-sm sm:text-[16px] px-4 sm:px-6 py-2 sm:py-3'
                        arrowClassName='bg-white text-black button-arrow'
                      />
                    </div>
                  </div>
                </div>

                <div className='hidden xl:block xl:col-span-5 2xl:col-span-6'>
                  <div ref={testimonialRef} className='flex justify-end'>
                    <div className='w-full max-w-sm 2xl:max-w-md'>
                      <TestimonialCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

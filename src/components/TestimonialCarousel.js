'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useCarousel } from '@/hooks/useCarousel';

const StarRating = ({ rating = 5, className = '' }) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(rating)].map((_, index) => (
        <Image
          key={index}
          src='/icons/star.svg'
          alt='star'
          width={20}
          height={20}
          className='w-5 h-5'
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, className = '', index = 0 }) => {
  const bgColor = index % 2 === 0 ? 'bg-[#E9ECF2]' : 'bg-[#E6E6E6]';

  return (
    <div
      className={cn(
        'testimonial-card flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl mx-3',
        bgColor,
        className
      )}
    >
      <div className='space-y-4'>
        <StarRating rating={testimonial.star} />

        <p className='text-gray-700 text-sm md:text-base leading-relaxed'>
          {testimonial.message}
        </p>

        <div className='flex items-center gap-3 pt-2'>
          <div className='relative w-10 h-10 rounded-full overflow-hidden bg-gray-300'>
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className='object-cover'
              sizes='40px'
            />
          </div>
          <div>
            <p className='font-medium text-gray-900 text-sm'>
              {testimonial.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = ({
  testimonials = [],
  className = '',
  autoplaySpeed = 3000,
}) => {
  const autoScrollRef = useRef();

  const firstRowCarousel = useCarousel({
    autoplayDelay: autoplaySpeed,
    enableAutoplay: false,
    loop: true,
    animationDuration: 400,
    staggerDelay: 0.1,
  });

  const secondRowCarousel = useCarousel({
    autoplayDelay: autoplaySpeed + 500,
    enableAutoplay: false,
    loop: true,
    animationDuration: 400,
    staggerDelay: 0.1,
  });

  const splitTestimonials = (testimonials) => {
    if (testimonials.length === 0) return [[], []];

    const totalCount = testimonials.length;
    const firstRowCount = Math.ceil(totalCount / 2);

    const firstRow = testimonials.slice(0, firstRowCount);
    const secondRow = testimonials.slice(firstRowCount);

    return [firstRow, secondRow];
  };

  const [firstRowData, secondRowData] = splitTestimonials(testimonials);

  const duplicatedFirstRow = [
    ...firstRowData,
    ...firstRowData,
    ...firstRowData,
  ];
  const duplicatedSecondRow = [
    ...secondRowData,
    ...secondRowData,
    ...secondRowData,
  ];

  useEffect(() => {
    if (
      !firstRowCarousel.emblaApi ||
      !secondRowCarousel.emblaApi ||
      !firstRowCarousel.isInView
    )
      return;

    const firstRowInterval = setInterval(() => {
      if (firstRowCarousel.emblaApi.canScrollNext()) {
        firstRowCarousel.emblaApi.scrollNext();
      }
    }, autoplaySpeed);

    const secondRowInterval = setInterval(() => {
      if (secondRowCarousel.emblaApi.canScrollPrev()) {
        secondRowCarousel.emblaApi.scrollPrev();
      }
    }, autoplaySpeed + 500);

    autoScrollRef.current = { firstRowInterval, secondRowInterval };

    return () => {
      clearInterval(firstRowInterval);
      clearInterval(secondRowInterval);
    };
  }, [
    firstRowCarousel.emblaApi,
    secondRowCarousel.emblaApi,
    firstRowCarousel.isInView,
    autoplaySpeed,
  ]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const cleanupFirst = firstRowCarousel.initializeAnimations(
      firstRowData.length
    );
    const cleanupSecond = secondRowCarousel.initializeAnimations(
      secondRowData.length
    );

    return () => {
      cleanupFirst && cleanupFirst();
      cleanupSecond && cleanupSecond();
    };
  }, [testimonials, firstRowData.length, secondRowData.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div
      ref={firstRowCarousel.containerRef}
      className={cn('w-full overflow-hidden', className)}
    >
      <div className='space-y-6'>
        <div className='embla overflow-hidden' ref={firstRowCarousel.emblaRef}>
          <div className='embla__container flex'>
            {duplicatedFirstRow.map((testimonial, index) => (
              <TestimonialCard
                key={`first-${index}`}
                testimonial={testimonial}
                index={index}
                className='first-row'
              />
            ))}
          </div>
        </div>

        {secondRowData.length > 0 && (
          <div
            className='embla overflow-hidden'
            ref={secondRowCarousel.emblaRef}
          >
            <div className='embla__container flex'>
              {duplicatedSecondRow.map((testimonial, index) => (
                <TestimonialCard
                  key={`second-${index}`}
                  testimonial={testimonial}
                  index={index}
                  className='second-row'
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCarousel;

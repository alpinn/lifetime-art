'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';

import Title from '@/atoms/Title';

const Intro = () => {
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, introRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className='flex flex-col lg:flex-row justify-between py-8 sm:py-12 lg:py-16 gap-6 lg:gap-8 px-4 md:px-8 lg:px-12 xl:px-16'>
        <div>
          <Title
            subtitle='About us'
            text='Home Improvement Specialists'
            variant='xs'
          />
        </div>
        <div ref={introRef} className='max-w-xl'>
          <p className='text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#3D3D47] leading-relaxed'>
            Welcome to LifetimeArt, your trusted home improvement experts,
            dedicated to transforming homes with precision and care. With years
            of experience in building kitchens, bathrooms, garages, and more, we
            take pride in delivering top-quality craftsmanship and a seamless
            customer experience. Our mission is to bring your vision to life
            while ensuring clear communication and expert guidance at every
            step. Let&apos;s create a home you&apos;ll love!
          </p>
        </div>
      </div>
    </>
  );
};

export default Intro;

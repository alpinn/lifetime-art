'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';

const statistic = [
  {
    title: 'Years experience',
    value: '8',
    desc: 'Improving homes with expert craftsmanship for years',
  },
  {
    title: 'Projects completed',
    value: '26',
    desc: 'Over 250 successful projects delivered with quality and care',
  },
  {
    title: 'Skilled Tradespeople',
    value: '30',
    desc: 'Our team of 30 experts ensures top-quality results',
  },
  {
    title: 'Client satisfaction',
    value: '100%',
    desc: 'All of our clients are satisfied with our work and service',
  },
];

const Statistic = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={statsRef}
      className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-32 py-8 sm:py-12 lg:py-16 px-4 md:px-8 lg:px-12 xl:px-16'
    >
      {statistic.map((item) => (
        <div key={item.title} className='stat-item'>
          <h2 className='text-[#28282C] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-none'>
            {item.value}
          </h2>
          <h3 className='text-[#28282C] text-base sm:text-lg md:text-xl font-semibold mt-2 sm:mt-3'>
            {item.title}
          </h3>
          <p className='text-[#3D3D47] text-sm sm:text-base font-normal mt-1 sm:mt-2 leading-relaxed'>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Statistic;

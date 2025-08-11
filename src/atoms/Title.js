'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Title = ({ subtitle, text }) => {
  const titleRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pillRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={pillRef} className='bg-[#28282C] px-4 py-1 rounded-full w-fit'>
        <p className='text-[16px] font-medium text-white'>{subtitle}</p>
      </div>
      <h1
        ref={titleRef}
        className='text-[40px] font-medium text-[#28282C] mt-4'
      >
        {text}
      </h1>
    </>
  );
};

export default Title;

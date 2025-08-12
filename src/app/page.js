import React from 'react';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Service from '@/sections/Service';
import Project from '@/sections/Project';
import Testimonial from '@/sections/Testimonial';
import FAQ from '@/sections/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Project />
      <Testimonial />
      <FAQ />
    </>
  );
}

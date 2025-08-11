import React from 'react';
import Intro from '@/containers/Intro';
import Statistic from '@/containers/Statistic';
import ImageCarousel from '@/components/ImageCarousel';

const images = [
  {
    id: 1,
    src: '/carousels/living.jpg',
    alt: 'Living Room',
  },
  {
    id: 2,
    src: '/carousels/interior.jpg',
    alt: 'Interior Room',
  },
  {
    id: 3,
    src: '/carousels/wooden.jpg',
    alt: 'Wooden House',
  },
  {
    id: 4,
    src: '/carousels/kitchen.jpg',
    alt: 'Kitchen',
  },
  {
    id: 5,
    src: '/carousels/bedroom.png',
    alt: 'Bedroom',
  },
];

const About = () => {
  return (
    <div className='bg-white'>
      <div className='mx-auto py-8 sm:py-12 lg:py-20'>
        <Intro />
        <ImageCarousel images={images} />
        <Statistic />
      </div>
    </div>
  );
};

export default About;

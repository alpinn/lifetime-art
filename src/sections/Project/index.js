'use client';

import React from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Title from '@/atoms/Title';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    title: 'Modern kitchen refit',
    image: '/projects/kitchen.png',
    description:
      'This kitchen transformation brought sleek, modern design and enhanced  functionality to our client’s home. We installed custom cabinetry, high-quality worktops, and state-of-the-art appliances, creating a stylish yet practical space perfect for cooking and entertaining. With attention to every detail, we delivered a kitchen that balances aesthetics and usability.',
    tags: ['Kitchen', '4 Weeks'],
    quote:
      'LifetimeArt completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn’t be happier with the result!',
    avatar: '/avatars/profile1.png',
    name: 'Rachel Morgan',
  },
  {
    title: 'External garden path build',
    image: '/projects/garden.png',
    description:
      'Our team designed and built a durable, visually appealing garden path to enhance the outdoor space. Using premium materials, we created a seamless walkway that blends naturally with the landscape, providing both functionality and aesthetic charm. The result is a stylish, well-crafted path that elevates the overall garden design.',
    tags: ['External Works', '6 Weeks'],
    quote:
      'The team at LifetimeArt did an amazing job on our garden path. It’s sturdy, looks fantastic, and has completely transformed our outdoor space. They listened to our vision and delivered exactly what we wanted—highly recommended!',
    avatar: '/avatars/profile2.png',
    name: 'Michael Turner',
  },
  {
    title: 'Bathroom renovation',
    image: '/projects/bathroom.png',
    description:
      'We revitalized this bathroom with a fresh, modern design, incorporating high-end tiling, sleek fixtures, and efficient lighting. The layout was optimized to maximize space, creating a luxurious and relaxing atmosphere. The final result is a beautifully crafted bathroom that enhances both comfort and functionality.',
    tags: ['Bathroom', '7 Weeks'],
    quote:
      'LifetimeArt completely transformed our bathroom, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn’t be happier with the result!',
    avatar: '/avatars/profile1.png',
    name: 'Rachel Morgan',
  },
];

const Project = () => {
  return (
    <section className='bg-white py-16 lg:py-24'>
      <div className='px-4 md:px-8 lg:px-12 xl:px-16 mx-auto'>
        <div className='flex flex-col justify-center items-center mb-20 text-center'>
          <Title
            subtitle='Our work'
            text='Get inspired by our work'
            variant='xs'
          />
          <p className='text-lg md:text-xl text-[#3D3D47] mt-6 max-w-xl mx-auto leading-relaxed text-center'>
            See how we&apos;ve transformed homes with our expert craftsmanship
            and attention to detail.
          </p>
        </div>

        <div className='space-y-8 lg:space-y-12'>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;

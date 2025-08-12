import React from 'react';

import Title from '@/atoms/Title';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const testimonials = [
  {
    name: 'Emily Carter',
    message:
      'I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!',
    star: 5,
    avatar: '/avatars/profile1.png',
  },
  {
    name: 'Emily Carter',
    message:
      'Refit transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!',
    star: 5,
    avatar: '/avatars/profile3.png',
  },
  {
    name: 'Emily Carter',
    message:
      'I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!',
    star: 5,
    avatar: '/avatars/profile2.png',
  },
  {
    name: 'Emily Carter',
    message:
      'Refit transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!',
    star: 4,
    avatar: '/avatars/profile3.png',
  },
  {
    name: 'Emily Carter',
    message:
      'I couldn’t be happier with my loft conversion. The attention to detail and quality of work were outstanding. Refit made the whole process smooth and stress-free!',
    star: 2,
    avatar: '/avatars/profile1.png',
  },
];

const Testimonial = () => {
  return (
    <section className='bg-white py-16 lg:py-24' id='testimonials'>
      <div className='mx-auto px-4 md:px-8 lg:px-12 xl:px-16'>
        <div className='flex flex-col justify-center items-center mb-12 lg:mb-20 text-center'>
          <Title subtitle='Testimonials' text='Hear from our clients' />
          <p className='text-lg md:text-xl text-[#3D3D47] mt-6 max-w-xl mx-auto'>
            Hear from our happy clients about their experience working with
            Refit and the quality of our craftsmanship.
          </p>
        </div>
        <TestimonialCarousel
          testimonials={testimonials}
          autoplaySpeed={3000}
          className='mt-8'
        />
      </div>
    </section>
  );
};

export default Testimonial;

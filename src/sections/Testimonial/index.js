import React from 'react';

import Title from '@/atoms/Title';

const Testimonial = () => {
  return (
    <section className='bg-white py-16 lg:py-24'>
      <div className='mx-auto px-4 md:px-8 lg:px-12 xl:px-16'>
        <div className='flex flex-col justify-center items-center mb-12 lg:mb-20 text-center'>
          <Title subtitle='Testimonials' text='Hear from our clients' />
          <p className='text-lg md:text-xl text-[#3D3D47] mt-6 max-w-xl mx-auto'>
            Hear from our happy clients about their experience working with
            Refit and the quality of our craftsmanship.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;

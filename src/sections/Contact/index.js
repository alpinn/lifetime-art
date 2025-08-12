'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import Title from '@/atoms/Title';
import { cn } from '@/utils/cn';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightFormRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        leftContentRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      tl.fromTo(
        rightFormRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className='min-h-screen py-16 lg:py-24 px-4 md:px-8'
    >
      <div className='bg-primary mx-auto rounded-xl py-8 lg:py-16 px-4 md:px-8 max-w-7xl'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 items-start'>
          <div ref={leftContentRef} className='text-white'>
            <div className='mb-8'>
              <Title
                subtitle='Contact'
                text='Get in touch'
                variant='lg'
                color='text-white'
              />
            </div>

            <p className='text-gray-300 text-lg mb-12 leading-relaxed'>
              For any inquiries or to explore your vision further, we invite you
              to contact our professional team using the details provided below.
            </p>

            <div className='space-y-8'>
              <div>
                <h3 className='text-xl font-semibold mb-3'>Office</h3>
                <p className='text-gray-300'>150 Old Park Ln, London W1K 1QZ</p>
              </div>

              <div>
                <h3 className='text-xl font-semibold mb-3'>Email</h3>
                <a
                  href='mailto:hello@refit.com'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  hello@refit.com
                </a>
              </div>

              <div>
                <h3 className='text-xl font-semibold mb-3'>Telephone</h3>
                <a
                  href='tel:07716534984'
                  className='text-gray-300 hover:text-white transition-colors'
                >
                  07716 534984
                </a>
              </div>

              <div className='pt-8 border-t border-gray-700'>
                <h3 className='text-xl font-semibold mb-6'>Follow us</h3>
                <div className='flex space-x-4'>
                  <a href='#' className='text-white' aria-label='Instagram'>
                    <FaInstagram size={24} />
                  </a>
                  <a href='#' className='text-white' aria-label='TikTok'>
                    <FaTiktok size={24} />
                  </a>
                  <a href='#' className='text-white' aria-label='Twitter'>
                    <FaXTwitter size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div ref={rightFormRef}>
            <form className='bg-white rounded-xl p-6 lg:p-8 shadow-lg'>
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-primary mb-2'
                  >
                    Name<span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='John Smith'
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border border-gray-300',
                      'focus:ring-2 focus:ring-gray-900 focus:border-transparent',
                      'placeholder:text-gray-400 transition-all'
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-primary mb-2'
                  >
                    Email<span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='johnsmith@gmail.com'
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border border-gray-300',
                      'focus:ring-2 focus:ring-gray-900 focus:border-transparent',
                      'placeholder:text-gray-400 transition-all'
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-primary mb-2'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='+44789 123456'
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border border-gray-300',
                      'focus:ring-2 focus:ring-gray-900 focus:border-transparent',
                      'placeholder:text-gray-400 transition-all'
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-primary mb-2'
                  >
                    Message<span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows={6}
                    placeholder="Hello, I'd like to enquire about..."
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border border-gray-300',
                      'focus:ring-2 focus:ring-gray-900 focus:border-transparent',
                      'placeholder:text-gray-400 transition-all resize-none'
                    )}
                  />
                </div>

                <button
                  type='submit'
                  className={cn(
                    'w-full bg-black/80 text-white py-3 px-6 rounded-lg cursor-pointer',
                    'hover:bg-primary transition-colors font-medium',
                    'focus:ring-2 focus:ring-black/90 focus:ring-offset-2'
                  )}
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

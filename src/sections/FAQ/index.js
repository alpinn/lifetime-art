'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Title from '@/atoms/Title';
import Button from '@/atoms/Button';
import { cn } from '@/utils/cn';
import { useDisclosure } from '@/hooks/useDisclosure';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const faqData = [
  {
    id: 'location',
    question: 'What area are you based in?',
    answer:
      'We primarily serve London and surrounding areas, but depending on the project, we may be able to travel further. Get in touch to discuss your location and project needs.',
  },
  {
    id: 'timeline',
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary depending on size and complexity. We’ll provide an estimated schedule during your consultation and keep you updated throughout the process.',
  },
  {
    id: 'quotes',
    question: 'Do you offer free quotes?',
    answer:
      'Yes, we offer free, no-obligation quotes. Our team will visit your property, assess your needs, and provide a detailed breakdown.',
  },
  {
    id: 'planning',
    question: 'Will I need planning permission for my project?',
    answer:
      'This depends on the type and scope of your project. We can guide you through local regulations and help with applications if needed.',
  },
  {
    id: 'guarantee',
    question: 'Do you provide a guarantee for your work?',
    answer:
      'Absolutely. All of our work is backed by a guarantee for quality and durability, giving you peace of mind.',
  },
  {
    id: 'living',
    question: 'Can I stay in my home while the work is being done?',
    answer:
      'In most cases, yes—though it may depend on the scope of work and areas affected. We’ll discuss options to minimise disruption.',
  },
  {
    id: 'getting-started',
    question: 'How do I get started with a project?',
    answer:
      'Simply get in touch with our team. We’ll arrange a consultation, discuss your ideas, and prepare a tailored plan and quote.',
  },
];

const FAQ = () => {
  const { isOpen, toggle } = useDisclosure({
    defaultOpen: 'location',
    allowMultiple: false,
  });

  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const itemsRef = useRef([]);
  const descriptionRefs = useRef({});

  useGSAP(() => {
    gsap.fromTo(
      itemsRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      buttonRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }
    );

    const buttonContainer = buttonRef.current;
    const button = buttonContainer?.querySelector('button');
    const buttonArrow = buttonContainer?.querySelector('.button-arrow');

    if (button && buttonArrow) {
      const handleMouseEnter = () => {
        gsap.to(button, { y: -3, duration: 0.2, ease: 'power2.out' });
        gsap.to(buttonArrow, { x: 4, duration: 0.2, ease: 'power2.out' });
      };

      const handleMouseLeave = () => {
        gsap.to(button, { y: 0, duration: 0.2, ease: 'power2.out' });
        gsap.to(buttonArrow, { x: 0, duration: 0.2, ease: 'power2.out' });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useGSAP(() => {
    faqData.forEach((faq) => {
      if (isOpen(faq.id) && descriptionRefs.current[faq.id]) {
        gsap.fromTo(
          descriptionRefs.current[faq.id],
          {
            opacity: 0,
            x: 20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.1,
          }
        );
      }
    });
  }, [isOpen]);

  return (
    <section className='bg-white py-16 lg:py-24'>
      <div className='mx-auto px-4 md:px-8 lg:px-12 xl:px-16'>
        <div className='flex flex-col justify-center items-center mb-12 lg:mb-20 text-center'>
          <Title subtitle='FAQs' text='Answering Your Questions' variant='lg' />
          <p className='text-lg md:text-xl text-[#3D3D47] mt-6 max-w-xl mx-auto'>
            Got more questions? Send us your enquiry below
          </p>
          <div ref={buttonRef} className='mt-10'>
            <Button
              text='Work with us'
              className='bg-[#e8e8e8] text-primary hover:bg-gray-400 text-sm sm:text-[16px] px-4 sm:px-6 py-2 sm:py-3'
              arrowClassName='bg-primary button-arrow'
            />
          </div>
        </div>
        <div ref={containerRef} className='max-w-4xl mx-auto space-y-4'>
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className={cn(
                'bg-[#E6E6E6] rounded-2xl overflow-hidden transition-all duration-300 border border-gray-400',
                isOpen(faq.id) ? 'bg-[#E6E6E6]' : 'hover:bg-gray-100'
              )}
            >
              <button
                onClick={() => toggle(faq.id)}
                className='w-full flex items-center justify-between p-6 text-left transition-all duration-300 hover:text-gray-900 group'
              >
                <span className='text-lg md:text-xl font-medium text-primary pr-8'>
                  {faq.question}
                </span>

                <div
                  className={cn(
                    'w-6 h-6 flex items-center justify-center transition-all duration-300 flex-shrink-0',
                    isOpen(faq.id)
                      ? 'rotate-45 text-primary'
                      : 'rotate-0 text-primary group-hover:text-black-700'
                  )}
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <line x1='12' y1='5' x2='12' y2='19' />
                    <line x1='5' y1='12' x2='19' y2='12' />
                  </svg>
                </div>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-400 ease-out',
                  isOpen(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className='px-6 pb-6'>
                  <div
                    ref={(el) => (descriptionRefs.current[faq.id] = el)}
                    className='opacity-0'
                  >
                    <p className='text-gray-600 leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Title from '@/atoms/Title';
import { cn } from '@/utils/cn';
import { useDisclosure } from '@/hooks/useDisclosure';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const services = [
  {
    id: 'kitchens',
    title: 'Kitchens',
    iconPath: '/icons/kitchen.svg',
    image: '/images/kitchen.jpg',
    description:
      "At LifetimeArt, we design and build stunning kitchens tailored to your style and needs. Whether you prefer sleek modern lines or a timeless, classic look, our team delivers premium craftsmanship, functional layouts, and meticulous attention to detail—creating a kitchen you'll love to cook and gather in.",
  },
  {
    id: 'loft-conversions',
    title: 'Loft Conversions',
    iconPath: '/icons/loft.svg',
    image: '/images/loft.png',
    description:
      'Transform unused loft space into a beautiful, practical part of your home. From cozy bedrooms to bright home offices, we handle everything from structural adjustments to finishing touches, ensuring your new space is safe, stylish, and seamlessly integrated with your existing home.',
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    iconPath: '/icons/bathroom.svg',
    image: '/images/bathroom.png',
    description:
      'We create bathrooms that balance relaxation and practicality, with designs ranging from spa-inspired retreats to minimalist, functional spaces. Our team sources high-quality fixtures and finishes, ensuring durability, elegance, and comfort for years to come.',
  },
  {
    id: 'extensions',
    title: 'Extensions',
    iconPath: '/icons/extension.svg',
    image: '/images/extension.png',
    description:
      "Expand your living space without compromising on style. Whether it's a kitchen extension, a new family room, or an entire additional floor, we work closely with you to design and build an extension that complements your home and adds value.",
  },
  {
    id: 'restorations',
    title: 'Restorations',
    iconPath: '/icons/restoration.svg',
    image: '/images/restoration.png',
    description:
      'Preserve the charm of your property while upgrading it for modern living. Our restoration work combines traditional craftsmanship with modern techniques to breathe new life into historic or worn-down spaces.',
  },
  {
    id: 'external-works',
    title: 'External Works',
    iconPath: '/icons/external.svg',
    image: '/images/external.png',
    description:
      'Enhance the beauty and functionality of your outdoor areas. From garden landscaping to patios, pathways, and exterior lighting, we create inviting spaces that connect your home to nature.',
  },
];

const Service = () => {
  const { isOpen, toggle } = useDisclosure({
    defaultOpen: 'kitchens',
    allowMultiple: false,
  });

  const imageRef = useRef(null);
  const accordionRef = useRef(null);
  const descriptionRefs = useRef({});

  const activeServiceId =
    services.find((service) => isOpen(service.id))?.id || 'kitchens';
  const activeServiceData =
    services.find((service) => service.id === activeServiceId) || services[0];

  const handleServiceClick = (serviceId) => {
    const wasOpen = isOpen(serviceId);
    if (!wasOpen) {
      toggle(serviceId);
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      accordionRef.current?.querySelectorAll('.service-item') || [],
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: accordionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, []);

  useGSAP(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.98,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }
  }, [activeServiceId]);

  useGSAP(() => {
    services.forEach((service) => {
      if (isOpen(service.id) && descriptionRefs.current[service.id]) {
        gsap.set(descriptionRefs.current[service.id], { opacity: 1 });

        gsap.fromTo(
          descriptionRefs.current[service.id],
          {
            opacity: 0,
            x: 15,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.15,
          }
        );
      }
    });
  }, [isOpen]);

  return (
    <section className='bg-[#FAFAFA] py-16 lg:py-24'>
      <div className='mx-auto px-4 md:px-8 lg:px-12 xl:px-16'>
        <div className='flex flex-col justify-center items-center mb-20'>
          <Title subtitle='Services' text='What we do' />
          <p className='text-xl text-[#3D3D47] mt-6 max-w-2xl mx-auto'>
            Find out which one of our services fit the needs of your project
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          <div className='order-2 lg:order-1'>
            <div className='order-2 lg:order-1'>
              <div className='rounded-2xl overflow-hidden bg-gray-100 sticky top-8'>
                <Image
                  ref={imageRef}
                  src={activeServiceData.image}
                  alt={`${activeServiceData.title} Service`}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='w-full h-auto'
                  priority={activeServiceId === 'kitchens'}
                />
              </div>
            </div>
          </div>

          <div ref={accordionRef} className='order-2 lg:order-1 space-y-0'>
            {services.map((service) => (
              <div
                key={service.id}
                className='service-item border-b border-gray-200 last:border-b-0'
              >
                <button
                  onClick={() => handleServiceClick(service.id)}
                  className={cn(
                    'w-full flex items-center justify-between py-6 text-left transition-all duration-300 hover:text-gray-900 group',
                    isOpen(service.id) ? 'text-gray-900' : 'text-gray-600'
                  )}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={cn(
                        'w-6 h-6 flex items-center justify-center transition-colors duration-300',
                        isOpen(service.id)
                          ? 'text-gray-900'
                          : 'text-gray-500 group-hover:text-gray-700'
                      )}
                    >
                      <Image
                        src={service.iconPath}
                        alt={`${service.title} icon`}
                        width={30}
                        height={30}
                        className='w-10 h-10'
                      />
                    </div>
                    <span className='text-xl font-medium'>{service.title}</span>
                  </div>

                  <div
                    className={cn(
                      'w-6 h-6 flex items-center justify-center transition-all duration-300',
                      isOpen(service.id)
                        ? 'rotate-45 text-gray-900'
                        : 'rotate-0 text-gray-500 group-hover:text-gray-700'
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
                    'overflow-hidden transition-all duration-300 ease-out',
                    isOpen(service.id)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  )}
                >
                  <div className='pb-6 pr-10'>
                    <div
                      ref={(el) => (descriptionRefs.current[service.id] = el)}
                      className={isOpen(service.id) ? 'opacity-1' : 'opacity-0'}
                    >
                      <p className='text-gray-600 leading-relaxed'>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;

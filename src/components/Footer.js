'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const Footer = () => {
  const quickLinks = [
    { name: 'About us', href: '#about' },
    { name: 'Our work', href: '#work' },
    { name: 'Services', href: '#services' },
  ];

  const additionalLinks = [
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: targetElement,
          offsetY: 80,
        },
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <footer className={cn('bg-primary text-white py-12 px-4 md:px-8')}>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
          <div>
            <Image
              src='/Logo.svg'
              alt='LifetimeArt Logo'
              width={40}
              height={40}
              className='w-40 h-40'
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-8 md:gap-16'>
            <div>
              <h3 className='text-lg font-medium mb-4 text-white'>
                Quick links
              </h3>
              <ul className='space-y-3'>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className='text-gray-300 hover:text-white transition-colors duration-200'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-medium mb-4 text-transparent'>
                Additional
              </h3>
              <ul className='space-y-3'>
                {additionalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScrollToSection(e, link.href)}
                      className='text-gray-300 hover:text-white transition-colors duration-200'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 mt-8 pt-6'>
          <p className='text-white text-sm'>
            © {new Date().getFullYear()} LifetimeArt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

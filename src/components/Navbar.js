'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils/cn';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Our work', href: '#work' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.1,
        }
      );

      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          delay: 0.2,
        }
      );

      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.3,
        }
      );
    },
    { scope: navbarRef }
  );

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;

      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';

        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll('.mobile-nav-item'),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
            stagger: 0.1,
            delay: 0.1,
          }
        );
      } else {
        document.body.style.overflow = '';

        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: 'power2.in',
        });
      }
    },
    { dependencies: [isMobileMenuOpen] }
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    {
      'bg-black/90 backdrop-blur-md shadow-lg py-3': isScrolled,
      'bg-transparent py-6': !isScrolled,
    }
  );

  const containerClasses = cn(
    'safe-width mx-auto max-w-7xl',
    'px-4 md:px-8 lg:px-12 xl:px-16'
  );

  const logoClasses = cn('flex items-center flex-shrink-0');

  const logoImageClasses = cn('w-auto h-8 md:h-10');

  const desktopNavClasses = cn('hidden md:flex items-center space-x-8');

  const navLinkClasses = cn(
    'relative text-white font-medium text-base',
    'hover-underline group transition-colors duration-200'
  );

  const hamburgerButtonClasses = cn(
    'md:hidden p-2 transition-colors duration-200 flex-shrink-0',
    'text-white'
  );

  const hamburgerLineClasses = (condition, activeClasses = '') =>
    cn('w-5 h-0.5 bg-current transition-all duration-300', {
      [activeClasses]: condition,
    });

  const mobileMenuClasses = cn(
    'fixed inset-0 z-40 md:hidden',
    'bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-md'
  );

  const mobileMenuContentClasses = cn('flex flex-col min-h-screen');

  const mobileMenuHeaderClasses = cn('h-20 flex items-center justify-end px-4');

  const mobileMenuNavClasses = cn(
    'flex flex-col px-6 py-8 space-y-8 flex-1 justify-start'
  );

  const mobileNavLinkClasses = cn(
    'mobile-nav-item text-white text-3xl font-medium',
    'hover:text-gray-300 transition-colors duration-200 text-left'
  );

  return (
    <>
      <nav ref={navbarRef} className={navbarClasses}>
        <div className={containerClasses}>
          <div className='flex items-center justify-between'>
            <div ref={logoRef} className={logoClasses}>
              <div className='flex items-center space-x-2'>
                <Image
                  src='/Logo.svg'
                  alt='LifetimeArt Logo'
                  width={150}
                  height={150}
                  className={logoImageClasses}
                />
              </div>
            </div>

            <div className={desktopNavClasses}>
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  ref={(el) => (navItemsRef.current[index] = el)}
                  className={navLinkClasses}
                >
                  {item.name}
                  <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full'></span>
                </a>
              ))}
            </div>

            <button
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
              className={hamburgerButtonClasses}
              aria-label='Toggle menu'
            >
              <div className='w-6 h-6 flex flex-col justify-center items-center'>
                <span
                  className={hamburgerLineClasses(
                    isMobileMenuOpen,
                    'rotate-45 translate-y-1'
                  )}
                />
                <span
                  className={cn(
                    hamburgerLineClasses(isMobileMenuOpen, 'opacity-0'),
                    'mt-1'
                  )}
                />
                <span
                  className={cn(
                    hamburgerLineClasses(
                      isMobileMenuOpen,
                      '-rotate-45 -translate-y-2'
                    ),
                    'mt-1'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className={mobileMenuClasses}>
          <div className={mobileMenuContentClasses}>
            <div className={mobileMenuHeaderClasses} />

            <div className={mobileMenuNavClasses}>
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClasses}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hover-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .hover-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Navbar;

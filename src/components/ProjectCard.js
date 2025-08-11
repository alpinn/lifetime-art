import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/utils/cn';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectCard = ({ project, index, isEven }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, {
      opacity: 0,
      y: 50,
    });

    const animation = gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: index * 0.15,
    });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      animation: animation,
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={cn(
        'rounded-2xl overflow-hidden shadow-lg p-6',
        !isEven ? 'bg-primary' : 'bg-secondary',
        'flex flex-col md:flex-row md:items-stretch'
      )}
    >
      <div className='relative h-64 md:h-auto md:w-1/2 overflow-hidden flex-shrink-0 rounded-2xl'>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover transition-transform duration-300 hover:scale-105'
          priority={index < 2}
        />
      </div>

      <div className='pl-0 md:pl-8 md:w-1/2 flex flex-col justify-center'>
        <h3
          className={cn(
            'text-3xl lg:text-[40px] font-medium mb-4 mt-4 md:mt-0',
            {
              'text-white': !isEven,
              'text-primary': isEven,
            }
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn('text-base leading-relaxed mb-4', {
            'text-white': !isEven,
            'text-primary': isEven,
          })}
        >
          {project.description}
        </p>

        <div className='flex flex-wrap gap-3 mb-6 lg:mb-8'>
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className='bg-[#28282C] text-white px-4 py-1 text-base font-medium rounded-full backdrop-blur-sm'
            >
              {tag}
            </span>
          ))}
        </div>

        <div className='mb-6 lg:mb-8'>
          <div className='flex items-start gap-2 md:gap-4'>
            <div className='flex-shrink-0'>
              {!isEven ? (
                <Image
                  src='/icons/quoteWhite.svg'
                  alt='Quote'
                  width={32}
                  height={32}
                  className='opacity-80 lg:w-8 lg:h-8'
                />
              ) : (
                <Image
                  src='/icons/quoteBlack.svg'
                  alt='Quote'
                  width={32}
                  height={32}
                  className='opacity-80 lg:w-8 lg:h-8'
                />
              )}
            </div>
            <blockquote
              className={cn('text-base lg:text-lg leading-relaxed', {
                'text-white': !isEven,
                'text-primary': isEven,
              })}
            >
              {project.quote}
            </blockquote>
          </div>
        </div>

        <div className='flex items-center gap-2 md:gap-4'>
          <div className='relative w-12 h-12 rounded-full overflow-hidden'>
            <Image
              src={project.avatar}
              alt={project.name}
              fill
              sizes='(max-width: 768px) 48px, 56px'
              className='object-cover'
            />
          </div>
          <div>
            <p
              className={cn('font-semibold text-base md:text-base', {
                'text-white': !isEven,
                'text-primary': isEven,
              })}
            >
              {project.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

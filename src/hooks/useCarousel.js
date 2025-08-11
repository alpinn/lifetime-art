'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(ScrollTrigger);

export const useCarousel = (options = {}) => {
  const {
    autoplayDelay = 4000,
    animationDuration = 300,
    animationEasing = 'power2.out',
    staggerDelay = 0.1,
    scrollTriggerStart = 'top 80%',
    enableAutoplay = true,
    loop = true,
  } = options;

  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const autoplayOptions = {
    delay: autoplayDelay,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      slidesToScroll: 1,
      skipSnaps: false,
    },
    enableAutoplay ? [Autoplay(autoplayOptions)] : []
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const initializeAnimations = useCallback(
    (itemCount) => {
      if (!containerRef.current || itemCount === 0) return;

      const ctx = gsap.context(() => {
        gsap.set('.carousel-slide', {
          opacity: 0,
          x: -30,
          scale: 0.95,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: scrollTriggerStart,
            toggleActions: 'play none none reverse',
            onEnter: () => {
              setIsInView(true);
              if (enableAutoplay && emblaApi) {
                const autoplayPlugin = emblaApi.plugins().autoplay;
                if (autoplayPlugin) {
                  autoplayPlugin.play();
                }
              }
            },
            onLeave: () => setIsInView(false),
            onEnterBack: () => setIsInView(true),
            onLeaveBack: () => setIsInView(false),
          },
        });

        tl.to('.carousel-slide', {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: animationDuration / 1000,
          ease: animationEasing,
          stagger: staggerDelay,
        });
      }, containerRef);

      return () => ctx.revert();
    },
    [
      animationDuration,
      animationEasing,
      staggerDelay,
      scrollTriggerStart,
      enableAutoplay,
      emblaApi,
    ]
  );

  return {
    containerRef,
    emblaRef,
    emblaApi,
    selectedIndex,
    isInView,
    scrollTo,
    scrollPrev,
    scrollNext,
    initializeAnimations,
  };
};

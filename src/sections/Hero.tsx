import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Nav entrance
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.4 },
        0
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        tl.fromTo(
          headlineWords,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          0.1
        );
      }

      // CTA entrance
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4 },
        0.45
      );

      // Hero image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: '10vw', rotateZ: 1 },
        { opacity: 1, x: 0, rotateZ: 0, duration: 0.7 },
        0.35
      );

      // Pills entrance
      const pills = pillsRef.current?.querySelectorAll('.pill');
      if (pills) {
        tl.fromTo(
          pills,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          0.7
        );
      }

      // Scroll-driven animation (pinned)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, imageRef.current, ctaRef.current, pillsRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): subtle adjustments
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-2vw' },
        { x: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(
        imageRef.current,
        { x: '2vw' },
        { x: 0, ease: 'none' },
        0
      );

      // EXIT (70-100%): elements exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '28vw', opacity: 0, scale: 0.96, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        pillsRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen bg-navy overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial" />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 h-[72px] z-50 flex items-center justify-between px-[4vw]"
      >
        <div className="font-heading font-bold text-2xl text-foreground tracking-tight">
          SV.
        </div>
        <div className="flex items-center gap-7">
          <button
            onClick={() => scrollToSection('projects')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Left: Headline */}
        <div
          ref={headlineRef}
          className="absolute left-[7vw] top-[26vh] w-[44vw] max-w-[600px]"
        >
          <h1 className="font-heading font-bold text-foreground leading-[0.95] mb-4">
            <span className="word block text-[clamp(36px,4.5vw,64px)]">Soniya</span>
            <span className="word block text-[clamp(36px,4.5vw,64px)]">Varshney</span>
          </h1>
          <p className="word text-xl md:text-2xl text-violet font-medium mb-3">
            Full Stack Developer
          </p>
          <p className="word text-base text-muted-foreground max-w-[400px] leading-relaxed">
            I build scalable backends, responsive frontends, and AI-powered features.
          </p>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="absolute left-[7vw] top-[58vh]">
          <Button
            onClick={() => scrollToSection('projects')}
            className="bg-violet hover:bg-violet-dark text-white px-6 py-5 rounded-xl text-sm font-medium transition-all hover:shadow-glow"
          >
            View My Work
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Social Proof Pills */}
        <div ref={pillsRef} className="absolute left-[7vw] top-[68vh] flex gap-3">
          <span className="pill px-4 py-2 bg-card rounded-full text-xs font-mono text-muted-foreground border border-border">
            3+ Years Experience
          </span>
          <span className="pill px-4 py-2 bg-violet/10 rounded-full text-xs font-mono text-violet border border-violet/30">
            Open to Opportunities
          </span>
        </div>

        {/* Right: Hero Image Card */}
        <div
          ref={imageRef}
          className="absolute right-[7vw] top-[18vh] w-[34vw] h-[34vw] min-w-[280px] min-h-[280px] max-w-[480px] max-h-[480px]"
        >
          <div className="relative w-full h-full bg-card rounded-2xl card-shadow overflow-hidden">
            {/* Status dot */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-violet rounded-full animate-pulse-subtle z-10" />
            <img
              src="/hero_portrait.jpg"
              alt="Soniya Varshney"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Social Links - Bottom Right */}
      <div className="absolute bottom-8 right-[7vw] flex gap-4 z-20">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-violet hover:border-violet/50 transition-all"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

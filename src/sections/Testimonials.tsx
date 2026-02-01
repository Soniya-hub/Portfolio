import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Soniya consistently delivers clean, maintainable code and never misses the details. Her UI rework made our internal tool actually enjoyable to use.",
    author: 'Senior Engineer',
    role: 'Optum',
  },
  {
    quote:
      "She's the kind of teammate who raises the bar—great at explaining complex ideas and always ready to help others grow.",
    author: 'Team Lead',
    role: 'Optum',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: '-8vw' },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.18,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Border accent animation
      const borders = cardsRef.current?.querySelectorAll('.border-accent');
      if (borders) {
        gsap.fromTo(
          borders,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.18,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground">
            What People Say
          </h2>
        </div>

        {/* Testimonials */}
        <div ref={cardsRef} className="space-y-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-card rounded-2xl p-6 md:p-8 card-shadow overflow-hidden"
            >
              {/* Border accent */}
              <div className="border-accent absolute left-0 top-0 bottom-0 w-[3px] bg-violet origin-top" />

              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-violet/50" />
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-violet">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Senior Software Engineer',
    company: 'Optum · UnitedHealth Group',
    duration: 'May 2026 – Present',
    bullets: [
      'Promoted for consistent delivery, technical leadership, and ownership of business-critical modules.',
      'Lead backend architecture decisions for Java Spring Boot microservices supporting enterprise-scale release workflows.',
      'Drive technical design reviews, API contracts, and full-stack delivery across Java, Node.js, and React.js.',
      'Mentor junior and mid-level developers on microservice design, clean code, and CI/CD best practices.',
    ],
  },
  {
    title: 'Software Engineer (ASE-2)',
    company: 'Optum · UnitedHealth Group',
    duration: '2025 – May 2026',
    bullets: [
      'Designed and developed an internal Release Management Tool (Java, Spring Boot, Hibernate, Node.js), replacing SharePoint workflows and reducing approval cycle time significantly.',
      'Built Node.js REST microservices for async operations alongside core Java services.',
      'Redesigned internal portal UI with React.js and Bootstrap — improving responsiveness and user engagement.',
      'Implemented JWT auth, input validation, and structured logging across Java and Node.js services.',
      'Drove cross-functional collaboration resulting in 25% increase in throughput and 40% improvement in customer satisfaction.',
    ],
  },
  {
    title: 'Associate Software Engineer I',
    company: 'Optum · UnitedHealth Group',
    duration: '2022 – 2024',
    bullets: [
      'Developed high-performance distributed applications using Spring Boot, JSP, Angular, and Bootstrap.',
      'Integrated RESTful APIs with front-end UIs and optimised SQL Server queries for performance and scalability.',
      'Conducted code reviews and promoted clean coding standards across the team.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Apisero',
    duration: '2021 – 2022',
    bullets: [
      'Developed expertise in Salesforce, Snowflake, Java, HTML, CSS, jQuery, and JavaScript.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline line draw animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      const items = timelineRef.current?.querySelectorAll('.timeline-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: '-6vw' },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Dots animation
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        gsap.fromTo(
          dots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
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
      id="experience"
      className="relative w-full bg-navy py-[10vh] px-[7vw]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.12em] text-violet mb-4">
            Experience
          </span>
          <h2 className="font-heading font-bold text-[clamp(32px,3.6vw,48px)] text-foreground">
            Where I&apos;ve Worked
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-8 md:pl-12">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-violet/35 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item relative">
                {/* Dot */}
                <div className="timeline-dot absolute -left-[2.15rem] md:-left-[3.15rem] top-1 w-3 h-3 bg-violet rounded-full border-2 border-navy" />

                {/* Card */}
                <div className="bg-card rounded-2xl p-6 card-shadow hover:border-violet/30 border border-transparent transition-all">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet/10 text-violet">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-violet">{exp.company}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-navy-light px-3 py-1 rounded-full">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-violet flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import ProblemIntro from "@/features/landing/components/Main/ui/ProblemIntro";
import ProblemCard, { PROBLEMS } from "@/features/landing/components/Main/ui/ProblemCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const introTl = gsap.timeline({
      scrollTrigger: {
        trigger: introStageRef.current,
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    introTl.fromTo(
      ".problem-title-phrase",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.22,
        ease: "power2.out",
      },
      0
    )
      .to({}, { duration: 0.16 }, 0.22)
      .to(
        ".problem-title-stage",
        {
          opacity: 0,
          y: -45,
          scale: 0.97,
          duration: 0.12,
          ease: "power2.in",
        },
        0.38
      )
      .fromTo(
        ".problem-desc-stage",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        },
        0.50
      )
      .to({}, { duration: 0.18 }, 0.70)
      .to(
        ".problem-desc-stage",
        {
          opacity: 0,
          y: -35,
          duration: 0.12,
          ease: "power2.in",
        },
        0.88
      );

    const cardFrames = gsap.utils.toArray<HTMLElement>(".problem-card-frame");

    cardFrames.forEach((frame) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      cardTl.fromTo(
        frame.querySelector(".card-title"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        0
      )
        .fromTo(
          frame.querySelector(".card-desc"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          0.2
        )
        .fromTo(
          frame.querySelector(".card-visual"),
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.4
        )
        .to({}, { duration: 0.35 }, 0.65);
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="problem"
      className="relative bg-background"
      aria-labelledby="problem-heading"
    >
      <ProblemIntro ref={introStageRef} />

      <div className="problem-cards-wrapper relative w-full">
        {PROBLEMS.map((item, i) => (
          <ProblemCard
            key={item.id}
            item={item}
            index={i}
            total={PROBLEMS.length}
          />
        ))}
      </div>
    </section>
  );
}
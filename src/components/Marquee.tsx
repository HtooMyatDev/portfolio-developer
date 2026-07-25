import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMemo, useRef } from "react";

import {
  LaravelIcon,
  NextjsIcon,
  TypeScriptIcon,
  NodeIcon,
  PostgresIcon,
  PrismaIcon,
  ReactIcon,
  TailwindIcon,
  SupabaseIcon,
  NpmIcon,
} from "@/components/icons/index";

type Props = {
  isReversed?: boolean;
  className?: string;
};
const ICONS = [
  NextjsIcon,
  LaravelIcon,
  TypeScriptIcon,
  NodeIcon,
  PostgresIcon,
  PrismaIcon,
  ReactIcon,
  TailwindIcon,
  SupabaseIcon,
  NpmIcon,
];
const ELEMENTS = [...ICONS, ...ICONS];

const Marquee = ({ isReversed = false }: Props) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>(null);

  useGSAP(
    () => {
      const setupInfiniteMarqueeTimeline = () => {
        timeline.current?.kill();
        gsap.set(movingContainer.current, { xPercent: isReversed ? -50 : 0 });
        timeline.current = gsap
          .timeline({
            defaults: { ease: "none", repeat: -1 },
          })
          .to(movingContainer.current, {
            xPercent: isReversed ? 0 : -50,
            duration: 20,
          })
          .set(movingContainer.current, { xPercent: 0 });
      };
      setupInfiniteMarqueeTimeline();
    },
    { dependencies: [isReversed] },
  );

  const list = useMemo(
    () => (
      <div className="flex w-fit items-center gap-10">
        {ELEMENTS.map((Icon, index) => {
          const isLast = index === ELEMENTS.length - 1;
          return (
            <div
              key={index}
              className={`relative flex shrink-0 items-center justify-center px-6 ${isLast && "mr-10"}`}
            >
              <Icon />
            </div>
          );
        })}
      </div>
    ),
    [],
  );

  const timelineTimeScaleTween = useRef<GSAPTween>(null);
  const onPointerEnter = () => {
    if(!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.5,
    });
  }
  const onPointerLeave = () => {
     if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
     timelineTimeScaleTween.current = gsap.to(timeline.current, {
       timeScale: 1,
         duration: 0.5,
     });
  }

  return (
    <div
      className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] py-2 overflow-hidden flex whitespace-nowrap cursor-pointer"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div ref={movingContainer} className="flex w-fit">
        {list}
        {list}
      </div>
    </div>
  );
};

export default Marquee;

import { DOTS_DESKTOP } from "./dotsDesktop";
import { DOTS_MOBILE } from "./dotsMobile";

export const Background = () => {
  return (
    <>
      <section
        aria-hidden="true"
        className="fixed inset-0 z-0 h-dvh w-full overflow-hidden bg-black pointer-events-none md:hidden"
      >
        {DOTS_MOBILE.map((dot, i) => (
          <span
            key={i}
            className="animate-move absolute h-24 w-24 rounded-full bg-current opacity-90 [filter:blur(24px)] [will-change:transform,filter] [backface-visibility:hidden] after:content-[''] after:absolute after:-inset-6 after:[border-radius:inherit] after:bg-current after:opacity-50 after:[filter:blur(30px)] motion-reduce:animate-none"
            style={{
              color: dot.color,
              top: dot.top,
              left: dot.left,
              animationDuration: dot.dur,
              animationDelay: dot.delay,
              transformOrigin: dot.origin.replaceAll("_", " "),
            }}
          />
        ))}
      </section>

      <section
        aria-hidden="true"
        className="fixed inset-0 z-0 hidden h-dvh w-full overflow-hidden bg-black pointer-events-none md:block"
      >
        {DOTS_DESKTOP.map((dot, i) => (
          <span
            key={i}
            className="animate-move absolute h-64 w-64 rounded-full bg-current opacity-90 [filter:blur(64px)] [will-change:transform,filter] [backface-visibility:hidden] after:content-[''] after:absolute after:-inset-8 after:[border-radius:inherit] after:bg-current after:opacity-50 after:[filter:blur(64px)] motion-reduce:animate-none"
            style={{
              color: dot.color,
              top: dot.top,
              left: dot.left,
              animationDuration: dot.dur,
              animationDelay: dot.delay,
              transformOrigin: dot.origin.replaceAll("_", " "),
            }}
          />
        ))}
      </section>
    </>
  );
};

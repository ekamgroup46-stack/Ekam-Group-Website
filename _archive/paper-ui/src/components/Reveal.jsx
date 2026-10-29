import { useEffect, useRef } from "react";

// One shared observer for the whole app instead of one per element.
let observer;
const getObserver = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.setAttribute("data-shown", "");
        observer.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  ));

/**
 * Fades + lifts its children in once when scrolled into view.
 * Uses a data attribute (not a class) so React re-renders never undo it.
 * `delay` is in milliseconds.
 */
export default function Reveal({ as: Tag = "div", delay = 0, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} data-reveal="" style={delay ? { ...style, transitionDelay: `${delay}ms` } : style} {...rest}>
      {children}
    </Tag>
  );
}

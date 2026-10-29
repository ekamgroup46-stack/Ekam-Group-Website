import { useEffect, useRef, useState } from "react";

/**
 * Responsive photo from /public/images (each ships as -480 and -1200 WebP).
 * Renders its own `.media` wrapper, which shows a shimmer skeleton until the
 * image has loaded. Size the wrapper with `className`.
 */
export default function Photo({ name, alt, sizes = "(max-width: 900px) 100vw, 50vw", priority = false, position, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const img = useRef(null);

  // cached images can finish before React attaches onLoad
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) setLoaded(true);
  }, []);

  return (
    <div className={`media ${className}`} data-loaded={loaded || undefined}>
      <img
        ref={img}
        src={`/images/${name}-1200.webp`}
        srcSet={`/images/${name}-480.webp 480w, /images/${name}-1200.webp 1200w`}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}

/**
 * Responsive photo from /public/images (each image ships as -480 and -1200 WebP).
 * Wrap it in a `.photo` element that sets the aspect ratio.
 */
export default function Photo({ name, alt, sizes = "(max-width: 900px) 100vw, 50vw", priority = false, position, className }) {
  return (
    <img
      className={className}
      src={`/images/${name}-1200.webp`}
      srcSet={`/images/${name}-480.webp 480w, /images/${name}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : undefined}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

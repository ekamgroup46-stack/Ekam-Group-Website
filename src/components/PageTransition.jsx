/** Page wrapper — a short CSS fade-in, no exit animation, so navigation never waits. */
export default function PageTransition({ children }) {
  return <main className="page">{children}</main>;
}

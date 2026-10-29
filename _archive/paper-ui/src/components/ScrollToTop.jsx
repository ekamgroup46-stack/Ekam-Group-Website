import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return; // let in-page anchors do their thing
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

(() => {
  const WA_NUMBER = "918886576677";
  const RATE = 0.016;

  /* ---- nav: shadow on scroll + mobile menu ---- */
  const nav = document.querySelector(".nav");
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        // small stagger for siblings that enter together
        const sibs = [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal"));
        en.target.style.transitionDelay = `${Math.min(sibs.indexOf(en.target), 5) * 70}ms`;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- decorative QR (deterministic, not a real code) ---- */
  const qr = document.getElementById("qr");
  if (qr) {
    const N = 25;
    let seed = 1600;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    const inFinder = (x, y) =>
      (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    let cells = "";
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (!inFinder(x, y) && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
      }
    }
    const finder = (x, y) =>
      `<rect x="${x}" y="${y}" width="7" height="7" fill="#0b1b3f"/>` +
      `<rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fffdf8"/>` +
      `<rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#1e7b3e"/>`;
    qr.innerHTML =
      `<g fill="#0b1b3f">${cells}</g>` + finder(0, 0) + finder(N - 7, 0) + finder(0, N - 7) +
      `<rect x="10" y="10" width="5" height="5" rx="1" fill="#e2792a"/>`;
  }

  /* ---- charges calculator ---- */
  const range = document.getElementById("amt");
  const text = document.getElementById("amtText");
  const feeEl = document.getElementById("fee");
  const getEl = document.getElementById("get");
  const cta = document.getElementById("calcCta");
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  const render = (amount, fromText) => {
    const fee = amount * RATE;
    feeEl.textContent = inr(fee);
    getEl.textContent = inr(amount - fee);
    if (!fromText) text.value = amount.toLocaleString("en-IN");

    const pct = ((Math.min(amount, range.max) - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--p", `${Math.max(pct, 0)}%`);

    const msg = `Hi EKAM Group, I'd like to withdraw ${inr(amount)} using my credit card. Please share the charges.`;
    cta.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  range.addEventListener("input", () => render(+range.value));
  text.addEventListener("input", () => {
    const n = parseInt(text.value.replace(/\D/g, ""), 10) || 0;
    text.value = n ? n.toLocaleString("en-IN") : "";
    range.value = n;
    render(n, true);
  });
  render(+range.value);

  /* ---- footer year ---- */
  document.getElementById("yr").textContent = new Date().getFullYear();
})();

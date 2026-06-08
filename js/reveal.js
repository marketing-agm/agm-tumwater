/* ================================================================
   Scroll reveal — progressive enhancement.
   Elements are only hidden once this script tags them, so if the
   script never runs (or motion is reduced) all content stays visible.
   ================================================================ */
(function () {
  "use strict";

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No IntersectionObserver support or reduced motion → leave everything visible.
  if (prefersReduced || !("IntersectionObserver" in window)) return;

  // Grids whose direct children should cascade in.
  var staggerSelectors = [
    ".case-grid",
    ".team-grid",
    ".steps",
    ".stat-marquee",
    ".split"
  ];

  // Standalone blocks that fade up as a whole.
  var revealSelectors = [
    ".module-head",
    ".program",
    ".figure",
    ".ref-card",
    ".note",
    ".comp-table",
    ".def-list",
    ".parcel-table",
    ".hero-photo"
  ];

  var staggerEls = document.querySelectorAll(staggerSelectors.join(","));
  var revealEls = document.querySelectorAll(revealSelectors.join(","));

  var i;
  for (i = 0; i < staggerEls.length; i++) {
    staggerEls[i].classList.add("reveal-stagger");
  }
  for (i = 0; i < revealEls.length; i++) {
    revealEls[i].classList.add("reveal");
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
  );

  for (i = 0; i < staggerEls.length; i++) observer.observe(staggerEls[i]);
  for (i = 0; i < revealEls.length; i++) observer.observe(revealEls[i]);
})();

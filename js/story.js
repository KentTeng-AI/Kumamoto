/* 熊本城 四百年の物語 — 敘事式滾動 (scrollytelling) */
(function () {
  "use strict";

  // 標記 JS 已就緒：CSS 的「預設隱藏 .reveal」只在 body.js-ready 時生效，
  // 萬一本檔載入失敗（離線首開等），文字仍維持可見、不會整頁空白。
  document.body.classList.add("js-ready");

  /* ---- 進場動畫 ---- */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---- 章節導覽圓點 ---- */
  var dotsWrap = document.getElementById("dots");
  var chapters = [].slice.call(document.querySelectorAll(".story-chapter"));
  var dots = [];
  if (dotsWrap) {
    chapters.forEach(function (c) {
      var a = document.createElement("a");
      a.href = "#" + c.id;
      a.setAttribute("data-label", c.getAttribute("data-label") || "");
      a.setAttribute("aria-label", c.getAttribute("data-label") || c.id);
      dotsWrap.appendChild(a);
      dots.push(a);
    });
  }
  function updateDots() {
    if (!dots.length) return;
    var idx = 0, mark = window.innerHeight * 0.4;
    chapters.forEach(function (c, i) {
      if (c.getBoundingClientRect().top <= mark) idx = i;
    });
    dots.forEach(function (d, i) { d.classList.toggle("on", i === idx); });
  }

  /* ---- 閱讀進度條 ---- */
  var fill = document.getElementById("sp-fill");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var top = h.scrollTop || document.body.scrollTop || 0;
    if (fill) fill.style.width = (max > 0 ? (top / max) * 100 : 0) + "%";
    updateDots();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---- Service Worker（離線）---- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();

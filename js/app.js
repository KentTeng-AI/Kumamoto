/* 熊本城 深度導覽 — 互動邏輯 */
(function () {
  "use strict";
  var SPOTS = window.SPOTS || [];
  var ROUTES = window.ROUTES || [];
  var TIMELINE = window.TIMELINE || [];
  var META = window.STATUS_META;
  var STORE_KEY = "kumamoto_checklist_v1";
  var spotById = {};
  SPOTS.forEach(function (s) { spotById[s.id] = s; });

  /* ---- 打卡狀態 ---- */
  function loadChecked() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveChecked(obj) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  var checked = loadChecked();

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- 進度 ---- */
  function updateProgress() {
    var total = SPOTS.length;
    var done = SPOTS.filter(function (s) { return checked[s.id]; }).length;
    document.getElementById("progress-text").textContent = done + " / " + total;
    document.getElementById("progress-fill").style.width =
      (total ? (done / total * 100) : 0) + "%";
    renderDoneList();
  }

  // 已打卡清單：清楚列出哪些景點已打過卡，可點擊跳到該景點
  function renderDoneList() {
    var el = document.getElementById("done-list");
    if (!el) return;
    var done = SPOTS.filter(function (s) { return checked[s.id]; });
    if (!done.length) {
      el.innerHTML = '<p class="done-empty">尚未打卡任何景點 — 在下方「景點導覽」勾選即可記錄。</p>';
      return;
    }
    var items = done.map(function (s) {
      var m = META[s.status];
      return '<li><a href="#spot-' + s.id + '">' +
        '<span class="done-icon ' + m.cls + '">' + m.icon + "</span>" +
        '<span class="done-name">' + esc(s.name) + "</span>" +
        '<span class="done-jp">' + esc(s.jp) + "</span>" +
        '<button class="done-undo" data-undo="' + s.id + '" title="取消打卡">✕</button>' +
        "</a></li>";
    }).join("");
    el.innerHTML = '<p class="done-head">✅ 已打卡（' + done.length + " / " + SPOTS.length + "）</p>" +
      '<ul class="done-ul">' + items + "</ul>";
  }

  /* ---- 景點卡 ---- */
  function photoHTML(s) {
    if (s.image) {
      var cr = s.credit ? '<span class="credit">' + esc(s.credit) + "</span>" : "";
      return '<img loading="lazy" src="images/' + s.image + '" alt="' + esc(s.name) + '">' + cr;
    }
    return '<div class="ph"><span>📷</span><span style="font-size:.7rem">現場拍照點</span></div>';
  }
  function spotCard(s) {
    var m = META[s.status];
    var floors = s.floors
      ? '<ul class="floors">' + s.floors.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>"
      : "";
    var desc = s.desc.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var tip = s.tip ? '<div class="spot-tip">💡 ' + esc(s.tip) + "</div>" : "";
    var isDone = checked[s.id] ? " done" : "";
    return '' +
      '<article class="spot' + isDone + '" id="spot-' + s.id + '" data-status="' + s.status + '">' +
        '<div class="spot-photo">' +
          '<span class="badge ' + m.cls + '">' + m.icon + " " + m.label + "</span>" +
          photoHTML(s) +
        "</div>" +
        '<div class="spot-body">' +
          '<div class="spot-title">' +
            "<div><h3>" + esc(s.name) + '</h3><div class="spot-jp">' + esc(s.jp) + "</div></div>" +
            '<span class="spot-area">' + esc(s.area) + "</span>" +
          "</div>" +
          desc + floors + tip +
          '<label class="check"><input type="checkbox" data-id="' + s.id + '"' +
            (checked[s.id] ? " checked" : "") + "> 我已參觀這裡</label>" +
        "</div>" +
      "</article>";
  }
  function renderSpots() {
    document.getElementById("spot-list").innerHTML = SPOTS.map(spotCard).join("");
  }

  /* ---- 路線 ---- */
  function renderRouteTabs() {
    document.getElementById("route-tabs").innerHTML = ROUTES.map(function (r, i) {
      return '<button data-route="' + r.id + '"' + (i === 0 ? ' class="on"' : "") + ">" +
        esc(r.name) + "</button>";
    }).join("");
  }
  function renderRoute(routeId) {
    var r = ROUTES.filter(function (x) { return x.id === routeId; })[0] || ROUTES[0];
    var steps = r.steps.map(function (id, i) {
      var s = spotById[id];
      if (!s) return "";
      var m = META[s.status];
      return '<li><span class="step-num ' + m.cls + '">' + (i + 1) + "</span>" +
        '<a href="#spot-' + s.id + '" class="step-name">' + esc(s.name) + "</a> " +
        '<span class="badge-inline">' + m.icon + "</span>" +
        '<div class="step-jp">' + esc(s.jp) + "</div></li>";
    }).join("");
    document.getElementById("route-detail").innerHTML =
      '<div class="route-meta">⏱ <b>' + esc(r.time) + "</b> ｜ " + esc(r.note) + "</div>" +
      '<ol class="route-steps">' + steps + "</ol>";
  }

  /* ---- 時間軸 ---- */
  function renderTimeline() {
    document.getElementById("timeline").innerHTML = TIMELINE.map(function (t) {
      var body = t.detail.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
      var src = t.source
        ? '<p class="src">📖 <a href="' + t.source + '" target="_blank" rel="noopener">官方／資料來源</a></p>'
        : "";
      return "<details><summary>" +
        '<span class="tl-year">' + esc(t.year) + "</span>" +
        '<div class="tl-title">' + esc(t.title) + "</div>" +
        '<div class="tl-summary">' + esc(t.summary) + "</div>" +
        "</summary><div class=\"tl-detail\">" + body + src + "</div></details>";
    }).join("");
  }

  /* ---- 事件 ---- */
  function bindEvents() {
    // 打卡
    document.getElementById("spot-list").addEventListener("change", function (e) {
      var cb = e.target;
      if (cb && cb.matches("input[type=checkbox]")) {
        var id = cb.getAttribute("data-id");
        if (cb.checked) checked[id] = true; else delete checked[id];
        saveChecked(checked);
        var card = document.getElementById("spot-" + id);
        if (card) card.classList.toggle("done", cb.checked);
        updateProgress();
      }
    });
    // 從「已打卡清單」直接取消打卡
    document.getElementById("done-list").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-undo]");
      if (!btn) return;
      e.preventDefault();
      var id = btn.getAttribute("data-undo");
      delete checked[id];
      saveChecked(checked);
      var card = document.getElementById("spot-" + id);
      if (card) {
        card.classList.remove("done");
        var box = card.querySelector("input[type=checkbox]");
        if (box) box.checked = false;
      }
      updateProgress();
    });
    // 清除
    document.getElementById("reset-btn").addEventListener("click", function () {
      if (!confirm("確定清除所有打卡紀錄？")) return;
      checked = {};
      saveChecked(checked);
      renderSpots();
      updateProgress();
    });
    // 路線切換
    document.getElementById("route-tabs").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      document.querySelectorAll("#route-tabs button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      renderRoute(b.getAttribute("data-route"));
    });
    // 篩選
    document.querySelector(".filter-bar").addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      document.querySelectorAll(".filter").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      var f = b.getAttribute("data-filter");
      document.querySelectorAll(".spot").forEach(function (card) {
        card.style.display = (f === "all" || card.dataset.status === f) ? "" : "none";
      });
    });
  }

  /* ---- 啟動 ---- */
  renderRouteTabs();
  renderRoute(ROUTES[0] && ROUTES[0].id);
  renderSpots();
  renderTimeline();
  updateProgress();
  bindEvents();

  /* ---- Service Worker（離線） ---- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();

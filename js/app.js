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
    var story = s.story
      ? '<a class="read-story" href="index.html#' + s.story + '">📖 讀這段故事 →</a>'
      : "";
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
          desc + floors + tip + story +
          '<label class="check"><input type="checkbox" data-id="' + s.id + '"' +
            (checked[s.id] ? " checked" : "") + "> 我已參觀這裡</label>" +
        "</div>" +
      "</article>";
  }
  function renderSpots() {
    document.getElementById("spot-list").innerHTML = SPOTS.map(spotCard).join("");
  }

  /* ---- 周邊延伸景點（不列入打卡）---- */
  function aroundCard(s) {
    var desc = s.desc.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    var tip = s.tip ? '<div class="spot-tip">💡 ' + esc(s.tip) + "</div>" : "";
    var mapUrl = mapUrlFor(s);
    return '' +
      '<article class="spot" id="spot-' + s.id + '">' +
        '<div class="spot-photo">' + photoHTML(s) + "</div>" +
        '<div class="spot-body">' +
          '<div class="spot-title">' +
            "<div><h3>" + esc(s.name) + '</h3><div class="spot-jp">' + esc(s.jp) + "</div></div>" +
            '<span class="spot-distance">' + esc(s.dist) + "</span>" +
          "</div>" +
          desc + tip +
          '<div class="spot-links">' +
            '<a class="spot-link-out" href="' + mapUrl + '" target="_blank" rel="noopener">🗺 在地圖開啟</a>' +
          "</div>" +
        "</div>" +
      "</article>";
  }
  function renderAround() {
    var el = document.getElementById("around-list");
    if (!el || !window.AROUND) return;
    el.innerHTML = window.AROUND.map(aroundCard).join("");
  }

  /* ---- 熊本城平面導覽：SVG 俯瞰示意圖 ＋ 曲輪別導覽 ---- */
  function mapUrlFor(s) {
    return "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(s.map || s.name);
  }
  function renderLayout() {
    var L = window.LAYOUT;
    var planEl = document.getElementById("castle-plan");
    var areaEl = document.getElementById("layout-areas");
    if (!L || !planEl || !areaEl) return;

    // 依曲輪順序給景點編號（SVG 標記與下方清單共用同一組號碼）
    var num = {}, n = 0;
    L.kuruwa.forEach(function (k) {
      k.spots.forEach(function (id) { if (spotById[id]) num[id] = ++n; });
    });

    // --- SVG ---
    var svg = '<svg class="plan-svg" viewBox="' + L.viewBox +
      '" role="img" aria-label="熊本城曲輪配置示意圖" xmlns="http://www.w3.org/2000/svg">';
    // 北方指示
    svg += '<text class="plan-compass" x="378" y="22" text-anchor="end">北 ↑</text>';
    // 曲輪線框與區名
    L.kuruwa.forEach(function (k) {
      if (k.rect) {
        svg += '<rect class="kuruwa-zone" x="' + k.rect.x + '" y="' + k.rect.y +
          '" width="' + k.rect.w + '" height="' + k.rect.h + '" rx="7"/>';
      }
      if (k.label) {
        svg += '<text class="zone-label" x="' + k.label.x + '" y="' + k.label.y +
          '" text-anchor="middle">' + esc(k.name) + "</text>";
      }
    });
    // 景點標記
    L.pins.forEach(function (p) {
      var s = spotById[p.id];
      if (!s) return;
      var m = META[s.status];
      var lx = (p.lx != null ? p.lx : p.x + 12);
      var ly = (p.ly != null ? p.ly : p.y + 4);
      svg += '<a href="#spot-' + p.id + '" class="plan-pin-link">' +
        '<circle class="plan-pin ' + m.cls + '" cx="' + p.x + '" cy="' + p.y + '" r="10">' +
          "<title>" + esc(s.name) + "（" + esc(m.label) + "）</title></circle>" +
        '<text class="pin-num" x="' + p.x + '" y="' + (p.y + 3.2) +
          '" text-anchor="middle">' + (num[p.id] || "") + "</text>" +
        '<text class="pin-label" x="' + lx + '" y="' + ly +
          '" text-anchor="' + (p.anchor || "start") + '">' + esc(p.short || s.name) + "</text>" +
        "</a>";
    });
    svg += "</svg>";
    planEl.innerHTML = svg;

    // --- 曲輪別導覽 ---
    areaEl.innerHTML = L.kuruwa.map(function (k) {
      var rows = k.spots.map(function (id) {
        var s = spotById[id];
        if (!s) return "";
        var m = META[s.status];
        return "<li>" +
          '<span class="ka-num">' + (num[id] || "") + "</span>" +
          '<span class="badge-inline ' + m.cls + '">' + m.icon + "</span>" +
          '<a class="ka-name" href="#spot-' + id + '">' + esc(s.name) + "</a>" +
          '<span class="ka-jp">' + esc(s.jp) + "</span>" +
          '<a class="spot-link-out ka-map" href="' + mapUrlFor(s) +
            '" target="_blank" rel="noopener">🗺 在地圖開啟</a>' +
          "</li>";
      }).join("");
      return '<div class="kuruwa-card">' +
        "<h3>" + esc(k.name) + ' <span class="kuruwa-jp">' + esc(k.jp) + "</span></h3>" +
        (k.desc ? '<p class="kuruwa-desc">' + esc(k.desc) + "</p>" : "") +
        '<ul class="kuruwa-spots">' + rows + "</ul>" +
        "</div>";
    }).join("");
  }

  /* ---- 冷知識 Q&A ---- */
  function renderTrivia() {
    var el = document.getElementById("trivia-list");
    if (!el || !window.TRIVIA) return;
    el.innerHTML = window.TRIVIA.map(function (t) {
      return "<details class=\"trivia\">" +
        "<summary>" +
          '<span class="tv-tag">' + esc(t.tag) + "</span>" +
          '<span class="tv-q">' + esc(t.q) + "</span>" +
        "</summary>" +
        '<div class="tv-a"><p>' + esc(t.a) + "</p></div>" +
      "</details>";
    }).join("");
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
  renderLayout();
  renderTimeline();
  renderTrivia();
  renderAround();
  updateProgress();
  bindEvents();

  /* ---- 手機漢堡選單：點連結後自動收合（漸進增強）---- */
  var navToggle = document.getElementById("nav-toggle");
  var topnav = document.getElementById("topnav");
  if (navToggle && topnav) {
    topnav.addEventListener("click", function (e) {
      if (e.target.closest("a")) navToggle.checked = false;
    });
  }

  /* ---- Service Worker（離線） ---- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})();

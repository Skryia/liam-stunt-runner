(function () {
  "use strict";
  var CFG = window.SITE_CONFIG || {};
  var TZ = "Europe/London";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function safeUrl(u) { return /^(https?:|mailto:|assets\/|\.\/|\/)/i.test(u || "") ? u : ""; }

  /* ---------- Basics ---------- */
  $("#year").textContent = new Date().getFullYear();
  if (CFG.siteUrl) $("#canonical").href = CFG.siteUrl; else $("#canonical").remove();

  var header = $(".site-header");
  window.addEventListener("scroll", function () { header.classList.toggle("scrolled", window.scrollY > 20); }, { passive: true });

  var toggle = $(".menu-toggle"), nav = $("#main-nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
  }
  toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); } });

  $$("[data-enquiry]").forEach(function (a) {
    a.addEventListener("click", function () { var s = $("#f-type"); if (s) s.value = a.getAttribute("data-enquiry"); });
  });

  /* ---------- Social links ---------- */
  var ICONS = {
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2c-2.7 0-3 0-4.1.1C4.3 2.3 2.3 4.3 2.1 7.9 2 9 2 9.3 2 12s0 3 .1 4.1c.2 3.6 2.2 5.6 5.8 5.8 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c3.6-.2 5.6-2.2 5.8-5.8.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c-.2-3.6-2.2-5.6-5.8-5.8C15 2 14.7 2 12 2z"/></svg>',
    TikTok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 2h-3.4v13.2a2.9 2.9 0 1 1-2-2.8V9a6.3 6.3 0 1 0 5.4 6.2V8.6a7.7 7.7 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6z"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.5 1.6-1.5h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.4V14h2.7v8h3.4z"/></svg>'
  };
  function socialHtml() {
    return (CFG.socials || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + ' (opens in a new tab)">' + (ICONS[s.name] || "") + "<span>" + esc(s.name) + "</span></a>";
    }).join("");
  }
  $$("[data-social-links]").forEach(function (el) { el.innerHTML = socialHtml(); });

  function placeholder(label) {
    return '<div class="placeholder-slot" role="img" aria-label="' + esc(label) + '"><strong>Placeholder</strong><span>' + esc(label) + "</span></div>";
  }

  /* ---------- Hero video ---------- */
  (function hero() {
    var h = CFG.hero || {};
    var video = $("#hero-video"), poster = $("#hero-poster"), btn = $("#video-toggle");
    var media = $(".hero-media");
    var focal = h.focalPoint || "50% 50%";
    media.style.setProperty("--focal", focal);
    var opacity = Number(h.overlayOpacity);
    media.style.setProperty("--hero-overlay-opacity", String(Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 0.55));
    if (h.poster) { poster.src = h.poster; video.poster = h.poster; }
    var hasVideo = !!(h.videoMp4 || h.videoWebm);
    $("#hero-slot-label").hidden = !h.posterIsPlaceholder;
    if (!hasVideo || reduceMotion) return;
    var conn = navigator.connection;
    if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ""))) return;
    var mobile = window.matchMedia("(max-width: 700px)").matches;
    var srcs = [];
    if (h.videoWebm && !mobile) srcs.push(["video/webm", h.videoWebm]);
    srcs.push(["video/mp4", mobile && h.videoMobileMp4 ? h.videoMobileMp4 : h.videoMp4]);
    srcs.forEach(function (s) { if (!s[1]) return; var el = document.createElement("source"); el.type = s[0]; el.src = s[1]; video.appendChild(el); });
    video.preload = "metadata";
    video.addEventListener("playing", function () { video.classList.add("playing"); media.classList.add("has-video"); btn.hidden = false; setBtn(false); });
    video.addEventListener("pause", function () { setBtn(true); });
    video.addEventListener("error", function () { media.classList.remove("has-video"); video.classList.remove("playing"); btn.hidden = true; });
    function playVideo() {
      var p = video.play();
      if (p && p.catch) p.catch(function () {
        // Keep the opaque artwork until actual playback succeeds.
        if (!video.error) { btn.hidden = false; setBtn(true); }
      });
    }
    playVideo();
    function setBtn(paused) {
      btn.setAttribute("aria-pressed", String(paused));
      $(".vt-label", btn).textContent = paused ? "Play video" : "Pause video";
    }
    btn.addEventListener("click", function () {
      if (video.paused) { playVideo(); } else { video.pause(); }
    });
  })();

  /* ---------- About media ---------- */
  (function about() {
    var a = CFG.about || {};
    var ph = a.photo || {}, vp = a.vanPhoto || {};
    $("#about-photo").innerHTML = ph.src ? '<img src="' + esc(ph.src) + '" alt="' + esc(ph.alt) + '" loading="lazy" width="800" height="1000">' : placeholder("Genuine photo of Liam");
    $("#road-photo").innerHTML = vp.src ? '<img src="' + esc(vp.src) + '" alt="' + esc(vp.alt) + '" loading="lazy" width="300" height="300">' : placeholder("Van-life photo");
  })();

  /* ---------- Modal (focus managed) ---------- */
  var modal = $("#modal"), modalBody = $("#modal-body"), modalTitle = $("#modal-title"), lastFocus = null;
  function openModal(title, html, opener) {
    lastFocus = opener || document.activeElement;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }
  function closeModal() {
    if (modal.hidden) return;
    $$("video", modalBody).forEach(function (v) { v.pause(); });
    modalBody.innerHTML = "";
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeModal); });
  modal.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key !== "Tab") return;
    var f = $$('a[href],button:not([disabled]),video[controls],iframe,[tabindex]:not([tabindex="-1"])', modal).filter(function (x) { return x.offsetParent !== null || x === document.activeElement; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- Gallery ---------- */
  (function gallery() {
    var items = window.GALLERY_ITEMS || [];
    var grid = $("#gallery-grid"), filters = $("#gallery-filters");
    var order = ["Performances", "Athletics", "Behind the scenes"];
    var cats = order.filter(function (c) { return items.some(function (i) { return i.category === c; }); });
    items.forEach(function (i) { if (i.category && cats.indexOf(i.category) < 0) cats.push(i.category); });
    if (cats.length > 1) {
      filters.innerHTML = ["All"].concat(cats).map(function (c, n) {
        return '<button type="button" class="chip" data-filter="' + esc(c) + '" aria-pressed="' + (n === 0) + '">' + esc(c) + "</button>";
      }).join("");
    }
    grid.innerHTML = items.map(function (it, idx) {
      var thumb = it.type === "video" ? it.poster : (it.poster || it.src);
      var media = thumb ? '<img src="' + esc(thumb) + '" alt="' + esc(it.alt) + '" loading="lazy" decoding="async" width="600" height="' + (it.orientation === "portrait" ? 1067 : 600) + '">' : placeholder(it.title);
      var tag = it.platform ? it.platform : it.category;
      return '<li class="g-item reveal ' + esc(it.orientation || "square") + (it.featured ? " featured" : "") + '" data-cat="' + esc(it.category) + '">' +
        '<button type="button" class="g-btn" data-idx="' + idx + '" aria-label="' + esc((it.type === "video" ? "Play video: " : "View image: ") + it.title) + '">' + media +
        (it.type === "video" ? '<span class="g-play" aria-hidden="true"></span>' : "") +
        '<span class="g-meta"><span class="g-title">' + esc(it.title) + '</span><span class="g-tag">' + esc(tag) + "</span></span></button></li>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]"); if (!b) return;
      var f = b.getAttribute("data-filter");
      $$("[data-filter]", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      $$(".g-item", grid).forEach(function (li) { li.hidden = !(f === "All" || li.getAttribute("data-cat") === f); });
    });
    grid.addEventListener("click", function (e) {
      var b = e.target.closest(".g-btn"); if (!b) return;
      var it = items[+b.getAttribute("data-idx")];
      var html;
      if (it.placeholder || !it.src) {
        html = placeholder("Media not yet supplied — replace this item in js/gallery-data.js");
        html = '<div style="aspect-ratio:16/9">' + html + "</div>";
      } else if (it.type === "video") {
        html = '<video controls playsinline preload="metadata"' + (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + ' src="' + esc(it.src) + '"></video>';
      } else {
        html = '<img src="' + esc(it.src) + '" alt="' + esc(it.alt) + '">';
      }
      if (safeUrl(it.postUrl)) html += '<div class="modal-actions"><a class="btn btn-ghost btn-sm" href="' + esc(it.postUrl) + '" target="_blank" rel="noopener noreferrer">View original on ' + esc(it.platform || "social media") + "</a></div>";
      openModal(it.title, html, b);
    });
  })();

  /* ---------- Date helpers (Europe/London) ---------- */
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  function londonParts(d) {
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" })
      .formatToParts(d).forEach(function (x) { p[x.type] = +x.value; });
    return p;
  }
  // Convert a London wall-clock time to a real instant (handles BST/GMT)
  function londonToDate(y, m, d, h, mi) {
    var guess = Date.UTC(y, m - 1, d, h, mi);
    for (var i = 0; i < 2; i++) {
      var p = londonParts(new Date(guess));
      var asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
      guess += Date.UTC(y, m - 1, d, h, mi) - asUtc;
    }
    return new Date(guess);
  }
  function parseLocal(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(s || "");
    if (!m) return null;
    var o = { y: +m[1], m: +m[2], d: +m[3], allDay: !m[4], h: +(m[4] || 0), mi: +(m[5] || 0) };
    o.key = m[1] + "-" + m[2] + "-" + m[3];
    o.instant = o.allDay ? null : londonToDate(o.y, o.m, o.d, o.h, o.mi);
    return o;
  }
  function todayKey() { var p = londonParts(new Date()); return p.year + "-" + pad(p.month) + "-" + pad(p.day); }
  function keyToUTCDate(k) { var a = k.split("-"); return new Date(Date.UTC(+a[0], +a[1] - 1, +a[2], 12)); }
  function fmtDate(k, opts) { return new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: "UTC" }, opts)).format(keyToUTCDate(k)); }
  function fmtTime(o) { return pad(o.h) + ":" + pad(o.mi); }
  function addDays(k, n) { var d = keyToUTCDate(k); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }

  /* ---------- Events ---------- */
  (function events() {
    var raw = (window.EVENTS || []).slice();
    var evs = raw.map(function (e) {
      var s = parseLocal(e.start); if (!s) return null;
      var en = parseLocal(e.end) || null;
      return Object.assign({}, e, { s: s, e: en, status: (e.status || "confirmed").toLowerCase() });
    }).filter(Boolean).sort(function (a, b) { return (a.s.instant || keyToUTCDate(a.s.key)) - (b.s.instant || keyToUTCDate(b.s.key)); });

    function isUpcoming(ev) {
      var now = new Date(), tk = todayKey();
      if (ev.e) return ev.e.allDay ? ev.e.key >= tk : ev.e.instant >= now;
      if (ev.s.allDay) return ev.s.key >= tk;
      return ev.s.key >= tk; // keep visible for the rest of the day it starts
    }
    function endKey(ev) { return ev.e ? ev.e.key : ev.s.key; }
    function whenText(ev) {
      var t = fmtDate(ev.s.key, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      if (!ev.s.allDay) t += ", " + fmtTime(ev.s);
      if (ev.e) {
        if (ev.e.key !== ev.s.key) t += " – " + fmtDate(ev.e.key, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + (ev.e.allDay ? "" : ", " + fmtTime(ev.e));
        else if (!ev.e.allDay) t += " – " + fmtTime(ev.e);
      }
      return t + (ev.s.allDay ? "" : " (UK time)");
    }
    function statusBadge(st) { return '<span class="status ' + esc(st) + '">' + esc(st) + "</span>"; }

    var list = $("#events-list");
    var upcoming = evs.filter(isUpcoming);
    if (!upcoming.length) {
      list.innerHTML = '<div class="empty-state"><p>New appearances will be announced here. Follow Liam on social media for updates.</p><div class="social-links">' + socialHtml() + "</div></div>";
    } else {
      list.innerHTML = upcoming.map(function (ev) {
        return '<button type="button" class="event-card reveal' + (ev.status === "cancelled" ? " is-cancelled" : "") + '" data-ev="' + esc(ev.id) + '">' +
          '<span class="ev-date"><span class="ev-day">' + fmtDate(ev.s.key, { day: "numeric" }) + '</span><span class="ev-mon">' + fmtDate(ev.s.key, { month: "short" }) + "</span></span>" +
          '<span><p class="ev-title">' + esc(ev.title) + '</p><p class="ev-where">' + esc([ev.venue, ev.city].filter(Boolean).join(", ")) + " · " + esc(whenText(ev)) + "</p></span>" +
          statusBadge(ev.status) + "</button>";
      }).join("");
    }

    /* ICS + Google */
    function icsDate(o, isEnd) {
      if (o.allDay) return ";VALUE=DATE:" + (isEnd ? addDays(o.key, 1) : o.key).replace(/-/g, "");
      return ";TZID=Europe/London:" + o.key.replace(/-/g, "") + "T" + pad(o.h) + pad(o.mi) + "00";
    }
    function icsEsc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, "\\$&"); }
    function downloadIcs(ev) {
      var end = ev.e || (ev.s.allDay ? ev.s : { allDay: false, key: ev.s.key, h: Math.min(ev.s.h + 1, 23), mi: ev.s.mi });
      var stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
      var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Stunt Runner//Events//EN", "CALSCALE:GREGORIAN",
        "BEGIN:VTIMEZONE", "TZID:Europe/London",
        "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0000", "TZOFFSETTO:+0100", "TZNAME:BST", "DTSTART:19700329T010000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
        "BEGIN:STANDARD", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0000", "TZNAME:GMT", "DTSTART:19701025T020000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
        "END:VTIMEZONE",
        "BEGIN:VEVENT", "UID:" + ev.id + "@thestuntrunner", "DTSTAMP:" + stamp,
        "DTSTART" + icsDate(ev.s, false), "DTEND" + icsDate(end, true),
        "SUMMARY:" + icsEsc(ev.title), "LOCATION:" + icsEsc([ev.venue, ev.city].filter(Boolean).join(", ")),
        "DESCRIPTION:" + icsEsc(ev.description + (ev.url ? "\n" + ev.url : "")),
        "STATUS:" + (ev.status === "cancelled" ? "CANCELLED" : ev.status === "provisional" ? "TENTATIVE" : "CONFIRMED"),
        "END:VEVENT", "END:VCALENDAR"];
      var blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = (ev.id || "event") + ".ics";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }
    function googleUrl(ev) {
      var f = function (o, isEnd) { return o.allDay ? (isEnd ? addDays(o.key, 1) : o.key).replace(/-/g, "") : o.key.replace(/-/g, "") + "T" + pad(o.h) + pad(o.mi) + "00"; };
      var end = ev.e || (ev.s.allDay ? ev.s : { allDay: false, key: ev.s.key, h: Math.min(ev.s.h + 1, 23), mi: ev.s.mi });
      return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(ev.title) +
        "&dates=" + f(ev.s, false) + "/" + f(end, true) + "&ctz=Europe/London&location=" + encodeURIComponent([ev.venue, ev.city].filter(Boolean).join(", ")) +
        "&details=" + encodeURIComponent(ev.description || "");
    }
    function showEvent(id, opener) {
      var ev = evs.filter(function (x) { return x.id === id; })[0]; if (!ev) return;
      var cancelled = ev.status === "cancelled";
      var html = '<div class="ev-detail">' + (ev.image ? '<img src="' + esc(ev.image) + '" alt="" loading="lazy">' : "") + statusBadge(ev.status) +
        "<dl><dt>When</dt><dd>" + esc(whenText(ev)) + "</dd><dt>Venue</dt><dd>" + esc(ev.venue || "TBC") + "</dd><dt>Location</dt><dd>" + esc(ev.city || "TBC") + "</dd></dl>" +
        (ev.description ? "<p>" + esc(ev.description) + "</p>" : "") +
        (cancelled ? '<p class="muted">This appearance has been cancelled.</p>' :
          '<div class="modal-actions">' + (safeUrl(ev.url) ? '<a class="btn btn-primary btn-sm" href="' + esc(ev.url) + '" target="_blank" rel="noopener noreferrer">Event details &amp; tickets</a>' : "") +
          '<button type="button" class="btn btn-ghost btn-sm" data-ics>Add to calendar (.ics)</button>' +
          '<a class="btn btn-ghost btn-sm" href="' + googleUrl(ev) + '" target="_blank" rel="noopener noreferrer">Google Calendar</a></div>') + "</div>";
      openModal(ev.title, html, opener);
      var b = $("[data-ics]", modalBody); if (b) b.addEventListener("click", function () { downloadIcs(ev); });
    }
    list.addEventListener("click", function (e) { var b = e.target.closest("[data-ev]"); if (b) showEvent(b.getAttribute("data-ev"), b); });

    /* Calendar */
    var t = londonParts(new Date()), cy = t.year, cm = t.month;
    var calGrid = $("#cal-grid");
    function renderCal() {
      $("#cal-title").textContent = fmtDate(cy + "-" + pad(cm) + "-01", { month: "long", year: "numeric" });
      var first = keyToUTCDate(cy + "-" + pad(cm) + "-01");
      var offset = (first.getUTCDay() + 6) % 7; // Monday start
      var startKey = addDays(cy + "-" + pad(cm) + "-01", -offset);
      var tk = todayKey(), html = "";
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(function (d) { html += '<div class="cal-dow" role="columnheader">' + d + "</div>"; });
      for (var i = 0; i < 42; i++) {
        var k = addDays(startKey, i), inMonth = +k.slice(5, 7) === cm;
        if (i === 35 && !inMonth) break;
        var dayEvs = evs.filter(function (ev) { return k >= ev.s.key && k <= endKey(ev); });
        html += '<div class="cal-cell' + (inMonth ? "" : " other") + (k === tk ? " today" : "") + '" role="gridcell" aria-label="' + fmtDate(k, { weekday: "long", day: "numeric", month: "long" }) + (dayEvs.length ? ", " + dayEvs.length + " event" + (dayEvs.length > 1 ? "s" : "") : "") + '"><span class="cal-num" aria-hidden="true">' + +k.slice(8) + "</span>" +
          dayEvs.map(function (ev) { return '<button type="button" class="cal-ev ' + esc(ev.status) + '" data-ev="' + esc(ev.id) + '" aria-label="' + esc(ev.title + " (" + ev.status + ")") + '">' + esc(ev.title) + "</button>"; }).join("") + "</div>";
      }
      calGrid.innerHTML = html;
    }
    $("#cal-prev").addEventListener("click", function () { cm--; if (cm < 1) { cm = 12; cy--; } renderCal(); });
    $("#cal-next").addEventListener("click", function () { cm++; if (cm > 12) { cm = 1; cy++; } renderCal(); });
    $("#cal-today").addEventListener("click", function () { var p = londonParts(new Date()); cy = p.year; cm = p.month; renderCal(); });
    calGrid.addEventListener("click", function (e) { var b = e.target.closest("[data-ev]"); if (b) showEvent(b.getAttribute("data-ev"), b); });
    renderCal();

    $$("[data-view]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-view");
        $$("[data-view]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        $("#events-list").hidden = v !== "list";
        $("#events-calendar").hidden = v !== "calendar";
      });
    });
  })();

  /* ---------- YouTube (click to load, privacy-enhanced) ---------- */
  (function youtube() {
    function ytId(url) {
      var m = /(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{11})/.exec(url || "");
      return m ? m[1] : "";
    }
    var grid = $("#yt-grid");
    grid.innerHTML = (CFG.youtube || []).map(function (v, i) {
      var id = ytId(v.url);
      var inner = id
        ? '<button type="button" class="g-btn" data-yt="' + id + '" aria-label="Play video: ' + esc(v.title) + '"><img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="270"><span class="g-play" aria-hidden="true"></span></button>'
        : placeholder("YouTube URL " + (i + 1) + " not yet supplied");
      return '<li class="yt-card reveal"><div class="yt-frame">' + inner + "</div><h3>" + esc(v.title) + "</h3></li>";
    }).join("");
    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-yt]"); if (!b) return;
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + b.getAttribute("data-yt") + "?autoplay=1&rel=0";
      f.title = b.getAttribute("aria-label").replace("Play video: ", "");
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      f.allowFullscreen = true;
      b.replaceWith(f);
    });
  })();

  /* ---------- Contact form ---------- */
  (function contact() {
    var form = $("#contact-form"), btn = $("#f-submit"), status = $("#form-status"), busy = false;
    var fallback = (CFG.contact && CFG.contact.fallbackEmail) || "liamcollins0@gmail.com";
    var endpoint = (CFG.contact && CFG.contact.endpoint) || "https://skryia.com/API/Forms/submit.php";

    function setErr(id, msg) {
      var input = $("#f-" + id), err = $("#e-" + id);
      err.textContent = msg || "";
      if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
      return !msg;
    }
    function validate() {
      var ok = true;
      ok = setErr("name", form.name.value.trim() ? "" : "Please enter your name.") && ok;
      var em = form.email.value.trim();
      ok = setErr("email", !em ? "Please enter your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em) ? "" : "Please enter a valid email address, e.g. name@example.com.") && ok;
      ok = setErr("message", form.message.value.trim() ? "" : "Please enter a message.") && ok;
      return ok;
    }
    ["name", "email", "message"].forEach(function (n) {
      form[n].addEventListener("blur", function () { if (form[n].getAttribute("aria-invalid")) validate(); });
    });

    /* ISOLATED RESPONSE PARSER — confirm the endpoint's real contract and adjust here.
       Currently: success requires HTTP 2xx AND (JSON with success/ok true or status "success"/"ok",
       OR a non-JSON body that does not look like an error). */
    function isSuccessfulResponse(res, bodyText) {
      if (!res.ok) return false;
      try {
        var j = JSON.parse(bodyText);
        if (j && typeof j === "object") {
          if (j.success === true || j.ok === true) return true;
          if (typeof j.status === "string" && /^(success|ok|sent)$/i.test(j.status)) return true;
          return false;
        }
      } catch (_) { /* not JSON */ }
      return !/error|fail|invalid/i.test(bodyText || "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      status.className = "form-status"; status.textContent = "";
      if (!validate()) { var bad = $('[aria-invalid="true"]', form); if (bad) bad.focus(); return; }

      var formData = {
        _sendto: "liamcollins0@gmail.com",
        skryia_email: "admin@skryia.com",
        _subject: "Stunt Runner Contact Form",
      };
      formData.name = form.name.value.trim();
      formData.email = form.email.value.trim();
      formData.phone = form.phone.value.trim();
      formData.enquiry_type = form.enquiry_type.value;
      formData.event_date = form.event_date.value;
      formData.venue = form.venue.value.trim();
      formData.message = form.message.value.trim();

      busy = true; btn.disabled = true;
      var label = btn.textContent;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      status.textContent = "Sending your enquiry…";

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(formData).toString(),
      }).then(function (res) {
        return res.text().then(function (t) { return { res: res, text: t }; });
      }).then(function (r) {
        if (!isSuccessfulResponse(r.res, r.text)) throw new Error("Unsuccessful response");
        form.reset();
        status.className = "form-status ok";
        status.textContent = "Thanks — your enquiry has been sent. Liam will be in touch soon.";
      }).catch(function () {
        status.className = "form-status err";
        status.innerHTML = 'Sorry, your message couldn’t be sent. Your details are still here — please try again, or email <a href="mailto:' + esc(fallback) + '">' + esc(fallback) + "</a>.";
      }).finally(function () {
        busy = false; btn.disabled = false; btn.textContent = label;
      });
    });
  })();

  /* ---------- Reveal on scroll ---------- */
  var revs = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) { revs.forEach(function (r) { r.classList.add("in"); }); }
  else {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revs.forEach(function (r) { io.observe(r); });
  }
})();

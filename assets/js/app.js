/* Общая логика сайта. Данные берутся из data.js (window.KAPKAN). */
(function () {
  "use strict";
  const D = window.KAPKAN;
  const page = document.body.dataset.page;

  /* ---------- утилиты ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MONTHS = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  const MONTHS_NOM = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
  const WEEK = ["вс","пн","вт","ср","чт","пт","сб"];
  const POS = {
    GK: { one: "Вратарь", many: "Вратари" },
    DF: { one: "Защитник", many: "Защитники" },
    WG: { one: "Фланговый", many: "Фланговые" },
    PV: { one: "Пивот", many: "Пивоты" },
    UN: { one: "Универсал", many: "Универсалы" }
  };
  const date = (s) => new Date(s);
  const fmtDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const fmtTime = (d) => d.toTimeString().slice(0, 5);
  const plural = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };
  const age = (born) => { const b = new Date(born), n = new Date(); let a = n.getFullYear() - b.getFullYear(); if (n < new Date(n.getFullYear(), b.getMonth(), b.getDate())) a--; return a; };

  function crest(name, size) {
    if (name === D.club.name) return `<img src="${D.club.emblem}" alt="${esc(name)}"${size ? ` style="height:${Math.round(size * 1.2)}px;width:auto"` : ""}>`;
    let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return `<span class="crest" style="background:hsl(${h} 45% 35%)${size ? `;width:${size}px;height:${size}px` : ""}">${esc(name[0])}</span>`;
  }
  const resultOf = (m) => !m.score ? "N" : m.score[0] > m.score[1] ? "W" : m.score[0] < m.score[1] ? "L" : "D";
  const RES_TXT = { W: "В", D: "Н", L: "П", N: "—" };

  const matches = [...D.matches].sort((a, b) => date(a.date) - date(b.date));
  const played = matches.filter((m) => m.score);
  const upcoming = matches.filter((m) => !m.score);
  const nextMatch = upcoming[0];

  /* ---------- шапка и подвал ---------- */
  const NAV = [
    ["index.html", "Главная", "home"],
    ["team.html", "Команда", "team"],
    ["matches.html", "Матчи", "matches"],
    ["table.html", "Таблица", "table"],
    ["stadium.html", "Стадион", "stadium"]
  ];
  const header = $("#site-header");
  if (header) header.innerHTML = `
    <div class="topbar"><div class="container">
      <span>${esc(D.club.league)} · сезон ${esc(D.club.season)}</span>
      <span class="topbar__links">${D.club.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join("")}</span>
    </div></div>
    <header class="header"><div class="container">
      <a class="logo" href="index.html"><img src="${D.club.emblem}" alt="Эмблема"><span><span class="logo__name">${esc(D.club.name)}</span><br><span class="logo__sub">Футзальный клуб · ${esc(D.club.city)}</span></span></a>
      <nav class="nav" id="nav">${NAV.map(([h, t, p]) => `<a href="${h}"${p === page ? ' class="active"' : ""}>${t}</a>`).join("")}</nav>
      <button class="burger" aria-label="Меню" id="burger"><span></span><span></span><span></span></button>
    </div></header>`;
  $("#burger")?.addEventListener("click", () => $("#nav").classList.toggle("open"));

  const footer = $("#site-footer");
  if (footer) footer.innerHTML = `
    <footer class="footer"><div class="container">
      <div class="footer__grid">
        <div>
          <a class="logo" href="index.html"><img src="${D.club.emblem}" alt=""><span><span class="logo__name">${esc(D.club.name)}</span><br><span class="logo__sub">Основан в ${D.club.founded} году</span></span></a>
          <p style="margin-top:16px;max-width:360px">${esc(D.club.fullName)}. ${esc(D.club.slogan)}.</p>
        </div>
        <div><h4>Разделы</h4><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
        <div><h4>Контакты</h4><ul>
          <li><a href="tel:${esc(D.club.contacts.phone.replace(/[^+\d]/g, ""))}">${esc(D.club.contacts.phone)}</a></li>
          <li><a href="mailto:${esc(D.club.contacts.email)}">${esc(D.club.contacts.email)}</a></li>
          ${D.club.socials.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join("")}
        </ul></div>
      </div>
      <div class="footer__bottom"><span>© ${new Date().getFullYear()} ФК «${esc(D.club.name)}», ${esc(D.club.city)}</span><span>Любительский футзал</span></div>
    </div></footer>`;

  /* ---------- общие блоки ---------- */
  function matchCard(m) {
    const d = date(m.date), r = resultOf(m);
    const us = { name: D.club.name, g: m.score ? m.score[0] : "" }, them = { name: m.opponent, g: m.score ? m.score[1] : "" };
    const [a, b] = m.home ? [us, them] : [them, us];
    const row = (t) => `<div class="mcard__row${t.name === D.club.name ? " self" : ""}">${crest(t.name, 30)}<span>${esc(t.name)}</span><b>${t.g}</b></div>`;
    return `<div class="mcard">
      <div class="mcard__top"><span>${esc(m.tournament)}${typeof m.round === "number" ? `, ${m.round} тур` : m.round ? `, ${esc(m.round)}` : ""}</span><span>${WEEK[d.getDay()]}</span></div>
      <div class="mcard__teams">${row(a)}${row(b)}</div>
      <div class="mcard__bottom"><span>${fmtDate(d)}, ${fmtTime(d)}</span>${m.score ? `<span class="result result--${r}">${RES_TXT[r]}</span>` : `<span>${esc(m.venue)}</span>`}</div>
    </div>`;
  }

  function computeTable() {
    const pw = D.table.pointsForWin || 3;
    return D.table.teams
      .map((t) => ({ ...t, p: t.w + t.d + t.l, pts: t.w * pw + t.d, gd: t.gf - t.ga }))
      .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.name.localeCompare(b.name, "ru"))
      .map((t, i) => ({ ...t, pos: i + 1 }));
  }
  function zoneFor(pos) {
    const z = (D.table.zones || []).find((z) => pos >= z.from && pos <= z.to);
    return z ? { ...z, css: z.color === "gold" ? "var(--c-gold)" : z.color === "danger" ? "var(--c-loss)" : "var(--c-primary)" } : null;
  }
  const FORM_COLOR = { "В": "var(--c-win)", "Н": "var(--c-draw)", "П": "var(--c-loss)" };

  function standingsHTML(mini) {
    const rows = computeTable().map((t) => {
      const z = zoneFor(t.pos);
      return `<tr class="${t.self ? "self" : ""}">
        <td class="pos" style="--zone:${z ? z.css : "transparent"}">${t.pos}</td>
        <td class="team"><div>${crest(t.name, mini ? 24 : 28)}${esc(t.name)}</div></td>
        <td>${t.p}</td>
        ${mini ? "" : `<td class="hide-sm">${t.w}</td><td class="hide-sm">${t.d}</td><td class="hide-sm">${t.l}</td><td class="hide-sm">${t.gf}–${t.ga}</td>`}
        <td>${t.gd > 0 ? "+" : ""}${t.gd}</td>
        <td class="pts">${t.pts}</td>
        ${mini ? "" : `<td class="hide-sm"><span class="form">${(t.form || []).map((f) => `<span style="background:${FORM_COLOR[f] || "#999"}">${f}</span>`).join("")}</span></td>`}
      </tr>`;
    }).join("");
    return `<div class="table-wrap card" style="overflow:hidden;overflow-x:auto"><table class="standings${mini ? " standings--mini" : ""}">
      <thead><tr><th>#</th><th>Команда</th><th title="Игры">И</th>
      ${mini ? "" : `<th class="hide-sm" title="Выигрыши">В</th><th class="hide-sm" title="Ничьи">Н</th><th class="hide-sm" title="Поражения">П</th><th class="hide-sm">Мячи</th>`}
      <th title="Разница мячей">±</th><th>О</th>${mini ? "" : `<th class="hide-sm">Форма</th>`}</tr></thead>
      <tbody>${rows}</tbody></table></div>`;
  }

  const SILHOUETTE = `<svg viewBox="0 0 100 120" fill="#fff" aria-hidden="true"><circle cx="50" cy="32" r="22"/><path d="M8 120c0-30 18-50 42-50s42 20 42 50z"/></svg>`;
  function playerCard(p) {
    return `<button class="player" data-num="${p.number}" aria-label="${esc(p.name)}">
      <div class="player__photo">${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.name)}" loading="lazy">` : SILHOUETTE}</div>
      <span class="player__num">${p.number}</span>
      ${p.captain ? '<span class="cap" title="Капитан">К</span>' : ""}
      <div class="player__info"><div class="player__name">${esc(p.name)}</div><div class="player__pos">${POS[p.pos]?.one || p.pos}</div></div>
    </button>`;
  }

  function setupModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `<div class="modal__box" role="dialog" aria-modal="true"><button class="modal__close" aria-label="Закрыть">×</button><div class="modal__side"></div><div class="modal__body"></div></div>`;
    document.body.appendChild(modal);
    const close = () => modal.classList.remove("open");
    modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal__close")) close(); });
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".player[data-num]");
      if (!card) return;
      const p = D.players.find((x) => String(x.number) === card.dataset.num);
      const s = p.stats || {};
      $(".modal__side", modal).innerHTML = `<div class="player__photo">${p.photo ? `<img src="${esc(p.photo)}" alt="">` : SILHOUETTE}</div><span class="player__num">${p.number}</span>`;
      $(".modal__body", modal).innerHTML = `
        <div class="hero__kicker">${POS[p.pos]?.one || p.pos}${p.captain ? " · Капитан" : ""}</div>
        <h3>${esc(p.name)}</h3>
        <div class="facts">
          <div><small>Дата рождения</small><b>${fmtDate(date(p.born))} ${date(p.born).getFullYear()}</b></div>
          <div><small>Возраст</small><b>${age(p.born)} ${plural(age(p.born), "год", "года", "лет")}</b></div>
          <div><small>Рост</small><b>${p.height ? p.height + " см" : "—"}</b></div>
          <div><small>Номер</small><b>${p.number}</b></div>
        </div>
        <div class="muted" style="font-size:13px;font-weight:700;text-transform:uppercase;margin-bottom:8px">Сезон ${esc(D.club.season)}</div>
        <div class="bigstats">
          <div><b>${s.games ?? 0}</b><small>Игры</small></div>
          <div><b>${s.goals ?? 0}</b><small>Голы</small></div>
          <div><b>${s.assists ?? 0}</b><small>Передачи</small></div>
          <div><b>${s.yellow ?? 0}</b><small>ЖК</small></div>
        </div>`;
      modal.classList.add("open");
    });
  }

  function countdown(el, target) {
    const tick = () => {
      let diff = Math.max(0, target - new Date());
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); const s = Math.floor((diff - m * 6e4) / 1000);
      el.innerHTML = [[d, plural(d, "день", "дня", "дней")], [h, "часов"], [m, "минут"], [s, "секунд"]]
        .map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`).join("");
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- страницы ---------- */
  const pages = {
    home() {
      const nm = $("#next-match");
      if (nextMatch) {
        const d = date(nextMatch.date);
        const [a, b] = nextMatch.home ? [D.club.name, nextMatch.opponent] : [nextMatch.opponent, D.club.name];
        nm.innerHTML = `<div class="next-match">
          <div class="next-match__label">Следующий матч</div>
          <div class="next-match__meta">${esc(nextMatch.tournament)}${typeof nextMatch.round === "number" ? `, ${nextMatch.round} тур` : `, ${esc(nextMatch.round)}`} · ${fmtDate(d)}, ${fmtTime(d)} · ${esc(nextMatch.venue)}</div>
          <div class="versus"><div class="team-badge">${crest(a, 64)}<span>${esc(a)}</span></div><div class="versus__mid">VS</div><div class="team-badge">${crest(b, 64)}<span>${esc(b)}</span></div></div>
          <div class="countdown" id="cd"></div>
        </div>`;
        countdown($("#cd"), d);
      } else nm.innerHTML = `<div class="next-match"><div class="next-match__label">Сезон завершён</div><p class="muted">Календарь следующего сезона появится позже.</p></div>`;

      const strip = [...played.slice(-3), ...upcoming.slice(0, 4)];
      $("#match-strip").innerHTML = strip.map(matchCard).join("");
      // прокрутить ленту к следующему матчу
      const s = $("#match-strip"); s.scrollLeft = Math.max(0, (Math.min(played.length, 3) - 1) * 266);

      $("#news").innerHTML = D.news.map((n) => `<article class="card"><time>${fmtDate(date(n.date))} ${date(n.date).getFullYear()}</time><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></article>`).join("");
      $("#mini-table").innerHTML = standingsHTML(true);

      const top = (key) => [...D.players].sort((a, b) => (b.stats?.[key] || 0) - (a.stats?.[key] || 0))[0];
      const L = [["goals", "Лучший бомбардир", "голов"], ["assists", "Лучший ассистент", "передач"], ["games", "Больше всех игр", "матчей"]];
      $("#leaders").innerHTML = L.map(([k, t]) => { const p = top(k); return `<div class="leader"><div class="leader__val">${p.stats[k]}</div><div><small>${t}</small><b>${esc(p.name)}</b><span class="muted" style="color:#8a91a0">№${p.number} · ${POS[p.pos].one}</span></div></div>`; }).join("");

      $("#squad-slider").innerHTML = [...D.players].sort((a, b) => a.number - b.number).map(playerCard).join("");
      $("#stadium-teaser").innerHTML = `<h3 style="font-size:28px;text-transform:uppercase">${esc(D.stadium.name)}</h3><p class="muted" style="font-size:17px">${esc(D.stadium.address)} · ${D.stadium.capacity} мест · ${esc(D.stadium.court)}</p>`;
      setupModal();
    },

    team() {
      const order = ["GK", "DF", "WG", "PV", "UN"];
      $("#squad").innerHTML = order.map((pos) => {
        const list = D.players.filter((p) => p.pos === pos).sort((a, b) => a.number - b.number);
        if (!list.length) return "";
        return `<div class="squad-group"><h2>${POS[pos].many} <small>${list.length}</small></h2><div class="players">${list.map(playerCard).join("")}</div></div>`;
      }).join("");
      $("#squad-count").textContent = `${D.players.length} ${plural(D.players.length, "игрок", "игрока", "игроков")} в заявке на сезон ${D.club.season}`;
      $("#staff").innerHTML = D.staff.map((s) => `<div class="card"><b>${esc(s.name)}</b><span>${esc(s.role)}</span></div>`).join("");

      // сортируемая статистика
      const cols = [["number", "№"], ["name", "Игрок"], ["pos", "Амплуа"], ["games", "Игры"], ["goals", "Голы"], ["assists", "Пасы"], ["points", "Гол+пас"], ["yellow", "ЖК"]];
      let sortKey = "goals", dir = -1;
      const val = (p, k) => k === "points" ? (p.stats.goals || 0) + (p.stats.assists || 0) : k in p.stats ? p.stats[k] || 0 : p[k];
      const draw = () => {
        const rows = [...D.players].sort((a, b) => { const x = val(a, sortKey), y = val(b, sortKey); return (typeof x === "string" ? x.localeCompare(y, "ru") : x - y) * dir || a.number - b.number; });
        $("#stats").innerHTML = `<div class="table-wrap card" style="overflow:hidden;overflow-x:auto"><table class="stats-table"><thead><tr>${cols.map(([k, t]) => `<th data-k="${k}">${t}${k === sortKey ? (dir < 0 ? " ▼" : " ▲") : ""}</th>`).join("")}</tr></thead><tbody>
          ${rows.map((p) => `<tr><td>${p.number}</td><td>${esc(p.name)}${p.captain ? " (К)" : ""}</td><td>${POS[p.pos].one}</td><td>${val(p, "games")}</td><td><b>${val(p, "goals")}</b></td><td>${val(p, "assists")}</td><td>${val(p, "points")}</td><td>${val(p, "yellow")}</td></tr>`).join("")}
        </tbody></table></div>`;
      };
      $("#stats").addEventListener("click", (e) => { const th = e.target.closest("th[data-k]"); if (!th) return; const k = th.dataset.k; dir = k === sortKey ? -dir : (k === "name" || k === "pos" || k === "number" ? 1 : -1); sortKey = k; draw(); });
      draw();
      setupModal();
    },

    matches() {
      const tournaments = [...new Set(matches.map((m) => m.tournament))];
      const filters = [["all", "Все матчи"], ["results", "Результаты"], ["fixtures", "Календарь"], ...tournaments.map((t) => ["t:" + t, t])];
      let current = location.hash === "#results" ? "results" : location.hash === "#fixtures" ? "fixtures" : "all";
      const tabs = $("#tabs");
      const draw = () => {
        tabs.innerHTML = filters.map(([k, t]) => `<button class="tab${k === current ? " active" : ""}" data-f="${esc(k)}">${esc(t)}</button>`).join("");
        let list = matches;
        if (current === "results") list = played.slice().reverse();
        else if (current === "fixtures") list = upcoming;
        else if (current.startsWith("t:")) list = matches.filter((m) => m.tournament === current.slice(2));
        let month = -1;
        $("#match-list").innerHTML = list.length ? list.map((m) => {
          const d = date(m.date), r = resultOf(m);
          const key = d.getFullYear() * 12 + d.getMonth();
          const title = key !== month ? `<div class="month-title">${MONTHS_NOM[d.getMonth()]} ${d.getFullYear()}</div>` : "";
          month = key;
          const us = D.club.name, them = m.opponent;
          const [a, b] = m.home ? [us, them] : [them, us];
          const [ga, gb] = m.score ? (m.home ? m.score : [m.score[1], m.score[0]]) : [];
          const team = (n, right) => `<div class="match-row__team${right ? " right" : ""}${n === us ? " self" : ""}">${right ? `<span>${esc(n)}</span>${crest(n, 40)}` : `${crest(n, 40)}<span>${esc(n)}</span>`}</div>`;
          return `${title}<div class="match-row${m === nextMatch ? " is-next" : ""}">
            <div class="match-row__date"><b>${fmtDate(d)}</b><span>${WEEK[d.getDay()]}, ${fmtTime(d)}</span></div>
            ${team(a)}
            <div class="match-row__score">${m.score ? `<b>${ga} : ${gb}</b><span class="result result--${r}">${RES_TXT[r]}</span>` : `<span class="time">${fmtTime(d)}</span><br><span class="result result--N">${m === nextMatch ? "Следующий" : "Скоро"}</span>`}</div>
            ${team(b, true)}
            <div class="match-row__info"><span class="tag">${esc(m.tournament)}${typeof m.round === "number" ? ` · ${m.round} тур` : ` · ${esc(m.round)}`}</span><br>${esc(m.venue)}${m.home ? " (дома)" : ""}</div>
            ${m.scorers?.length ? `<div class="match-row__scorers"><b>Голы «${esc(us)}»:</b> ${m.scorers.map(esc).join(", ")}</div>` : ""}
          </div>`;
        }).join("") : `<div class="empty card">Матчей нет</div>`;
      };
      tabs.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) { current = b.dataset.f; draw(); } });
      draw();

      const w = played.filter((m) => resultOf(m) === "W").length, dr = played.filter((m) => resultOf(m) === "D").length, l = played.filter((m) => resultOf(m) === "L").length;
      const gf = played.reduce((s, m) => s + m.score[0], 0), ga = played.reduce((s, m) => s + m.score[1], 0);
      $("#season-summary").textContent = `Сезон ${D.club.season}: ${played.length} ${plural(played.length, "матч", "матча", "матчей")} · ${w}В ${dr}Н ${l}П · мячи ${gf}:${ga}`;
    },

    table() {
      $("#table-title").textContent = D.table.title;
      $("#standings").innerHTML = standingsHTML(false);
      $("#legend").innerHTML = (D.table.zones || []).map((z) => `<span><i style="background:${zoneFor(z.from).css}"></i>${esc(z.label)}</span>`).join("") +
        `<span>И — игры, В/Н/П — выигрыши/ничьи/поражения, ± — разница мячей, О — очки</span>`;
      const me = computeTable().find((t) => t.self);
      if (me) $("#my-pos").innerHTML = `
        <div class="leader"><div class="leader__val">${me.pos}</div><div><small>Место</small><b>в таблице</b></div></div>
        <div class="leader"><div class="leader__val">${me.pts}</div><div><small>Очки</small><b>за ${me.p} ${plural(me.p, "игру", "игры", "игр")}</b></div></div>
        <div class="leader"><div class="leader__val">${me.gf}:${me.ga}</div><div><small>Мячи</small><b>${me.gd > 0 ? "+" : ""}${me.gd}</b></div></div>`;
    },

    stadium() {
      const S = D.stadium;
      $("#st-name").textContent = S.name;
      $("#st-address").textContent = S.address;
      $("#st-desc").textContent = S.description;
      $("#st-facts").innerHTML = [["Вместимость", S.capacity + " мест"], ["Открыт", S.opened + " г."], ["Площадка", S.court], ["Освещение", S.lighting]]
        .map(([k, v]) => `<div class="card"><small>${k}</small><b>${esc(v)}</b></div>`).join("");
      $("#st-features").innerHTML = S.features.map((f) => `<li>${esc(f)}</li>`).join("");
      $("#st-transport").innerHTML = S.transport.map((t) => `<div class="card"><span class="tag">${esc(t.type)}</span><span>${esc(t.text)}</span></div>`).join("");
      $("#st-map").href = S.mapUrl;
      const home = upcoming.filter((m) => m.home).slice(0, 3);
      $("#st-next").innerHTML = home.length ? home.map(matchCard).join("") : `<div class="empty card">Домашних матчей пока не запланировано</div>`;
    }
  };

  pages[page]?.();
})();

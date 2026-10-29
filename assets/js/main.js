// Shared UI: language + theme toggles, and rendering of SITE data into whatever
// containers exist on the current page.
(function () {
  const S = window.SITE;

  const UI = {
    en: {
      "nav.about": "About", "nav.research": "Research", "nav.publications": "Publications", "nav.cv": "CV", "nav.demos": "Demos",
      "sec.about": "About", "sec.interests": "Research interests", "sec.news": "News", "sec.projects": "Research projects",
      "sec.publications": "Publications", "sec.experience": "Experience", "sec.education": "Education",
      "sec.teaching": "Teaching", "sec.certificates": "Certificates",
      "banner.title": "Try the speech demos",
      "banner.text": "Speaker verification, voice conversion and voice-cloning TTS — right in your browser.",
      "btn.cv": "Download CV", "btn.mail": "Email", "btn.demos": "Speech demos",
      "pub.all": "All", "pub.journal": "Journal", "pub.conference": "Conference", "pub.review": "Under review",
      "present": "Present",
    },
    tr: {
      "nav.about": "Hakkımda", "nav.research": "Araştırma", "nav.publications": "Yayınlar", "nav.cv": "Özgeçmiş", "nav.demos": "Demolar",
      "sec.about": "Hakkımda", "sec.interests": "Araştırma ilgi alanları", "sec.news": "Haberler", "sec.projects": "Araştırma projeleri",
      "sec.publications": "Yayınlar", "sec.experience": "Deneyim", "sec.education": "Eğitim",
      "sec.teaching": "Verilen dersler", "sec.certificates": "Sertifikalar",
      "banner.title": "Konuşma demolarını deneyin",
      "banner.text": "Konuşmacı doğrulama, ses dönüştürme ve ses klonlamalı metinden konuşma — doğrudan tarayıcınızda.",
      "btn.cv": "Özgeçmişi indir", "btn.mail": "E-posta", "btn.demos": "Konuşma demoları",
      "pub.all": "Tümü", "pub.journal": "Dergi", "pub.conference": "Konferans", "pub.review": "Değerlendirmede",
      "present": "Günümüz",
    },
  };
  window.UI_STRINGS = UI;

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  let lang = store("lang") || ((navigator.language || "").toLowerCase().startsWith("tr") ? "tr" : "en");
  const t = (k) => (UI[lang] && UI[lang][k]) || UI.en[k] || k;
  const L = (o) => (o && typeof o === "object" ? (o[lang] ?? o.en) : o);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const icons = {
    download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    wave: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 11v2"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  };

  function render() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    const lb = $("langBtn"); if (lb) lb.textContent = lang === "en" ? "TR" : "EN";

    if ($("heroName")) {
      $("heroName").textContent = S.name;
      $("heroTitle").textContent = L(S.title);
      $("heroAffil").textContent = L(S.affiliation);
      $("heroTagline").textContent = L(S.tagline);
      $("heroPhoto").src = S.photo;
      const ext = [
        ["scholar", "Google Scholar"], ["orcid", "ORCID"], ["github", "GitHub"], ["linkedin", "LinkedIn"],
      ].filter(([k]) => S.links[k]).map(([k, n]) => `<a class="btn ghost" href="${esc(S.links[k])}" target="_blank" rel="noopener">${icons.link}${n}</a>`).join("");
      $("heroActions").innerHTML =
        `<a class="btn primary" href="${esc(L(S.cv))}" download>${icons.download}${t("btn.cv")}</a>` +
        `<a class="btn" href="mailto:${esc(S.email)}">${icons.mail}${t("btn.mail")}</a>` +
        // Demos hidden until the Hugging Face Spaces are deployed (see spaces/README.md):
        // `<a class="btn" href="demos.html">${icons.wave}${t("btn.demos")}</a>` +
        ext;
    }
    if ($("stats")) $("stats").innerHTML = S.stats.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(L(s.label))}</span></div>`).join("");
    if ($("about-text")) $("about-text").innerHTML = L(S.about).map((p) => `<p>${p}</p>`).join("");
    if ($("interests")) $("interests").innerHTML = L(S.interests).map((i) => `<li>${esc(i)}</li>`).join("");
    if ($("news")) $("news").innerHTML = S.news.map((n) => `<li><time>${esc(n.date)}</time><p>${L(n.text)}</p></li>`).join("");
    if ($("projects")) $("projects").innerHTML = S.projects.map((p) => `
      <article class="card project">
        <div class="project-top"><span class="badge">${esc(p.badge)}</span><span class="muted">${esc(L(p.period))} · ${esc(L(p.role))}</span></div>
        <h3>${esc(L(p.title))}</h3>
        <p>${esc(L(p.text))}</p>
      </article>`).join("");
    if ($("pubs")) renderPubs();
    const tl = (items, key) => items.map((e) => `<li><span class="when">${esc(e.period.endsWith("– ") ? e.period + t("present") : e.period)}</span><strong>${esc(L(e[key]))}</strong><span class="muted">${esc(L(e.org))}</span></li>`).join("");
    if ($("experience")) $("experience").innerHTML = tl(S.experience, "role");
    if ($("education")) $("education").innerHTML = tl(S.education, "degree");
    if ($("teaching")) $("teaching").innerHTML = L(S.teaching).map((x) => `<li>${esc(x)}</li>`).join("");
    if ($("certificates")) $("certificates").innerHTML = S.certificates.map((c) => `<li><strong>${esc(L(c.title))}</strong><span class="muted">${esc(L(c.org))} · ${esc(c.year)}</span></li>`).join("");
    if ($("year")) $("year").textContent = new Date().getFullYear();
    if ($("footerMail")) { $("footerMail").href = "mailto:" + S.email; $("footerMail").textContent = S.email; }

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  let pubFilter = "all";
  function renderPubs() {
    const types = ["all", "journal", "conference", "review"];
    $("pubFilters").innerHTML = types.map((ty) => {
      const n = ty === "all" ? S.publications.length : S.publications.filter((p) => p.type === ty).length;
      return `<button type="button" role="tab" class="${ty === pubFilter ? "on" : ""}" data-f="${ty}">${t("pub." + ty)} <span>${n}</span></button>`;
    }).join("");
    $("pubFilters").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { pubFilter = b.dataset.f; renderPubs(); }));
    const list = S.publications.filter((p) => pubFilter === "all" || p.type === pubFilter);
    $("pubs").innerHTML = list.map((p) => {
      const authors = esc(p.authors).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
      const doi = p.doi ? `<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI</a>` : "";
      return `<li class="pub">
        <span class="year">${p.year}</span>
        <div>
          <p class="pub-title">${p.title}</p>
          <p class="pub-meta">${authors}</p>
          <p class="pub-venue"><span class="tag ${p.type}">${t("pub." + p.type)}</span>${esc(p.venue)} ${doi}</p>
        </div>
      </li>`;
    }).join("");
  }

  // Theme
  function applyTheme(th) { if (th) document.documentElement.dataset.theme = th; else delete document.documentElement.dataset.theme; }
  applyTheme(store("theme"));
  function currentTheme() {
    return document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  document.addEventListener("DOMContentLoaded", () => {
    render();
    const lb = $("langBtn");
    if (lb) lb.addEventListener("click", () => { lang = lang === "en" ? "tr" : "en"; store("lang", lang); render(); });
    const tb = $("themeBtn");
    if (tb) tb.addEventListener("click", () => { const n = currentTheme() === "dark" ? "light" : "dark"; applyTheme(n); store("theme", n); });
    const mb = $("menuBtn");
    if (mb) mb.addEventListener("click", () => $("nav").classList.toggle("open"));
    document.querySelectorAll("#nav a").forEach((a) => a.addEventListener("click", () => $("nav").classList.remove("open")));
  });

  window.SiteI18n = { get lang() { return lang; }, t, L };
})();

// Demos page: microphone recording / file upload, conversion to WAV in the browser,
// and calls to Gradio apps hosted on Hugging Face Spaces (ids set in data.js).
(function () {
  const GRADIO_CLIENT = "https://cdn.jsdelivr.net/npm/@gradio/client@1.8.0/dist/index.min.js";

  Object.assign(window.UI_STRINGS.en, {
    "d.title": "Speech demos",
    "d.lead": "Small, hands-on demos of the technology I work on. Record with your microphone or upload a file; audio is sent to a Hugging Face Space for processing and is not stored.",
    "d.sv.tab": "Speaker verification", "d.sv.sub": "Same speaker or not?",
    "d.vc.tab": "Voice conversion", "d.vc.sub": "Your speech, another voice",
    "d.tts.tab": "Voice-cloning TTS", "d.tts.sub": "Text spoken in a given voice",
    "d.sv.intro": "An ECAPA-TDNN speaker embedding is extracted from each recording, and the cosine similarity between the two embeddings is compared with a decision threshold. This is the \"ASV\" half of the spoofing-aware speaker verification systems I study.",
    "d.sv.a": "1 · Enrollment recording", "d.sv.ah": "A few seconds of the claimed speaker (5–15 s works well).",
    "d.sv.b": "2 · Test recording", "d.sv.bh": "A different utterance — same person or someone else.",
    "d.sv.run": "Verify",
    "d.vc.intro": "Any-to-any voice conversion with kNN-VC: each WavLM frame of the source speech is replaced by its nearest neighbours from the target speaker's recording, then vocoded. The content comes from the source, the voice from the target. Longer target recordings give better results.",
    "d.vc.a": "1 · Source speech (what is said)", "d.vc.ah": "Record yourself saying something (up to 30 s).",
    "d.vc.b": "2 · Target voice (who says it)", "d.vc.bh": "A recording of the target voice — 30 s to 2 min is ideal.",
    "d.vc.run": "Convert",
    "d.tts.intro": "Zero-shot voice-cloning text-to-speech with XTTS-v2: a short reference recording conditions the model, which then speaks your text in that voice. Supports Turkish, English and 15 other languages.",
    "d.tts.a": "1 · Text", "d.tts.ah": "What should be said (max. 300 characters).",
    "d.tts.b": "2 · Reference voice", "d.tts.bh": "6–20 s of clean speech from the voice to clone.",
    "d.tts.lang": "Language", "d.tts.run": "Synthesize",
    "d.tts.placeholder": "Hello! This sentence was never spoken by this voice — it was synthesized from a short reference recording.",
    "d.consent": "I own these recordings or have the speaker's permission, and I will not use the output to impersonate or deceive anyone.",
    "d.why": "Why these demos? Voice conversion and TTS are exactly the attacks that spoofing-aware speaker verification must withstand: try converting your voice and then verifying it against your real recording.",
    "d.rec": "Record", "d.stop": "Stop", "d.upload": "Upload file", "d.remove": "Remove",
    "d.need": "Please provide both inputs first.", "d.needtext": "Please enter some text.",
    "d.needconsent": "Please confirm the consent checkbox.",
    "d.connecting": "Connecting to the model… the first request can take a minute while the Space wakes up.",
    "d.running": "Processing…", "d.done": "Done in {s} s.",
    "d.nospace": "This demo is not connected to a model yet.",
    "d.mic": "Microphone access was denied or is unavailable.",
    "d.decode": "Could not read this audio file.",
    "d.same": "Same speaker", "d.diff": "Different speakers",
    "d.score": "Cosine similarity", "d.thr": "threshold",
    "d.download": "Download",
  });
  Object.assign(window.UI_STRINGS.tr, {
    "d.title": "Konuşma demoları",
    "d.lead": "Üzerinde çalıştığım teknolojilerin küçük, deneyebileceğiniz örnekleri. Mikrofonla kaydedin ya da dosya yükleyin; ses işlenmek üzere bir Hugging Face Space'ine gönderilir ve saklanmaz.",
    "d.sv.tab": "Konuşmacı doğrulama", "d.sv.sub": "Aynı kişi mi?",
    "d.vc.tab": "Ses dönüştürme", "d.vc.sub": "Sizin sözleriniz, başka bir ses",
    "d.tts.tab": "Ses klonlamalı TTS", "d.tts.sub": "Metni verilen sesle okut",
    "d.sv.intro": "Her kayıttan bir ECAPA-TDNN konuşmacı gömmesi çıkarılır ve iki gömme arasındaki kosinüs benzerliği bir karar eşiğiyle karşılaştırılır. Bu, çalıştığım sahteciliğe duyarlı konuşmacı doğrulama sistemlerinin \"ASV\" bileşenidir.",
    "d.sv.a": "1 · Kayıt (enrollment) sesi", "d.sv.ah": "İddia edilen konuşmacıdan birkaç saniye (5–15 sn idealdir).",
    "d.sv.b": "2 · Test sesi", "d.sv.bh": "Farklı bir cümle — aynı kişi ya da başka biri.",
    "d.sv.run": "Doğrula",
    "d.vc.intro": "kNN-VC ile herhangi bir sesten herhangi bir sese dönüştürme: kaynak konuşmanın her WavLM çerçevesi, hedef konuşmacının kaydındaki en yakın komşularıyla değiştirilip vokoderden geçirilir. İçerik kaynaktan, ses hedeften gelir. Hedef kayıt uzadıkça sonuç iyileşir.",
    "d.vc.a": "1 · Kaynak konuşma (ne söyleniyor)", "d.vc.ah": "Kendinizi bir şey söylerken kaydedin (en fazla 30 sn).",
    "d.vc.b": "2 · Hedef ses (kim söylüyor)", "d.vc.bh": "Hedef sesin bir kaydı — 30 sn ile 2 dk arası idealdir.",
    "d.vc.run": "Dönüştür",
    "d.tts.intro": "XTTS-v2 ile sıfır-örnekli ses klonlamalı metinden konuşma: kısa bir referans kayıt modeli koşullar ve model metninizi o sesle okur. Türkçe, İngilizce ve 15 dili daha destekler.",
    "d.tts.a": "1 · Metin", "d.tts.ah": "Söylenecek metin (en fazla 300 karakter).",
    "d.tts.b": "2 · Referans ses", "d.tts.bh": "Klonlanacak sesten 6–20 sn temiz konuşma.",
    "d.tts.lang": "Dil", "d.tts.run": "Sentezle",
    "d.tts.placeholder": "Merhaba! Bu cümle bu sesle hiç söylenmedi; kısa bir referans kayıttan sentezlendi.",
    "d.consent": "Bu kayıtlar bana ait ya da konuşmacının iznine sahibim; çıktıyı kimseyi taklit etmek veya yanıltmak için kullanmayacağım.",
    "d.why": "Neden bu demolar? Ses dönüştürme ve TTS, sahteciliğe duyarlı konuşmacı doğrulamanın dayanması gereken saldırıların ta kendisidir: sesinizi dönüştürüp gerçek kaydınıza karşı doğrulamayı deneyin.",
    "d.rec": "Kaydet", "d.stop": "Durdur", "d.upload": "Dosya yükle", "d.remove": "Kaldır",
    "d.need": "Lütfen önce iki girdiyi de sağlayın.", "d.needtext": "Lütfen bir metin girin.",
    "d.needconsent": "Lütfen onay kutusunu işaretleyin.",
    "d.connecting": "Modele bağlanılıyor… Space uyanırken ilk istek bir dakika kadar sürebilir.",
    "d.running": "İşleniyor…", "d.done": "{s} sn'de tamamlandı.",
    "d.nospace": "Bu demo henüz bir modele bağlanmadı.",
    "d.mic": "Mikrofon erişimi reddedildi ya da kullanılamıyor.",
    "d.decode": "Bu ses dosyası okunamadı.",
    "d.same": "Aynı konuşmacı", "d.diff": "Farklı konuşmacılar",
    "d.score": "Kosinüs benzerliği", "d.thr": "eşik",
    "d.download": "İndir",
  });

  const t = (k) => window.SiteI18n.t(k);
  const $ = (id) => document.getElementById(id);
  const clips = {};

  // ---------- Audio helpers ----------
  async function toWav(blob, sampleRate, maxSeconds) {
    const buf = await blob.arrayBuffer();
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let decoded;
    try { decoded = await ctx.decodeAudioData(buf); } finally { ctx.close(); }
    const dur = Math.min(decoded.duration, maxSeconds);
    const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(dur * sampleRate)), sampleRate);
    const src = off.createBufferSource();
    src.buffer = decoded;
    src.connect(off.destination);
    src.start(0);
    const rendered = await off.startRendering();
    const pcm = rendered.getChannelData(0);
    return { blob: encodeWav(pcm, sampleRate), duration: dur };
  }

  function encodeWav(samples, sr) {
    const view = new DataView(new ArrayBuffer(44 + samples.length * 2));
    const w = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    w(0, "RIFF"); view.setUint32(4, 36 + samples.length * 2, true); w(8, "WAVE");
    w(12, "fmt "); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, sr, true); view.setUint32(28, sr * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
    w(36, "data"); view.setUint32(40, samples.length * 2, true);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return new Blob([view], { type: "audio/wav" });
  }

  // ---------- Record / upload slots ----------
  function buildSlot(el) {
    const key = el.dataset.slot, sr = +el.dataset.sr, max = +el.dataset.max;
    el.insertAdjacentHTML("beforeend", `
      <div class="rec-row">
        <button type="button" class="sbtn rec"><span class="dot"></span><span data-i18n="d.rec">Record</span></button>
        <label class="sbtn"><input type="file" accept="audio/*"><span data-i18n="d.upload">Upload file</span></label>
        <span class="timer"></span>
      </div>
      <div class="clip"></div>`);
    const recBtn = el.querySelector(".rec"), recLabel = recBtn.querySelector("[data-i18n]");
    const timer = el.querySelector(".timer"), clipBox = el.querySelector(".clip"), file = el.querySelector("input[type=file]");
    let recorder = null, tick = null;

    async function setClip(blob) {
      try {
        clips[key] = await toWav(blob, sr, max);
      } catch (e) {
        delete clips[key];
        clipBox.innerHTML = `<p class="status err">${t("d.decode")}</p>`;
        return;
      }
      const url = URL.createObjectURL(clips[key].blob);
      clipBox.innerHTML = `<audio controls src="${url}"></audio>
        <div class="meta">${clips[key].duration.toFixed(1)} s · ${sr / 1000} kHz · <a href="#" class="rm" data-i18n="d.remove">${t("d.remove")}</a></div>`;
      clipBox.querySelector(".rm").addEventListener("click", (ev) => { ev.preventDefault(); delete clips[key]; clipBox.innerHTML = ""; });
    }

    function stop() {
      if (recorder && recorder.state !== "inactive") recorder.stop();
    }

    recBtn.addEventListener("click", async () => {
      if (recorder && recorder.state === "recording") return stop();
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: true } });
      } catch (e) {
        clipBox.innerHTML = `<p class="status err">${t("d.mic")}</p>`;
        return;
      }
      const chunks = [];
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      recorder.onstop = () => {
        clearInterval(tick); timer.textContent = "";
        stream.getTracks().forEach((tr) => tr.stop());
        recBtn.classList.remove("live"); recLabel.dataset.i18n = "d.rec"; recLabel.textContent = t("d.rec");
        setClip(new Blob(chunks, { type: recorder.mimeType }));
      };
      recorder.start();
      const t0 = Date.now();
      recBtn.classList.add("live"); recLabel.dataset.i18n = "d.stop"; recLabel.textContent = t("d.stop");
      tick = setInterval(() => {
        const s = (Date.now() - t0) / 1000;
        timer.textContent = `${s.toFixed(1)} / ${max} s`;
        if (s >= max) stop();
      }, 100);
    });

    file.addEventListener("change", () => { if (file.files[0]) setClip(file.files[0]); file.value = ""; });
  }

  // ---------- Gradio client ----------
  let gradioLib = null;
  const clients = {};
  async function client(spaceId) {
    gradioLib = gradioLib || await import(GRADIO_CLIENT);
    clients[spaceId] = clients[spaceId] || await gradioLib.Client.connect(spaceId);
    return clients[spaceId];
  }

  function setStatus(name, msg, kind) {
    const el = $("status-" + name);
    el.className = "status" + (kind === "err" ? " err" : "");
    el.innerHTML = kind === "busy" ? `<span class="spinner"></span>${msg}` : msg;
  }

  async function run(name, endpoint, inputs, render) {
    const spaceId = window.SITE.spaces[name];
    if (!spaceId) return setStatus(name, t("d.nospace"), "err");
    const btn = $("run-" + name);
    btn.disabled = true;
    $("result-" + name).innerHTML = "";
    const t0 = Date.now();
    try {
      setStatus(name, t("d.connecting"), "busy");
      const app = await client(spaceId);
      setStatus(name, t("d.running"), "busy");
      const { handle_file } = gradioLib;
      const payload = inputs.map((x) => (x instanceof Blob ? handle_file(x) : x));
      const res = await app.predict(endpoint, payload);
      render(res.data);
      setStatus(name, t("d.done").replace("{s}", ((Date.now() - t0) / 1000).toFixed(1)));
    } catch (e) {
      const msg = (e && (e.message || e.title)) || String(e);
      setStatus(name, msg, "err");
    } finally {
      btn.disabled = false;
    }
  }

  function audioResult(name, file) {
    const url = file && (file.url || file);
    $("result-" + name).innerHTML = `<div class="card"><audio controls autoplay src="${url}" style="width:100%"></audio>
      <div class="field-row"><span></span><a href="${url}" download="${name}.wav" target="_blank" rel="noopener">${t("d.download")}</a></div></div>`;
  }

  // ---------- Wiring ----------
  document.querySelectorAll(".slot[data-slot]").forEach(buildSlot);

  document.querySelectorAll("#tabs button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll(".demo").forEach((d) => d.classList.toggle("on", d.id === "demo-" + b.dataset.tab));
    history.replaceState(null, "", "#" + b.dataset.tab);
  }));
  const initial = location.hash.slice(1);
  const initialBtn = document.querySelector(`#tabs button[data-tab="${initial}"]`);
  if (initialBtn) initialBtn.click();

  $("run-verification").addEventListener("click", () => {
    if (!clips["sv-enroll"] || !clips["sv-test"]) return setStatus("verification", t("d.need"), "err");
    run("verification", "/verify", [clips["sv-enroll"].blob, clips["sv-test"].blob], ([r]) => {
      const pct = (v) => Math.max(0, Math.min(100, ((v + 0.2) / 1.2) * 100));
      $("result-verification").innerHTML = `
        <div class="verdict ${r.same ? "same" : "diff"}">
          <div class="big">${r.score.toFixed(3)}</div>
          <div>
            <strong>${t(r.same ? "d.same" : "d.diff")}</strong>
            <div class="muted">${t("d.score")} · ${t("d.thr")} = ${r.threshold}</div>
            <div class="meter" style="color:var(${r.same ? "--ok" : "--bad"})"><i style="width:${pct(r.score)}%"></i><em style="left:${pct(r.threshold)}%"></em></div>
          </div>
        </div>`;
    });
  });

  $("run-conversion").addEventListener("click", () => {
    if (!clips["vc-source"] || !clips["vc-target"]) return setStatus("conversion", t("d.need"), "err");
    if (!$("consent-conversion").checked) return setStatus("conversion", t("d.needconsent"), "err");
    run("conversion", "/convert", [clips["vc-source"].blob, clips["vc-target"].blob], ([f]) => audioResult("conversion", f));
  });

  const ta = $("tts-text");
  const syncCount = () => { $("tts-count").textContent = `${ta.value.length} / 300`; };
  ta.addEventListener("input", syncCount);
  $("run-cloning").addEventListener("click", () => {
    const text = ta.value.trim();
    if (!text) return setStatus("cloning", t("d.needtext"), "err");
    if (!clips["tts-ref"]) return setStatus("cloning", t("d.need"), "err");
    if (!$("consent-cloning").checked) return setStatus("cloning", t("d.needconsent"), "err");
    run("cloning", "/synthesize", [text, clips["tts-ref"].blob, $("tts-lang").value], ([f]) => audioResult("cloning", f));
  });

  document.addEventListener("langchange", (e) => {
    ta.placeholder = t("d.tts.placeholder");
    if (!$("tts-lang").dataset.touched) $("tts-lang").value = e.detail.lang === "tr" ? "tr" : "en";
    for (const name of ["verification", "conversion", "cloning"]) {
      if (!window.SITE.spaces[name]) setStatus(name, t("d.nospace"));
    }
  });
  $("tts-lang").addEventListener("change", (e) => { e.target.dataset.touched = "1"; });
  syncCount();
})();

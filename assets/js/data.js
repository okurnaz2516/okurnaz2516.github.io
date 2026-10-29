// Site content. Edit this file to update the page — no build step needed.
// Every user-facing string is { en, tr }.

window.SITE = {
  name: "Oğuzhan Kurnaz",
  email: "oguzhan.kurnaz@btu.edu.tr",
  photo: "assets/img/profile.jpg",
  cv: {
    en: "assets/cv/Kurnaz_Oguzhan_CV_2026.pdf",
    tr: "assets/cv/Kurnaz_Oguzhan_Ozgecmis_2026.pdf",
  },
  // Leave a link empty ("") to hide its button.
  links: {
    scholar: "",
    orcid: "",
    github: "",
    linkedin: "",
  },

  // Hugging Face Space ids ("username/space-name") that power the demos page.
  // See spaces/README.md for how to deploy them.
  spaces: {
    verification: "",   // e.g. "oguzhankurnaz/speaker-verification"
    conversion: "",      // e.g. "oguzhankurnaz/voice-conversion"
    cloning: "",         // e.g. "oguzhankurnaz/voice-cloning-tts"
  },

  title: { en: "Assistant Professor", tr: "Dr. Öğr. Üyesi" },
  affiliation: {
    en: "Bursa Technical University · Department of Electrical-Electronics Engineering",
    tr: "Bursa Teknik Üniversitesi · Elektrik-Elektronik Mühendisliği Bölümü",
  },
  tagline: {
    en: "I build speaker verification systems that can't be fooled by synthetic or replayed speech.",
    tr: "Sentetik ya da tekrar oynatılan sesle kandırılamayan konuşmacı doğrulama sistemleri geliştiriyorum.",
  },
  about: {
    en: [
      "I am an Assistant Professor at Bursa Technical University. My research sits at the intersection of speech processing and machine learning, with a focus on <strong>spoofing-aware speaker verification (SASV)</strong>: making voice biometrics robust against text-to-speech, voice conversion and replay attacks.",
      "During my PhD I spent a year at the <strong>University of Eastern Finland</strong> as a TÜBİTAK 2214-A visiting researcher with Prof. Tomi Kinnunen's group, where we took part in the ASVspoof 5 and NIST SRE 2024 evaluations. My work has appeared in IEEE Signal Processing Letters, IEEE Transactions on Audio, Speech and Language Processing, ICASSP and Interspeech.",
      "Before academia I worked as a mechatronics engineer on PLC, robot programming and electrical panel design — I still enjoy building things that run on real hardware.",
    ],
    tr: [
      "Bursa Teknik Üniversitesi'nde Dr. Öğretim Üyesiyim. Çalışmalarım konuşma işleme ile makine öğrenmesinin kesişiminde yer alıyor; odak noktam <strong>sahteciliğe duyarlı konuşmacı doğrulama (SASV)</strong>: ses biyometrisini metinden konuşmaya, ses dönüştürme ve tekrar oynatma saldırılarına karşı dayanıklı hâle getirmek.",
      "Doktoram sırasında TÜBİTAK 2214-A bursuyla bir yıl <strong>Doğu Finlandiya Üniversitesi</strong>'nde Prof. Tomi Kinnunen'in grubunda misafir araştırmacı olarak çalıştım; ASVspoof 5 ve NIST SRE 2024 değerlendirmelerine katıldık. Çalışmalarım IEEE Signal Processing Letters, IEEE Transactions on Audio, Speech and Language Processing, ICASSP ve Interspeech'te yayımlandı.",
      "Akademiden önce PLC, robot programlama ve elektrik pano tasarımı üzerine mekatronik mühendisi olarak çalıştım — gerçek donanımda çalışan sistemler kurmaktan hâlâ keyif alıyorum.",
    ],
  },
  interests: {
    en: ["Spoofing-aware speaker verification", "Anti-spoofing / deepfake speech detection", "Self-supervised speech representations", "Score & embedding fusion", "Machine & deep learning"],
    tr: ["Sahteciliğe duyarlı konuşmacı doğrulama", "Sahte / deepfake konuşma tespiti", "Öz-denetimli konuşma temsilleri", "Skor ve gömme füzyonu", "Makine ve derin öğrenme"],
  },
  stats: [
    { value: "14", label: { en: "Published & accepted papers", tr: "Yayımlanmış ve kabul edilmiş yayın" } },
    { value: "3", label: { en: "International challenges", tr: "Uluslararası yarışma" } },
    { value: "2214-A", label: { en: "TÜBİTAK research fellowship", tr: "TÜBİTAK araştırma bursu" } },
    { value: "1001", label: { en: "TÜBİTAK research project", tr: "TÜBİTAK araştırma projesi" } },
  ],

  news: [
    { date: "2026-08", text: { en: "Started as <strong>Assistant Professor</strong> at Bursa Technical University.", tr: "Bursa Teknik Üniversitesi'nde <strong>Dr. Öğr. Üyesi</strong> olarak göreve başladım." } },
    { date: "2026", text: { en: "Paper on joint optimization of speaker and spoof detectors published in <em>IEEE Transactions on Audio, Speech and Language Processing</em>.", tr: "Konuşmacı ve sahtecilik dedektörlerinin birlikte optimizasyonu üzerine makalemiz <em>IEEE Transactions on Audio, Speech and Language Processing</em>'te yayımlandı." } },
    { date: "2026", text: { en: "Two papers accepted at <strong>ICADET 2026</strong>; WildSpoof challenge system presented at <strong>ICASSP 2026</strong>, Barcelona.", tr: "<strong>ICADET 2026</strong>'da iki bildirimiz kabul edildi; WildSpoof yarışma sistemimiz <strong>ICASSP 2026</strong>'da (Barselona) sunuldu." } },
    { date: "2026-01", text: { en: "TÜBİTAK 1001 project on deep & self-supervised learning for SASV accepted.", tr: "SASV için derin ve öz-denetimli öğrenme konulu TÜBİTAK 1001 projemiz kabul edildi." } },
    { date: "2025", text: { en: "Completed my PhD at Bursa Technical University.", tr: "Bursa Teknik Üniversitesi'nde doktoramı tamamladım." } },
  ],

  experience: [
    { period: "2026 – ", role: { en: "Assistant Professor", tr: "Dr. Öğr. Üyesi" }, org: { en: "Bursa Technical University", tr: "Bursa Teknik Üniversitesi" } },
    { period: "2018 – 2026", role: { en: "Research Assistant", tr: "Araştırma Görevlisi" }, org: { en: "Bursa Technical University", tr: "Bursa Teknik Üniversitesi" } },
    { period: "2023 – 2024", role: { en: "Visiting Researcher (TÜBİTAK 2214-A)", tr: "Misafir Araştırmacı (TÜBİTAK 2214-A)" }, org: { en: "University of Eastern Finland", tr: "Doğu Finlandiya Üniversitesi" } },
    { period: "2015 – 2018", role: { en: "Mechatronics Engineer", tr: "Mekatronik Mühendisi" }, org: { en: "ELMOS Automation · Birleşim Electric", tr: "ELMOS Otomasyon · Birleşim Elektrik" } },
  ],
  education: [
    { period: "2019 – 2025", degree: { en: "PhD, Electrical-Electronics Engineering", tr: "Doktora, Elektrik-Elektronik Mühendisliği" }, org: { en: "Bursa Technical University", tr: "Bursa Teknik Üniversitesi" } },
    { period: "2016 – 2019", degree: { en: "MSc, Electrical-Electronics Engineering", tr: "Yüksek Lisans, Elektrik-Elektronik Mühendisliği" }, org: { en: "Erzurum Technical University", tr: "Erzurum Teknik Üniversitesi" } },
    { period: "2011 – 2016", degree: { en: "BSc, Mechatronics Engineering", tr: "Lisans, Mekatronik Mühendisliği" }, org: { en: "Erciyes University", tr: "Erciyes Üniversitesi" } },
  ],

  projects: [
    {
      badge: "TÜBİTAK 1001",
      period: { en: "2026 –", tr: "2026 –" },
      role: { en: "Researcher", tr: "Araştırmacı" },
      title: { en: "Deep Learning and Self-Supervised Learning Solutions for Spoofing-Aware Speaker Verification", tr: "Sahteciliğe Duyarlı Konuşmacı Doğrulama için Derin Öğrenme ve Öz-Denetimli Öğrenme Çözümleri" },
      text: { en: "Score- and deep-feature-level fusion, attention-based fusion, data augmentation and SSL adapters in a unified SASV framework on ASVspoof 5.", tr: "ASVspoof 5 üzerinde birleşik bir SASV çerçevesinde skor ve derin öznitelik düzeyinde füzyon, dikkat tabanlı füzyon, veri artırma ve SSL adaptörleri." },
    },
    {
      badge: "TÜBİTAK 2214-A",
      period: { en: "2023 – 2024", tr: "2023 – 2024" },
      role: { en: "PI (fellowship)", tr: "Yürütücü (burs)" },
      title: { en: "Integration Methods for Spoofing Detection and Speaker Verification in a SASV Framework", tr: "SASV Çerçevesinde Sahtecilik Tespiti ve Konuşmacı Doğrulama Sistemlerinin Entegrasyon Yöntemleri" },
      text: { en: "Embedding- and score-level fusion of ASV and countermeasure systems, alternative evaluation metrics, benchmarks on ASVspoof 2019. University of Eastern Finland.", tr: "ASV ve karşı önlem sistemlerinin gömme ve skor düzeyinde füzyonu, alternatif metrikler, ASVspoof 2019 değerlendirmeleri. Doğu Finlandiya Üniversitesi." },
    },
    {
      badge: "PhD",
      period: { en: "2019 – 2025", tr: "2019 – 2025" },
      role: { en: "Thesis", tr: "Tez" },
      title: { en: "A Decision Cost-Based Learning Approach for Spoofing-Aware Speaker Verification", tr: "A Decision Cost-Based Learning Approach for Spoofing-Aware Speaker Verification" },
      text: { en: "Fusing ECAPA-TDNN, WavLM and AASIST and directly optimizing the architecture-agnostic detection cost function (a-DCF).", tr: "ECAPA-TDNN, WavLM ve AASIST'in füzyonu ve mimariden bağımsız tespit maliyet fonksiyonunun (a-DCF) doğrudan optimizasyonu." },
    },
  ],

  // type: journal | conference | review.  Wrap your own name in ** ** to highlight it.
  publications: [
    { type: "journal", year: 2026, authors: "**O. Kurnaz**, J. Mishra, T. H. Kinnunen, C. Hanilçi", title: "Joint Optimization of Speaker and Spoof Detectors for Spoofing-Robust Automatic Speaker Verification", venue: "IEEE Transactions on Audio, Speech and Language Processing", doi: "10.1109/TASLPRO.2026.3688932" },
    { type: "journal", year: 2025, authors: "**O. Kurnaz**, J. Mishra, T. H. Kinnunen, C. Hanilçi", title: "Optimizing a-DCF for Spoofing-Robust Speaker Verification", venue: "IEEE Signal Processing Letters, vol. 32, pp. 1081–1085", doi: "10.1109/LSP.2025.3545290" },
    { type: "journal", year: 2019, authors: "K. K. Ayten, **O. Kurnaz**", title: "Real-Time Implementation of Image Based PLC Control for a Robotic Platform", venue: "Balkan Journal of Electrical and Computer Engineering, 7(1), 64–71", doi: "10.17694/bajece.487212" },
    { type: "conference", year: 2026, authors: "**O. Kurnaz**, J. Mishra, T. Kinnunen, C. Hanilçi", title: "Joint Optimization of ASV and CM Tasks: Btuef Team's Submission for WildSpoof Challenge", venue: "ICASSP 2026, Barcelona", doi: "10.1109/ICASSP55912.2026.11461784" },
    { type: "conference", year: 2026, authors: "D. Colibro, C. Vair, … , **O. Kurnaz**, T. Kinnunen, … , S. Wang", title: "I4U's Official and Streamlined Audio Systems for NIST SRE24", venue: "Odyssey 2026, pp. 191–198", doi: "10.21437/Odyssey.2026-28" },
    { type: "conference", year: 2026, authors: "**O. Kurnaz**", title: "Calibration-Aware Joint Optimization for Spoofing-Robust Speaker Verification via Auxiliary C<sub>llr</sub> Losses", venue: "ICADET 2026 (accepted)" },
    { type: "conference", year: 2026, authors: "**O. Kurnaz**", title: "QMF-SASV: Quality-Measure Fusion Using Duration and Embedding-Norm Cues for Spoofing-Aware Speaker Verification", venue: "ICADET 2026 (accepted)" },
    { type: "conference", year: 2025, authors: "A. Buker, **O. Kurnaz**, S. Bekiryazici, S. C. Demirtas, C. Hanilci", title: "Evaluating Parameter Sharing for Spoofing-Aware Speaker Verification: A Case Study on the ASVspoof 5 Dataset", venue: "Interspeech 2025" },
    { type: "conference", year: 2025, authors: "**O. Kurnaz**, T. Kinnunen, C. Hanilci", title: "Investigating the Potential of Multi-Stage Score Fusion in Spoofing-Aware Speaker Verification", venue: "SIU 2025, İstanbul" },
    { type: "conference", year: 2024, authors: "**O. Kurnaz**, S. C. Demirtaş, J. Mishra, A. Buker, C. Hanilçi", title: "Spoofing-Robust Speaker Verification Using Parallel Embedding Fusion: BTU Speech Group's Approach for ASVspoof5 Challenge", venue: "ASVspoof 2024 Workshop, pp. 138–143", doi: "10.21437/ASVspoof.2024-20" },
    { type: "conference", year: 2022, authors: "**O. Kurnaz**, C. Hanilçi", title: "Multi-image Crowd Counting Using Multi-column Convolutional Neural Network", venue: "ICICT 2021, LNNS vol. 236, Springer", doi: "10.1007/978-981-16-2380-6_20" },
    { type: "conference", year: 2021, authors: "G. Aydemir, **O. Kurnaz**, T. Bekiryazıcı, A. Avcı, M. Kocakulak", title: "Driver Drowsiness Detection using MobileNets and Long Short-term Memory", venue: "ELECO 2021, Bursa, pp. 220–223", doi: "10.23919/ELECO54474.2021.9677724" },
    { type: "conference", year: 2020, authors: "**O. Kurnaz**, C. Hanilçi", title: "Multi-Image Crowd Density Estimation using Multi Column Deep Neural Network", venue: "SIU 2020, Gaziantep", doi: "10.1109/SIU49456.2020.9302347" },
    { type: "conference", year: 2019, authors: "**O. Kurnaz**, C. Hanilçi", title: "Features and Regression Techniques for Crowd Density Estimation: A Comparison", venue: "ELECO 2019, Bursa, pp. 1075–1079", doi: "10.23919/ELECO47770.2019.8990540" },
    { type: "review", year: 2026, authors: "**O. Kurnaz**", title: "Adaptive Multi-Operating-Point Optimization for Spoofing-Aware Speaker Verification with a Common Decision Threshold", venue: "Submitted to Journal of Innovative Science and Engineering" },
  ],

  teaching: {
    en: ["Python Programming", "C Programming", "Object-Oriented Programming", "Machine Learning with Python", "Summer school: Spoofing-Aware Speaker Verification (UEF)"],
    tr: ["Python Programlama", "C Programlama", "Nesne Yönelimli Programlama", "Python ile Makine Öğrenmesi", "Yaz okulu: Sahteciliğe Duyarlı Konuşmacı Doğrulama (UEF)"],
  },
  certificates: [
    { year: "2025–26", title: { en: "AI and Machine Learning — Certificate of Achievement", tr: "Yapay Zekâ ve Makine Öğrenmesi — Başarı Belgesi" }, org: { en: "YÖK Data Analysis School", tr: "YÖK Veri Analizi Okulu" } },
    { year: "2025–26", title: { en: "AI and Facilitating Tools — Certificate of Achievement", tr: "Yapay Zekâ ve Kolaylaştırıcı Araçlar — Başarı Belgesi" }, org: { en: "YÖK Data Analysis School", tr: "YÖK Veri Analizi Okulu" } },
    { year: "2024", title: { en: "Statistical Machine Learning", tr: "Statistical Machine Learning" }, org: { en: "University of Eastern Finland", tr: "Doğu Finlandiya Üniversitesi" } },
    { year: "2024", title: { en: "Scientific Presentation", tr: "Scientific Presentation" }, org: { en: "University of Eastern Finland", tr: "Doğu Finlandiya Üniversitesi" } },
  ],
};

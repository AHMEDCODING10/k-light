const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newSectionHtml = `
    <!-- =====================================================================
         NEW VIDEO STUDIO SECTION (Vimeo)
         ===================================================================== -->
    <section id="video-portfolio" class="portfolio-section" style="background: var(--bg-dark); padding-top: 6rem;">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">
            استوديو أعمالنا <span style="color: var(--brand-coral);">السينمائية</span>
          </h2>
          <p class="section-sub">
            تصفح أحدث إنتاجاتنا السينمائية ومشاريعنا الفنية الرائدة والمستضافة على (Vimeo).
          </p>
        </div>

        <div class="portfolio-grid">
          <div class="portfolio-item-card" data-category="video" data-id="v1">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2173608148-e7794b9cd1c228fd18492c598056321e85bfc8fac367355bb7f4a786d39d463e-d_960?region=us" alt="Ithraa Film" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">Ithraa Film</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v2">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2163454491-6ffc71abbdaca31a62f43790791abd57c61aaf86e8c17793c6af395cd985edd6-d_960?region=us" alt="Big Time" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">Big time</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v3">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2163452099-96a49a2084ce0fa35d972494d709d79f6ef82898a4e2331c5ed15fb6f9ed9a14-d_960?region=us" alt="EMKAN" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">EMKAN</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v4">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2163453944-820fe47e6361677af199c542c235b3c768c94ab19b39254aba9e573fd8f8bc34-d_960?region=us" alt="AlNasser" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">AlNasser</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v5">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2166388192-29f66350d065d7af873065580f4538d7bb800931f7ed61bf9e09b6dce997fc24-d_960?region=us" alt="بودكاست خذ وخل" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">بودكاست خذ وخل.</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v6">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2173270761-ce8ecf6f158730ca3dd0c30789417f9fba5c1a313a7aab1c06e646b69ca1e651-d_960?region=us" alt="SIF RECAP" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">SIF- RECAP</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v7">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2168414088-1a2f32d7d29f1322bca04515bc7f83c30d5ac1d5770e2d7d5277c26a9ae472f9-d_960?region=us" alt="Kudu SS Film3" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">Kudu SS - Film3 - Final</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v8">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2166387319-b873e470b390769920df4f9d4fbec4be9809b188dcf3c8e5076033d16c07c7f1-d_960?region=us" alt="Kudu SS Film2" loading="lazy decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">Kudu SS - Film2 - Final</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="video" data-id="v9">
            <div class="portfolio-thumb">
              <img src="https://i.vimeocdn.com/video/2163451955-826b7d90244e3bfd23a00f630e906f982dedd14f9a1155b8b498b2b456ca9977-d_960?region=us" alt="sprots" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <h3 class="card-title-text">sprots</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
`;

if (!html.includes('id="video-portfolio"')) {
  // Insert right before the existing portfolio section
  html = html.replace('<section id="portfolio"', newSectionHtml + '\n    <section id="portfolio"');
  fs.writeFileSync('index.html', html, 'utf8');
}

// 2. UPDATE Portfolio.js
let js = fs.readFileSync('src/scripts/features/Portfolio.js', 'utf8');

const newData = `    v1: {
      title: "Ithraa Film",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1205106284",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيلم مشابه لـ Ithraa Film"
    },
    v2: {
      title: "Big time",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1197176977",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ Big time"
    },
    v3: {
      title: "EMKAN",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1197176976",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ EMKAN"
    },
    v4: {
      title: "AlNasser",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1197176974",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ AlNasser"
    },
    v5: {
      title: "بودكاست خذ وخل.",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1199522722",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن تصوير بودكاست"
    },
    v6: {
      title: "SIF- RECAP",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1204273789",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو مشابه لـ SIF- RECAP"
    },
    v7: {
      title: "Kudu SS - Film3 - Final",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1199535534",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو إعلاني مشابه لـ Kudu"
    },
    v8: {
      title: "Kudu SS - Film2 - Final",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1199523919",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو إعلاني مشابه لـ Kudu"
    },
    v9: {
      title: "sprots",
      client: "كي لايت",
      category: "إنتاج سينمائي",
      vimeoId: "1197176975",
      type: "video",
      waText: "مرحباً، أود الاستفسار عن فيديو رياضي"
    },`;

if (!js.includes('vimeoId: "1205106284"')) {
  js = js.replace('const portfolioData = {', 'const portfolioData = {\n' + newData);
  fs.writeFileSync('src/scripts/features/Portfolio.js', js, 'utf8');
}

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldModalStr = '    <!-- VIDEO MODAL -->\n    <div class="video-modal" id="video-modal">\n      <button class="video-modal-close" id="video-modal-close"><i class="fas fa-times"></i></button>\n      <div class="video-modal-content">\n        <video id="modal-video-player" controls="" playsinline=""></video>\n      </div>\n    </div>';

const lightboxHtml = `    <!-- =====================================================================
         LIGHTBOX MODAL (For Portfolio Images & Vimeo Videos)
         ===================================================================== -->
    <div class="lightbox-modal" id="portfolio-modal">
      <div class="lightbox-dialog">
        <button class="lightbox-close-btn" id="modal-close-btn"><i class="fas fa-times"></i></button>
        
        <div class="lightbox-content-container">
          <div class="lightbox-video-wrapper" id="lightbox-video-wrapper" style="display: none;">
            <iframe id="lightbox-iframe" src="" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class="lightbox-image-wrapper" id="lightbox-image-wrapper" style="display: none;">
            <img id="lightbox-img" src="" alt="Portfolio Image">
          </div>
        </div>

        <div class="lightbox-info-bar">
          <div>
            <span class="glass-badge" id="lightbox-badge">Category</span>
            <div class="card-client-tag" id="lightbox-client" style="margin-top: 0.5rem;">Client</div>
            <h3 id="lightbox-title">Title</h3>
          </div>
          <a href="#" target="_blank" class="btn-primary" id="lightbox-wa-link" style="padding: 0.6rem 1.5rem;">
            <i class="fab fa-whatsapp"></i> اطلب مشروعاً مماثلاً
          </a>
        </div>
      </div>
    </div>`;

if (html.includes('id="video-modal"')) {
  html = html.replace(oldModalStr, lightboxHtml);
} else if (!html.includes('id="portfolio-modal"')) {
  html = html.replace('</body>', lightboxHtml + '\n</body>');
}

const startTag = '<div class="portfolio-grid" id="portfolio-grid">';
const endTag = '</div>\n\n      </div>\n    </section>';
const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.indexOf(endTag, startIndex);

if (startIndex > -1 && endIndex > -1) {
  const newGrid = `
          <div class="portfolio-item-card" data-category="commercials" data-id="cars">
            <div class="portfolio-thumb">
              <img src="/images/cars.webp" alt="إعلان سيارات" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">8K Speed</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">شركة المحركات الملكية</div>
                  <h3 class="card-title-text">إعلان إطلاق فئة سيارات رياضية فاخرة</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="watches">
            <div class="portfolio-thumb">
              <img src="/images/watches.webp" alt="تصوير ساعات" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Macro</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">علامة أورورا الفاخرة</div>
                  <h3 class="card-title-text">حملة الساعات الذكية والتيتانيوم المصقول</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="commercials" data-id="perfumes">
            <div class="portfolio-thumb">
              <img src="/images/perfumes.webp" alt="إعلان عطري" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">8K Cinema</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">دار النخبة للعطور • الرياض</div>
                  <h3 class="card-title-text">إعلان عطري فخم (The Royal Fragrance)</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="perfume_majestic">
            <div class="portfolio-thumb">
              <img src="/images/perfume_majestic.webp" alt="عطور ماجستيك" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Luxury</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">شركة ماجستيك للعطور</div>
                  <h3 class="card-title-text">عطور ماجستيك - الإطلاق الرسمي</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="commercials" data-id="vimto">
            <div class="portfolio-thumb">
              <img src="/images/vimto.webp" alt="حملة فيمتو" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">Ramadan</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">مشروبات فيمتو</div>
                  <h3 class="card-title-text">حملة مشروب فيمتو الرمضانية</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="cream">
            <div class="portfolio-thumb">
              <img src="/images/cream.webp" alt="منتجات تجميل" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Beauty</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">علامة تجميل عالمية</div>
                  <h3 class="card-title-text">تصوير منتجات العناية بالبشرة</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="products">
            <div class="portfolio-thumb">
              <img src="/images/products.webp" alt="تصوير منتجات متنوعة" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Studio</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-image"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">علامات تجارية متعددة</div>
                  <h3 class="card-title-text">تغطية شاملة لمنتجات متنوعة</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="events" data-id="portrait">
            <div class="portfolio-thumb">
              <img src="/images/portrait.webp" alt="بورتريه سينمائي" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">فعاليات</span>
                  <span class="glass-badge purple">Portrait</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-image"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">شخصيات عامة وقيادات</div>
                  <h3 class="card-title-text">تصوير بورتريه سينمائي احترافي</h3>
                </div>
              </div>
            </div>
          </div>
        `;
  html = html.substring(0, startIndex) + newGrid + html.substring(endIndex);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with HTML Modal and local webp images!');

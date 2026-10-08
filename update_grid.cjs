const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startTag = '<div class="portfolio-grid" id="portfolio-grid">';
const endTag = '</div>\n\n      </div>\n    </section>';
const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.indexOf(endTag, startIndex);

if (startIndex > -1 && endIndex > -1) {
  const newContent = `

          <div class="portfolio-item-card" data-category="events" data-id="item1">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop" alt="تصوير وثائقي" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">فعاليات</span>
                  <span class="glass-badge purple">Documentary</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">مشروع وثائقي</div>
                  <h3 class="card-title-text">تصوير وثائقي احترافي</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> ARRI Alexa 35</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="commercials" data-id="item2">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop" alt="إعلان سيارات" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">8K RAW</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">وكالة سيارات عالمية</div>
                  <h3 class="card-title-text">إعلان سيارات فارهة 8K</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> RED V-Raptor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="commercials" data-id="item3">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop" alt="إعلان عطور" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">Macro Cinema</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">دار النخبة للعطور</div>
                  <h3 class="card-title-text">إعلان عطور (The Royal Fragrance)</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> Phantom Flex4K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="commercials" data-id="item4">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" alt="تصوير جوي" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">إعلانات</span>
                  <span class="glass-badge purple">Aerial FPV</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">شركة عقارية رائدة</div>
                  <h3 class="card-title-text">تصوير جوي درون للمشاريع الكبرى</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-plane"></i> Inspire 3 8K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="item5">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1516280440502-a1789d3d3c8c?q=80&w=800&auto=format&fit=crop" alt="تصوير أطعمة" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Food Styling</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">سلسلة مطاعم عالمية</div>
                  <h3 class="card-title-text">تصوير أطعمة سينمائي</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> RED Komodo 6K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="events" data-id="item6">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=800&auto=format&fit=crop" alt="تغطية مهرجانات" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">فعاليات</span>
                  <span class="glass-badge purple">Live Coverage</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">تغطية احترافية</div>
                  <h3 class="card-title-text">تغطية مهرجانات وفعاليات ضخمة</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-video"></i> Multi-Cam Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="item7">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" alt="إعلان ساعات" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Macro Detail</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">علامة أورورا للساعات</div>
                  <h3 class="card-title-text">إعلان ساعات تيتانيوم مصقولة</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> ARRI Alexa Mini LF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="events" data-id="item8">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1444464666168-49b626f111d5?q=80&w=800&auto=format&fit=crop" alt="فيلم سياحي" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">فعاليات</span>
                  <span class="glass-badge purple">Tourism</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">حملة سياحية</div>
                  <h3 class="card-title-text">فيلم سياحي ترويجي</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> Sony Venice 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="portfolio-item-card" data-category="products" data-id="item9">
            <div class="portfolio-thumb">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" alt="أزياء" loading="lazy" decoding="async">
              <div class="portfolio-card-overlay">
                <div class="card-tags-row">
                  <span class="glass-badge">منتجات</span>
                  <span class="glass-badge purple">Fashion</span>
                </div>
                <div class="card-play-icon"><i class="fas fa-play"></i></div>
                <div class="card-meta-box">
                  <div class="card-client-tag">دار أزياء محلية</div>
                  <h3 class="card-title-text">تصوير أزياء وبورتريه سينمائي</h3>
                  <div class="card-specs-brief">
                    <span><i class="fas fa-camera"></i> RED V-Raptor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
  html = html.substring(0, startIndex) + newContent + html.substring(endIndex);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully updated portfolio grid in index.html');
} else {
  console.log('Failed to find portfolio-grid in index.html');
}

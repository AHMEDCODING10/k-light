export function initInteractions() {
  initFAQ();
  initContactForm();
  initServiceButtons();
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      // Set initial height for active items
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

function initContactForm() {
  const form = document.querySelector('.contact-section form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        form.innerHTML = `
          <div class="success-message" style="text-align: center; padding: 2rem; color: #fff;">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #4CAF50; margin-bottom: 1rem;"></i>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">تم إرسال طلبك بنجاح!</h3>
            <p style="color: var(--text-muted);">سيتواصل معك فريق كي لايت في أقرب وقت ممكن.</p>
          </div>
        `;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> حدث خطأ، حاول مجدداً';
      submitBtn.style.background = '#e74c3c';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }
  });
}

function initServiceButtons() {
  const serviceButtons = document.querySelectorAll('.service-cta-link');
  const messageBox = document.querySelector('.contact-section textarea');
  
  if (!messageBox) return;
  
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find the service title
      const serviceBox = btn.closest('.service-box');
      if (serviceBox) {
        const titleEl = serviceBox.querySelector('h3');
        if (titleEl) {
          // Remove the english pill text from the title string if it exists
          let title = titleEl.textContent.trim();
          // Pre-fill message
          messageBox.value = `مرحباً فريق كي لايت، أرغب بالاستفسار عن خدمة (${title})..`;
          
          // Add a subtle highlight effect to the textarea to draw attention
          messageBox.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
          messageBox.style.borderColor = 'var(--brand-coral)';
          messageBox.style.boxShadow = '0 0 15px rgba(224, 122, 95, 0.3)';
          
          setTimeout(() => {
            messageBox.style.borderColor = '';
            messageBox.style.boxShadow = '';
          }, 2000);
        }
      }
    });
  });
}

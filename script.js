/* ========================================
   NAVBAR — scroll shadow
======================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ========================================
   HAMBURGER MENU
======================================== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ========================================
   ACTIVE NAV LINK ON SCROLL
======================================== */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, {
  threshold: 0.35,
  rootMargin: `-${72}px 0px 0px 0px`
});

sections.forEach(s => sectionObserver.observe(s));

/* ========================================
   QUOTE FORM — mailto submit
======================================== */
const quoteForm = document.getElementById('quote-form');
if (quoteForm) quoteForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name         = document.getElementById('name').value.trim();
  const phone        = document.getElementById('phone').value.trim();
  const email        = document.getElementById('email').value.trim();
  const propertyType = document.getElementById('property-type').value;
  const service      = document.getElementById('service-needed').value;
  const date         = document.getElementById('preferred-date').value;
  const message      = document.getElementById('message').value.trim();

  if (!name || !phone || !email || !propertyType || !service) {
    alert('Please fill in all required fields.');
    return;
  }

  const subject = `Quote Request — ${name} (${propertyType})`;

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Property Type: ${propertyType}`,
    `Service Needed: ${service}`,
    date    ? `Preferred Date: ${date}` : '',
    message ? `\nMessage:\n${message}` : ''
  ].filter(Boolean);

  const body = lines.join('\n');

  window.location.href =
    `mailto:refindclean25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


/* ========================================
   GALLERY LIGHTBOX — click a photo to view it full size
======================================== */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

if (galleryItems.length) {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Previous photo">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox-next" aria-label="Next photo">&#8250;</button>' +
    '<div class="lightbox-caption"></div>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lightbox-caption');
  let current = 0;

  const show = (i) => {
    current = (i + galleryItems.length) % galleryItems.length;
    const img = galleryItems[current].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  };

  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}

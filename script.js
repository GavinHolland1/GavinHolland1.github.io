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
document.getElementById('quote-form').addEventListener('submit', function (e) {
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
    `mailto:info@refindclean.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


// Improved nav + form UX
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    const expanded = menuIcon.getAttribute('aria-expanded') === 'true';
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    menuIcon.setAttribute('aria-expanded', String(!expanded));
  });

  // close menu when a nav link is clicked (mobile)
  document.querySelectorAll('.navbar a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
      menuIcon.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form UX (adds inline status messaging)
const form = document.querySelector('form');
const formMsg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.value || submitBtn.textContent;
      if (submitBtn.value !== undefined) submitBtn.value = 'Sending...';
      else submitBtn.textContent = 'Sending...';
    }

    const formData = new FormData(form);
    const action = form.action || window.location.href;

    fetch(action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
      .then(response => {
        if (response.ok) {
          if (formMsg) formMsg.textContent = 'Message sent — thanks! I will get back to you soon.';
          form.reset();
        } else {
          if (formMsg) formMsg.textContent = 'There was a problem sending your message. Try again later.';
        }
      })
      .catch(() => {
        if (formMsg) formMsg.textContent = 'Network error. Please try again later.';
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitBtn.value !== undefined) submitBtn.value = originalText;
          else submitBtn.textContent = originalText;
        }
      });
  });
}

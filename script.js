/**
 * Shivam Garg — Interactive Portfolio Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initProjectFilters();
  initScrollAnimations();
  initContactForm();
});

/**
 * Navbar responsive menu and scroll state
 */
function initNavbar() {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.navbar a.nav-link');
  const sections = document.querySelectorAll('section');

  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      const expanded = menuIcon.getAttribute('aria-expanded') === 'true';
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
      menuIcon.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header background transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Text typing simulation in Hero section
 */
function initTypingEffect() {
  const typedSpan = document.getElementById('typed-text');
  if (!typedSpan) return;

  const toType = [
    'AI/ML Developer',
    'Python & Automation Engineer',
    'Data Analytics Developer',
    'Computer Vision Builder'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = toType[phraseIdx];

    if (isDeleting) {
      typedSpan.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typedSpan.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % toType.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  setTimeout(type, 500);
}

/**
 * Filter projects dynamically by category tags
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
          // Trigger entry transitions
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/**
 * Scroll reveal triggers using Intersection Observer
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we can unobserve
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/**
 * Formspree contact submission integration
 */
/**
 * Formspree contact submission integration with detailed validation
 */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const formMsg = document.getElementById('form-msg');

  if (!form) return;

  const inputs = form.querySelectorAll('.form-control');

  // Regex validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+]?[0-9\s\-()]{10,18}$/;

  // Setup live validation triggers
  inputs.forEach(input => {
    // Validate on blur or input changes
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
      // Clear error as user corrects the field
      if (input.classList.contains('invalid')) {
        validateInput(input);
      }
    });
  });

  function validateInput(input) {
    const value = input.value.trim();
    const name = input.getAttribute('name');
    let isValid = true;
    let errorMsg = '';

    // Check empty validation for required fields
    if (input.hasAttribute('required') && value === '') {
      isValid = false;
      errorMsg = 'This field is required.';
    } else if (value !== '') {
      // Custom rules per field if not empty
      if (name === 'name') {
        if (value.length < 2) {
          isValid = false;
          errorMsg = 'Name must be at least 2 characters long.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          isValid = false;
          errorMsg = 'Name must contain only letters and spaces.';
        }
      } else if (name === 'email') {
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (name === 'phone') {
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMsg = 'Please enter a valid phone number (min 10 digits).';
        }
      } else if (name === 'subject') {
        if (value.length < 4) {
          isValid = false;
          errorMsg = 'Subject must be at least 4 characters long.';
        }
      } else if (name === 'message') {
        if (value.length < 10) {
          isValid = false;
          errorMsg = 'Please write a message of at least 10 characters.';
        }
      }
    }

    // Toggle CSS classes and display error element
    let errorSpan = input.parentNode.querySelector('.form-error-msg');
    
    if (!isValid) {
      input.classList.add('invalid');
      input.classList.remove('valid');
      
      if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.className = 'form-error-msg';
        input.parentNode.appendChild(errorSpan);
      }
      errorSpan.textContent = errorMsg;
    } else {
      input.classList.remove('invalid');
      if (value !== '') {
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
      }
      
      if (errorSpan) {
        errorSpan.remove();
      }
    }

    return isValid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Validate all fields on submit
    let isFormValid = true;
    let firstInvalidInput = null;

    inputs.forEach(input => {
      const isInputValid = validateInput(input);
      if (!isInputValid) {
        isFormValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = input;
        }
      }
    });

    if (!isFormValid) {
      if (formMsg) {
        formMsg.className = 'error';
        formMsg.textContent = 'Please fill out all fields correctly before sending.';
        formMsg.style.display = 'block';
      }
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    const submitBtn = form.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending Message <i class="bx bx-loader-alt bx-spin"></i>';

    const formData = new FormData(form);
    const action = form.action || window.location.href;

    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(async response => {
        if (response.ok) {
          formMsg.className = 'success';
          formMsg.textContent = 'Message sent successfully! I will reach out to you shortly.';
          formMsg.style.display = 'block';
          form.reset();
          
          // Clear valid classes and inline error spans
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
            const errorSpan = input.parentNode.querySelector('.form-error-msg');
            if (errorSpan) errorSpan.remove();
          });
        } else {
          let errorData = null;
          try {
            errorData = await response.json();
          } catch (e) {}

          const isRecaptcha = errorData && (
            (errorData.error && errorData.error.toLowerCase().includes('recaptcha')) ||
            (errorData.errors && errorData.errors.some(err => err.code === 'TYPE_RECAPTCHA' || (err.message && err.message.toLowerCase().includes('recaptcha'))))
          );

          if (isRecaptcha) {
            formMsg.className = 'info';
            formMsg.textContent = 'Spam check required. Redirecting to verification page...';
            formMsg.style.display = 'block';
            setTimeout(() => {
              form.submit();
            }, 1500);
          } else {
            formMsg.className = 'error';
            formMsg.textContent = errorData && errorData.error ? errorData.error : 'Oops! There was a problem sending your message. Please try again.';
            formMsg.style.display = 'block';
          }
        }
      })
      .catch(() => {
        formMsg.className = 'error';
        formMsg.textContent = 'Connection error. Please check your network connection and try again.';
        formMsg.style.display = 'block';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
        // Clear status message after 6 seconds
        setTimeout(() => {
          formMsg.style.display = 'none';
          formMsg.className = '';
          formMsg.textContent = '';
          formMsg.style.display = '';
        }, 6000);
      });
  });
}

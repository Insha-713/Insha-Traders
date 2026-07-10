const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};

const WHATSAPP_NUMBER = "910000000000";

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  setupHeader();
  setupHeroSlides();
  setupParticles();
  setupRevealAnimations();
  setupCounters();
  setupPortfolio();
  setupTestimonials();
  setupBeforeAfter();
  setupContactForm();
  setupCursor();
  setupFloatingActions();
});

function setupHeader() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");

  const syncHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 28);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupHeroSlides() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("is-active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("is-active");
  }, 5200);
}

function setupParticles() {
  const canvas = document.querySelector(".particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let width = 0;
  let height = 0;
const resize = () => {
    width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    particles = Array.from({ length: Math.min(90, Math.floor(window.innerWidth / 16)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: (Math.random() * 2.1 + .7) * window.devicePixelRatio,
      vx: (Math.random() - .5) * .32,
      vy: (Math.random() * -.55 - .12) * window.devicePixelRatio,
      a: Math.random() * .55 + .2
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      ctx.beginPath();
      ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
      ctx.shadowColor = "rgba(212, 175, 55, .75)";
      ctx.shadowBlur = 14;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    revealItems.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: .9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 86%"
        }
      });
    });
    
  gsap.from(".hero-content > *", {
      y: 34,
      opacity: 0,
      duration: .95,
      stagger: .12,
      ease: "power3.out",
      delay: .2
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  revealItems.forEach((item) => observer.observe(item));
}

function setupCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: .4 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

function setupPortfolio() {
  const filters = document.querySelectorAll(".filter");
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const lightboxText = lightbox.querySelector("p");
  const close = lightbox.querySelector(".lightbox-close");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((btn) => btn.classList.remove("is-active"));
      filter.classList.add("is-active");
      const category = filter.dataset.filter;

      items.forEach((item) => {
        const match = category === "all" || item.dataset.category.includes(category);
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImg.src = item.dataset.img;
      lightboxImg.alt = item.querySelector("img").alt;
      lightboxText.textContent = item.dataset.title;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });
   const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    lightboxImg.src = "";
  };

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

function setupTestimonials() {
  const testimonials = [...document.querySelectorAll(".testimonial")];
  const controls = document.querySelectorAll(".slider-btn");
  let index = 0;

  const show = (nextIndex) => {
    testimonials[index].classList.remove("is-active");
    index = (nextIndex + testimonials.length) % testimonials.length;
    testimonials[index].classList.add("is-active");
  };

  controls.forEach((button) => {
    button.addEventListener("click", () => show(index + Number(button.dataset.dir)));
  });

  setInterval(() => show(index + 1), 6200);
}

function setupBeforeAfter() {
  const wrapper = document.querySelector(".before-after");
  if (!wrapper) return;
  const pane = wrapper.querySelector(".after-pane");
  const range = wrapper.querySelector("input");

  const update = () => {
    const value = Number(range.value);
    pane.style.width = `${value}%`;
    pane.style.setProperty("--ratio", value / 100);
  };

  range.addEventListener("input", update);
  update();
}

function setupContactForm() {
  const form = document.querySelector("#inquiryForm");
  const status = form.querySelector(".form-status");
  const requestCall = document.querySelector("#requestCall");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    status.textContent = "Sending your inquiry...";

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.subject = "New Insha Traders Website Inquiry";

    try {
      await fetch("https://insha-traders-backend.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      status.textContent = "✅ Thank you. Your inquiry has been sent successfully.";

      document.getElementById("successPopup").style.display = "flex";

      submitBtn.textContent = "Inquiry Sent ✓";

      form.reset();

    } catch (error) {
      console.error(error);

      status.textContent = "❌ Unable to send right now. Please WhatsApp Insha Traders.";

      submitBtn.disabled = false;
      submitBtn.textContent = "Send Inquiry";
    }
  }); // <-- submit event yahan close hoga

  requestCall.addEventListener("click", () => {
    const mobile = form.elements.mobile.value.trim();
    const name = form.elements.name.value.trim() || "Website Visitor";

    const message = encodeURIComponent(
      `Request call back for ${name}${mobile ? `, mobile: ${mobile}` : ""}`
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener"
    );
  });

  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("successPopup").style.display = "none";
  });
}

function setupCursor() {
  const cursor = document.querySelector(".cursor");
  const dot = document.querySelector(".cursor-dot");
  if (!cursor || !dot || window.matchMedia("(max-width: 820px)").matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  const animate = () => {
    ringX += (mouseX - ringX) * .16;
    ringY += (mouseY - ringY) * .16;
    cursor.style.left = `${ringX}px`;
    cursor.style.top = `${ringY}px`;
    requestAnimationFrame(animate);
  };

  animate();
}

function setupFloatingActions() {
  const backToTop = document.querySelector("#backToTop");
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

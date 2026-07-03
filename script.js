const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".carousel-dots button")];
let currentSlide = 0;
let carouselTimer;

function showSlide(index) {
  currentSlide = index;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === index;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  dots.forEach((dot, dotIndex) => {
    const active = dotIndex === index;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-selected", String(active));
  });
}

function startCarousel() {
  window.clearInterval(carouselTimer);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    carouselTimer = window.setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 5000);
  }
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startCarousel();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
  });
});

const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

const applicationForm = document.querySelector(".application-form");

function trackConversion(conversionName) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: conversionName });
  }
}

document.querySelectorAll('[data-conversion="whatsapp_click"]').forEach((link) => {
  link.addEventListener("click", () => trackConversion("whatsapp_click"));
});

applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = applicationForm.querySelector(".form-status");
  const formData = new FormData(applicationForm);
  const message = [
    "Hi DV Easy Loan, saya ingin semak kelayakan pinjaman.",
    `Nama: ${formData.get("name")}`,
    `Nombor Telefon: ${formData.get("phone")}`,
    `Jenis Pinjaman: ${formData.get("loan-type")}`,
    `Jumlah pinjaman: RM${formData.get("amount")}`,
    `Lokasi: ${formData.get("location")}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/60194844444?text=${encodeURIComponent(message)}`;

  status.dataset.state = "";
  status.textContent = "";

  try {
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (!whatsappWindow) throw new Error("WhatsApp window blocked");
    whatsappWindow.opener = null;
    trackConversion("form_submit");
    status.dataset.state = "success";
    status.textContent = "WhatsApp telah dibuka. Sila semak maklumat anda dan tekan Hantar.";
  } catch (error) {
    status.dataset.state = "error";
    status.textContent = "WhatsApp tidak dapat dibuka. Maklumat anda masih disimpan—sila cuba lagi.";
  }
});

const floatingWhatsApp = document.querySelector(".floating-whatsapp");
const protectedSections = document.querySelectorAll("#faq, #application, .site-footer");
const visibleProtectedSections = new Set();

const floatingButtonObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) visibleProtectedSections.add(entry.target);
    else visibleProtectedSections.delete(entry.target);
  });
  floatingWhatsApp.classList.toggle("is-suppressed", visibleProtectedSections.size > 0);
}, { threshold: 0.01 });

protectedSections.forEach((section) => floatingButtonObserver.observe(section));

showSlide(0);
startCarousel();

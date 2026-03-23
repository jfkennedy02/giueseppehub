// Initialize Lucide Icons
lucide.createIcons();

// Current Year for Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass', 'py-4', 'border-b', 'border-white/10');
        navbar.classList.remove('py-6');
    } else {
        navbar.classList.remove('glass', 'py-4', 'border-b', 'border-white/10');
        navbar.classList.add('py-6');
    }

    // Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});

// Mobile Menu Logic
const menuToggle = document.getElementById('mobile-menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => mobileMenu.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    setTimeout(() => mobileMenu.classList.add('hidden'), 500);
    document.body.style.overflow = 'auto';
}

menuToggle.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// GSAP Animations
// Hero Animations
const heroTL = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

heroTL.from('.hero-content .reveal-text', {
    y: 100,
    opacity: 0,
    stagger: 0.15,
})
    .from('.floating-ui', {
        scale: 0,
        opacity: 0,
        stagger: 0.4
    }, "-=0.8");

// Scroll Reveal Animations
const revealConfigs = [
    { selector: '.reveal-left', x: -100, opacity: 0 },
    { selector: '.reveal-right', x: 100, opacity: 0 },
    { selector: '.reveal-scale', scale: 0.8, opacity: 0 },
    { selector: '.reveal-text', y: 30, opacity: 0 }
];

revealConfigs.forEach(config => {
    gsap.utils.toArray(config.selector).forEach(el => {
        gsap.from(el, {
            ...config,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
});

// Services Grid Cascade
gsap.from('.service-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
        trigger: '#services-grid',
        start: 'top 80%',
    }
});

// Why Us Items Cascade
gsap.from('.benefit-item', {
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '#why-us',
        start: 'top 80%',
    }
});

// Smooth Scroll (Optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

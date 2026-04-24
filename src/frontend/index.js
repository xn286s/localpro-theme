import './index.scss';

document.addEventListener("DOMContentLoaded", function () {

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!("IntersectionObserver" in window)) {
        // fallback — just run immediately
        reveals.forEach(el => el.classList.add('is-visible'));

        return;
    }

    const scrollRevealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    scrollRevealObserver.unobserve(entry.target); // animate once
                }
            });
        },
        {
            threshold: 0.1,   // trigger when 10% visible
            rootMargin: '0px 0px -40px 0px', // slight bottom offset
        }
    );

    reveals.forEach((el) => scrollRevealObserver.observe(el));

    // Number Counter
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {
        // fallback — just run immediately
        counters.forEach(startCounter);
        return;
    }

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                obs.unobserve(entry.target); // run once
            }
        });
    }, {
        threshold: 0.5 // triggers when 50% visible
    });

    counters.forEach(counter => counterObserver.observe(counter));

    function startCounter(counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 1600;
        const startTime = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = Math.floor(target * eased);

            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // Header hide on scroll
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            header.style.position = 'sticky';
            header.style.top = '0';
            header.style.transform = 'translateY(-100%)'; // Scrolling down — hide header
        } else {
            header.style.transform = 'translateY(0)'; // Scrolling up — reveal header
        }

        lastScrollY = currentScrollY;
    });
});
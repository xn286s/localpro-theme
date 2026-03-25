document.addEventListener("DOMContentLoaded", function () {
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
});
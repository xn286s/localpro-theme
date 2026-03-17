document.addEventListener("DOMContentLoaded", function () {

    // Counter animation
    const counters = document.querySelectorAll(".counter");

    if (!("IntersectionObserver" in window)) {
        // fallback — just run immediately
        counters.forEach(startCounter);
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                obs.unobserve(entry.target); // run once
            }
        });
    }, {
        threshold: 0.4 // triggers when 40% visible
    });

    counters.forEach(counter => observer.observe(counter));

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

    // Entry Animations
    const reveal = document.querySelectorAll(".wp-block-heading, p, .reveal");

    if (!("IntersectionObserver" in window)) {
        reveal.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target); // run once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px" // triggers slightly before fully in view
    });

    reveal.forEach(el => revealObserver.observe(el));
});
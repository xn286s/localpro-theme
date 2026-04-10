/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/index.scss"
/*!*********************************!*\
  !*** ./src/frontend/index.scss ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/frontend/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/frontend/index.scss");

document.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  if (!("IntersectionObserver" in window)) {
    // fallback — just run immediately
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const scrollRevealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollRevealObserver.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.1,
    // trigger when 10% visible
    rootMargin: '0px 0px -40px 0px' // slight bottom offset
  });
  reveals.forEach(el => scrollRevealObserver.observe(el));

  // Counter
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
    threshold: 0.4 // triggers when 40% visible
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
  const header = document.querySelector('header'); // adjust selector as needed
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      // Scrolling down — hide header
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up — reveal header
      header.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  });
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
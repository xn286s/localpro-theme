/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shape-divider/edit.js"
/*!***********************************!*\
  !*** ./src/shape-divider/edit.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/shape-divider/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






const SHAPE_OPTIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Wave', 'localpro-shape-divider'),
  value: 'wave'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Curve', 'localpro-shape-divider'),
  value: 'curve'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Slant', 'localpro-shape-divider'),
  value: 'slant'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Triangle', 'localpro-shape-divider'),
  value: 'triangle'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arrow', 'localpro-shape-divider'),
  value: 'arrow'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Zigzag', 'localpro-shape-divider'),
  value: 'zigzag'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tilt', 'localpro-shape-divider'),
  value: 'tilt'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Mountains', 'localpro-shape-divider'),
  value: 'mountains'
}];
function generatePath(shape, offset, width, height) {
  const w = width;
  const h = height;
  const o = offset / 100 * w;
  switch (shape) {
    case 'wave':
      {
        const cp1x = o * 0.5;
        const cp2x = o;
        const cp3x = o + (w - o) * 0.5;
        return `M0 ${h} L0 ${h * 0.4} Q${cp1x} 0 ${cp2x} ${h * 0.5} Q${cp3x} ${h} ${w} ${h * 0.3} L${w} ${h} Z`;
      }
    case 'curve':
      {
        return `M0 ${h} L0 ${h * 0.6} Q${o} ${-h * 0.2} ${w} ${h * 0.6} L${w} ${h} Z`;
      }
    case 'slant':
      {
        const slantY = offset / 100 * h;
        return `M0 ${h} L0 ${slantY} L${w} ${h - slantY} L${w} ${h} Z`;
      }
    case 'triangle':
      {
        return `M0 ${h} L${o} 0 L${w} ${h} Z`;
      }
    case 'arrow':
      {
        const arrowW = w * 0.08;
        return `M0 ${h} L${o - arrowW} ${h} L${o} 0 L${o + arrowW} ${h} L${w} ${h} L${o} ${h * 0.35} Z`;
      }
    case 'zigzag':
      {
        const segments = 12;
        const segW = w / segments;
        const amplitude = h * 0.7;
        const baseY = h;
        const startOffset = (offset - 50) / 100 * segW;
        let d = `M0 ${baseY}`;
        for (let i = 0; i <= segments; i++) {
          const x = i * segW + startOffset;
          const y = i % 2 === 0 ? baseY - amplitude : baseY;
          d += ` L${Math.max(0, Math.min(w, x))} ${y}`;
        }
        d += ` L${w} ${baseY} Z`;
        return d;
      }
    case 'tilt':
      {
        const tiltH = offset / 100 * h * 0.9;
        return `M0 ${h} L0 ${tiltH} L${w} ${h - tiltH} L${w} ${h} Z`;
      }
    case 'mountains':
      {
        const p1 = o * 0.4;
        const p2 = o * 0.8;
        const p3 = o;
        const p4 = o + (w - o) * 0.3;
        const p5 = o + (w - o) * 0.65;
        return `M0 ${h} L0 ${h * 0.7} L${p1} ${h * 0.3} L${p2} ${h * 0.55} L${p3} ${h * 0.1} L${p4} ${h * 0.5} L${p5} ${h * 0.25} L${w} ${h * 0.6} L${w} ${h} Z`;
      }
    default:
      return `M0 ${h} L0 0 Q${o} ${h} ${w} 0 L${w} ${h} Z`;
  }
}
function Edit({
  attributes,
  setAttributes
}) {
  const {
    shape,
    offset,
    position,
    height,
    color,
    flip
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: `shape-divider-position-${position}`
  });
  const svgStyle = {
    display: 'block',
    width: '100%',
    height: `${height}px`,
    transform: flip ? 'scaleY(-1)' : 'none'
  };
  const path = generatePath(shape, offset, 1200, 100);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Shape Settings', 'localpro-shape-divider'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Shape', 'localpro-shape-divider'),
          value: shape,
          options: SHAPE_OPTIONS,
          onChange: value => setAttributes({
            shape: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Offset', 'localpro-shape-divider'),
          value: offset,
          onChange: value => setAttributes({
            offset: value
          }),
          min: 0,
          max: 100,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Shifts the shape focal point horizontally.', 'localpro-shape-divider')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position', 'localpro-shape-divider'),
          value: position,
          options: [{
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'localpro-shape-divider'),
            value: 'top'
          }, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'localpro-shape-divider'),
            value: 'bottom'
          }],
          onChange: value => setAttributes({
            position: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Height (px)', 'localpro-shape-divider'),
          value: height,
          onChange: value => setAttributes({
            height: value
          }),
          min: 20,
          max: 300
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Flip Vertically', 'localpro-shape-divider'),
          checked: flip,
          onChange: value => setAttributes({
            flip: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'localpro-shape-divider'),
        initialOpen: true,
        colorSettings: [{
          value: color,
          onChange: val => setAttributes({
            color: val || ''
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'localpro-shape-divider')
        }]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1200 100",
        preserveAspectRatio: "none",
        style: svgStyle,
        "aria-hidden": "true",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("path", {
          d: path,
          fill: color
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/shape-divider/save.js"
/*!***********************************!*\
  !*** ./src/shape-divider/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function generatePath(shape, offset, width, height) {
  const w = width;
  const h = height;
  const o = offset / 100 * w;
  switch (shape) {
    case 'wave':
      {
        const cp1x = o * 0.5;
        const cp2x = o;
        const cp3x = o + (w - o) * 0.5;
        return `M0 ${h} L0 ${h * 0.4} Q${cp1x} 0 ${cp2x} ${h * 0.5} Q${cp3x} ${h} ${w} ${h * 0.3} L${w} ${h} Z`;
      }
    case 'curve':
      {
        return `M0 ${h} L0 ${h * 0.6} Q${o} ${-h * 0.2} ${w} ${h * 0.6} L${w} ${h} Z`;
      }
    case 'slant':
      {
        const slantY = offset / 100 * h;
        return `M0 ${h} L0 ${slantY} L${w} ${h - slantY} L${w} ${h} Z`;
      }
    case 'triangle':
      {
        return `M0 ${h} L${o} 0 L${w} ${h} Z`;
      }
    case 'arrow':
      {
        const arrowW = w * 0.08;
        return `M0 ${h} L${o - arrowW} ${h} L${o} 0 L${o + arrowW} ${h} L${w} ${h} L${o} ${h * 0.35} Z`;
      }
    case 'zigzag':
      {
        const segments = 12;
        const segW = w / segments;
        const amplitude = h * 0.7;
        const baseY = h;
        const startOffset = (offset - 50) / 100 * segW;
        let d = `M0 ${baseY}`;
        for (let i = 0; i <= segments; i++) {
          const x = i * segW + startOffset;
          const y = i % 2 === 0 ? baseY - amplitude : baseY;
          d += ` L${Math.max(0, Math.min(w, x))} ${y}`;
        }
        d += ` L${w} ${baseY} Z`;
        return d;
      }
    case 'tilt':
      {
        const tiltH = offset / 100 * h * 0.9;
        return `M0 ${h} L0 ${tiltH} L${w} ${h - tiltH} L${w} ${h} Z`;
      }
    case 'mountains':
      {
        const p1 = o * 0.4;
        const p2 = o * 0.8;
        const p3 = o;
        const p4 = o + (w - o) * 0.3;
        const p5 = o + (w - o) * 0.65;
        return `M0 ${h} L0 ${h * 0.7} L${p1} ${h * 0.3} L${p2} ${h * 0.55} L${p3} ${h * 0.1} L${p4} ${h * 0.5} L${p5} ${h * 0.25} L${w} ${h * 0.6} L${w} ${h} Z`;
      }
    default:
      return `M0 ${h} L0 0 Q${o} ${h} ${w} 0 L${w} ${h} Z`;
  }
}
function save({
  attributes
}) {
  const {
    shape,
    offset,
    position,
    height,
    color,
    flip
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: `shape-divider-position-${position}`
  });
  const path = generatePath(shape, offset, 1200, 100);
  const svgStyle = {
    display: 'block',
    width: '100%',
    height: `${height}px`,
    transform: flip ? 'scaleY(-1)' : 'none'
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...blockProps,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1200 100",
      preserveAspectRatio: "none",
      style: svgStyle,
      "aria-hidden": "true",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
        d: path,
        fill: color
      })
    })
  });
}

/***/ },

/***/ "./src/shape-divider/editor.scss"
/*!***************************************!*\
  !*** ./src/shape-divider/editor.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/shape-divider/block.json"
/*!**************************************!*\
  !*** ./src/shape-divider/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"localpro/shape-divider","title":"Shape Divider Block","category":"design","icon":"art","description":"A decorative SVG shape divider block with multiple shapes, offset, position, height, color, and flip controls.","example":{"attributes":{"shape":"wave","offset":50,"position":"bottom","height":80,"color":"#0073aa","flip":false}},"attributes":{"shape":{"type":"string","default":"wave"},"offset":{"type":"number","default":50},"position":{"type":"string","default":"bottom"},"height":{"type":"number","default":80},"color":{"type":"string","default":"#1e1e1e"},"flip":{"type":"boolean","default":false}},"supports":{"html":false,"align":["full","wide"],"spacing":{"margin":true}},"textdomain":"telex-shape-divider","editorScript":"file:./index.js","editorStyle":"file:./index.css"}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/*!************************************!*\
  !*** ./src/shape-divider/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/shape-divider/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/shape-divider/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/shape-divider/block.json");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
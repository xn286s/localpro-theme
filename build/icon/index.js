/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/icon/edit.js"
/*!**************************!*\
  !*** ./src/icon/edit.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons.json */ "./src/icon/icons.json");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/icon/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const ICON_CATEGORIES = Object.keys(_icons_json__WEBPACK_IMPORTED_MODULE_4__);
const MATERIAL_ICONS = Object.values(_icons_json__WEBPACK_IMPORTED_MODULE_4__).flat();
const DEFAULT_ICON_SIZE = '48';
function Edit({
  attributes,
  setAttributes
}) {
  const {
    selectedIcon,
    iconSize,
    iconColor
  } = attributes;
  const defaultSize = iconSize ? iconSize : DEFAULT_ICON_SIZE;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    style: {
      textAlign: 'center'
    }
  });
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [category, setCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const categoryOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('All Categories', 'localpro-icon-picker'),
    value: ''
  }, ...ICON_CATEGORIES.map(cat => ({
    label: cat,
    value: cat
  }))];
  let filteredIcons;
  if (search) {
    filteredIcons = MATERIAL_ICONS.filter(icon => icon.toLowerCase().includes(search.toLowerCase()));
  } else if (category) {
    filteredIcons = _icons_json__WEBPACK_IMPORTED_MODULE_4__[category] || [];
  } else {
    filteredIcons = MATERIAL_ICONS;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Size', 'localpro-icon-picker'),
        initialOpen: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FontSizePicker, {
          fontSizes: (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useSettings)('typography.fontSizes') || [],
          value: iconSize,
          onChange: val => setAttributes({
            iconSize: val || ''
          }),
          fallbackFontSize: DEFAULT_ICON_SIZE,
          withReset: true
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Color', 'localpro-icon-picker'),
        initialOpen: true,
        colorSettings: [{
          value: iconColor,
          onChange: value => setAttributes({
            iconColor: value || ''
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Color', 'localpro-icon-picker')
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Choose Icon', 'localpro-icon-picker'),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Search icons...', 'localpro-icon-picker'),
          value: search,
          onChange: val => {
            setSearch(val);
            if (val) {
              setCategory('');
            }
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          value: category,
          options: categoryOptions,
          onChange: val => {
            setCategory(val);
            if (val) {
              setSearch('');
            }
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "localpro-icon-picker-grid",
          children: [filteredIcons.map(icon => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
            text: icon,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              className: 'localpro-icon-picker-grid__item' + (selectedIcon === icon ? ' is-selected' : ''),
              onClick: () => setAttributes({
                selectedIcon: icon
              }),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                className: "material-icons",
                style: {
                  fontSize: '24px'
                },
                children: icon
              })
            })
          }, icon)), filteredIcons.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "localpro-icon-picker-grid__empty",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No icons found.', 'localpro-icon-picker')
          })]
        })]
      })]
    }), blockProps['data-title'] === 'Icon' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "material-symbols-outlined",
        style: {
          fontSize: iconSize,
          color: iconColor || undefined,
          lineHeight: 1
        },
        children: selectedIcon
      })
    })]
  });
}

/***/ },

/***/ "./src/icon/index.js"
/*!***************************!*\
  !*** ./src/icon/index.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/icon/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/icon/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/icon/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/icon/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/icon/save.js"
/*!**************************!*\
  !*** ./src/icon/save.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const DEFAULT_ICON_SIZE = 48;
function save({
  attributes
}) {
  const {
    selectedIcon,
    iconSize,
    iconColor
  } = attributes;
  const computedSize = iconSize ? iconSize : DEFAULT_ICON_SIZE + 'px';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
      style: {
        textAlign: 'center'
      }
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
      className: "material-icons",
      style: {
        fontSize: computedSize,
        color: iconColor || undefined,
        lineHeight: 1
      },
      children: selectedIcon
    })
  });
}

/***/ },

/***/ "./src/icon/editor.scss"
/*!******************************!*\
  !*** ./src/icon/editor.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/icon/style.scss"
/*!*****************************!*\
  !*** ./src/icon/style.scss ***!
  \*****************************/
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

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/icon/block.json"
/*!*****************************!*\
  !*** ./src/icon/block.json ***!
  \*****************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"localpro/icon","version":"0.1.0","title":"Icon","category":"text","icon":"superhero-alt","description":"Insert Google Material Icons with a searchable picker, customizable size and color.","example":{"attributes":{"selectedIcon":"home","iconSize":"48px","iconColor":"var(--wp--preset--color--primary)"}},"attributes":{"selectedIcon":{"type":"string","default":"home"},"iconSize":{"type":"string","default":"48px"},"iconColor":{"type":"string","default":"var(--wp--preset--color--primary)"}},"supports":{"html":true,"align":true,"spacing":{"margin":true,"padding":true}},"textdomain":"localpro","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ },

/***/ "./src/icon/icons.json"
/*!*****************************!*\
  !*** ./src/icon/icons.json ***!
  \*****************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"Checkmarks & Done":["check","check_circle","check_circle_outline","check_box","done","done_all","done_outline","task_alt","verified","verified_user","fact_check","playlist_add_check","assignment_turned_in","offline_pin","how_to_reg"],"Arrows & Navigation":["arrow_right","arrow_right_alt","arrow_forward","arrow_forward_ios","chevron_right","double_arrow","east","trending_flat","trending_up","trending_down","subdirectory_arrow_right","play_arrow","skip_next","redo","shortcut","north_east","south_east","keyboard_arrow_right","last_page","navigate_next","read_more","send"],"Stars & Ratings":["star","star_border","star_half","star_outline","grade","stars","auto_awesome","military_tech","workspace_premium","emoji_events","diamond","loyalty"],"Hearts & Favorites":["favorite","favorite_border","heart_broken","volunteer_activism","thumb_up","thumb_up_off_alt","thumb_down","thumb_down_off_alt","sentiment_satisfied","sentiment_very_satisfied","mood","recommend"],"Shapes & Bullets":["circle","radio_button_checked","radio_button_unchecked","fiber_manual_record","lens","panorama_fish_eye","square","crop_square","stop","change_history","remove","horizontal_rule","minimize","adjust","brightness_1","trip_origin","hexagon","pentagon"],"Status & Alerts":["error","error_outline","warning","warning_amber","info","info_outline","help","help_outline","report","report_problem","notification_important","priority_high","new_releases","cancel","block","do_not_disturb","dangerous","crisis_alert"],"Add & Remove":["add","add_circle","add_circle_outline","add_box","remove","remove_circle","remove_circle_outline","close","not_interested","highlight_off"],"Pins, Flags & Labels":["push_pin","flag","outlined_flag","tour","bookmark","bookmark_border","bookmarks","label","label_important","turned_in","turned_in_not","sell","local_offer","style","new_label"],"Light & Energy":["bolt","flash_on","flash_off","electric_bolt","lightbulb","lightbulb_outline","emoji_objects","highlight","tungsten","tips_and_updates","auto_fix_high"],"Nature & Weather":["eco","park","spa","local_florist","grass","forest","yard","energy_savings_leaf","water_drop","ac_unit","wb_sunny","brightness_5","cloud","thunderstorm","air","waves"],"People & Hands":["person","people","groups","face","pets","accessibility_new","waving_hand","front_hand","back_hand","handshake","self_improvement","directions_run","directions_walk"],"Communication":["chat","chat_bubble","chat_bubble_outline","forum","comment","mode_comment","textsms","campaign","notifications","notifications_active","mark_email_read","mail","call","ring_volume"],"Objects & Tools":["build","construction","handyman","hardware","key","vpn_key","lock","lock_open","settings","tune","science","biotech","palette","brush","create","edit","delete","inventory","token","savings","attach_money","paid","monetization_on","shopping_cart","shopping_bag","local_shipping","rocket_launch","rocket"],"Media & Files":["image","photo_camera","videocam","music_note","headphones","mic","volume_up","movie","article","description","folder","attachment","link","insert_drive_file"],"Places & Maps":["place","location_on","near_me","explore","public","language","map","my_location","navigation","home","apartment","store","restaurant","local_cafe","local_hospital","school","church","castle"],"Time & Calendar":["schedule","access_time","timer","hourglass_empty","hourglass_full","update","history","event","today","date_range","calendar_month","alarm","alarm_on"],"Security & Privacy":["security","shield","gpp_good","gpp_bad","gpp_maybe","admin_panel_settings","policy","privacy_tip","health_and_safety","local_police","visibility","visibility_off"],"Miscellaneous":["local_fire_department","whatshot","celebration","cake","redeem","card_giftcard","extension","toys","smart_toy","bug_report","code","terminal","data_object","hub","share","qr_code","fingerprint","psychology","fitness_center","sports_esports","emoji_food_beverage","coffee","local_dining","set_meal","fastfood"]}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"icon/index": 0,
/******/ 			"icon/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunklocalpro"] = globalThis["webpackChunklocalpro"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["icon/style-index"], () => (__webpack_require__("./src/icon/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
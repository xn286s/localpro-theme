/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor/iconpicker.js"
/*!**********************************!*\
  !*** ./src/editor/iconpicker.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IconPicker)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icons.json */ "./src/editor/icons.json");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/editor/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







const ICON_CATEGORIES = Object.keys(_icons_json__WEBPACK_IMPORTED_MODULE_4__);
const MATERIAL_ICONS = Object.values(_icons_json__WEBPACK_IMPORTED_MODULE_4__).flat();
const DEFAULT_ICON_SIZE = 4.8;
function IconPicker({
  attributes,
  setAttributes
}) {
  const {
    selectedIcon,
    iconSize,
    iconColor
  } = attributes;
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.PanelColorSettings, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Color', 'localpro-icon-picker'),
        initialOpen: false,
        colorSettings: [{
          value: iconColor,
          onChange: val => setAttributes({
            iconColor: val || 'var(--wp--preset--color--primary)'
          }),
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Color', 'localpro-icon-picker')
        }]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Size', 'localpro-icon-picker'),
        initialOpen: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
          __next40pxDefaultSize: true,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon Size', 'localpro-icon-picker'),
          initialOpen: false,
          value: iconSize,
          currentInput: DEFAULT_ICON_SIZE,
          allowReset: true,
          resetFallbackValue: DEFAULT_ICON_SIZE,
          onChange: val => setAttributes({
            iconSize: `${val}em`
          }),
          type: "stepper",
          min: 2,
          max: 6,
          step: 0.2,
          withInputField: true,
          showTooltip: true
        })
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
              onClick: () => {
                console.log(attributes);
                setAttributes({
                  selectedIcon: icon || 'circle'
                });
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                className: "material-symbols-outlined",
                style: {
                  fontSize: '2.4rem'
                },
                children: icon
              })
            })
          }, icon)), filteredIcons.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
            className: "localpro-icon-picker-grid__empty",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('No icons found.', 'localpro-icon-picker')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          isDestructive: true,
          variant: "tertiary",
          onClick: () => setAttributes({
            selectedIcon: 'circle'
          }),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear', 'localpro-icon-picker')
        })]
      })]
    })
  });
}

/***/ },

/***/ "./src/editor/list.js"
/*!****************************!*\
  !*** ./src/editor/list.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _iconpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./iconpicker */ "./src/editor/iconpicker.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






// Inject the icon attributes into core/list's schema

(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.registerBlockType', 'localpro/icon-list-attributes', (settings, name) => {
  if (name !== 'core/list') {
    return settings;
  }
  // console.log('test: blocks.getBlockType', { settings, name });
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      selectedIcon: {
        type: 'string',
        default: `'check'`
      },
      iconSize: {
        type: 'string',
        default: '1.75em'
      },
      iconColor: {
        type: 'string',
        default: `'var(--wp--preset--color--primary)'`
      }
    }
  };
});

// Register the variation
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)('core/list', {
  name: 'icon-list',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Icon List', 'localpro'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('A list with a custom icon marker.', 'localpro'),
  icon: 'star-filled',
  isDefault: true,
  scope: ['inserter', 'transform'],
  // Seed the custom attributes with defaults
  attributes: {
    className: 'is-style-icon-list',
    selectedIcon: `'check'`,
    iconSize: '1.75em',
    iconColor: 'var(--wp--preset--color--primary)'
  },
  // Makes the "Is variation?" check reliable
  isActive: blockAttributes => blockAttributes.className?.includes('is-style-icon-list')
});

// Inject inspector controls — only when the variation is active
const iconPickerControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Early return if the variation is not active
    if (props.name !== 'core/list') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
        ...props
      });
    }
    ;
    const {
      attributes,
      setAttributes
    } = props;

    // console.log('TEST: block.BlockEdit', props);

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_iconpicker__WEBPACK_IMPORTED_MODULE_4__["default"], {
        attributes: attributes,
        setAttributes: setAttributes
      })]
    });
  };
}, 'iconPickerControls');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockEdit', 'localpro/icon-picker-controls', iconPickerControls);

// Show new wrapperProps.style as it is being edited
const iconListProps = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_0__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    // Early return if the variation is not active
    if (props.name !== 'core/list' && props.attributes.className !== 'is-style-icon-list') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
        ...props
      });
    }
    ;
    const {
      attributes
    } = props;
    const {
      iconSize,
      iconColor,
      selectedIcon
    } = attributes;
    // console.log('TEST: block.BlockList', props);

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(BlockListBlock, {
      ...props,
      wrapperProps: {
        ...(props.wrapperProps || {}),
        style: {
          ...(props.wrapperProps?.style || {}),
          '--icon': `'${selectedIcon}'`,
          '--icon-color': iconColor,
          '--icon-size': iconSize
        }
      }
    });
  };
}, 'iconListProps');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('editor.BlockListBlock', 'localpro/icon-list-save-props', iconListProps);

// Pass custom attributes into the saved block's wrapper props so they're accessible in CSS / frontend JS
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('blocks.getSaveContent.extraProps', 'localpro-list/save-icon-props', (extraProps, blockType, attributes) => {
  const {
    iconSize,
    iconColor,
    selectedIcon
  } = attributes;

  // Early return if the variation is not active
  if (blockType.name !== 'core/list' && attributes.className !== 'is-style-icon-list') {
    return extraProps;
  }
  ;
  // console.log('TEST: blocks.getSaveContent.extraProps', 'attributes:', { extraProps, blockType, attributes });

  extraProps.style = {
    ...(extraProps.style || {}),
    '--icon': `'${selectedIcon}'`,
    '--icon-color': iconColor,
    '--icon-size': iconSize
  };
  return extraProps;
});

/***/ },

/***/ "./src/editor/reveal.js"
/*!******************************!*\
  !*** ./src/editor/reveal.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const DELAY_OPTIONS = [{
  label: 'None',
  value: '0'
}, {
  label: '200ms',
  value: '1'
}, {
  label: '400ms',
  value: '2'
}, {
  label: '600ms',
  value: '3'
}, {
  label: '800ms',
  value: '4'
}];
const addControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Early return if not a core block to avoid third party conflicts
    if (!props.name.startsWith('core/')) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    });
    const {
      attributes,
      setAttributes
    } = props;
    const {
      className = ''
    } = attributes;
    // const { hasReveal, revealDelay, className } = attributes;

    const classes = className.split(' ');
    const hasReveal = classes.includes('reveal');
    const hasDelay = className.match(/delay-(\d)/);
    const revealDelay = hasDelay ? parseInt(hasDelay[1]) : '';
    const toggleReveal = val => {
      let updated = className.split(' ').filter(c => c !== 'reveal' && !/^delay-\d$/.test(c));
      if (val) {
        updated.push('reveal');
        if (revealDelay > 0) updated.push(`delay-${revealDelay}`);
      }
      setAttributes({
        // hasReveal: val,
        className: updated.filter(Boolean).join(' ')
      });
    };
    const updateDelay = val => {
      const index = parseInt(val);
      let updated = className.split(' ').filter(c => !/^delay-\d$/.test(c));
      if (index > 0) updated.push(`delay-${index}`);
      setAttributes({
        // revealDelay: index,
        className: updated.filter(Boolean).join(' ')
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: "Reveal Animation",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: "Enable scroll reveal",
            checked: !!hasReveal,
            onChange: toggleReveal
          }), hasReveal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
            label: "Entrance delay",
            value: String(revealDelay),
            options: DELAY_OPTIONS,
            onChange: updateDelay
          })]
        })
      })]
    });
  };
}, 'addControls');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('editor.BlockEdit', 'localpro-reveal/add-controls', addControls);

// addFilter(
//     'blocks.getSaveContent.extraProps',
//     'localpro-reveal/apply-classes',
//     (extraProps, attributes) => {
//         const classes = [];

//         if (attributes.hasReveal) {
//             classes.push('reveal');
//             if (attributes.revealDelay > 0) {
//                 classes.push(`delay-${attributes.revealDelay}`);
//             }
//         }

//         if (!classes.length) return extraProps;

//         return {
//             ...extraProps,
//             className: [extraProps.className, ...classes]
//                 .filter(Boolean)
//                 .join(' '),
//         };
//     }
// );

/***/ },

/***/ "./src/editor/section.js"
/*!*******************************!*\
  !*** ./src/editor/section.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)('core/cover', {
  name: 'section',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Section Cover', 'localpro'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A cover block with a preselected semantic <section> tag, pre-populated with a columns block.', 'localpro'),
  icon: 'layout',
  isDefault: false,
  category: 'design',
  // Pre-fill attributes so the block opens ready-to-go.
  attributes: {
    tagName: 'section',
    className: 'is-style-section'
  },
  innerBlocks: [{
    name: 'core/columns'
  }],
  supports: {
    allowedBlocks: false,
    layout: {
      allowSizingOnChildren: true
    }
  },
  allowedBlocks: ['core/columns'],
  // Allow only columns.
  isActive: blockAttributes => blockAttributes.tagName === 'section' // Mark a saved block as this variation when tagName === 'section'.
});
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockVariation)('core/group', {
  name: 'section',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Section Group', 'localpro'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A group block with a preselected semantic <section> tag, pre-populated with a columns block.', 'localpro'),
  icon: 'layout',
  isDefault: false,
  category: 'design',
  // Pre-fill attributes so the block opens ready-to-go.
  attributes: {
    tagName: 'section',
    className: 'is-style-section'
  },
  innerBlocks: [{
    name: 'core/columns'
  }],
  supports: {
    allowedBlocks: false,
    layout: {
      allowSizingOnChildren: true
    }
  },
  allowedBlocks: ['core/columns'],
  // Allow only columns.
  isActive: blockAttributes => blockAttributes.tagName === 'section' // Mark a saved block as this variation when tagName === 'section'.
});

/***/ },

/***/ "./src/editor/sticky.js"
/*!******************************!*\
  !*** ./src/editor/sticky.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const withStickyControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    // Early return if not a core block to avoid third party conflicts
    if (!props.name.startsWith('core/')) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    });
    const {
      attributes,
      setAttributes
    } = props;
    const {
      className = ''
    } = attributes;
    const classes = className.split(' ');
    let hasSticky = classes.includes('is-sticky');
    const toggleSticky = val => {
      let updated = className.split(' ').filter(c => c !== 'is-sticky');
      if (val) updated.push('is-sticky');
      setAttributes({
        className: updated.filter(Boolean).join(' ')
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
          title: "Sticky Position",
          initialOpen: false,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            label: "Enable sticky when scrolling",
            checked: !!hasSticky,
            onChange: toggleSticky
          })
        })
      })]
    });
  };
}, 'withStickyControls');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_3__.addFilter)('editor.BlockEdit', 'localpro-sticky/add-controls', withStickyControls);

/***/ },

/***/ "./src/editor/editor.scss"
/*!********************************!*\
  !*** ./src/editor/editor.scss ***!
  \********************************/
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

/***/ "@wordpress/compose"
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["compose"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/hooks"
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
(module) {

module.exports = window["wp"]["hooks"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/editor/icons.json"
/*!*******************************!*\
  !*** ./src/editor/icons.json ***!
  \*******************************/
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
/*!*****************************!*\
  !*** ./src/editor/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.scss */ "./src/editor/editor.scss");
/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./section */ "./src/editor/section.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src/editor/list.js");
/* harmony import */ var _reveal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reveal */ "./src/editor/reveal.js");
/* harmony import */ var _sticky__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sticky */ "./src/editor/sticky.js");





})();

/******/ })()
;
//# sourceMappingURL=index.js.map
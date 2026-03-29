import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import Edit from '../icon/edit';
import './list.scss';

// registerBlockVariation('core/list', {
//     name: 'localpro-list',
//     title: 'List',
//     attributes: {
//         selectedIcon: 'check',
//         iconSize: 24,
//         iconColor: 'var(--wp-preset--color--primary)',
//         className: ['localpro-list--material-icon', 'localpro-list--has-icon-color', 'localpro-list--has-icon-size']
//     },
//     isDefault: true
// });

addFilter('blocks.registerBlockType', 'localpro-list/add-attributes', (settings, name) => {
    if (name !== 'core/list') {
        return settings;
    }
    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            iconSize: {
                type: 'integer',
                default: '24',
            },
            iconColor: {
                type: 'string',
                default: 'var(--wp-preset--color--primary)',
            },
            selectedIcon: {
                type: 'string',
                default: 'circle',
            },
        },
    };
});

// List marker icon picker controls for core/list
const addIconPickerControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;

        // Early return if the block is not the List block
        if (name !== 'core/list') return <BlockEdit {...props} />;

        return (
            <>
                <BlockEdit {...props} />
                <Edit attributes={attributes} setAttributes={setAttributes} />
            </>
        );
    };
}, 'addIconPickerControls');
addFilter('editor.BlockEdit', 'localpro-list/add-icon-picker-controls', addIconPickerControls);

const addIconProps = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        const { name, attributes } = props;

        if (name !== 'core/list') return <BlockListBlock {...props} />;

        const { iconSize, iconColor, selectedIcon } = attributes;
        const extraClasses = [];
        const extraStyle = {};

        if (selectedIcon) {
            extraClasses.push('--has-icon');
            extraStyle['--list-icon'] = '"' + selectedIcon + '"';
        }

        if (iconColor) {
            extraClasses.push('--has-icon-color');
            extraStyle['--list-icon-color'] = iconColor;
        }

        if (iconSize) {
            extraClasses.push('--has-icon-size');
            extraStyle['--list-icon-size'] = iconSize;
        }

        if (!extraClasses.length) return <BlockListBlock {...props} />;

        const className = [props.className || '', ...extraClasses]
            .filter(Boolean)
            .join(' ');

        return (
            <BlockListBlock
                {...props}
                className={className}
                wrapperProps={{
                    ...(props.wrapperProps || {}),
                    style: {
                        ...(props.wrapperProps?.style || {}),
                        ...extraStyle,
                    },
                }}
            />
        );
    };
}, 'addIconProps');
addFilter('editor.BlockListBlock', 'localpro-list/add-icon-props', addIconProps);

// Save core/list icon props
addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro-list/save-icon-props',
    (extraProps, blockType, attributes) => {
        if (blockType.name !== 'core/list') return extraProps;

        const { iconSize, iconColor, selectedIcon } = attributes;

        if (selectedIcon) {
            extraProps.className = [extraProps.className || '', '--has-icon']
                .filter(Boolean)
                .join(' ');
            extraProps.style = {
                ...(extraProps.style || {}),
                '--list-icon': '"' + selectedIcon + '"',
            };
        }

        if (iconColor) {
            extraProps.className = [extraProps.className || '', '--has-icon-color']
                .filter(Boolean)
                .join(' ');
            extraProps.style = {
                ...(extraProps.style || {}),
                '--list-icon-color': iconColor,
            };
        }

        if (iconSize) {
            extraProps.className = [extraProps.className || '', '--has-icon-size']
                .filter(Boolean)
                .join(' ');
            extraProps.style = {
                ...(extraProps.style || {}),
                '--list-icon-size': iconSize + 'px',
            };
        }

        return extraProps;
    }
);
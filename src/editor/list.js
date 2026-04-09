import { createHigherOrderComponent } from '@wordpress/compose';
import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';

import { __ } from '@wordpress/i18n';
import IconPicker from './iconpicker';

// Inject the icon attributes into core/list's schema
addFilter(
    'blocks.registerBlockType',
    'localpro/icon-list-attributes',
    (settings, name) => {
        if (name !== 'core/list') { return settings; }
        // console.log('test: blocks.getBlockType', { settings, name });
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                selectedIcon: { type: 'string', default: `'check'` },
                iconSize: { type: 'string', default: '1.75em' },
                iconColor: { type: 'string', default: `'var(--wp--preset--color--primary)'` },
            },
        };
    });

// Register the variation
registerBlockVariation('core/list', {
    name: 'icon-list',
    title: __('Icon List', 'localpro'),
    description: __('A list with a custom icon marker.', 'localpro'),
    icon: 'star-filled',
    isDefault: true,
    scope: ['inserter', 'transform'],

    // Seed the custom attributes with defaults
    attributes: {
        className: 'is-style-icon-list',
        selectedIcon: `'check'`,
        iconSize: '1.75em',
        iconColor: 'var(--wp--preset--color--primary)',
    },

    // Makes the "Is variation?" check reliable
    isActive: (blockAttributes) => blockAttributes.className?.includes('is-style-icon-list'),
});

// Inject inspector controls — only when the variation is active
const iconPickerControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        // Early return if the variation is not active
        if (props.name !== 'core/list') { return <BlockEdit {...props} /> };

        const { attributes, setAttributes } = props;

        // console.log('TEST: block.BlockEdit', props);

        return (
            <>
                <BlockEdit {...props} />
                <IconPicker attributes={attributes} setAttributes={setAttributes} />
            </>
        );
    };
}, 'iconPickerControls');
addFilter('editor.BlockEdit', 'localpro/icon-picker-controls', iconPickerControls);

// Show new wrapperProps.style as it is being edited
const iconListProps = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {

        // Early return if the variation is not active
        if (props.name !== 'core/list' && props.attributes.className !== 'is-style-icon-list') { return <BlockListBlock {...props} /> };
        const { attributes } = props;
        const { iconSize, iconColor, selectedIcon } = attributes;
        // console.log('TEST: block.BlockList', props);

        return (
            <BlockListBlock {...props}
                wrapperProps={{
                    ...(props.wrapperProps || {}),
                    style: {
                        ...(props.wrapperProps?.style || {}),
                        '--icon': `'${selectedIcon}'`,
                        '--icon-color': iconColor,
                        '--icon-size': iconSize,
                    },
                }}
            />
        );
    };
}, 'iconListProps');
addFilter('editor.BlockListBlock', 'localpro/icon-list-save-props', iconListProps);

// Pass custom attributes into the saved block's wrapper props so they're accessible in CSS / frontend JS
addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro-list/save-icon-props',
    (extraProps, blockType, attributes) => {
        const { iconSize, iconColor, selectedIcon } = attributes;

        // Early return if the variation is not active
        if (blockType.name !== 'core/list' && attributes.className !== 'is-style-icon-list') { return extraProps };
        // console.log('TEST: blocks.getSaveContent.extraProps', 'attributes:', { extraProps, blockType, attributes });


        extraProps.style = {
            ...(extraProps.style || {}),
            '--icon': `'${selectedIcon}'`,
            '--icon-color': iconColor,
            '--icon-size': iconSize,
        }

        return extraProps;
    }
);
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockVariation('core/cover', {
    name: 'section',
    title: __('Section Cover', 'localpro'),
    description: __('A cover block with a preselected semantic <section> tag, pre-populated with a columns block.', 'localpro'),
    icon: 'layout',
    isDefault: false,
    category: 'design',
    // Pre-fill attributes so the block opens ready-to-go.
    attributes: {
        tagName: 'section',
        className: 'is-style-section',
    },
    innerBlocks: [
        {
            name: 'core/columns',
        },
    ],
    supports: {
        allowedBlocks: false,
        layout: {
            allowSizingOnChildren: true,
        },
    },
    allowedBlocks: ['core/columns'], // Allow only columns.
    isActive: (blockAttributes) => blockAttributes.tagName === 'section', // Mark a saved block as this variation when tagName === 'section'.
});


registerBlockVariation('core/group', {
    name: 'section',
    title: __('Section Group', 'localpro'),
    description: __('A group block with a preselected semantic <section> tag, pre-populated with a columns block.', 'localpro'),
    icon: 'layout',
    isDefault: false,
    category: 'design',
    // Pre-fill attributes so the block opens ready-to-go.
    attributes: {
        tagName: 'section',
        className: 'is-style-section',
    },
    innerBlocks: [
        {
            name: 'core/columns',
        },
    ],
    supports: {
        allowedBlocks: false,
        layout: {
            allowSizingOnChildren: true,
        },
    },
    allowedBlocks: ['core/columns'], // Allow only columns.
    isActive: (blockAttributes) => blockAttributes.tagName === 'section', // Mark a saved block as this variation when tagName === 'section'.
});
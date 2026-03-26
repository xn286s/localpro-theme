import { addFilter } from '@wordpress/hooks';

// core/list only
addFilter(
    'blocks.registerBlockType',
    'localpro-list/add-attributes',
    (settings, name) => {
        if (name !== 'core/list') return settings;
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                localproMarkerColor: { type: 'string', default: '' },
                localproMarkerIcon: { type: 'string', default: '' },
            },
        };
    }
);

// All core blocks
addFilter(
    'blocks.registerBlockType',
    'localpro/add-attributes',
    (settings, name) => {
        if (!name.startsWith('core/')) return settings;
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                hasReveal: { type: 'boolean', default: false },
                revealDelay: { type: 'integer', default: 0 },
                hasSticky: { type: 'boolean', default: false },
            },
        };
    }
);
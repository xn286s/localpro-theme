import { addFilter } from '@wordpress/hooks';

// Marker icon + color for core/list
addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro-list/save-props',
    (extraProps, blockType, attributes) => {
        if (blockType.name !== 'core/list') return extraProps;

        const { localproMarkerColor, localproMarkerIcon } = attributes;

        if (localproMarkerIcon) {
            extraProps.className = [extraProps.className || '', 'localpro-list--material-icon']
                .filter(Boolean)
                .join(' ');
            extraProps.style = {
                ...(extraProps.style || {}),
                '--localpro-marker-icon': '"' + localproMarkerIcon + '"',
            };
        }

        if (localproMarkerColor) {
            extraProps.className = [extraProps.className || '', 'localpro-list--has-marker-color']
                .filter(Boolean)
                .join(' ');
            extraProps.style = {
                ...(extraProps.style || {}),
                '--localpro-marker-color': localproMarkerColor,
            };
        }

        return extraProps;
    }
);

// Reveal + sticky for all blocks
addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro/apply-classes',
    (extraProps, blockType, attributes) => {
        const classes = [];

        if (attributes.hasReveal) {
            classes.push('reveal');
            if (attributes.revealDelay > 0) {
                classes.push(`delay-${attributes.revealDelay}`);
            }
        }

        if (attributes.hasSticky) {
            classes.push('is-sticky');
        }

        if (!classes.length) return extraProps;

        return {
            ...extraProps,
            className: [extraProps.className, ...classes]
                .filter(Boolean)
                .join(' '),
        };
    }
);
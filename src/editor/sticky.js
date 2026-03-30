import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

const addControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name, attributes, setAttributes } = props;

        // Early return if not a core block to avoid third party conflicts
        if (!name.startsWith('core/')) return <BlockEdit {...props} />;

        const { hasSticky, className = '' } = attributes;

        const toggleSticky = (val) => {
            let classes = className
                .split(' ')
                .filter((c) => c !== 'is-sticky');

            if (val) classes.push('is-sticky');

            setAttributes({
                hasSticky: val,
                className: classes.filter(Boolean).join(' '),
            });
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Sticky Scroll" initialOpen={false}>
                        <ToggleControl
                            label="Enable sticky position"
                            checked={!!hasSticky}
                            onChange={toggleSticky}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'addControls');
addFilter('editor.BlockEdit', 'localpro-sticky/add-controls', addControls);

addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro-sticky/apply-classes',
    (extraProps, attributes) => {
        const classes = [];

        if (attributes.hasSticky) classes.push('is-sticky');

        if (!classes.length) return extraProps;

        return {
            ...extraProps,
            className: [extraProps.className, ...classes]
                .filter(Boolean)
                .join(' '),
        };
    }
);
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

const withStickyControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {

        // Early return if not a core block to avoid third party conflicts
        if (!props.name.startsWith('core/')) return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { className = '' } = attributes;

        const classes = className.split(' ');
        let hasSticky = classes.includes('is-sticky');

        const toggleSticky = (val) => {
            let updated = className
                .split(' ')
                .filter((c) => c !== 'is-sticky');

            if (val) updated.push('is-sticky');

            setAttributes({ className: updated.filter(Boolean).join(' ') });
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Sticky Position" initialOpen={false}>
                        <ToggleControl
                            label="Enable sticky when scrolling"
                            checked={!!hasSticky}
                            onChange={toggleSticky}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'withStickyControls');
addFilter('editor.BlockEdit', 'localpro-sticky/add-controls', withStickyControls);
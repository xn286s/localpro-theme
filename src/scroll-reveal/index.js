const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;
const { Fragment } = wp.element;

const DELAY_OPTIONS = [
    { label: 'None', value: '0' },
    { label: '200ms', value: '1' },
    { label: '400ms', value: '2' },
    { label: '600ms', value: '3' },
    { label: '800ms', value: '4' },
];

// 1. Register custom attributes on every block
addFilter(
    'blocks.registerBlockType',
    'scroll-reveal/add-attributes',
    (settings) => {
        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                hasReveal: { type: 'boolean', default: false },
                revealDelay: { type: 'integer', default: 0 },
            },
        };
    }
);

// 2. Add Inspector controls to the editor sidebar
const withRevealControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { attributes, setAttributes } = props;
        const { hasReveal, revealDelay } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Scroll Reveal Animation" initialOpen={false}>
                        <ToggleControl
                            label="Enable scroll reveal"
                            checked={!!hasReveal}
                            onChange={(val) => setAttributes({ hasReveal: val })}
                        />
                        {hasReveal && (
                            <SelectControl
                                label="Entrance delay"
                                value={String(revealDelay)}
                                options={DELAY_OPTIONS}
                                onChange={(val) => setAttributes({ revealDelay: parseInt(val) })}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withRevealControls');

addFilter(
    'editor.BlockEdit',
    'scroll-reveal/with-controls',
    withRevealControls
);

// 3. Apply classes to static block save output
addFilter(
    'blocks.getSaveContent.extraProps',
    'scroll-reveal/apply-classes',
    (extraProps, blockType, attributes) => {
        if (!attributes.hasReveal) return extraProps;

        const classes = ['reveal'];
        if (attributes.revealDelay > 0) {
            classes.push(`delay-${attributes.revealDelay}`);
        }

        return {
            ...extraProps,
            className: [extraProps.className, ...classes]
                .filter(Boolean)
                .join(' '),
        };
    }
);
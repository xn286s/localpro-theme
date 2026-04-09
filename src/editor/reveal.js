import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

const DELAY_OPTIONS = [
    { label: 'None', value: '0' },
    { label: '200ms', value: '1' },
    { label: '400ms', value: '2' },
    { label: '600ms', value: '3' },
    { label: '800ms', value: '4' },
];

const addControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {

        // Early return if not a core block to avoid third party conflicts
        if (!props.name.startsWith('core/')) return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { className = '' } = attributes;
        // const { hasReveal, revealDelay, className } = attributes;

        const classes = className.split(' ');
        const hasReveal = classes.includes('reveal');
        const hasDelay = className.match(/delay-(\d)/);
        const revealDelay = hasDelay ? parseInt(hasDelay[1]) : '';

        const toggleReveal = (val) => {
            let updated = className
                .split(' ')
                .filter((c) => c !== 'reveal' && ! /^delay-\d$/.test(c));

            if (val) {
                updated.push('reveal');
                if (revealDelay > 0) updated.push(`delay-${revealDelay}`);
            }

            setAttributes({
                // hasReveal: val,
                className: updated.filter(Boolean).join(' '),
            });
        };

        const updateDelay = (val) => {
            const index = parseInt(val);

            let updated = className
                .split(' ')
                .filter((c) => ! /^delay-\d$/.test(c));

            if (index > 0) updated.push(`delay-${index}`);

            setAttributes({
                // revealDelay: index,
                className: updated.filter(Boolean).join(' '),
            });
        };

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody title="Reveal Animation" initialOpen={false}>
                        <ToggleControl
                            label="Enable scroll reveal"
                            checked={!!hasReveal}
                            onChange={toggleReveal}
                        />
                        {hasReveal && (
                            <SelectControl
                                label="Entrance delay"
                                value={String(revealDelay)}
                                options={DELAY_OPTIONS}
                                onChange={updateDelay}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'addControls');
addFilter('editor.BlockEdit', 'localpro-reveal/add-controls', addControls);

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
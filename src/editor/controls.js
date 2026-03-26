import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import IconPicker from './list-icon-picker';

// Marker icon + color controls for core/list
const addLocalproListControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/list') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { localproMarkerColor, localproMarkerIcon } = attributes;

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelColorSettings
                        __experimentalIsRenderedInSidebar
                        title={__('Marker Color', 'localpro-list')}
                        initialOpen={false}
                        colorSettings={[
                            {
                                value: localproMarkerColor || '',
                                onChange: (val) => setAttributes({ localproMarkerColor: val || '' }),
                                label: __('Marker', 'localpro-list'),
                            },
                        ]}
                    />
                    <PanelBody title={__('Marker Icon', 'localpro-list')} initialOpen={false}>
                        <IconPicker
                            value={localproMarkerIcon || ''}
                            onChange={(icon) => setAttributes({ localproMarkerIcon: icon })}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'addLocalproListControls');

addFilter(
    'editor.BlockEdit',
    'localpro-list/add-controls',
    addLocalproListControls
);

// Editor canvas classes/styles for core/list
const localproListProps = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        if (props.name !== 'core/list') return <BlockListBlock {...props} />;

        const { localproMarkerColor, localproMarkerIcon } = props.attributes;
        const extraClasses = [];
        const extraStyle = {};

        if (localproMarkerIcon) {
            extraClasses.push('localpro-list--material-icon');
            extraStyle['--localpro-marker-icon'] = '"' + localproMarkerIcon + '"';
        }

        if (localproMarkerColor) {
            extraClasses.push('localpro-list--has-marker-color');
            extraStyle['--localpro-marker-color'] = localproMarkerColor;
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
}, 'localproListProps');

addFilter(
    'editor.BlockListBlock',
    'localpro-list/add-props',
    localproListProps
);


// Reveal + sticky controls for all blocks
const DELAY_OPTIONS = [
    { label: 'None', value: '0' },
    { label: '200ms', value: '1' },
    { label: '400ms', value: '2' },
    { label: '600ms', value: '3' },
    { label: '800ms', value: '4' },
];

const addCustomControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (!props.name.startsWith('core/')) return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { hasReveal, revealDelay, hasSticky, className = '' } = attributes;

        const toggleReveal = (val) => {
            let classes = className
                .split(' ')
                .filter((c) => c !== 'reveal' && ! /^delay-\d$/.test(c));

            if (val) {
                classes.push('reveal');
                if (revealDelay > 0) classes.push(`delay-${revealDelay}`);
            }

            setAttributes({
                hasReveal: val,
                className: classes.filter(Boolean).join(' '),
            });
        };

        const updateDelay = (val) => {
            const index = parseInt(val);

            let classes = className
                .split(' ')
                .filter((c) => ! /^delay-\d$/.test(c));

            if (index > 0) classes.push(`delay-${index}`);

            setAttributes({
                revealDelay: index,
                className: classes.filter(Boolean).join(' '),
            });
        };

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
                    <PanelBody title="Position" initialOpen={false}>
                        <ToggleControl
                            label="Sticky"
                            checked={!!hasSticky}
                            onChange={toggleSticky}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'addCustomControls');

addFilter(
    'editor.BlockEdit',
    'localpro/add-controls',
    addCustomControls
);
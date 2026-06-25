import { createHigherOrderComponent } from '@wordpress/compose';
import { registerBlockVariation } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import IconPicker from './icon-picker';

// New approach: Instead of using CSS custom properties and wrapperProps, we can directly add the icon as an inline style on the list item marker using the ::marker pseudo-element. This way, we can avoid the complexity of passing props through multiple layers and ensure better compatibility with different themes and styles.

const DEFAULT_ICON = 'check';
const DEFAULT_ICON_SIZE = 1.75;
const DEFAULT_ICON_COLOR = 'var(--wp--preset--color--primary)';

// Inject the icon attributes into core/list's schema
addFilter(
    'blocks.registerBlockType',
    'localpro/icon-list-attributes',
    (settings, name) => {
        if (name !== 'core/list') return settings;

        return {
            ...settings,
            attributes: {
                ...settings.attributes,
                selectedIcon: { type: 'string', default: DEFAULT_ICON },
                iconSize: { type: 'string', default: `${DEFAULT_ICON_SIZE}em` },
                iconColor: { type: 'string', default: DEFAULT_ICON_COLOR },
            },
        };
    }
);

// Register the variation
registerBlockVariation('core/list', {
    name: 'icon-list',
    title: __('Icon List', 'localpro'),
    description: __('A list with a custom icon marker.', 'localpro'),
    icon: 'star-filled',
    isDefault: true,
    scope: ['inserter', 'transform'],
    attributes: {
        className: 'is-style-icon-list',
        selectedIcon: DEFAULT_ICON,
        iconSize: `${DEFAULT_ICON_SIZE}em`,
        iconColor: DEFAULT_ICON_COLOR,
    },
    isActive: (blockAttributes) => blockAttributes.className?.includes('is-style-icon-list'),
});

// Inject sidebar controls — icon picker, size, and color
// IconPicker is a pure UI component; InspectorControls live here since
// the icon is a stored block attribute, not an inline RichText insertion.
const iconPickerControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        if (props.name !== 'core/list') return <BlockEdit {...props} />;

        const { attributes, setAttributes } = props;
        const { selectedIcon, iconSize, iconColor } = attributes;

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelColorSettings
                        title={__('Icon Color', 'localpro')}
                        initialOpen={false}
                        colorSettings={[{
                            value: iconColor,
                            onChange: (val) =>
                                setAttributes({ iconColor: val || DEFAULT_ICON_COLOR }),
                            label: __('Color', 'localpro'),
                        }]}
                    />
                    <PanelBody title={__('Icon Size', 'localpro')} initialOpen={false}>
                        <RangeControl
                            __next40pxDefaultSize={true}
                            label={__('Icon Size', 'localpro')}
                            value={parseFloat(iconSize)}
                            allowReset={true}
                            resetFallbackValue={DEFAULT_ICON_SIZE}
                            onChange={(val) =>
                                setAttributes({ iconSize: `${val ?? DEFAULT_ICON_SIZE}em` })
                            }
                            min={1}
                            max={4}
                            step={0.25}
                            withInputField={true}
                        />
                    </PanelBody>
                    <PanelBody title={__('Choose Icon', 'localpro')} initialOpen={true}>
                        <IconPicker
                            selectedIcon={selectedIcon}
                            onSelect={(icon) => setAttributes({ selectedIcon: icon })}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}, 'iconPickerControls');
addFilter('editor.BlockEdit', 'localpro/icon-picker-controls', iconPickerControls);

// Apply CSS custom properties in the editor preview
const iconListProps = createHigherOrderComponent((BlockListBlock) => {
    return (props) => {
        if (props.name !== 'core/list' || !props.attributes.className?.includes('is-style-icon-list')) {
            return <BlockListBlock {...props} />;
        }

        const { selectedIcon, iconSize, iconColor } = props.attributes;

        return (
            <BlockListBlock
                {...props}
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

// Pass CSS custom properties into the saved block's wrapper on the frontend
addFilter(
    'blocks.getSaveContent.extraProps',
    'localpro-list/save-icon-props',
    (extraProps, blockType, attributes) => {
        if (blockType.name !== 'core/list' || !attributes.className?.includes('is-style-icon-list')) {
            return extraProps;
        }

        const { selectedIcon, iconSize, iconColor } = attributes;

        extraProps.style = {
            ...(extraProps.style || {}),
            '--icon': `'${selectedIcon}'`,
            '--icon-color': iconColor,
            '--icon-size': iconSize,
        };

        return extraProps;
    }
);
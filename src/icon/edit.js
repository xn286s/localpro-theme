import { useBlockProps, InspectorControls, PanelColorSettings, useSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, FontSizePicker, Button, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ICONS from './icons.json';
import './editor.scss';

const ICON_CATEGORIES = Object.keys(ICONS);
const MATERIAL_ICONS = Object.values(ICONS).flat();

const DEFAULT_ICON_SIZE = '4.8rem';

export default function Edit({ attributes, setAttributes }) {
    const { selectedIcon, iconSize, iconColor } = attributes;
    const defaultSize = iconSize ? iconSize : DEFAULT_ICON_SIZE;

    const blockProps = useBlockProps({
        style: {
            textAlign: 'center',
        },
    });

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const categoryOptions = [
        { label: __('All Categories', 'localpro-icon-picker'), value: '' },
        ...ICON_CATEGORIES.map((cat) => ({ label: cat, value: cat })),
    ];

    // const fontSizes = useSettings('typography.fontSizes') ?? [];
    const [fontSettings] = useSettings('typography.fontSizes');
    const fontSizes = (fontSettings ?? []).map(({ name, slug, size }) => ({
        name,
        slug,
        // If size is an object (fluid), fall back to the raw size string
        size: typeof size === 'string' ? size : size?.min ?? '',
    }));

    let filteredIcons;
    if (search) {
        filteredIcons = MATERIAL_ICONS.filter((icon) =>
            icon.toLowerCase().includes(search.toLowerCase())
        );
    } else if (category) {
        filteredIcons = ICONS[category] || [];
    } else {
        filteredIcons = MATERIAL_ICONS;
    }

    return (
        <>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Icon Color', 'localpro-icon-picker')}
                    initialOpen={true}
                    colorSettings={[
                        {
                            value: iconColor,
                            onChange: (val) =>
                                setAttributes({ iconColor: val || '' }),
                            label: __('Color', 'localpro-icon-picker'),
                        },
                    ]}
                />
                <PanelBody
                    title={__('Icon Size', 'localpro-icon-picker')}
                    initialOpen={true}
                >
                    <FontSizePicker
                        fontSizes={fontSizes}
                        value={defaultSize}
                        onChange={(val) =>
                            setAttributes({ iconSize: val || DEFAULT_ICON_SIZE })
                        }
                        fallbackFontSize={DEFAULT_ICON_SIZE}
                        withReset
                    />
                </PanelBody>
                <PanelBody
                    title={__('Choose Icon', 'localpro-icon-picker')}
                    initialOpen={true}
                >
                    <TextControl
                        placeholder={__(
                            'Search icons...',
                            'localpro-icon-picker'
                        )}
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            if (val) {
                                setCategory('');
                            }
                        }}
                    />
                    <SelectControl
                        value={category}
                        options={categoryOptions}
                        onChange={(val) => {
                            setCategory(val);
                            if (val) {
                                setSearch('');
                            }
                        }}
                    />
                    <div className="localpro-icon-picker-grid">
                        {filteredIcons.map((icon) => (
                            <Tooltip key={icon} text={icon}>
                                <Button
                                    className={
                                        'localpro-icon-picker-grid__item' +
                                        (selectedIcon === icon
                                            ? ' is-selected'
                                            : '')
                                    }
                                    onClick={() =>
                                        setAttributes({
                                            selectedIcon: icon,
                                        })
                                    }
                                >
                                    <span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: '2.4rem' }}
                                    >
                                        {icon}
                                    </span>
                                </Button>
                            </Tooltip>
                        ))}
                        {filteredIcons.length === 0 && (
                            <p className="localpro-icon-picker-grid__empty">
                                {__(
                                    'No icons found.',
                                    'localpro-icon-picker'
                                )}
                            </p>
                        )}
                    </div>
                    <Button
                        isDestructive
                        variant="tertiary"
                        onClick={() => setAttributes({ selectedIcon: '' })}
                    >
                        {__('Clear', 'localpro-icon-picker')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            {/* Specific to the localpro/icon custom block */}
            {blockProps['data-title'] === 'Icon' && (
                <div {...blockProps}>
                    <span
                        className="material-symbols-outlined"
                        style={{
                            fontSize: iconSize,
                            color: iconColor || undefined,
                            lineHeight: 1,
                        }}
                    >
                        {selectedIcon}
                    </span>
                </div>
            )}
        </>
    );
}
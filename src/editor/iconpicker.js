import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, Tooltip, RangeControl, FontSizePicker } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ICONS from './icons.json';
import './editor.scss';

const ICON_CATEGORIES = Object.keys(ICONS);
const MATERIAL_ICONS = Object.values(ICONS).flat();

const DEFAULT_ICON_SIZE = 4.8;

export default function IconPicker({ attributes, setAttributes }) {
    const { selectedIcon, iconSize, iconColor } = attributes;

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const categoryOptions = [
        { label: __('All Categories', 'localpro-icon-picker'), value: '' },
        ...ICON_CATEGORIES.map((cat) => ({ label: cat, value: cat })),
    ];

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
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: iconColor,
                            onChange: (val) =>
                                setAttributes({ iconColor: val || 'var(--wp--preset--color--primary)' }),
                            label: __('Color', 'localpro-icon-picker'),
                        },
                    ]}
                />
                <PanelBody
                    title={__('Icon Size', 'localpro-icon-picker')}
                    initialOpen={false}
                >
                    <RangeControl
                        __next40pxDefaultSize={true}
                        label={__('Icon Size', 'localpro-icon-picker')}
                        initialOpen={false}
                        value={iconSize}
                        currentInput={DEFAULT_ICON_SIZE}
                        allowReset={true}
                        resetFallbackValue={DEFAULT_ICON_SIZE}
                        onChange={(val) => setAttributes({ iconSize: `${val}em` })}
                        type='stepper'
                        min={2}
                        max={6}
                        step={0.2}
                        withInputField={true}
                        showTooltip={true}

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
                                    onClick={() => {
                                        console.log(attributes);
                                        setAttributes({
                                            selectedIcon: icon || 'circle',
                                        })
                                    }
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
                        onClick={() => setAttributes({ selectedIcon: 'circle' })}
                    >
                        {__('Clear', 'localpro-icon-picker')}
                    </Button>
                </PanelBody>
            </InspectorControls>
        </>
    );
}
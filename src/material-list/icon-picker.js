import { TextControl, Button, Tooltip, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ALL_MATERIAL_ICONS, MATERIAL_ICON_CATEGORIES, CATEGORY_NAMES } from './icon-data';

export default function IconPicker({ value, onChange }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const categoryOptions = [
        { label: __('All Categories', 'localpro-custom-list-block'), value: '' },
        ...CATEGORY_NAMES.map((cat) => ({ label: cat, value: cat })),
    ];

    let filtered;
    if (search) {
        filtered = ALL_MATERIAL_ICONS.filter((icon) =>
            icon.toLowerCase().includes(search.toLowerCase())
        );
    } else if (category) {
        filtered = MATERIAL_ICON_CATEGORIES[category] || [];
    } else {
        filtered = ALL_MATERIAL_ICONS;
    }

    return (
        <div className="localpro-icon-picker">
            <TextControl
                placeholder={__(
                    'Search icons\u2026',
                    'localpro-custom-list-block'
                )}
                value={search}
                onChange={(val) => {
                    setSearch(val);
                    if (val) {
                        setCategory('');
                    }
                }}
                __nextHasNoMarginBottom
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
                __nextHasNoMarginBottom
            />
            <div className="localpro-icon-picker__count">
                {filtered.length}{' '}
                {filtered.length === 1
                    ? __('icon', 'localpro-custom-list-block')
                    : __('icons', 'localpro-custom-list-block')}
            </div>
            <div className="localpro-icon-picker__grid">
                {filtered.map((icon) => (
                    <Tooltip key={icon} text={icon.replace(/_/g, ' ')}>
                        <Button
                            className={`localpro-icon-picker__item${value === icon
                                ? ' localpro-icon-picker__item--active'
                                : ''
                                }`}
                            onClick={() =>
                                onChange(value === icon ? '' : icon)
                            }
                        >
                            <span className="material-icons">{icon}</span>
                        </Button>
                    </Tooltip>
                ))}
            </div>
            {filtered.length === 0 && (
                <p className="localpro-icon-picker__empty">
                    {__('No icons found.', 'localpro-custom-list-block')}
                </p>
            )}
            {value && (
                <div className="localpro-icon-picker__current">
                    <span className="localpro-icon-picker__label">
                        {__('Selected:', 'localpro-custom-list-block')}
                    </span>
                    <span className="material-icons">{value}</span>
                    <span className="localpro-icon-picker__name">
                        {value.replace(/_/g, ' ')}
                    </span>
                    <Button
                        isSmall
                        isDestructive
                        variant="tertiary"
                        onClick={() => onChange('')}
                    >
                        {__('Clear', 'localpro-custom-list-block')}
                    </Button>
                </div>
            )}
        </div>
    );
}
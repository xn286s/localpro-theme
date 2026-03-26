import { TextControl, Button, Tooltip, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ICONS from './icons.json';

const ICON_CATEGORIES = Object.keys(ICONS);
const ALL_ICONS = Object.values(ICONS).flat();

export default function IconPicker({ value, onChange }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const categoryOptions = [
        { label: __('All Categories', 'localpro-list'), value: '' },
        ...ICON_CATEGORIES.map((cat) => ({ label: cat, value: cat })),
    ];

    let filtered;
    if (search) {
        filtered = ALL_ICONS.filter((icon) =>
            icon.toLowerCase().includes(search.toLowerCase())
        );
    } else if (category) {
        filtered = ICONS[category] || [];
    } else {
        filtered = ALL_ICONS;
    }

    return (
        <div className="localpro-icon-picker">
            <TextControl
                placeholder={__(
                    'Search icons\u2026',
                    'localpro-list'
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
                    ? __('icon', 'localpro-list')
                    : __('icons', 'localpro-list')}
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
                    {__('No icons found.', 'localpro-list')}
                </p>
            )}
            {value && (
                <div className="localpro-icon-picker__current">
                    <span className="localpro-icon-picker__label">
                        {__('Selected:', 'localpro-list')}
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
                        {__('Clear', 'localpro-list')}
                    </Button>
                </div>
            )}
        </div>
    );
}
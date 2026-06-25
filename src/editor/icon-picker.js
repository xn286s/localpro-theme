import { TextControl, SelectControl, Button, Tooltip } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import ICONS from './icons.json';

const ICON_CATEGORIES = Object.keys(ICONS);
const MATERIAL_ICONS = Object.values(ICONS).flat();

export default function IconPicker({ onSelect, selectedIcon = null }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const categoryOptions = [
        { label: __('All Categories', 'localpro'), value: '' },
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
        <div className="localpro-icon-picker">
            <TextControl
                placeholder={__('Search icons...', 'localpro')}
                value={search}
                onChange={(val) => {
                    setSearch(val);
                    if (val) setCategory('');
                }}
            />
            <SelectControl
                value={category}
                options={categoryOptions}
                onChange={(val) => {
                    setCategory(val);
                    if (val) setSearch('');
                }}
            />
            <div className="localpro-icon-picker-grid">
                {filteredIcons.map((icon) => (
                    <Tooltip key={icon} text={icon}>
                        <Button
                            className={
                                'localpro-icon-picker-grid__item' +
                                (selectedIcon === icon ? ' is-selected' : '')
                            }
                            onClick={() => onSelect(icon)}
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
                        {__('No icons found.', 'localpro')}
                    </p>
                )}
            </div>
        </div>
    );
}
import { useBlockProps } from '@wordpress/block-editor';

const DEFAULT_ICON_SIZE = 48;

export default function save({ attributes }) {
    const { selectedIcon, iconSize, iconColor } = attributes;
    const computedSize = iconSize ? iconSize : DEFAULT_ICON_SIZE + 'px';

    return (
        <div {...useBlockProps.save({ style: { textAlign: 'center' } })}>
            <span
                className="material-icons"
                style={{
                    fontSize: computedSize,
                    color: iconColor || undefined,
                    lineHeight: 1,
                }}
            >
                {selectedIcon}
            </span>
        </div>
    );
}
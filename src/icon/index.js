import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';
import './editor.scss';

const DEFAULT_ICON_SIZE = 48;

registerBlockType(metadata.name, {
    edit: Edit,
    save: ({ attributes }) => {
        const { selectedIcon, iconSize, iconColor } = attributes;
        const computedSize = iconSize ? iconSize : DEFAULT_ICON_SIZE + 'px';

        return (
            <div {...useBlockProps.save({ style: { textAlign: 'center' } })}>
                <span
                    className="material-symbols-outlined"
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
    },
});
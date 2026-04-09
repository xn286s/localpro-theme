import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';

registerBlockType(metadata.name, {
    edit: Edit,
    save: ({ attributes }) => {
        const { selectedIcon, iconSize, iconColor } = attributes;

        return (
            <div {...useBlockProps.save()}>
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
        );
    },
});
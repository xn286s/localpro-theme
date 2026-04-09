import { useBlockProps } from '@wordpress/block-editor';
import IconPicker from '../editor/iconpicker';

export default function Edit({ attributes, setAttributes }) {
    const { selectedIcon, iconSize, iconColor } = attributes;
    const blockProps = useBlockProps({ style: { textAlign: 'center' } });

    return (
        <>
            <IconPicker attributes={attributes} setAttributes={setAttributes} />

            <div {...useBlockProps(blockProps)}>
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
        </>
    );
}
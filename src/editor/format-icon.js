import { registerFormatType, insert, create, applyFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import IconPicker from './icon-picker';

const FORMAT_NAME = 'localpro/icon';

// Multiplier relative to the block's selected font size.
// 1.5em means the icon is 50% larger than the surrounding text,
// which reads well visually while still being anchored to the type scale.
const ICON_SIZE_EM = 1.5;

registerFormatType(FORMAT_NAME, {
    title: __('Insert Icon', 'localpro'),
    tagName: 'span',
    className: 'material-symbols-outlined',

    // Allowlist the style attribute so WordPress preserves it on save.
    attributes: {
        style: 'style',
    },

    edit({ value, onChange, isActive }) {
        const [isOpen, setIsOpen] = useState(false);

        function handleSelect(iconName) {
            // Build a RichTextValue from the icon ligature string, then wrap
            // the entire thing in the format so the span gets the right class,
            // style, and text content. Material Symbols reads the text node,
            // not an attribute, so the icon name *is* the content.
            const iconValue = create({ text: iconName });
            const formatted = applyFormat(
                iconValue,
                {
                    type: FORMAT_NAME,
                    attributes: {
                        style: `font-size: ${ICON_SIZE_EM}em; line-height: 1; vertical-align: middle;`,
                    },
                },
                0,
                iconName.length
            );

            onChange(insert(value, formatted));
            setIsOpen(false);
        }

        return (
            <>
                <RichTextToolbarButton
                    icon="superhero-alt"
                    title={__('Insert Icon', 'localpro')}
                    onClick={() => setIsOpen((prev) => !prev)}
                    isActive={isActive}
                />
                {isOpen && (
                    <Modal
                        title={__('Insert Icon', 'localpro')}
                        onRequestClose={() => setIsOpen(false)}
                        className="localpro-icon-modal"
                    >
                        <IconPicker onSelect={handleSelect} />
                    </Modal>
                )}
            </>
        );
    },
});
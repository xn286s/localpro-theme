import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings, } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import IconPicker from './icon-picker';

import './editor.css';

/**
 * Add custom attributes to core/list.
 */
addFilter(
	'blocks.registerBlockType',
	'localpro-custom-list-block/add-attributes',
	(settings, name) => {
		if (name !== 'core/list') {
			return settings;
		}
		return {
			...settings,
			attributes: {
				...settings.attributes,
				localproMarkerColor: {
					type: 'string',
					default: '',
				},
				localproMarkerIcon: {
					type: 'string',
					default: '',
				},
			},
		};
	}
);

/**
 * Add inspector controls to core/list.
 */
const withLocalproListControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (props.name !== 'core/list') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { localproMarkerColor, localproMarkerIcon } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__(
							'Marker Icon',
							'localpro-custom-list-block'
						)}
						initialOpen={false}
					>
						<IconPicker
							value={localproMarkerIcon || ''}
							onChange={(icon) =>
								setAttributes({ localproMarkerIcon: icon })
							}
						/>
					</PanelBody>
					<PanelColorSettings
						__experimentalIsRenderedInSidebar
						title={__(
							'Marker Color',
							'localpro-custom-list-block'
						)}
						initialOpen={false}
						colorSettings={[
							{
								value: localproMarkerColor || '',
								onChange: (val) =>
									setAttributes({
										localproMarkerColor: val || '',
									}),
								label: __(
									'Marker',
									'localpro-custom-list-block'
								),
							},
						]}
					/>
				</InspectorControls>
			</>
		);
	};
}, 'withLocalproListControls');

addFilter(
	'editor.BlockEdit',
	'localpro-custom-list-block/with-controls',
	withLocalproListControls
);

/**
 * Add custom classes and inline styles in the editor wrapper.
 */
const withLocalproListProps = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		if (props.name !== 'core/list') {
			return <BlockListBlock {...props} />;
		}

		const { localproMarkerColor, localproMarkerIcon } = props.attributes;
		const extraClasses = [];
		const extraStyle = {};

		if (localproMarkerIcon) {
			extraClasses.push('localpro-list--material-icon');
			extraStyle['--localpro-marker-icon'] = '"' + localproMarkerIcon + '"';
		}

		if (localproMarkerColor) {
			extraClasses.push('localpro-list--has-marker-color');
			extraStyle['--localpro-marker-color'] = localproMarkerColor;
		}

		if (extraClasses.length === 0) {
			return <BlockListBlock {...props} />;
		}

		const className = [props.className || '', ...extraClasses]
			.filter(Boolean)
			.join(' ');

		return (
			<BlockListBlock
				{...props}
				className={className}
				wrapperProps={{
					...(props.wrapperProps || {}),
					style: {
						...(props.wrapperProps?.style || {}),
						...extraStyle,
					},
				}}
			/>
		);
	};
}, 'withLocalproListProps');

addFilter(
	'editor.BlockListBlock',
	'localpro-custom-list-block/with-props',
	withLocalproListProps
);

/**
 * Save: add classes and inline style to the wrapper element.
 */
addFilter(
	'blocks.getSaveContent.extraProps',
	'localpro-custom-list-block/save-props',
	(extraProps, blockType, attributes) => {
		if (blockType.name !== 'core/list') {
			return extraProps;
		}

		const { localproMarkerColor, localproMarkerIcon } = attributes;

		if (localproMarkerIcon) {
			extraProps.className = [
				extraProps.className || '',
				'localpro-list--material-icon',
			]
				.filter(Boolean)
				.join(' ');
			extraProps.style = {
				...(extraProps.style || {}),
				'--localpro-marker-icon': '"' + localproMarkerIcon + '"',
			};
		}

		if (localproMarkerColor) {
			extraProps.className = [
				extraProps.className || '',
				'localpro-list--has-marker-color',
			]
				.filter(Boolean)
				.join(' ');
			extraProps.style = {
				...(extraProps.style || {}),
				'--localpro-marker-color': localproMarkerColor,
			};
		}

		return extraProps;
	}
);
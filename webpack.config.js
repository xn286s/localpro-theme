const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'index': path.resolve(process.cwd(), 'src/index.js'),
		'scroll-reveal/index': path.resolve(process.cwd(), 'src/scroll-reveal/index.js'),
		'material-list/index': path.resolve(process.cwd(), 'src/material-list/index.js')
	}
};

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        'editor/index': './src/editor/index.js',
        'frontend/index': './src/index.js',
    },
};
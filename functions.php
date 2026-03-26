<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('TEXT_DOMAIN', 'localpro');
define('THEME_DIR', get_template_directory());
define('THEME_DIR_URI', get_template_directory_uri());
define('LOCALPRO_FRONTEND_STYLES', THEME_DIR_URI . '/build/frontend/style-index.css');
define('LOCALPRO_EDITOR_STYLES', THEME_DIR_URI . '/build/editor/style-index.css');

class LocalProTheme {

    private static $instance = null;

    public function __construct() {
        // Hooks
        add_action('after_setup_theme', [$this, 'after_setup_theme']);
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        
        // Filters
        add_filter('should_load_remote_block_patterns', '__return_false');
    }

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function after_setup_theme() {
        add_theme_support('editor-styles'); // Tell WordPress the theme supports editor styles
        remove_theme_support('core-block-patterns'); // Disable default patterns

        add_editor_style('https://fonts.googleapis.com/icon?family=Material+Icons'); // Ensure material icons are loaded in the editor
        add_editor_style(LOCALPRO_EDITOR_STYLES); // Material icon picker styles
    }

    public function init() {
        $this->register_pattern_categories();
    }

    public function wp_enqueue_scripts() {
        wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        wp_enqueue_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null);

        wp_enqueue_style('localpro-styles', LOCALPRO_FRONTEND_STYLES, ['google-material-icons'], null); // Ensure main styles are loaded
        wp_enqueue_script('localpro-scripts', THEME_DIR_URI . '/build/frontend/index.js', [], null, true);
    }
    
    public function enqueue_block_editor_assets() {
        // Material list
        wp_enqueue_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null);
        wp_enqueue_block_style('core/list', ['localpro-editor-style', LOCALPRO_EDITOR_STYLES, ['google-material-icons'], null]); // Material list icon picker styles

        wp_enqueue_script('localpro-editor', THEME_DIR_URI . '/build/editor/index.js', ['wp-hooks', 'wp-compose', 'wp-block-editor', 'wp-components', 'wp-i18n'], '1.0.0', true); // Material list icon picker editor
    }

    public function register_pattern_categories() {
        $categories = [
            'localpro',
            'hero',
            'stakes',
            'value-stack',
            'services',
            'guide',
            'plan',
            'one-column',
            'two-column',
            'three-column',
            'page'
        ];

        foreach($categories as $category) {
            register_block_pattern_category($category, [
                'label' => __( ucfirst($category), TEXT_DOMAIN ),
                'description' => __( ucfirst($category) . ' patterns', TEXT_DOMAIN ),
            ]);
        }
    }

}

LocalProTheme::get_instance();
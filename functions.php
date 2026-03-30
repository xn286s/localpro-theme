<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('TEXT_DOMAIN', 'localpro');
define('THEME_DIR', get_template_directory());
define('THEME_DIR_URI', get_template_directory_uri());

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

        add_editor_style(THEME_DIR_URI . '/build/editor/index.css'); // Material icon picker styles
    }

    public function init() {
        $this->register_blocks();
        $this->register_pattern_categories();
    }

    public function wp_enqueue_scripts() {
        wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

        // We don't need to enqueue frontend styles because they're imported using the src/frontend/index.js file
        // wp_enqueue_style('localpro-frontend-styles', THEME_DIR_URI . '/build/frontend/index.css', [], null);
        wp_enqueue_script('localpro-frontend-scripts', THEME_DIR_URI . '/build/frontend/index.js', [], null, true);
    }
    
    public function enqueue_block_editor_assets() {
        // Custom editor controls (reveal animation toggle, sticky toggle, core/list icon picker)
        wp_enqueue_script('localpro-editor-controls', THEME_DIR_URI . '/build/editor/index.js', ['wp-blocks', 'wp-block-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-element', 'wp-i18n'], null, true);
    }

    public function register_blocks() {
        register_block_type_from_metadata(THEME_DIR . '/build/icon');
        register_block_type_from_metadata(THEME_DIR . '/build/shape-divider');
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
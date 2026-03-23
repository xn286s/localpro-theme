<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class LocalProTheme {

    private static $instance = null;

    public function __construct() {
        // Hooks
        add_action('after_setup_theme', [$this, 'after_setup_theme']);
        add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
        add_action('init', [$this, 'init']);
        
        // Filters
        add_filter('should_load_remote_block_patterns', '__return_false');
        // add_filter('show_admin_bar', '__return_false');
    }

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function after_setup_theme() {
        add_theme_support('editor-styles'); // Tell WordPress the theme supports editor styles
        add_editor_style(THEME_DIR_URI . '/assets/css/localpro.css'); // Point to your main stylesheet (or a specific editor stylesheet).
        remove_theme_support('core-block-patterns'); // Disable default patterns
    }

    public function init() {
        $this->register_pattern_categories();
    }

    public function wp_enqueue_scripts() {
        wp_enqueue_style('localpro-styles', THEME_DIR_URI . '/assets/css/localpro.css'); // Ensure the theme main stylesheet is being loaded
        wp_enqueue_style('localpro-anim', THEME_DIR_URI . '/assets/css/anim.css'); // Ensure the theme main stylesheet is being loaded
        wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        wp_enqueue_script('localpro-scripts', THEME_DIR_URI . '/assets/js/localpro.js', [], null, true);
        wp_enqueue_style('dashicons');
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
            ]
            );
        }
    }

}

LocalProTheme::get_instance();
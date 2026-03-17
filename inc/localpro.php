<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

require_once THEME_DIR . '/inc/theme-settings.php';

class LocalProTheme {

    private static $instance = null;

    public function __construct() {
        // Hooks
        add_action('after_setup_theme', [$this, 'after_setup_theme']);
        add_action('wp_enqueue_scripts', [$this, 'wp_enqueue_scripts']);
        add_action('init', [$this, 'init']);
        // add_action('after_switch_theme', [$this, 'install_companion_plugin']);
        
        // Filters
        add_filter('should_load_remote_block_patterns', '__return_false');
        add_filter('show_admin_bar', '__return_false');
    }

    public function after_setup_theme() {
        add_theme_support('editor-styles'); // Tell WordPress the theme supports editor styles
        add_editor_style(THEME_DIR_URI . '/assets/css/localpro.css'); // Point to your main stylesheet (or a specific editor stylesheet).
        remove_theme_support('core-block-patterns'); // Disable default patterns
    }

    public function init() {
        $this->register_post_types();
        // $this->install_companion_plugin(); // Also run on every load to catch manual theme re-installs
    }

    public function wp_enqueue_scripts() {
        wp_enqueue_style('localpro-styles', THEME_DIR_URI . '/assets/css/localpro.css'); // Ensure the theme main stylesheet is being loaded
        wp_enqueue_style('localpro-anim', THEME_DIR_URI . '/assets/css/anim.css'); // Ensure the theme main stylesheet is being loaded
        wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        wp_enqueue_script('localpro-scripts', THEME_DIR_URI . '/assets/js/localpro.js', [], null, true);
        wp_enqueue_style('dashicons');
    }

    public function register_post_types() {
        $options = get_option('localpro_theme_options');
        
        // Check if the setting is checked and equals '1'
        if (isset($options['enable_service_post_type']) && $options['enable_service_post_type'] === '1') {
            register_post_type('service', [
                'labels' => [
                    'name'          => __('Services', TEXT_DOMAIN),
                    'singular_name' => __('Service', TEXT_DOMAIN),
                ],
                'public'       => true,
                'has_archive'  => true,
                'supports'     => ['title', 'editor', 'thumbnail', 'excerpt'],
                'show_in_rest' => true, // Enables Gutenberg editor support
                'menu_icon'    => 'dashicons-hammer',
                'rewrite'      => ['slug' => 'services'],
            ]);
        }
    }

    public function install_companion_plugin() {
        $plugin_path = 'localpro-companion/localpro-companion.php';
        
        // Check if the plugin is already active
        if (is_plugin_active($plugin_path)) {
            return;
        }
        
        // Check if the plugin file exists in the theme
        $plugin_file = THEME_DIR . '/' . $plugin_path;
        
        if (file_exists($plugin_file)) {
            // Activate the plugin
            $result = activate_plugin($plugin_path);
            
            if (is_wp_error($result)) {
                // Show an error message if activation fails
                add_action('admin_notices', function() use ($result) {
                    echo '<div class="notice notice-error"><p>' . __('LocalPro Companion plugin could not be activated. Please activate it manually.', TEXT_DOMAIN) . '</p></div>';
                });
            }
        }
    }

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

}

LocalProTheme::get_instance();
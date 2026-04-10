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
        // === Hooks ===
        add_action('after_setup_theme', [$this, 'after_setup_theme']);
        add_action('init', [$this, 'init']);
        add_action('enqueue_block_assets', [$this, 'enqueue_block_assets']); // Load block assets only when the block is used (performance optimization)
        add_action('wp_enqueue_scripts', [$this, 'handle_frontend_scripts']);

        
        // === Filters ===
        add_filter('should_load_remote_block_patterns', '__return_false');
        
        $this->performance_optimizations();

    }

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function after_setup_theme() {
        add_theme_support('editor-styles'); // Tell WordPress the theme supports editor styles
        add_theme_support('title-tag');
        remove_theme_support('core-block-patterns'); // Disable default patterns
    }

    public function init() {
        $this->register_blocks();
        $this->register_pattern_categories();
        $this->custom_post_types();
    }

    public function handle_frontend_scripts() {
        wp_enqueue_style('localpro-frontend-styles', THEME_DIR_URI . '/build/frontend/index.css', [], null);
        wp_enqueue_script('localpro-frontend-scripts', THEME_DIR_URI . '/build/frontend/index.js', [], null, true);
    }
    
    public function enqueue_block_assets() {
        wp_enqueue_style('localpro-inspector-styles', THEME_DIR_URI . '/build/editor/index.css', [], null);

        // Block variations and custom controls
        wp_enqueue_script('localpro-editor-scripts', THEME_DIR_URI . '/build/editor/index.js', ['wp-blocks', 'wp-block-editor', 'wp-components', 'wp-compose', 'wp-hooks', 'wp-element', 'wp-i18n'], null, true);
    }

    public function register_blocks() {
        register_block_type_from_metadata(THEME_DIR . '/build/icon');
        register_block_type_from_metadata(THEME_DIR . '/build/shape-divider');
    }

    public function register_pattern_categories() {
        $categories = [
            'localpro',
            'guide',
            'hero',
            'one-column',
            'page',
            'plan',
            'section',
            'services',
            'stakes',
            'three-column',
            'two-column',
            'value-stack'
        ];

        foreach($categories as $category) {
            register_block_pattern_category($category, [
                'label' => __( ucfirst($category), TEXT_DOMAIN ),
                'description' => __( ucfirst($category) . ' patterns', TEXT_DOMAIN ),
            ]);
        }
    }

    public function custom_post_types() {
        $post_types = [
            'service' => [
                'label' => __('Service', TEXT_DOMAIN),
                'singular_label' => __('Service', TEXT_DOMAIN),
                'public' => true,
                'show_ui' => true,
                'show_in_rest' => true,
                'menu_position' => 5,
                'menu_icon' => 'dashicons-hammer',
                'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
            ],
        ];

        foreach($post_types as $post_type => $args) {
            register_post_type($post_type, $args);
        }
    }

    public function performance_optimizations() {

        add_action('wp_enqueue_scripts', function () {
            wp_dequeue_style('classic-theme-styles'); // Remove unnecessary classic theme styles 
            
            if (!is_user_logged_in()) wp_deregister_style('dashicons'); // Remove dashicons for logged-out users
        }, 100);

        // Load block styles only when the block is used (performance optimization)
        add_filter('should_load_separate_styles', '__return_true');

        // Loads core block assets only when they are rendered (performance optimization)
        add_filter('should_load_separate_core_block_assets', '__return_true');

        // WP Emoji
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');
        remove_filter('the_content_feed', 'wp_staticize_emoji');
        remove_filter('comment_text_rss', 'wp_staticize_emoji');
        remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

        remove_action('wp_head', 'wlwmanifest_link'); // Remove WLW Link

        remove_action('wp_head', 'rsd_link'); // Remove RSD Link

        remove_action('wp_head', 'rest_output_link_wp_head'); // Remove REST API link tag
        remove_action('wp_head', 'wp_resource_hints', 2); // Remove JSON-LD script
        remove_action('wp_head', 'wp_generator'); // WP Generator Meta Tag

        remove_action('wp_head', 'wp_shortlink_wp_head'); // Remove Shortlink
        remove_action('template_redirect', 'wp_shortlink_header', 11); // Remove Shortlink

        remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10); // Relational Link Tags (prev/next post)

    }

}

LocalProTheme::get_instance();
<?php

if (!defined('ABSPATH')) {
    exit;
}

class LocalProThemeSettings {

    private static $instance = null;

    public function __construct() {
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'settings_init']);
    }

    public function add_admin_menu() {
        // Adds a submenu page to the Settings menu
        add_options_page(
            __('Theme Settings', TEXT_DOMAIN),
            __('Theme Settings', TEXT_DOMAIN),
            'manage_options',
            'localpro_theme_settings',
            [$this, 'options_page_html']
        );
    }

    public function settings_init() {
        register_setting('localpro_theme_settings_group', 'localpro_theme_options');

        add_settings_section(
            'localpro_post_types_section',
            __('Post Types', TEXT_DOMAIN),
            [$this, 'post_types_section_cb'],
            'localpro_theme_settings'
        );

        add_settings_field(
            'enable_service_post_type',
            __('Enable Service Post Type', TEXT_DOMAIN),
            [$this, 'enable_service_post_type_cb'],
            'localpro_theme_settings',
            'localpro_post_types_section'
        );
    }

    public function post_types_section_cb() {
        echo '<p>' . __('Toggle which custom post types should be enabled by the theme.', TEXT_DOMAIN) . '</p>';
    }

    public function enable_service_post_type_cb() {
        $options = get_option('localpro_theme_options');
        $checked = isset($options['enable_service_post_type']) ? checked(1, $options['enable_service_post_type'], false) : '';
        echo '<input type="checkbox" name="localpro_theme_options[enable_service_post_type]" value="1" ' . $checked . '/>';
        echo '<p class="description">' . __('Leave unchecked if you are using a separate plugin to manage the Service post type.', TEXT_DOMAIN) . '</p>';
    }

    public function options_page_html() {
        if (!current_user_can('manage_options')) {
            return;
        }

        if (isset($_GET['settings-updated'])) {
            add_settings_error('localpro_messages', 'localpro_message', __('Settings Saved', TEXT_DOMAIN), 'updated');
        }

        settings_errors('localpro_messages');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('localpro_theme_settings_group');
                do_settings_sections('localpro_theme_settings');
                submit_button(__('Save Settings', TEXT_DOMAIN));
                ?>
            </form>
        </div>
        <?php
    }

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

LocalProThemeSettings::get_instance();

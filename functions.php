<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('TEXT_DOMAIN', 'localpro');
define('THEME_DIR', get_template_directory());
define('THEME_DIR_URI', get_template_directory_uri());
define('THEME_STYLES', get_stylesheet_uri());

require_once THEME_DIR . '/inc/localpro.php';
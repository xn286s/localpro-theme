<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

define('TEXT_DOMAIN', 'localpro');
define('THEME_DIR', get_template_directory());
define('THEME_DIR_URI', get_template_directory_uri());
define('THEME_STYLES', get_stylesheet_uri());

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
        // add_filter( 'render_block', [$this, 'material_icon_list_render'], 10, 2 );
        // add_filter( 'render_block', [$this, 'scroll_reveal_render'], 10, 2 );
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

        add_editor_style('https://fonts.googleapis.com/icon?family=Material+Icons');
        add_editor_style(THEME_DIR_URI . '/build/material-list/style-index.css'); // Material list front-end styles
        add_editor_style(THEME_DIR_URI . '/build/material-list/index.css'); // Material icon picker styles
    }

    public function init() {
        $this->register_pattern_categories();
    }

    public function wp_enqueue_scripts() {
        wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        wp_enqueue_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null);
        wp_enqueue_style('material-list-styles', THEME_DIR_URI . '/build/material-list/style-index.css', ['google-material-icons'], null);

        wp_enqueue_style('localpro-styles', THEME_DIR_URI . '/build/index.css'); // Ensure main styles are loaded
        wp_enqueue_style('localpro-scroll-reveal-styles', THEME_DIR_URI . '/build/scroll-reveal/style-index.css'); // Ensure scroll reveal animation styles are loaded
        wp_enqueue_script('localpro-scripts', THEME_DIR_URI . '/build/index.js', [], null, true);
    }

    public function enqueue_block_editor_assets() {
        // Material list
        wp_enqueue_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', [], null);
        wp_enqueue_block_style('core/list', ['material-icon-picker-editor-style', THEME_DIR_URI . '/build/material-list/index.css', ['google-material-icons'], null]);
        wp_enqueue_script('material-list-editor', THEME_DIR_URI . '/build/material-list/index.js', ['wp-hooks', 'wp-compose', 'wp-block-editor', 'wp-components', 'wp-i18n'], '1.0.0', true);

        // Scroll reveal
        wp_enqueue_script('scroll-reveal-editor', THEME_DIR_URI . '/build/scroll-reveal/index.js', ['wp-hooks', 'wp-compose', 'wp-block-editor', 'wp-components', 'wp-element'], null, true);
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

    // public function scroll_reveal_render( $block_content, $block ) {

    //     // Skip blocks with no reveal attribute set
    //     $has_reveal = $block['attrs']['hasReveal'] ?? false;
    //     if ( ! $has_reveal || empty( $block_content ) ) {
    //         return $block_content;
    //     }

    //     $delay_index = intval( $block['attrs']['revealDelay'] ?? 0 );

    //     // Build the classes to inject
    //     $classes = 'reveal';
    //     if ( $delay_index > 0 && $delay_index <= 4 ) {
    //         $classes .= ' delay-' . $delay_index;
    //     }

    //     // Inject into the first HTML tag's class attribute
    //     $block_content = preg_replace(
    //         '/(<[a-z][a-z0-9]*\b)([^>]*?)(class=["\'])(["\'])/i',
    //         '$1$2$3' . $classes . ' $4',  // no existing class attr — add it
    //         $block_content,
    //         1
    //     );

    //     // Handle existing class attributes
    //     $block_content = preg_replace_callback(
    //         '/(<[a-z][a-z0-9]*\b)([^>]*?)(class=["\'])([^"\']+)(["\'])/i',
    //         function ( $matches ) use ( $classes ) {
    //             // Avoid double-adding if already present
    //             if ( str_contains( $matches[4], 'reveal' ) ) {
    //                 return $matches[0];
    //             }
    //             return $matches[1] . $matches[2] . $matches[3] . $matches[4] . ' ' . $classes . $matches[5];
    //         },
    //         $block_content,
    //         1
    //     );

    //     return $block_content;

    // }

    // public function material_icon_list_render( $block_content, $block ) {
	// 	if ( 'core/list' !== $block['blockName'] ) {
	// 		return $block_content;
	// 	}

	// 	$attrs        = $block['attrs'] ?? array();
	// 	$marker_color = $attrs['localproMarkerColor'] ?? '';
	// 	$marker_icon  = $attrs['localproMarkerIcon'] ?? '';

	// 	if ( empty( $marker_color ) && empty( $marker_icon ) ) {
	// 		return $block_content;
	// 	}

	// 	$classes = array();
	// 	$styles  = '';

	// 	if ( ! empty( $marker_icon ) ) {
	// 		$classes[] = 'localpro-list--material-icon';
	// 		$styles   .= '--localpro-marker-icon:"' . esc_attr( $marker_icon ) . '";';
	// 	}
	// 	if ( ! empty( $marker_color ) ) {
	// 		$classes[] = 'localpro-list--has-marker-color';
	// 		$styles   .= '--localpro-marker-color:' . esc_attr( $marker_color ) . ';';
	// 	}

	// 	$processor = new WP_HTML_Tag_Processor( $block_content );
	// 	if ( $processor->next_tag() ) {
	// 		foreach ( $classes as $cls ) {
	// 			$processor->add_class( $cls );
	// 		}
	// 		if ( ! empty( $styles ) ) {
	// 			$existing_style = $processor->get_attribute( 'style' ) ?? '';
	// 			$processor->set_attribute( 'style', $styles . $existing_style );
	// 		}
	// 	}

	// 	return $processor->get_updated_html();
	// }

}

LocalProTheme::get_instance();
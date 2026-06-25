<?php

/**
 * Business Settings – Options Page
 *
 * Registers a top-level admin menu page for storing all business/GBP data.
 * Each field is stored as an individual wp_options entry prefixed localpro_biz_.
 *
 * @package LocalPro
 */

if (! defined('ABSPATH')) exit;

/* Then add this line to wp-config.php above the line that says "That's all, stop editing! Happy publishing."
phpdefine( 'LOCALPRO_PLACES_API_KEY', 'AIzaSyB_vnJOKaVXtEzS7Dw2Yb_0jah0urdMfPs' );
/*


// ─── Public Helper ────────────────────────────────────────────────────────────

/**
 * Retrieve a business option value.
 *
 * Usage in templates: localpro_biz( 'phone' )
 *                     localpro_biz( 'address_city' )
 *
 * @param string $key      Option key without the localpro_biz_ prefix.
 * @param string $fallback Value returned when the option is empty.
 */
function localpro_biz(string $key, string $fallback = ''): string
{
    return (string) get_option("localpro_biz_{$key}", $fallback);
}

/**
 * Shortcode: [localpro_biz field="phone"]
 */
add_shortcode('localpro_biz', fn($atts) => esc_html(localpro_biz($atts['field'] ?? '')));

/**
 * Shortcode: [localpro_biz_hours day="mon"]
 * Returns: "8:00 AM – 5:00 PM", "Open 24 Hours", or "Closed"
 */
add_shortcode('localpro_biz_hours', function ($atts): string {
    $atts = shortcode_atts(['day' => ''], $atts);
    $day  = sanitize_key($atts['day']);

    if (! $day) return '';

    if (localpro_biz("hours_{$day}_closed") === '1') return 'Closed';
    if (localpro_biz("hours_{$day}_24hr")   === '1') return 'Open 24 Hours';

    $open  = localpro_biz("hours_{$day}_open");
    $close = localpro_biz("hours_{$day}_close");

    if (! $open && ! $close) return '';

    return esc_html("{$open} – {$close}");
});


// ─── Admin Menu ───────────────────────────────────────────────────────────────

add_action('admin_menu', function (): void {
    add_menu_page(
        __('Business Settings', 'localpro'),
        __('Business Info',     'localpro'),
        'manage_options',
        'localpro-business',
        'localpro_biz_render_page',
        'dashicons-store',
        3
    );
});


// ─── Enqueue Page Assets ──────────────────────────────────────────────────────

add_action('admin_enqueue_scripts', function (string $hook): void {
    if ($hook !== 'toplevel_page_localpro-business') return;

    wp_enqueue_style(
        'localpro-biz-admin',
        THEME_DIR_URI . '/inc/admin/business-settings.css',
        [],
        '1.0.0'
    );

    wp_enqueue_script(
        'localpro-biz-admin',
        THEME_DIR_URI . '/inc/admin/business-settings.js',
        [],
        '1.0.0',
        true
    );

    wp_localize_script('localpro-biz-admin', 'localproBiz', [
        'restUrl' => esc_url_raw(rest_url('localpro/v1/')),
        'nonce'   => wp_create_nonce('wp_rest'),
    ]);
});


// ─── Save Handler ─────────────────────────────────────────────────────────────

add_action('admin_init', function (): void {
    if (empty($_POST['localpro_biz_nonce'])) return;

    if (
        ! wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['localpro_biz_nonce'])), 'localpro_biz_save') ||
        ! current_user_can('manage_options')
    ) {
        wp_die('Unauthorized.');
    }

    $active_tab = sanitize_key($_POST['_active_tab'] ?? '');

    // ── Single-line text fields ────────────────────────────────────────────────
    $text_fields = [
        'name',
        'phone',
        'phone_alt',
        'phone_tollfree',
        'fax',
        'email',
        'email_support',
        'website',
        'appointment_url',
        'menu_url',
        'address_street',
        'address_street2',
        'address_city',
        'address_state',
        'address_zip',
        'address_country',
        'address_full',
        'lat',
        'lng',
        'maps_url',
        'place_id',
        'service_radius',
        'gbp_primary',
        'opening_date',
        'price_range',
        'schema_type',
        'founded_year',
        'num_employees',
        'license_number',
        'license_state',
        'insurance',
        'languages',
        'payment_methods',
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'youtube',
        'tiktok',
        'yelp',
        'bbb',
        'angi',
        'homeadvisor',
        'houzz',
        'nextdoor',
        'thumbtack',
        'tripadvisor',
    ];

    foreach ($text_fields as $f) {
        if (! array_key_exists("localpro_biz_{$f}", $_POST)) continue;
        update_option(
            "localpro_biz_{$f}",
            sanitize_text_field(wp_unslash($_POST["localpro_biz_{$f}"]))
        );
    }

    // ── Textarea fields ────────────────────────────────────────────────────────
    $textarea_fields = ['description', 'gbp_secondary', 'service_area', 'hours_notes'];

    foreach ($textarea_fields as $f) {
        if (! array_key_exists("localpro_biz_{$f}", $_POST)) continue;
        update_option(
            "localpro_biz_{$f}",
            sanitize_textarea_field(wp_unslash($_POST["localpro_biz_{$f}"]))
        );
    }

    // ── Checkboxes — only save when on the attributes tab ─────────────────────
    if ($active_tab === 'attributes') {
        $checkbox_fields = [
            'is_sab',
            'attr_women_owned',
            'attr_veteran_owned',
            'attr_black_owned',
            'attr_latino_owned',
            'attr_lgbtq_friendly',
            'attr_wheelchair_entrance',
            'attr_wheelchair_parking',
            'attr_wheelchair_restroom',
            'attr_wifi',
            'attr_appointment_required',
            'attr_accepts_new_patients',
            'attr_online_care',
            'attr_free_estimates',
            'attr_emergency_service',
        ];
        foreach ($checkbox_fields as $f) {
            update_option("localpro_biz_{$f}", ! empty($_POST["localpro_biz_{$f}"]) ? '1' : '0');
        }
    }

    // Note: is_sab lives on the address tab, not attributes
    if ($active_tab === 'address') {
        update_option('localpro_biz_is_sab', ! empty($_POST['localpro_biz_is_sab']) ? '1' : '0');
    }

    // ── Hours — only save when on the hours tab ────────────────────────────────
    if ($active_tab === 'hours') {
        $days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        foreach ($days as $d) {
            update_option("localpro_biz_hours_{$d}_closed", ! empty($_POST["localpro_biz_hours_{$d}_closed"]) ? '1' : '0');
            update_option("localpro_biz_hours_{$d}_24hr",   ! empty($_POST["localpro_biz_hours_{$d}_24hr"])   ? '1' : '0');
            update_option("localpro_biz_hours_{$d}_open",  sanitize_text_field(wp_unslash($_POST["localpro_biz_hours_{$d}_open"]  ?? '')));
            update_option("localpro_biz_hours_{$d}_close", sanitize_text_field(wp_unslash($_POST["localpro_biz_hours_{$d}_close"] ?? '')));
        }
    }

    set_transient('localpro_biz_saved', true, 30);

    wp_redirect(
        add_query_arg(
            ['page' => 'localpro-business', 'tab' => sanitize_key($_POST['_active_tab'] ?? 'nap')],
            admin_url('admin.php')
        )
    );
    exit;
});


// ─── Page Renderer ────────────────────────────────────────────────────────────

function localpro_biz_render_page(): void
{
    if (! current_user_can('manage_options')) return;

    $tabs = [
        'nap'        => 'NAP & Contact',
        'address'    => 'Address & Location',
        'gbp'        => 'GBP Identity',
        'hours'      => 'Business Hours',
        'attributes' => 'Attributes & Details',
        'social'     => 'Social & Profiles',
    ];

    $active = sanitize_key($_GET['tab'] ?? 'nap');
    if (! array_key_exists($active, $tabs)) $active = 'nap';

    $saved = get_transient('localpro_biz_saved');
    if ($saved) delete_transient('localpro_biz_saved');

    // $page_url = admin_url('admin.php?page=localpro-business');
?>
    <div class="wrap lp-biz-wrap">

        <h1 class="lp-biz-heading">
            <span class="dashicons dashicons-store"></span>
            <?php esc_html_e('Business Information', 'localpro'); ?>
        </h1>

        <div class="lp-places-autofill-panel">
            <div class="lp-places-autofill-header">
                <span class="dashicons dashicons-search"></span>
                <strong><?php esc_html_e('Autofill from Google Places', 'localpro'); ?></strong>
                <span class="lp-autofill-hint"><?php esc_html_e('Search for the business to populate all available fields automatically.', 'localpro'); ?></span>
            </div>
            <div class="lp-places-search-wrap">
                <input type="text"
                    id="lp-places-search"
                    placeholder="<?php esc_attr_e('Search business name and city…', 'localpro'); ?>"
                    autocomplete="off">
                <ul id="lp-places-dropdown" class="lp-places-dropdown" hidden></ul>
            </div>
            <p id="lp-places-status" class="lp-places-status" hidden></p>
            <p class="lp-autofill-note">
                <?php esc_html_e('Auto-filled: name, phone, address, hours, website, coordinates, Maps URL, Place ID, primary category, price range. Manual entry still needed for: GBP description, additional categories, and social/directory profiles.', 'localpro'); ?>
            </p>
        </div>

        <?php if ($saved) : ?>
            <div class="notice notice-success is-dismissible">
                <p><strong><?php esc_html_e('Business settings saved.', 'localpro'); ?></strong></p>
            </div>
        <?php endif; ?>

        <nav class="lp-biz-tabs" aria-label="Settings sections">
            <?php foreach ($tabs as $slug => $label) : ?>
                <a href="#"
                    class="lp-biz-tab <?php echo $active === $slug ? 'is-active' : ''; ?>"
                    data-tab="<?php echo esc_attr($slug); ?>">
                    <?php echo esc_html($label); ?>
                </a>
            <?php endforeach; ?>
        </nav>

        <form method="post" action="<?php echo esc_url(admin_url('admin.php')); ?>" class="lp-biz-form">
            <?php wp_nonce_field('localpro_biz_save', 'localpro_biz_nonce'); ?>
            <input type="hidden" name="_active_tab" value="<?php echo esc_attr($active); ?>">

            <div class="lp-biz-tab-content">
                <?php foreach (array_keys($tabs) as $slug) : ?>
                    <div class="lp-biz-tab-pane <?php echo $active === $slug ? 'is-active' : ''; ?>"
                        data-pane="<?php echo esc_attr($slug); ?>">
                        <?php
                        match ($slug) {
                            'nap'        => localpro_biz_tab_nap(),
                            'address'    => localpro_biz_tab_address(),
                            'gbp'        => localpro_biz_tab_gbp(),
                            'hours'      => localpro_biz_tab_hours(),
                            'attributes' => localpro_biz_tab_attributes(),
                            'social'     => localpro_biz_tab_social(),
                            default      => null,
                        };
                        ?>
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="lp-biz-actions">
                <?php submit_button(__('Save Settings', 'localpro'), 'primary large', 'submit', false); ?>
            </div>

        </form>
    </div>
<?php
}


// ─── Field Helpers ────────────────────────────────────────────────────────────

function lp_biz_section(string $title, string $desc = ''): void
{ ?>
    <div class="lp-biz-section-header">
        <h2><?php echo esc_html($title); ?></h2>
        <?php if ($desc) : ?>
            <p><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
    </div>
<?php }

function lp_biz_field_text(string $key, string $label, string $desc = '', string $type = 'text'): void
{
    $id  = "localpro_biz_{$key}";
    $val = localpro_biz($key);
?>
    <div class="lp-biz-field">
        <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label>
        <input type="<?php echo esc_attr($type); ?>"
            id="<?php echo esc_attr($id); ?>"
            name="<?php echo esc_attr($id); ?>"
            value="<?php echo esc_attr($val); ?>">
        <?php if ($desc) : ?>
            <p class="description"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
    </div>
<?php
}

function lp_biz_field_textarea(string $key, string $label, string $desc = '', int $rows = 4): void
{
    $id  = "localpro_biz_{$key}";
    $val = localpro_biz($key);
?>
    <div class="lp-biz-field">
        <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label>
        <textarea id="<?php echo esc_attr($id); ?>"
            name="<?php echo esc_attr($id); ?>"
            rows="<?php echo esc_attr((string) $rows); ?>"><?php echo esc_textarea($val); ?></textarea>
        <?php if ($desc) : ?>
            <p class="description"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
    </div>
<?php
}

function lp_biz_field_checkbox(string $key, string $label, string $desc = ''): void
{
    $id      = "localpro_biz_{$key}";
    $checked = localpro_biz($key) === '1';
?>
    <div class="lp-biz-field lp-biz-field--checkbox">
        <label>
            <input type="checkbox"
                id="<?php echo esc_attr($id); ?>"
                name="<?php echo esc_attr($id); ?>"
                value="1" <?php checked($checked); ?>>
            <?php echo esc_html($label); ?>
        </label>
        <?php if ($desc) : ?>
            <p class="description"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
    </div>
<?php
}

function lp_biz_field_select(string $key, string $label, array $options, string $desc = ''): void
{
    $id  = "localpro_biz_{$key}";
    $val = localpro_biz($key);
?>
    <div class="lp-biz-field">
        <label for="<?php echo esc_attr($id); ?>"><?php echo esc_html($label); ?></label>
        <select id="<?php echo esc_attr($id); ?>" name="<?php echo esc_attr($id); ?>">
            <option value="">— Select —</option>
            <?php foreach ($options as $opt_val => $opt_label) : ?>
                <option value="<?php echo esc_attr($opt_val); ?>" <?php selected($val, $opt_val); ?>>
                    <?php echo esc_html($opt_label); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <?php if ($desc) : ?>
            <p class="description"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
    </div>
<?php
}


// ─── Tab: NAP & Contact ───────────────────────────────────────────────────────

function localpro_biz_tab_nap(): void
{
    lp_biz_section('Name, Address & Phone', 'Core NAP — must match your GBP listing character-for-character.');
?>
    <div class="lp-biz-fields">
        <?php
        lp_biz_field_text('name',           'Business Name',       'Exact name as it appears on Google Business Profile.');
        lp_biz_field_text('phone',          'Primary Phone',       'Main local number. Format consistently, e.g. (813) 555-0100');
        lp_biz_field_text('phone_alt',      'Secondary Phone',     'Optional alternate local number.');
        lp_biz_field_text('phone_tollfree', 'Toll-Free Number');
        lp_biz_field_text('fax',            'Fax Number');
        ?>
    </div>

    <?php lp_biz_section('Email & Online Presence'); ?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('email',           'Public Email',            'Primary public-facing address.', 'email');
        lp_biz_field_text('email_support',   'Support / Contact Email', '',                              'email');
        lp_biz_field_text('website',         'Website URL',             'Full URL including https://',   'url');
        lp_biz_field_text('appointment_url', 'Appointment / Booking URL', 'Online scheduling link.',     'url');
        lp_biz_field_text('menu_url',        'Menu URL',                'Restaurants: link to online menu.', 'url');
        ?>
    </div>
<?php
}


// ─── Tab: Address & Location ──────────────────────────────────────────────────

function localpro_biz_tab_address(): void
{
    lp_biz_section('Physical Address', 'SABs that hide their address on GBP should still complete this for schema markup and internal use.');
?>
    <div class="lp-biz-fields">
        <?php lp_biz_field_checkbox('is_sab', 'Service Area Business — no storefront / hides address on GBP'); ?>
    </div>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('address_street',  'Street Address',   'e.g. 123 Main St');
        lp_biz_field_text('address_street2', 'Suite / Unit',     'Apt, Suite, Floor, etc.');
        lp_biz_field_text('address_city',    'City');
        lp_biz_field_text('address_state',   'State',            'Two-letter abbreviation, e.g. FL');
        lp_biz_field_text('address_zip',     'ZIP Code');
        lp_biz_field_text('address_country', 'Country',          'e.g. US');
        ?>
    </div>
    <div class="lp-biz-fields">
        <?php lp_biz_field_text('address_full', 'Full Formatted Address', 'Complete one-line address. Will be auto-filled by Places API. Used in templates and LocalBusiness schema.'); ?>
    </div>

    <?php lp_biz_section('Coordinates & Maps'); ?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('lat', 'Latitude',  'e.g. 27.9506');
        lp_biz_field_text('lng', 'Longitude', 'e.g. -82.4572');
        ?>
    </div>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('maps_url',  'Google Maps URL',  'Full Google Maps link for this listing.', 'url');
        lp_biz_field_text('place_id',  'Google Place ID',  'Permanent identifier. Stored here for Places API refresh calls.');
        ?>
    </div>

    <?php lp_biz_section('Service Area', 'For SABs — defines the geographic area served.'); ?>
    <div class="lp-biz-fields">
        <?php
        lp_biz_field_textarea('service_area',  'Service Area Description', 'Cities, counties, or regions. e.g. "Tampa, St. Petersburg, Clearwater and surrounding Hillsborough and Pinellas counties."', 3);
        lp_biz_field_text('service_radius', 'Service Radius (miles)',   'Approximate radius from base location.');
        ?>
    </div>
<?php
}


// ─── Tab: GBP Identity ────────────────────────────────────────────────────────

function localpro_biz_tab_gbp(): void
{
    lp_biz_section('Categories', 'Primary category is the single strongest on-page GBP ranking factor.');

    $schema_types = [
        'LocalBusiness'              => 'Local Business (generic)',
        'HomeAndConstructionBusiness' => 'Home & Construction Business',
        'Plumber'                    => 'Plumber',
        'HVACBusiness'               => 'HVAC Business',
        'Electrician'                => 'Electrician',
        'RoofingContractor'          => 'Roofing Contractor',
        'GeneralContractor'          => 'General Contractor',
        'Painter'                    => 'Painter',
        'Locksmith'                  => 'Locksmith',
        'PestControlService'         => 'Pest Control',
        'Landscaper'                 => 'Landscaper',
        'CleaningService'            => 'Cleaning Service',
        'MovingCompany'              => 'Moving Company',
        'AutoRepair'                 => 'Auto Repair',
        'Dentist'                    => 'Dentist',
        'Physician'                  => 'Physician / Doctor',
        'LegalService'               => 'Legal Service',
        'Attorney'                   => 'Attorney / Lawyer',
        'AccountingService'          => 'Accounting Service',
        'InsuranceAgency'            => 'Insurance Agency',
        'RealEstateAgent'            => 'Real Estate Agent',
        'Restaurant'                 => 'Restaurant',
        'FoodEstablishment'          => 'Food Establishment',
        'HairSalon'                  => 'Hair Salon',
        'BeautySalon'                => 'Beauty Salon',
        'SpaOrBeautyParlor'          => 'Spa',
        'GymOrHealthClub'            => 'Gym / Fitness',
        'PetStore'                   => 'Pet Store',
        'VeterinaryCare'             => 'Veterinary Care',
        'Hotel'                      => 'Hotel',
        'Store'                      => 'Retail Store',
    ];
?>
    <div class="lp-biz-fields">
        <?php
        lp_biz_field_text('gbp_primary', 'GBP Primary Category', 'Enter the exact category name shown on the GBP listing, e.g. "Handyman/Handywoman/Handyperson".');
        ?>
        <p id="lp-gbp-types-hint" class="description" hidden style="font-style:italic; color:#646970;"></p>
        <?php

        lp_biz_field_textarea('gbp_secondary', 'GBP Secondary Categories', 'One per line. Supports up to 9 additional categories.', 4);
        lp_biz_field_select('schema_type',   'Schema.org Business Type',   $schema_types, 'Determines the structured data type used in LocalBusiness schema markup.');
        ?>
    </div>

    <?php lp_biz_section('Business Description', 'Google allows up to 750 characters. Lead with your primary service keyword and city.'); ?>
    <div class="lp-biz-fields">
        <?php lp_biz_field_textarea('description', 'Business Description', '', 6); ?>
        <p class="description lp-char-counter">
            <span class="lp-chars-used" data-target="localpro_biz_description">0</span> / 750 characters
        </p>
    </div>

    <?php lp_biz_section('Business Details'); ?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('opening_date', 'Opening / Established Date', 'Format: YYYY-MM-DD — used in schema markup.');
        lp_biz_field_select('price_range', 'Price Range', [
            '$'    => '$ — Inexpensive',
            '$$'   => '$$ — Moderate',
            '$$$'  => '$$$ — Expensive',
            '$$$$' => '$$$$ — Very Expensive',
        ], 'Shown on GBP and used in schema markup.');
        ?>
    </div>
<?php
}


// ─── Tab: Business Hours ──────────────────────────────────────────────────────

function localpro_biz_tab_hours(): void
{
    lp_biz_section('Regular Business Hours', 'Hours must match GBP exactly. Mismatches are a negative consistency signal.');

    $days = [
        'mon' => 'Monday',
        'tue' => 'Tuesday',
        'wed' => 'Wednesday',
        'thu' => 'Thursday',
        'fri' => 'Friday',
        'sat' => 'Saturday',
        'sun' => 'Sunday',
    ];
?>
    <table class="lp-biz-hours-table widefat striped">
        <thead>
            <tr>
                <th class="lp-col-day">Day</th>
                <th class="lp-col-closed">Closed</th>
                <th class="lp-col-time">Opens</th>
                <th class="lp-col-time">Closes</th>
                <th class="lp-col-allday">24 Hrs</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($days as $slug => $label) :
                $closed = localpro_biz("hours_{$slug}_closed") === '1';
                $h24    = localpro_biz("hours_{$slug}_24hr")   === '1';
                $open   = localpro_biz("hours_{$slug}_open");
                $close  = localpro_biz("hours_{$slug}_close");
                $row_class = $closed ? 'lp-biz-hours-row is-closed' : ($h24 ? 'lp-biz-hours-row is-24hr' : 'lp-biz-hours-row');
            ?>
                <tr class="<?php echo esc_attr($row_class); ?>">
                    <td class="lp-col-day"><strong><?php echo esc_html($label); ?></strong></td>
                    <td class="lp-col-closed">
                        <input type="checkbox"
                            class="lp-hours-closed"
                            name="localpro_biz_hours_<?php echo esc_attr($slug); ?>_closed"
                            value="1" <?php checked($closed); ?>>
                    </td>
                    <td class="lp-col-time">
                        <input type="text"
                            class="lp-hours-time"
                            name="localpro_biz_hours_<?php echo esc_attr($slug); ?>_open"
                            value="<?php echo esc_attr($open); ?>"
                            placeholder="8:00 AM"
                            <?php echo ($closed || $h24) ? 'disabled' : ''; ?>>
                    </td>
                    <td class="lp-col-time">
                        <input type="text"
                            class="lp-hours-time"
                            name="localpro_biz_hours_<?php echo esc_attr($slug); ?>_close"
                            value="<?php echo esc_attr($close); ?>"
                            placeholder="5:00 PM"
                            <?php echo ($closed || $h24) ? 'disabled' : ''; ?>>
                    </td>
                    <td class="lp-col-allday">
                        <input type="checkbox"
                            class="lp-hours-24hr"
                            name="localpro_biz_hours_<?php echo esc_attr($slug); ?>_24hr"
                            value="1" <?php checked($h24); ?>
                            <?php echo $closed ? 'disabled' : ''; ?>>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <div class="lp-biz-fields" style="margin-top:1.5rem;">
        <?php lp_biz_field_textarea('hours_notes', 'Special Hours / Holiday Notes', 'e.g. "Closed Thanksgiving and Christmas. Holiday hours may vary — call ahead."', 3); ?>
    </div>
<?php
}


// ─── Tab: Attributes & Details ────────────────────────────────────────────────

function localpro_biz_tab_attributes(): void
{
    lp_biz_section('Business Details', 'Used in schema markup, trust signals, and dynamic template content.');
?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('founded_year',    'Year Founded / Established', 'e.g. 2005 — used in "X years in business" copy.');
        lp_biz_field_text('num_employees',   'Number of Employees',        'e.g. 12 or "10–49"');
        lp_biz_field_text('license_number',  'License Number',             'State or trade license number.');
        lp_biz_field_text('license_state',   'License State',              'Two-letter abbreviation.');
        lp_biz_field_text('insurance',       'Insurance / Bond Info',      'e.g. "Licensed, Bonded & Insured"');
        lp_biz_field_text('languages',       'Languages Spoken',           'e.g. English, Spanish');
        lp_biz_field_text('payment_methods', 'Payment Methods Accepted',   'e.g. Cash, Check, Visa, Mastercard, Zelle, Financing');
        ?>
    </div>

    <?php lp_biz_section('Identity & Ownership Attributes', 'GBP attributes that affect which searches your listing surfaces for.'); ?>
    <div class="lp-biz-fields lp-biz-fields--checkboxes">
        <?php
        lp_biz_field_checkbox('attr_women_owned',   'Women-Owned Business');
        lp_biz_field_checkbox('attr_veteran_owned', 'Veteran-Owned Business');
        lp_biz_field_checkbox('attr_black_owned',   'Black-Owned Business');
        lp_biz_field_checkbox('attr_latino_owned',  'Latino-Owned Business');
        lp_biz_field_checkbox('attr_lgbtq_friendly', 'LGBTQ+ Friendly');
        ?>
    </div>

    <?php lp_biz_section('Accessibility'); ?>
    <div class="lp-biz-fields lp-biz-fields--checkboxes">
        <?php
        lp_biz_field_checkbox('attr_wheelchair_entrance', 'Wheelchair Accessible Entrance');
        lp_biz_field_checkbox('attr_wheelchair_parking',  'Wheelchair Accessible Parking');
        lp_biz_field_checkbox('attr_wheelchair_restroom', 'Wheelchair Accessible Restroom');
        lp_biz_field_checkbox('attr_wifi',                'Free Wi-Fi');
        ?>
    </div>

    <?php lp_biz_section('Service Attributes'); ?>
    <div class="lp-biz-fields lp-biz-fields--checkboxes">
        <?php
        lp_biz_field_checkbox('attr_free_estimates',        'Free Estimates');
        lp_biz_field_checkbox('attr_emergency_service',     '24/7 Emergency Service');
        lp_biz_field_checkbox('attr_appointment_required',  'Appointment Required');
        lp_biz_field_checkbox('attr_accepts_new_patients',  'Accepting New Patients');
        lp_biz_field_checkbox('attr_online_care',           'Online Care / Telehealth Available');
        ?>
    </div>
<?php
}


// ─── Tab: Social & Profiles ───────────────────────────────────────────────────

function localpro_biz_tab_social(): void
{
    lp_biz_section('Social Media', 'Full profile URLs. Used in footer links, schema sameAs properties, and social sharing.');
?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('facebook',  'Facebook',    '', 'url');
        lp_biz_field_text('instagram', 'Instagram',   '', 'url');
        lp_biz_field_text('twitter',   'Twitter / X', '', 'url');
        lp_biz_field_text('linkedin',  'LinkedIn',    '', 'url');
        lp_biz_field_text('youtube',   'YouTube',     '', 'url');
        lp_biz_field_text('tiktok',    'TikTok',      '', 'url');
        ?>
    </div>

    <?php lp_biz_section('Review & Directory Profiles', 'Links to external profiles — used in schema sameAs and review widget integrations.'); ?>
    <div class="lp-biz-fields lp-biz-fields--2col">
        <?php
        lp_biz_field_text('yelp',        'Yelp',        '', 'url');
        lp_biz_field_text('bbb',         'BBB Profile', '', 'url');
        lp_biz_field_text('angi',        'Angi',        '', 'url');
        lp_biz_field_text('homeadvisor', 'HomeAdvisor', '', 'url');
        lp_biz_field_text('houzz',       'Houzz',       '', 'url');
        lp_biz_field_text('nextdoor',    'Nextdoor',    '', 'url');
        lp_biz_field_text('thumbtack',   'Thumbtack',   '', 'url');
        lp_biz_field_text('tripadvisor', 'TripAdvisor', '', 'url');
        ?>
    </div>
<?php
}

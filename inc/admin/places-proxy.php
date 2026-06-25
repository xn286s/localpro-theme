<?php

/**
 * Places API (New) Proxy — REST Endpoints
 *
 * Keeps the Google API key server-side by routing all Places API requests
 * through authenticated WP REST endpoints. Uses the Places API (New) —
 * API key is passed in request headers rather than the URL, and field masks
 * ensure you only pay for the data you actually request.
 *
 * Requires: define( 'LOCALPRO_PLACES_API_KEY', 'your_key' ) in wp-config.php
 * Requires: "Places API (New)" enabled in Google Cloud Console
 *
 * Endpoints (admin-only, manage_options):
 *   GET /wp-json/localpro/v1/places-search?query=...
 *   GET /wp-json/localpro/v1/places-details?place_id=...
 *
 * @package LocalPro
 */

if (! defined('ABSPATH')) exit;


// ─── Register Routes ──────────────────────────────────────────────────────────

add_action('rest_api_init', function (): void {

    register_rest_route('localpro/v1', '/places-search', [
        'methods'             => 'GET',
        'callback'            => 'localpro_places_search',
        'permission_callback' => fn() => current_user_can('manage_options'),
        'args'                => [
            'query' => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);

    register_rest_route('localpro/v1', '/places-details', [
        'methods'             => 'GET',
        'callback'            => 'localpro_places_details',
        'permission_callback' => fn() => current_user_can('manage_options'),
        'args'                => [
            'place_id' => [
                'required'          => true,
                'sanitize_callback' => 'sanitize_text_field',
            ],
        ],
    ]);
});


// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the API key or WP_Error if not configured.
 */
function localpro_places_api_key(): string|WP_Error
{
    if (! defined('LOCALPRO_PLACES_API_KEY') || ! LOCALPRO_PLACES_API_KEY) {
        return new WP_Error('no_api_key', 'LOCALPRO_PLACES_API_KEY is not defined in wp-config.php.');
    }
    return LOCALPRO_PLACES_API_KEY;
}

/**
 * Shared headers for all Places API (New) requests.
 * Key goes in the header — never in the URL.
 */
function localpro_places_headers(string $api_key, array $extra = []): array
{
    return array_merge([
        'X-Goog-Api-Key'  => $api_key,
        'Content-Type'    => 'application/json',
        'Accept-Language' => 'en',
    ], $extra);
}


// ─── Autocomplete Search ──────────────────────────────────────────────────────

/**
 * GET /wp-json/localpro/v1/places-search?query=Sunshine+Plumbing+Tampa
 *
 * Calls the Places API (New) autocomplete endpoint (POST under the hood).
 * Returns a simplified array for the JS dropdown:
 * [
 *   { "place_id": "ChIJ...", "description": "Sunshine Plumbing, Tampa, FL, USA" },
 *   ...
 * ]
 */
function localpro_places_search(WP_REST_Request $request): WP_REST_Response
{
    $api_key = localpro_places_api_key();

    if (is_wp_error($api_key)) {
        return new WP_REST_Response(['error' => $api_key->get_error_message()], 500);
    }

    $response = wp_remote_post(
        'https://places.googleapis.com/v1/places:autocomplete',
        [
            'timeout' => 10,
            'headers' => localpro_places_headers($api_key),
            'body'    => wp_json_encode([
                'input'                => $request->get_param('query'),
                'includedPrimaryTypes' => ['establishment'],
                'languageCode'         => 'en',
            ]),
        ]
    );

    if (is_wp_error($response)) {
        return new WP_REST_Response(['error' => $response->get_error_message()], 500);
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    // Normalize to a flat array the JS dropdown expects
    $predictions = array_map(function ($suggestion): array {
        $p = $suggestion['placePrediction'] ?? [];
        return [
            'place_id'    => $p['placeId']                           ?? '',
            'description' => $p['text']['text']                      ?? '',
            'main_text'   => $p['structuredFormat']['mainText']['text']      ?? '',
            'secondary'   => $p['structuredFormat']['secondaryText']['text'] ?? '',
        ];
    }, $body['suggestions'] ?? []);

    return new WP_REST_Response($predictions, 200);
}


// ─── Place Details ────────────────────────────────────────────────────────────

/**
 * GET /wp-json/localpro/v1/places-details?place_id=ChIJ...
 *
 * Field mask controls exactly which data is returned (and billed).
 * Returns the raw Places API (New) result — the JS autofill layer maps fields.
 *
 * Key field name differences vs legacy API:
 *   displayName.text          ← was: name
 *   nationalPhoneNumber       ← was: formatted_phone_number
 *   websiteUri                ← was: website
 *   regularOpeningHours       ← was: opening_hours
 *   googleMapsUri             ← was: url
 *   location.latitude/longitude ← was: geometry.location.lat/lng
 *   id                        ← was: place_id
 *   priceLevel                ← was: price_level
 */
function localpro_places_details(WP_REST_Request $request): WP_REST_Response
{
    $api_key  = localpro_places_api_key();

    if (is_wp_error($api_key)) {
        return new WP_REST_Response(['error' => $api_key->get_error_message()], 500);
    }

    $place_id = $request->get_param('place_id');

    $field_mask = implode(',', [
        'id',
        'displayName',
        'formattedAddress',
        'addressComponents',
        'nationalPhoneNumber',
        'internationalPhoneNumber',
        'websiteUri',
        'regularOpeningHours',
        'types',
        'primaryType',
        'primaryTypeDisplayName',
        'googleMapsUri',
        'location',
        'businessStatus',
        'priceLevel',
    ]);

    $response = wp_remote_get(
        "https://places.googleapis.com/v1/places/{$place_id}",
        [
            'timeout' => 10,
            'headers' => localpro_places_headers($api_key, [
                'X-Goog-FieldMask' => $field_mask,
            ]),
        ]
    );

    if (is_wp_error($response)) {
        return new WP_REST_Response(['error' => $response->get_error_message()], 500);
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    return new WP_REST_Response($body ?? [], 200);
}

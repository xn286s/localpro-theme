/**
 * Business Settings Admin JS — localpro theme
 *
 * Handles:
 *   - Hours table: Closed / 24hr checkbox toggling
 *   - GBP description character counter
 *   - Google Places autofill: search, dropdown, field population
 *
 * Expects window.localproBiz = { restUrl, nonce } via wp_localize_script.
 */
(function () {
    'use strict';

    // ── Client-side tab switching ────────────────────────────────────────────────

    const tabLinks = document.querySelectorAll('.lp-biz-tab');
    const tabPanes = document.querySelectorAll('.lp-biz-tab-pane');
    const activeTabInput = document.querySelector('input[name="_active_tab"]');

    tabLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.dataset.tab;

            tabLinks.forEach(t => t.classList.remove('is-active'));
            tabPanes.forEach(p => p.classList.remove('is-active'));

            this.classList.add('is-active');
            document.querySelector(`.lp-biz-tab-pane[data-pane="${target}"]`)
                ?.classList.add('is-active');

            if (activeTabInput) activeTabInput.value = target;

            // Keep URL in sync without reload
            history.replaceState(null, '', `?page=localpro-business&tab=${target}`);
        });
    });

    // ── Hours table ──────────────────────────────────────────────────────────

    document.querySelectorAll('.lp-hours-closed').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const row = this.closest('.lp-biz-hours-row');
            const times = row.querySelectorAll('.lp-hours-time');
            const h24 = row.querySelector('.lp-hours-24hr');
            times.forEach(function (t) { t.disabled = checkbox.checked; });
            if (h24) h24.disabled = checkbox.checked;
            row.classList.toggle('is-closed', checkbox.checked);
        });
    });

    document.querySelectorAll('.lp-hours-24hr').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const row = this.closest('.lp-biz-hours-row');
            const times = row.querySelectorAll('.lp-hours-time');
            times.forEach(function (t) { t.disabled = checkbox.checked; });
            row.classList.toggle('is-24hr', checkbox.checked);
        });
    });


    // ── GBP description character counter ───────────────────────────────────

    const descField = document.getElementById('localpro_biz_description');
    const counter = document.querySelector('.lp-char-counter');
    const display = counter ? counter.querySelector('.lp-chars-used') : null;
    const MAX = 750;

    if (descField && display) {
        function updateCounter() {
            const len = descField.value.length;
            display.textContent = len;
            counter.classList.toggle('is-over-limit', len > MAX);
        }
        descField.addEventListener('input', updateCounter);
        updateCounter();
    }


    // ── Places autofill ──────────────────────────────────────────────────────

    const { restUrl, nonce } = window.localproBiz || {};
    const searchInput = document.getElementById('lp-places-search');
    const dropdown = document.getElementById('lp-places-dropdown');
    const statusEl = document.getElementById('lp-places-status');

    if (!searchInput || !restUrl || !nonce) return;

    let debounceTimer = null;

    searchInput.addEventListener('input', function () {
        const query = this.value.trim();
        clearTimeout(debounceTimer);

        if (query.length < 3) { hideDropdown(); return; }

        debounceTimer = setTimeout(() => fetchPredictions(query), 350);
    });

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.lp-places-search-wrap')) hideDropdown();
    });


    // ── Search ───────────────────────────────────────────────────────────────

    async function fetchPredictions(query) {
        setStatus('Searching…');
        try {
            const res = await apiFetch(`places-search?query=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Search failed.');
            if (!data.length) { setStatus('No results found.'); hideDropdown(); return; }

            showDropdown(data);
            clearStatus();
        } catch (err) {
            setStatus(`Error: ${err.message}`, 'error');
        }
    }

    function showDropdown(predictions) {
        dropdown.innerHTML = '';

        predictions.forEach(function (p) {
            const li = document.createElement('li');
            li.className = 'lp-places-result';
            li.innerHTML = `<strong>${escHtml(p.main_text)}</strong><span>${escHtml(p.secondary)}</span>`;
            li.addEventListener('click', function () { selectPlace(p.place_id, p.main_text); });
            dropdown.appendChild(li);
        });

        dropdown.hidden = false;
    }

    function hideDropdown() {
        dropdown.hidden = true;
        dropdown.innerHTML = '';
    }


    // ── Select & populate ─────────────────────────────────────────────────────

    async function selectPlace(placeId, name) {
        hideDropdown();
        searchInput.value = name;
        setStatus('Fetching business details…');

        try {
            const res = await apiFetch(`places-details?place_id=${encodeURIComponent(placeId)}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Details fetch failed.');

            populateFields(data);
            setStatus('✓ Fields populated — review each tab, then save.', 'success');
        } catch (err) {
            setStatus(`Error: ${err.message}`, 'error');
        }
    }

    function populateFields(r) {

        // ── Scalar fields ────────────────────────────────────────────────────
        const priceLevelMap = {
            PRICE_LEVEL_FREE: '$',
            PRICE_LEVEL_INEXPENSIVE: '$',
            PRICE_LEVEL_MODERATE: '$$',
            PRICE_LEVEL_EXPENSIVE: '$$$',
            PRICE_LEVEL_VERY_EXPENSIVE: '$$$$',
        };

        const fields = {
            localpro_biz_name: r.displayName?.text,
            localpro_biz_phone: r.nationalPhoneNumber,
            localpro_biz_address_full: r.formattedAddress,
            localpro_biz_email: r.email,
            localpro_biz_website: r.websiteUri,
            localpro_biz_maps_url: r.googleMapsUri,
            localpro_biz_place_id: r.id,
            localpro_biz_lat: r.location?.latitude?.toString(),
            localpro_biz_lng: r.location?.longitude?.toString(),
            localpro_biz_gbp_primary: r.primaryTypeDisplayName?.text ?? r.types?.[0] ?? '',
            localpro_biz_price_range: r.priceLevel ? (priceLevelMap[r.priceLevel] ?? '') : '',
        };

        Object.entries(fields).forEach(function ([id, val]) {
            if (val != null && val !== '') setField(id, val);
        });

        // Show raw types as a reference hint
        if (Array.isArray(r.types) && r.types.length) {
            const hint = document.getElementById('lp-gbp-types-hint');
            if (hint) {
                hint.textContent = 'Google types: ' + r.types.join(', ');
                hint.hidden = false;
            }
        }

        // ── Address components ───────────────────────────────────────────────
        if (Array.isArray(r.addressComponents)) {
            parseAddressComponents(r.addressComponents);
        }

        // ── Hours ────────────────────────────────────────────────────────────
        if (r.regularOpeningHours?.periods) {
            parseHours(r.regularOpeningHours.periods);
        }
    }

    function parseAddressComponents(components) {
        // Internal staging object for building street address
        const parts = {};

        const typeMap = {
            street_number: { staging: '_num' },
            route: { staging: '_route' },
            locality: { field: 'localpro_biz_address_city', useShort: false },
            administrative_area_level_1: { field: 'localpro_biz_address_state', useShort: true },
            postal_code: { field: 'localpro_biz_address_zip', useShort: false },
            country: { field: 'localpro_biz_address_country', useShort: true },
        };

        components.forEach(function (c) {
            const type = c.types?.[0];
            const mapped = typeMap[type];
            if (!mapped) return;

            const val = mapped.useShort ? c.shortText : c.longText;

            if (mapped.staging) {
                parts[mapped.staging] = val;
            } else {
                setField(mapped.field, val);
            }
        });

        // Combine street number + route
        const street = [parts._num, parts._route].filter(Boolean).join(' ');
        if (street) setField('localpro_biz_address_street', street);
    }

    function parseHours(periods) {
        // New Places API: day 0 = Sunday … 6 = Saturday
        const daySlugMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const daysWithHours = new Set();

        periods.forEach(function (period) {
            const dayNum = period.open?.day;
            const daySlug = daySlugMap[dayNum];
            if (!daySlug) return;

            daysWithHours.add(daySlug);

            // 24-hour day: no close period
            const is24 = !period.close;

            setHoursRow(daySlug, {
                closed: false,
                h24: is24,
                open: is24 ? '' : formatHour(period.open?.hour, period.open?.minute),
                close: is24 ? '' : formatHour(period.close?.hour, period.close?.minute),
            });
        });

        // Days with no period = closed
        daySlugMap.forEach(function (slug) {
            if (!daysWithHours.has(slug)) {
                setHoursRow(slug, { closed: true, h24: false, open: '', close: '' });
            }
        });
    }

    function setHoursRow(daySlug, { closed, h24, open, close }) {
        setCheckbox(`localpro_biz_hours_${daySlug}_closed`, closed);
        setCheckbox(`localpro_biz_hours_${daySlug}_24hr`, h24);
        setField(`localpro_biz_hours_${daySlug}_open`, open);
        setField(`localpro_biz_hours_${daySlug}_close`, close);
    }

    function formatHour(hour, minute) {
        if (hour == null) return '';
        const h = hour % 12 || 12;
        const m = String(minute ?? 0).padStart(2, '0');
        const ampm = hour < 12 ? 'AM' : 'PM';
        return `${h}:${m} ${ampm}`;
    }


    // ── DOM helpers ───────────────────────────────────────────────────────────

    function setField(id, val) {
        const el = document.getElementById(id);
        if (!el || val == null) return;
        el.value = val;
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function setCheckbox(id, checked) {
        const el = document.getElementById(id);
        if (!el) return;
        el.checked = checked;
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function setStatus(msg, type = '') {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'lp-places-status' + (type ? ` is-${type}` : '');
        statusEl.hidden = false;
    }

    function clearStatus() {
        if (!statusEl) return;
        statusEl.hidden = true;
    }

    function apiFetch(path) {
        return fetch(restUrl + path, { headers: { 'X-WP-Nonce': nonce } });
    }

    function escHtml(str) {
        const d = document.createElement('div');
        d.textContent = str ?? '';
        return d.innerHTML;
    }

})();
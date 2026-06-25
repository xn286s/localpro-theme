<?php

/**
 * Title: Hero
 * Slug: localpro/hero
 * Categories: localpro, section, hero
 */

$bg_image = 'https://picsum.photos/1920/1080';
?>

<!-- wp:cover {"url":"<?= $bg_image; ?>","id":116,"hasParallax":true,"dimRatio":50,"overlayColor":"contrast","isUserOverlayColor":true,"contentPosition":"center center","tagName":"section","sizeSlug":"full","metadata":{"name":"Hero","categories":["hero"]},"layout":{"type":"constrained"}} -->
<section class="wp-block-cover has-parallax">
    <div class="wp-block-cover__image-background wp-image-116 size-full has-parallax" style="background-position:50% 50%;background-image:url(<?= $bg_image; ?>)"></div><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim"></span>
    <div class="wp-block-cover__inner-container"><!-- wp:columns -->
        <div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"top","layout":{"type":"constrained","contentSize":""}} -->
            <div class="wp-block-column is-vertically-aligned-top"><!-- wp:heading {"level":1,"className":"reveal","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"typography":{"textAlign":"center"}},"textColor":"white"} -->
                <h1 class="wp-block-heading has-text-align-center reveal has-white-color has-text-color has-link-color">[GBP Primary] in [Location]</h1>
                <!-- /wp:heading -->

                <!-- wp:paragraph {"className":"reveal delay-1 has-surface-color has-text-color has-link-color","style":{"elements":{"link":{"color":{"text":"var:preset|color|surface"}}},"typography":{"textAlign":"center"}},"textColor":"surface","fontSize":"label"} -->
                <p class="has-text-align-center reveal delay-1 has-surface-color has-text-color has-link-color has-label-font-size">We provide [fast, friendly] [service] to [ideal customer persona] in [Service Area] and surrounding areas. We show up on time and treat your home like it's our own.</p>
                <!-- /wp:paragraph -->

                <!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
                <div class="wp-block-group" style="padding-top:0;padding-bottom:0"><!-- wp:template-part {"slug":"button-primary","theme":"localpro","area":"uncategorized","className":"reveal delay-2"} /--></div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
    </div>
</section>
<!-- /wp:cover -->
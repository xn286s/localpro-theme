<?php
/**
 * Title: Hero
 * Slug: localpro/hero
 * Categories: localpro, section, hero
 */

$bg_image = 'https://picsum.photos/1920/1080';
?>

<!-- wp:cover {"url":"<?= $bg_image ?>","hasParallax":true,"dimRatio":50,"overlayColor":"contrast","isUserOverlayColor":true,"minHeight":100,"minHeightUnit":"vh","contentPosition":"top center","tagName":"section","sizeSlug":"full","metadata":{"name":"Hero","categories":["hero"]},"style":{"spacing":{"padding":{"top":"0"}}},"layout":{"type":"constrained"}} -->
<section class="wp-block-cover has-parallax has-custom-content-position is-position-top-center" style="padding-top:0;min-height:100vh"><div class="wp-block-cover__image-background wp-image-116 size-full has-parallax" style="background-position:50% 50%;background-image:url(https://picsum.photos/1920/1080)"></div><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"metadata":{"name":"Header Nav"},"style":{"spacing":{"padding":{"top":"0","bottom":"0"}},"elements":{"link":{"color":{"text":"var:preset|color|surface"}}}},"textColor":"surface","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-surface-color has-text-color has-link-color" style="padding-top:0;padding-bottom:0"><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column {"verticalAlignment":"center","width":"33.33%","layout":{"type":"constrained"}} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:33.33%"><!-- wp:site-logo {"width":180,"align":"left","className":"is-style-default"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"66.66%","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:66.66%"><!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:navigation {"ref":656,"style":{"typography":{"fontStyle":"normal","fontWeight":"500"}},"fontSize":"small","layout":{"type":"flex","justifyContent":"center"}} /--></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"8rem"} -->
<div style="height:8rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"top","layout":{"type":"constrained","contentSize":""}} -->
<div class="wp-block-column is-vertically-aligned-top"><!-- wp:heading {"level":1,"className":"reveal","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}},"typography":{"textAlign":"center"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center reveal has-white-color has-text-color has-link-color">[GBP Primary] in [Location]</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"reveal delay-1 has-surface-color has-text-color has-link-color","style":{"elements":{"link":{"color":{"text":"var:preset|color|surface"}}},"typography":{"textAlign":"center"}},"textColor":"surface","fontSize":"label"} -->
<p class="has-text-align-center reveal delay-1 has-surface-color has-text-color has-link-color has-label-font-size">We provide [fast, friendly] [service] to [ideal customer persona] in [Service Area]. We show up on time and treat your home like it's our own.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"center"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:0"><!-- wp:template-part {"slug":"button-primary","theme":"localpro","area":"uncategorized","className":"reveal delay-2"} /--></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></section>
<!-- /wp:cover -->
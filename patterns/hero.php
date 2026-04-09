<?php
/**
 * Title: Hero
 * Slug: localpro/hero
 * Categories: localpro, section, hero
 */

$bg_image = 'https://picsum.photos/1920/1080';
?>

<!-- wp:cover {"url":"<?= $bg_image ?>","dimRatio":50,"overlayColor":"contrast","isUserOverlayColor":true,"minHeight":100,"minHeightUnit":"vh","contentPosition":"top center","tagName":"section","sizeSlug":"full","metadata":{"name":"Hero","categories":["hero"],"patternName":"localpro/hero"},"style":{"spacing":{"padding":{"top":"0"}}},"layout":{"type":"constrained"}} -->
<section class="wp-block-cover has-custom-content-position is-position-top-center" style="padding-top:0;min-height:100vh"><img class="wp-block-cover__image-background wp-image-116 size-full" alt="" src="<?= $bg_image ?>" data-object-fit="cover"/><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:group {"metadata":{"name":"Header"},"style":{"spacing":{"padding":{"top":"0","bottom":"0"}}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:0"><!-- wp:columns {"isStackedOnMobile":false} -->
<div class="wp-block-columns is-not-stacked-on-mobile"><!-- wp:column {"verticalAlignment":"center","width":"33.33%","layout":{"type":"constrained"}} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:33.33%"><!-- wp:site-logo {"width":256,"align":"left","className":"is-style-default"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"66.66%","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:66.66%"><!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
<div class="wp-block-group" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:navigation {"ref":656,"style":{"typography":{"fontStyle":"normal","fontWeight":"500"},"layout":{"selfStretch":"fit","flexSize":null}},"fontSize":"small","layout":{"type":"flex","justifyContent":"center"}} /--></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"10rem"} -->
<div style="height:10rem" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"top","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-column is-vertically-aligned-top"><!-- wp:heading {"textAlign":"left","level":1,"className":"reveal","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-left reveal has-white-color has-text-color has-link-color">
                        You Deserve a [GBP Primary] in [City] Who Really Cares</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"reveal delay-1","fontSize":"label"} -->
<p class="has-text-align-center reveal delay-1 has-label-font-size">We provide [fast, friendly]
                        [service] to [ideal customer persona] in [Service Area]. We show up on time, do the job right,
                        and treat your home like it's our own.</p>
<!-- /wp:paragraph -->

<!-- wp:template-part {"slug":"button-primary","theme":"localpro","area":"uncategorized","align":"wide","className":"reveal delay-2"} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></section>
<!-- /wp:cover -->
<?php
/**
 * Title: Contact
 * Slug: localpro/contact
 * Categories: localpro, section, contact
 */

$bg_image = 'https://picsum.photos/1920/1080';
?>

<!-- wp:cover {"url":"<?= $bg_image ?>","hasParallax":true,"dimRatio":50,"overlayColor":"contrast","isUserOverlayColor":true,"tagName":"section","sizeSlug":"full","metadata":{"name":"Contact"},"style":{"elements":{"link":{"color":{"text":"var:preset|color|surface"}}}},"textColor":"surface","layout":{"type":"constrained"}} -->
<section class="wp-block-cover has-parallax has-surface-color has-text-color has-link-color"><div class="wp-block-cover__image-background size-full has-parallax" style="background-position:50% 50%;background-image:url(<?= $bg_image ?>)"></div><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-50 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"verticalAlignment":"top","width":"66.66%","layout":{"type":"constrained","justifyContent":"center"}} -->
<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:66.66%"><!-- wp:heading {"textAlign":"center","className":"reveal","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center reveal has-white-color has-text-color has-link-color">Get a Free Estimate on [Service] in [City]</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"reveal","fontSize":"label"} -->
<p class="has-text-align-center reveal has-label-font-size">Ready to get started? It only takes a minute to tell us what you need, and we'll put together an honest, no-obligation estimate fast.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"left","className":"reveal","style":{"elements":{"link":{"color":{"text":"var:preset|color|surface"}}}},"textColor":"surface"} -->
<p class="has-text-align-left reveal has-surface-color has-text-color has-link-color">At [Company Name] we know that your home is an investment and you simply want to be able to trust who you hire with that investment. In order to do that, you need peace of mind knowing your home's [plumbing] is in expert hands, but finding the right [GBP primary] can be overwhelming. We believe you shouldn't have to choose between professional standards and fair pricing. We understand how stressful [emergency problem] can be, which is why we pride ourselves on [prompt response] and [professional service]. Call now so you can stop [tragedy] and experience [dream outcome].</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"top","width":"33.33%","layout":{"type":"constrained"}} -->
<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:33.33%"><!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}},"border":{"width":"2px"}},"backgroundColor":"surface","textColor":"contrast"} -->
<p class="has-text-align-center has-contrast-color has-surface-background-color has-text-color has-background has-link-color" style="border-width:2px">Lead Intake or Contact Form Goes Here<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                    </p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></section>
<!-- /wp:cover -->
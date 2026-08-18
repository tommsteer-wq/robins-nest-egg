/* ==========================================================================
   Robin's Nest Egg — visitor counting
   --------------------------------------------------------------------------
   Loads Vercel Web Analytics, but ONLY on the real website.

   WHY THIS FILE EXISTS
   Vercel also serves the site at robins-nest-egg.vercel.app, which is useful
   for checking changes before telling anyone about them. Without this, every
   one of those test visits would be counted as a real visitor and quietly
   spoil the numbers.

   HOW IT DECIDES
   It skips counting on any address ending .vercel.app, and counts everywhere
   else. That direction matters. Written the other way round — "only count on
   robinsnestegg.co.uk" — the day a new domain was added, or a www address
   slipped through, counting would stop everywhere and nothing would say so.
   This way round, a mistake means you count a few of your own test visits.
   The other way round, a mistake means you lose all your data silently.

   NO COOKIES, NO OUTSIDE COMPANY
   The counting file comes from this website's own address (the "/" at the
   start), so nothing is fetched from a third party and no cookies are set.

   TO TURN COUNTING OFF COMPLETELY
   Delete the <script> line that loads this file from each page. Nothing else
   depends on it.
   ========================================================================== */

(function () {
  'use strict';

  var host = window.location.hostname;

  /* Vercel's own preview and deployment addresses all end in .vercel.app */
  var isTestAddress = /\.vercel\.app$/i.test(host);

  /* Opening a page straight off the hard drive, for a quick local look. */
  var isLocalFile = window.location.protocol === 'file:';

  if (isTestAddress || isLocalFile) {
    return;
  }

  var s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);

}());

/* ==========================================================================
   Robin's Nest Egg — age band tabs
   --------------------------------------------------------------------------
   Turns the three age buttons on a topic page into proper tabs, so only one
   age band shows at a time.

   HOW THIS RESPECTS THE GOLDEN RULE
   All three age bands are written out in full in the HTML file, exactly as
   before. This script does not fetch, build or load any words — every word is
   already there when the page is saved. It only chooses which of them to show.
   Google reads all three regardless. Nothing is hidden from search engines.

   IF THIS SCRIPT NEVER RUNS (blocked, broken, JavaScript off), the page falls
   back to showing all three bands stacked, with the buttons working as plain
   jump links. That is deliberate: a reader always sees the content, never a
   blank page. This is the whole reason the buttons are written as links in the
   HTML rather than as buttons.

   NOTHING TO CONFIGURE. It finds its own work by looking for an element marked
   data-age-tabs. Copy the template and it just works.
   ========================================================================== */

(function () {
  'use strict';

  var choosers = document.querySelectorAll('[data-age-tabs]');
  var each = function (list, fn) { Array.prototype.forEach.call(list, fn); };

  each(choosers, function (chooser) {

    var links = chooser.querySelectorAll('a[href^="#"]');
    if (links.length < 2) { return; }

    /* Find the section each button points at. If any is missing, leave the
       page alone entirely — better to show everything than to hide a band
       we can't switch back to. */
    var panels = [];
    each(links, function (link) {
      var panel = document.getElementById(link.getAttribute('href').slice(1));
      if (panel) { panels.push(panel); }
    });
    if (panels.length !== links.length) { return; }

    /* Tell screen readers this is a set of tabs, not a list of links. */
    var list = chooser.querySelector('ul');
    if (list) {
      list.setAttribute('role', 'tablist');
      each(list.querySelectorAll('li'), function (li) {
        li.setAttribute('role', 'presentation');
      });
    }

    each(links, function (link, i) {
      var panel = panels[i];
      link.setAttribute('role', 'tab');
      link.id = 'tab-' + panel.id;
      link.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', link.id);
      panel.setAttribute('tabindex', '-1');
    });

    /* Show one band, hide the rest. */
    function show(index, moveFocus) {
      each(links, function (link, i) {
        var isOpen = (i === index);
        link.setAttribute('aria-selected', isOpen ? 'true' : 'false');
        link.setAttribute('tabindex', isOpen ? '0' : '-1');
        if (isOpen) {
          panels[i].removeAttribute('hidden');
        } else {
          panels[i].setAttribute('hidden', '');
        }
      });
      if (moveFocus) { links[index].focus(); }
    }

    each(links, function (link, i) {

      link.addEventListener('click', function (event) {
        event.preventDefault();   /* stops the page jumping down */
        show(i);
        /* Puts e.g. #fledglings in the address bar, so a parent can share a
           link straight to their child's version. */
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', link.getAttribute('href'));
        }
      });

      /* Left/right arrow keys move between tabs — the behaviour keyboard and
         screen reader users expect from tabs. */
      link.addEventListener('keydown', function (event) {
        var target = null;
        var key = event.key;
        if (key === 'ArrowRight' || key === 'ArrowDown') { target = (i + 1) % links.length; }
        if (key === 'ArrowLeft'  || key === 'ArrowUp')   { target = (i - 1 + links.length) % links.length; }
        if (key === 'Home') { target = 0; }
        if (key === 'End')  { target = links.length - 1; }
        if (target !== null) {
          event.preventDefault();
          show(target, true);
        }
      });

    });

    /* Which band opens first? If the address ends in #fledglings (a shared
       link), open that one. Otherwise open the first, which is Hatchlings. */
    var startAt = 0;
    if (window.location.hash) {
      each(links, function (link, i) {
        if (link.getAttribute('href') === window.location.hash) { startAt = i; }
      });
    }

    /* Marks the page as "tabs are working", which the stylesheet uses to show
       the selected button more strongly. */
    chooser.setAttribute('data-age-tabs', 'on');
    show(startAt);

  });

}());

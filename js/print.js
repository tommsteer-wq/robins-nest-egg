/* ==========================================================================
   Robin's Nest Egg — the print button
   --------------------------------------------------------------------------
   Opens the browser's own print window when someone clicks a button marked
   data-print. Nothing clever: it saves people hunting through a phone menu
   for "Print", which on most phones is buried two taps deep.

   The button is written into the page as a real <button>, and this file only
   attaches the click. If the file never loads, the button is hidden by the
   stylesheet, so nobody is left clicking something dead.

   WHAT ACTUALLY MAKES THE PRINTOUT TIDY is the print section at the bottom
   of css/style.css, which drops the menu, the footer and anything else that
   wastes paper. This file just opens the dialogue.
   ========================================================================== */

(function () {
  'use strict';

  var buttons = document.querySelectorAll('[data-print]');
  if (!buttons.length) { return; }

  Array.prototype.forEach.call(buttons, function (button) {
    /* Only reveal the button once we know the click will do something. */
    button.hidden = false;
    button.addEventListener('click', function () {
      window.print();
    });
  });

}());

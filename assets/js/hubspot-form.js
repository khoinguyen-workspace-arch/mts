/* ---------------------------------------------------------------
   hubspot-form.js — loads the HubSpot form into any element marked
   with data-hs-form.

   TO GO LIVE: paste the HubSpot form ID(s) into FORM_IDS below.
   Find it in HubSpot: Marketing > Forms > (open form) > Share >
   Embed code. The form ID is the long "formId" value.
   --------------------------------------------------------------- */

(function () {
  "use strict";

  var PORTAL_ID = "7407272";   // More Than Strata HubSpot account
  var REGION    = "na1";

  // Map: page path -> HubSpot form ID.
  // "default" is used for any page not listed.
  var FORM_IDS = {
    "default": "",                                  // TODO: paste form ID
    "/change-strata-manager/": "",                  // TODO: paste form ID
    "/responsive-service-more-than-strata/": ""     // TODO: paste form ID
  };

  var targets = document.querySelectorAll("[data-hs-form]");
  if (!targets.length) return;

  var path   = window.location.pathname.replace(/index\.html$/, "");
  var formId = FORM_IDS[path] || FORM_IDS["default"];

  if (!formId) {
    Array.prototype.forEach.call(targets, function (el) {
      el.className += " mts-form-missing";
      el.textContent =
        "Form not configured. Add the HubSpot form ID in assets/js/hubspot-form.js.";
    });
    console.warn("[MTS] No HubSpot form ID set for " + path);
    return;
  }

  // Give each target a unique id so HubSpot can render into it.
  Array.prototype.forEach.call(targets, function (el, i) {
    if (!el.id) el.id = "mts-hs-form-" + i;
  });

  var script = document.createElement("script");
  script.src = "https://js.hsforms.net/forms/embed/v2.js";
  script.charset = "utf-8";
  script.type = "text/javascript";
  script.onload = function () {
    if (!window.hbspt) return;
    Array.prototype.forEach.call(targets, function (el) {
      window.hbspt.forms.create({
        portalId: PORTAL_ID,
        formId: formId,
        region: REGION,
        target: "#" + el.id
      });
    });
  };
  script.onerror = function () {
    console.error("[MTS] HubSpot form script failed to load.");
  };
  document.head.appendChild(script);
})();

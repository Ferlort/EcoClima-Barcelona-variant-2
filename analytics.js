/* =========================================================
   EcoClima Barcelona — Analytics
   Google Analytics 4 (gtag) + Google Ads conversions
   Exposes: window.EcoAnalytics
   ========================================================= */

(function () {
  'use strict';

  // Replace with your real IDs
  var GA4_ID = 'G-XXXXXXX';
  var ADS_ID = 'AW-XXXXXXX';
  var ADS_LABEL = 'abcDEF123'; // Google Ads conversion label

  /** Safe gtag wrapper. No-ops if gtag is not loaded. */
  function safeGtag() {
    if (typeof window.gtag === 'function') {
      try { window.gtag.apply(null, arguments); } catch (e) { /* noop */ }
    } else if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push(arguments);
    }
    // Dev log (remove on prod if noisy)
    if (window.__ECO_DEBUG__) console.log('[analytics]', arguments);
  }

  /**
   * Track a GA4 event with optional params.
   * @param {string} eventName
   * @param {object} [params]
   */
  function trackEvent(eventName, params) {
    safeGtag('event', eventName, params || {});
  }

  /**
   * Track a conversion for Google Ads.
   * Called on every lead-quality action: form submit, WhatsApp, phone.
   */
  function trackConversion(source, value) {
    safeGtag('event', 'conversion', {
      send_to: ADS_ID + '/' + ADS_LABEL,
      value: value || 1.0,
      currency: 'EUR',
      transaction_id: '',
      event_source: source || 'unknown'
    });
  }

  /** Form submit event. */
  function trackForm(formName, extra) {
    trackEvent('form_submit', Object.assign({
      form_name: formName || 'contact',
      page_location: location.href
    }, extra || {}));
    trackConversion('form_submit');
  }

  /** WhatsApp click. */
  function trackWhatsApp(context) {
    trackEvent('whatsapp_click', {
      context: context || 'generic',
      page_location: location.href
    });
    trackConversion('whatsapp');
  }

  /** Phone click. */
  function trackPhone(context) {
    trackEvent('phone_click', {
      context: context || 'generic',
      page_location: location.href
    });
    trackConversion('phone');
  }

  /** Telegram click. */
  function trackTelegram(context) {
    trackEvent('telegram_click', {
      context: context || 'generic',
      page_location: location.href
    });
    trackConversion('telegram');
  }

  /** Calculator usage. */
  function trackCalculator(payload) {
    trackEvent('calculator_used', Object.assign({
      page_location: location.href
    }, payload || {}));
  }

  /** Chatbot open. */
  function trackChatbot(action) {
    trackEvent('chatbot_' + (action || 'open'), {
      page_location: location.href
    });
  }

  /** Attach click listeners to all .js-whatsapp and .js-phone elements. */
  function bindAutoTrackers() {
    document.querySelectorAll('.js-whatsapp').forEach(function (el) {
      el.addEventListener('click', function () {
        trackWhatsApp(el.getAttribute('data-ctx') || el.closest('section')?.id || 'link');
      });
    });
    document.querySelectorAll('.js-phone').forEach(function (el) {
      el.addEventListener('click', function () {
        trackPhone(el.getAttribute('data-ctx') || el.closest('section')?.id || 'link');
      });
    });
    document.querySelectorAll('.js-telegram').forEach(function (el) {
      el.addEventListener('click', function () {
        trackTelegram(el.getAttribute('data-ctx') || el.closest('section')?.id || 'link');
      });
    });
  }

  // Auto-bind when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAutoTrackers);
  } else {
    bindAutoTrackers();
  }

  // Public API
  window.EcoAnalytics = {
    trackEvent: trackEvent,
    trackForm: trackForm,
    trackWhatsApp: trackWhatsApp,
    trackPhone: trackPhone,
    trackTelegram: trackTelegram,
    trackCalculator: trackCalculator,
    trackChatbot: trackChatbot,
    trackConversion: trackConversion,
    _ids: { GA4_ID: GA4_ID, ADS_ID: ADS_ID }
  };
})();

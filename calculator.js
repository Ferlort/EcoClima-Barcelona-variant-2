/* =========================================================
   EcoClima Barcelona — Price Calculator
   Formula: price = base * housing * accessibility * equipment
   ========================================================= */

(function () {
  'use strict';

  /** Coefficient tables — tune freely. */
  var BASE = {
    instalacion:   390,
    mantenimiento: 85,
    reparacion:    120
  };
  var HOUSING = {
    piso:  1.00,
    atico: 1.15,
    casa:  1.25,
    local: 1.35
  };
  var ACCESS = {
    facil:   1.00,
    media:   1.15,
    dificil: 1.35
  };
  // Equipment multiplier = 1 + 0.85 * (n - 1) — diminishing cost per extra unit
  function equipmentMultiplier(n) {
    n = parseInt(n, 10) || 1;
    return 1 + 0.85 * Math.max(0, n - 1);
  }

  /** Currency formatter (EUR, Spanish locale, no decimals). */
  var euroFmt = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  /**
   * Compute estimated price from form values.
   * @returns {{price: number, inputs: object}}
   */
  function calculate(inputs) {
    var base    = BASE[inputs.tipo_servicio]    ?? BASE.instalacion;
    var housing = HOUSING[inputs.tipo_vivienda] ?? 1;
    var access  = ACCESS[inputs.accesibilidad]  ?? 1;
    var equip   = equipmentMultiplier(inputs.equipos);

    var raw = base * housing * access * equip;
    // Round to nearest 10€ for a cleaner price tag
    var price = Math.round(raw / 10) * 10;
    return { price: price, inputs: inputs };
  }

  /** Read values from the calculator form. */
  function readForm(form) {
    return {
      tipo_servicio: form.querySelector('#tipo_servicio').value,
      tipo_vivienda: form.querySelector('#tipo_vivienda').value,
      equipos:       form.querySelector('#equipos').value,
      accesibilidad: form.querySelector('#accesibilidad').value
    };
  }

  /** Render result and track it. */
  function update(form, output) {
    var inputs = readForm(form);
    var result = calculate(inputs);
    output.textContent = euroFmt.format(result.price);

    if (window.EcoAnalytics) {
      window.EcoAnalytics.trackCalculator({
        service:  inputs.tipo_servicio,
        housing:  inputs.tipo_vivienda,
        units:    inputs.equipos,
        access:   inputs.accesibilidad,
        price:    result.price
      });
    }
    return result;
  }

  /** Init on DOM ready. */
  function init() {
    var form   = document.getElementById('calculator');
    var output = document.getElementById('priceValue');
    var button = document.getElementById('requestPrice');
    if (!form || !output) return;

    // First render
    update(form, output);

    // Re-calc on any change
    form.addEventListener('change', function () { update(form, output); });

    // "Solicitar este precio" → open WhatsApp with pre-filled message
    if (button) {
      button.addEventListener('click', function () {
        var result = update(form, output);
        var i = result.inputs;
        var msg = encodeURIComponent(
          'Hola, quiero solicitar este presupuesto:\n' +
          '• Servicio: '      + i.tipo_servicio + '\n' +
          '• Vivienda: '      + i.tipo_vivienda + '\n' +
          '• Equipos: '       + i.equipos + '\n' +
          '• Accesibilidad: ' + i.accesibilidad + '\n' +
          '• Precio estimado: ' + euroFmt.format(result.price)
        );
        if (window.EcoAnalytics) {
          window.EcoAnalytics.trackWhatsApp('calculator_request');
          window.EcoAnalytics.trackConversion('calculator');
        }
        window.open('https://wa.me/34637575000?text=' + msg, '_blank', 'noopener');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API for testing / external use
  window.EcoCalculator = { calculate: calculate, BASE: BASE, HOUSING: HOUSING, ACCESS: ACCESS };
})();

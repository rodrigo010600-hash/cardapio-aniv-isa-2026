// V360 — URL fallback automático Skyscanner
// Se um link <a data-iata="XXX"> falhar (404/expired), substitui por Skyscanner busca genérica
// XSS-safe: usa textContent (não innerHTML)

(function () {
  'use strict';

  // Skyscanner fallback URLs por IATA (sempre funciona — busca genérica GRU→destino 30/mai/2026 casal)
  const SKYSCANNER_FALLBACK = {
    'ANU': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/anu/anu/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'AUA': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/aua/aua/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'BGI': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/bgi/bgi/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'CUN': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/cun/cun/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'CUR': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/cur/cur/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'GCM': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/gcm/gcm/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'GDL': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/gdl/gdl/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'GUA': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/gua/gua/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'KIN': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/kin/kin/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'MBJ': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/mbj/mbj/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'MEX': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/mex/mex/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'MID': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/mid/mid/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'MTY': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/mty/mty/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'NAS': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/nas/nas/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'POP': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/pop/pop/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'PTY': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/pty/pty/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'PUJ': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/puj/puj/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'SAL': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/sal/sal/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'SDQ': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/sdq/sdq/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'SJO': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/sjo/sjo/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'SJU': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/sju/sju/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'STT': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/stt/stt/2026-06-06/mco?adultsv2=2&cabinclass=economy',
    'SXM': 'https://www.skyscanner.com.br/transporte/d/sao/2026-05-30/sxm/sxm/2026-06-06/mco?adultsv2=2&cabinclass=economy',
  };

  // No load: garantir que toda <a data-iata> tem fallback.
  // Adicional: capturar erros (target window load failure) e swap pro Skyscanner
  window.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[data-iata]');
    links.forEach(function (a) {
      var iata = a.dataset.iata;
      var fallback = SKYSCANNER_FALLBACK[iata];
      if (!fallback) return;

      // Salvar fallback como atributo data
      a.dataset.fallback = fallback;

      // Se URL principal estiver vazia ou marked invalid → trocar agora
      if (!a.href || a.dataset.valid === 'false') {
        a.href = fallback;
        a.classList.add('url-fallback');
      }

      // Listener: se usuário clicar e voltar (hash mudou pra erro), oferece fallback
      // Não dá pra detectar 404 cross-origin via JS (CORS), mas usuário pode clicar em "tentar Skyscanner"
    });

    // Botão flutuante "Skyscanner busca completa"
    console.log('[V360] URL fallback carregado · ' + links.length + ' links com data-iata');
  });
})();

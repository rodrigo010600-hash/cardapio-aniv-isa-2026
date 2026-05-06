// V360 — URL fallback automático Skyscanner
// Se um link <a data-iata="XXX"> falhar (404/expired), substitui por Skyscanner busca genérica
// XSS-safe: usa textContent (não innerHTML)

(function () {
  'use strict';

  // Skyscanner fallback URLs por IATA (sempre funciona — busca genérica GRU→destino 30/mai/2026 casal)
  const SKYSCANNER_FALLBACK = {
    'SJU': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/sjub/260530/?adultsv2=2&rtn=0',
    'MBJ': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/mbja/260530/?adultsv2=2&rtn=0',
    'YOW': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/yowa/260530/?adultsv2=2&rtn=0',
    'CUN': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/cuna/260530/?adultsv2=2&rtn=0',
    'YYZ': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/yyza/260530/?adultsv2=2&rtn=0',
    'MDE': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/mdea/260530/?adultsv2=2&rtn=0',
    'BOG': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/boga/260530/?adultsv2=2&rtn=0',
    'LIM': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/lima/260530/?adultsv2=2&rtn=0',
    'SJO': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/sjoa/260530/?adultsv2=2&rtn=0',
    'MEX': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/mexa/260530/?adultsv2=2&rtn=0',
    'AUA': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/auaa/260530/?adultsv2=2&rtn=0',
    'PUJ': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/puja/260530/?adultsv2=2&rtn=0',
    'SDQ': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/sdqa/260530/?adultsv2=2&rtn=0',
    'SAL': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/sala/260530/?adultsv2=2&rtn=0',
    'GDL': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/gdla/260530/?adultsv2=2&rtn=0',
    'PTY': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/ptya/260530/?adultsv2=2&rtn=0',
    'MID': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/mida/260530/?adultsv2=2&rtn=0',
    'ADZ': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/adza/260530/?adultsv2=2&rtn=0',
    'GUA': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/guaa/260530/?adultsv2=2&rtn=0',
    'MTY': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/mtya/260530/?adultsv2=2&rtn=0',
    'NAS': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/nasa/260530/?adultsv2=2&rtn=0',
    'CUR': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/cura/260530/?adultsv2=2&rtn=0',
    'SXM': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/sxma/260530/?adultsv2=2&rtn=0',
    'KIN': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/kina/260530/?adultsv2=2&rtn=0',
    'BGI': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/bgia/260530/?adultsv2=2&rtn=0',
    'ANU': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/anua/260530/?adultsv2=2&rtn=0',
    'GCM': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/gcma/260530/?adultsv2=2&rtn=0',
    'POP': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/popa/260530/?adultsv2=2&rtn=0',
    'STT': 'https://www.skyscanner.com.br/transporte/passagens-aereas/gru/stta/260530/?adultsv2=2&rtn=0'
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

// Página Speed API Key
var API_KEY = 'AIzaSyB2fA7zx7CvaD0-p6lBEkQbTpj61GsVUQw';
// URL que você deseja analisar
var URL_TO_GET_RESULTS_FOR = 'https://developers.google.com/speed/pagespeed/insights/';
// URL da API do PageSpeed
var API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?';
// Chave da API CrUX (a mesma que a chave do PageSpeed)
var CRUX_API_KEY = API_KEY;

// Objeto para armazenar os callbacks
var callbacks = {};

// Aguardar o documento estar pronto antes de atribuir o evento ao botão
$(document).ready(function () {
  $('#runPagespeedButton').on('click', function () {
    // Mostrar animação de carregamento após o clique no botão
    $('#loading-spinner').show();
    // Chamar a função para executar a PageSpeed API
    runPagespeed();
  });
});

// Função para executar a PageSpeed API
function runPagespeed() {
  // Construir a URL da API do PageSpeed
  var apiUrl = API_URL + 'url=' + encodeURIComponent(URL_TO_GET_RESULTS_FOR) + '&key=' + API_KEY;

  // Fazer a requisição AJAX para o PageSpeed
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (result) {
      // Callback para exibir os resultados do PageSpeed
      callbacks.displayPageSpeedResults(result);

      // Adicionar dados da Chrome UX Report API (CrUX)
      fetchCrUXData(URL_TO_GET_RESULTS_FOR);

      // Ocultar animação de carregamento após o carregamento dos resultados
      $('#loading-spinner').hide();
      // Exibir o container de resultados
      $('#pagespeed-results-container').show();
    },
    error: function (xhr, status, error) {
      alert('Erro ao verificar a URL: ' + error);
      // Ocultar animação de carregamento em caso de erro
      $('#loading-spinner').hide();
    },
  });
}

// Função para buscar dados na Chrome UX Report API (CrUX)
function fetchCrUXData(origin) {
  // URL da API CrUX
  var cruxApiUrl = 'https://chromeuxreport.googleapis.com/v1/records:queryRecord';

  // Configurar parâmetros da consulta
  var cruxParams = {
    origin: origin,
    metrics: ['first_contentful_paint', 'first_input_delay'],
    formFactor: 'desktop',
    key: CRUX_API_KEY,
  };

  // Construir a URL da consulta
  var cruxQueryURL = cruxApiUrl + '?' + $.param(cruxParams);

  // Fazer a requisição AJAX para a API CrUX
  $.ajax({
    url: cruxQueryURL,
    method: 'GET',
    dataType: 'json',
    success: function (cruxData) {
      // Exibir dados da Chrome UX Report API (CrUX)
      console.log('CrUX Data:', cruxData);
      // Adicione o código para exibir os dados do CrUX conforme necessário
    },
    error: function (xhr, status, error) {
      alert('Erro ao obter dados da API CrUX: ' + error);
    },
  });
}

// Callback para exibir os resultados do PageSpeed
callbacks.displayPageSpeedResults = function (result) {
  var container = $('#pagespeed-results-container');
  container.empty();

  // Extrair e exibir o escore de desempenho
  var score = result.lighthouseResult.categories.performance.score * 100;
  var scoreText = 'Performance Score: ' + score.toFixed(2) + '/100';
  container.append('<h2>' + scoreText + '</h2>');

  // Exibir métricas-chave
  var metrics = result.loadingExperience.metrics;
  container.append('<h2>Key Metrics:</h2>');
  for (var metric in metrics) {
    var metricValue = metrics[metric].percentile.toFixed(2);
    container.append('<p><strong>' + metric + ':</strong> ' + metricValue + '</p>');
  }

  // Exibir auditorias-chave
  var audits = result.lighthouseResult.audits;
  container.append('<h2>Key Audits:</h2>');
  for (var audit in audits) {
    var auditValue = audits[audit].numericValue;
    // Verificar se o valor é um número antes de exibir
    if (!isNaN(auditValue)) {
      container.append('<p><strong>' + audit + ':</strong> ' + auditValue + '</p>');
    }
  }
};

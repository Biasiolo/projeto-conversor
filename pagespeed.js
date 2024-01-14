// Página Speed API Key
var API_KEY = 'AIzaSyB2fA7zx7CvaD0-p6lBEkQbTpj61GsVUQw';
// URL da API do PageSpeed
var API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?';

// Objeto para armazenar os callbacks
var callbacks = {};

// Aguardar o documento estar pronto antes de atribuir o evento ao botão
$(document).ready(function () {
  $('#runPagespeedButton').on('click', function () {
    // Mostrar animação de carregamento após o clique no botão
    $('#loading-spinner').show();
    // Chamar a função para executar a PageSpeed API com a URL do input
    runPagespeed($('#urlInput').val());
  });
});

// Função para verificar se a URL é válida
function isValidURL(url) {
  // Regex para validar uma URL
  var urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)?([^\s()<>]+|\([^\s()<>]+\))+(\/?|\/\S+)$/;

  return urlRegex.test(url);
}

// Função para executar a PageSpeed API
function runPagespeed(urlToAnalyze) {
  // Verificar se a URL fornecida é válida
  if (!isValidURL(urlToAnalyze)) {
    alert('URL inválida. Certifique-se de incluir uma URL válida.');
    // Ocultar animação de carregamento em caso de erro
    $('#loading-spinner').hide();
    return;
  }

  // Construir a URL da API
  var apiUrl = API_URL + 'url=' + encodeURIComponent(urlToAnalyze) + '&key=' + API_KEY;

  // Fazer a requisição AJAX
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (result) {
      // Callback para exibir os resultados do PageSpeed
      callbacks.displayPageSpeedResults(result);
      // Ocultar animação de carregamento após o carregamento dos resultados
      $('#loading-spinner').hide();
      // Exibir o container de resultados
      $('#pagespeed-results-container').show();
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

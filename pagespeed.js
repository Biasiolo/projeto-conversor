// Página Speed API Key
var API_KEY = 'AIzaSyB2fA7zx7CvaD0-p6lBEkQbTpj61GsVUQw';
// URL da API do PageSpeed
var API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Aguardar o documento estar pronto antes de atribuir o evento ao botão
$(document).ready(function () {
  // Ocultar o container de resultados inicialmente
  $('#pagespeed-results-container').hide();

  $('#runPagespeedButton').on('click', function () {
    // Mostrar animação de carregamento após o clique no botão
    $('#loading-spinner').show();

    // Limpar o conteúdo do container de resultados
    $('#pagespeed-results-container').empty();

    // Chamar a função para executar a PageSpeed API com a URL do input
    runPagespeed($('#urlInput').val());
  });
});

// Função para executar a PageSpeed API
function runPagespeed(urlToAnalyze) {
  // Construir a URL da API com todas as categorias
  var apiUrl = API_URL + '?url=' + encodeURIComponent(urlToAnalyze) + '&key=' + API_KEY +
               '&category=accessibility&category=best-practices&category=performance&category=pwa&category=seo';

  // Fazer a requisição AJAX
  $.ajax({
    url: apiUrl,
    method: 'GET',
    dataType: 'json',
    success: function (result) {
      // Callback para exibir os resultados do PageSpeed
      displayPageSpeedResults(result);
      // Ocultar animação de carregamento após o carregamento dos resultados
      $('#loading-spinner').hide();
      // Exibir o container de resultados
      $('#pagespeed-results-container').show();
    },
  });
}

// Callback para exibir os resultados do PageSpeed
function displayPageSpeedResults(result) {
  var container = $('#pagespeed-results-container');

  // Exibir pontuações para cada categoria
  container.append('<h2>Page Scores:</h2>');
  var categories = result.lighthouseResult.categories;
  for (var category in categories) {
    var score = categories[category].score * 100;
    var scoreText = category + ' - ' + score.toFixed(0) + '/100';
    container.append('<p>' + scoreText + '</p>');
  }
}

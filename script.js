$(document).ready(function () {
    // Função para realizar a conversão
    function convert() {
        // Obtem os valores dos inputs
        var screenWidth = parseFloat($("#screenWidth").val());
        var screenHeight = parseFloat($("#screenHeight").val());
        var inputNumber = parseFloat($("#inputNumber").val());
        var inputUnit = $("#inputUnit").val();
        var conversionUnit = $("#conversionUnit").val();

        // Realiza a conversão
        var result = calculateConversion(screenWidth, screenHeight, inputNumber, inputUnit, conversionUnit);

        // Exibe o resultado
        $("#result").val(result);
    }

    function calculateConversion(screenWidth, screenHeight, inputNumber, inputUnit, conversionUnit) {
        // Define a tabela de conversão
        const conversionTable = {
            'px': 1,
            'rem': 0.0625,  // Exemplo, ajuste conforme a tabela real
            'em': 0.125,    // Exemplo, ajuste conforme a tabela real
            'vw': screenWidth / 100,  // Ajustado para representar o percentual da largura da tela
            'vh': screenHeight / 100  // Ajustado para representar o percentual da altura da tela
            // Adicione outras unidades conforme necessário
        };
    
        // Converte a largura da tela para porcentagem
        const screenWidthPercentage = screenWidth / $(window).width() * 100;
    
        // Converte a entrada para pixels em relação à largura da tela
        const inputInPixels = inputNumber * conversionTable[inputUnit] * (screenWidthPercentage / 100);
    
        // Converte de pixels para a unidade desejada
        const result = inputInPixels / conversionTable[conversionUnit];
    
        return result.toFixed(2);  // Ajusta o resultado para dois decimais, ajuste conforme necessário
    }

    // Adiciona um ouvinte de evento ao botão de converter
    $("button").on("click", function () {
        convert();
    });
});

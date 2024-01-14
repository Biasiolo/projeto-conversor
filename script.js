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
            'rem': 16,  // 1 rem é igual a 16 pixels
            'vw': screenWidth / 100,  // 1 vw é igual a 1% da largura da tela em pixel
            'vh': screenHeight / 100  // 1 vh é igual a 1% da altura da tela em pixel
            // Adicione outras unidades conforme necessário
        };
    
        // Converte a entrada para pixels em relação à largura da tela
        const inputInPixels = inputNumber * conversionTable[inputUnit];
    
        // Converte de pixels para a unidade desejada
        const result = inputInPixels / conversionTable[conversionUnit];
    
        return result.toFixed(2);  // Ajusta o resultado para dois decimais, ajuste conforme necessário
    }

    // Adiciona um ouvinte de evento ao botão de converter
    $("button").on("click", function () {
        convert();
    });
});

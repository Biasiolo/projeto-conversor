// script.js
$(document).ready(function () {
    var converter = {
        convert: function () {
            var screenWidth = parseFloat($("#screenWidth").val());
            var screenHeight = parseFloat($("#screenHeight").val());
            var inputNumber = parseFloat($("#inputNumber").val());
            var inputUnit = $("#inputUnit").val();
            var conversionUnit = $("#conversionUnit").val();

            var result = this.calculateConversion(screenWidth, screenHeight, inputNumber, inputUnit, conversionUnit);

            result += " " + conversionUnit;

            $("#result").val(result);
        },

        calculateConversion: function (screenWidth, screenHeight, inputNumber, inputUnit, conversionUnit) {
            const conversionTable = {
                'px': 1,
                'rem': 16,
                'vw': screenWidth / 100,
                'vh': screenHeight / 100
            };

            const inputInPixels = inputNumber * conversionTable[inputUnit];
            const result = inputInPixels / conversionTable[conversionUnit];

            return result.toFixed(3);
        }
    };

    $("button").on("click", function () {
        converter.convert();
    });
});

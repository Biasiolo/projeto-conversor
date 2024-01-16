$(document).ready(function () {
    var converter = {
        sizes: {
            'Mobile': { width: 375, height: 667 },
            'Tablet': { width: 768, height: 1024 },
            'Desktop': { width: 1920, height: 1080 }
        },

        convert: function () {
            var selectedSize = $("input[name='screenSize']:checked").val();
            var size = this.sizes[selectedSize];

            var screenWidth = size.width;
            var screenHeight = size.height;

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

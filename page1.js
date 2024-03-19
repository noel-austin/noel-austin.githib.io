document.addEventListener('DOMContentLoaded', function () {
    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var circle = document.getElementById('circle');
    var budget = document.getElementById('costValue');
    var chart1 = anychart.pie([
        { x: "Value 1", value: 30 }, // This value will be dynamically updated
        { x: "Value 2", value: 20 },
        { x: "Value 3", value: 20 },
        { x: "Value 4", value: 30 },
        { x: "Value 5", value: 40 }
    ]);

    var chart2 = anychart.pie([
        { x: "Value 1", value: 30 }, // This value will be dynamically updated
        { x: "Value 2", value: 20 },
        { x: "Value 3", value: 20 },
        { x: "Value 4", value: 30 }
    ]);

    var chart3 = anychart.pie([
        { x: "Value 1", value: 30 }, // This value will be dynamically updated
        { x: "Value 2", value: 20 },
        { x: "Value 3", value: 20 }
    ]);

    // Initialize chart
    chart1.innerRadius("70%"); // Makes it a doughnut chart
    chart1.container('chart1');
    chart1.background().fill("#222222");
    chart1.legend(false);
    chart1.labels(false);
    chart1.tooltip().enabled(false);

    chart1.draw();

    chart2.innerRadius("70%"); // Makes it a doughnut chart
    chart2.container('chart2');
    chart2.background().fill("#222222");
    chart2.legend(false);
    chart2.labels(false);
    chart2.tooltip().enabled(false);
    chart2.draw();

    chart3.innerRadius("70%"); // Makes it a doughnut chart
    chart3.container('chart3');
    chart3.background().fill("#222222");
    chart3.legend(false);
    chart3.labels(false);
    chart3.tooltip().enabled(false);
    chart3.draw();

    //var initialSize = 800; // Initial size of the circle
    var initialFontSize = 2; // Initial font size in em
    var initialBudget = 0;


    function updateChart() {
        var value1 = parseInt(slider1.value);
        var value2 = parseInt(slider2.value);
        var averageValue = (value1 + value2) / 2;
        var newValue = (averageValue) / 100;
        var newBudget = (initialBudget + averageValue) * 6000000;
        budget.textContent = newBudget.toLocaleString('en-US');

        // Update chart data
        chart1.data([
            { x: "General Waste", value: 50 + (newValue * 50), fill: "#545454" },
            { x: "Recyclable Waste", value: 50 - (newValue * 50), fill: "#00BF63" },
            { x: "Organic Waste", value: 50 - (newValue * 50), fill: "#745D3B" },
            { x: "Bring Centre Waste", value: 50, fill: "#FFC001" },
            //{ x: "Contamination", value: 50, fill: "#FF3131" }
        ]);

        chart2.data([
            { x: "General Waste", value: 50 - (newValue * 50), fill: "#545454" },
            { x: "Recyclable Waste", value: 50 + (newValue * 50), fill: "#00BF63" },
            { x: "Contamination", value: 50, fill: "#FF3131" },
            { x: "Bring Centre Waste", value: 50, fill: "#FFC001" }
        ]);

        chart3.data([

            { x: "Recyclable Waste", value: 10 - (newValue * 10), fill: "#00BF63" },
            { x: "Organic Waste", value: 90 + (newValue * 90), fill: "#745D3B" },
            //s { x: "Contamination", value: 50, fill: "#FF3131" }

        ]);
    }

    function clearTextSelection() {
        if (window.getSelection) { // All browsers except IE <9
            window.getSelection().removeAllRanges();
        } else if (document.selection) { // IE <9
            document.selection.empty();
        }
    }


    function updateCircle() {
        var value1 = parseInt(slider1.value);
        var value2 = parseInt(slider2.value);
        var averageValue = (value1 + value2) / 2;

        var max = parseInt(slider1.max); // Assuming both sliders have the same max
        var min = parseInt(slider1.min); // Assuming both sliders have the same min
        var inverseSize = (max - averageValue) / 100 + 0.70;
        circle.style.transform = 'scale(' + inverseSize + ')';

        var fontSize = initialFontSize * Math.sqrt(inverseSize);
        document.getElementById('title').style.fontSize = fontSize + 'em';
    }

    slider1.addEventListener('mousedown', clearTextSelection);
    slider2.addEventListener('mousedown', clearTextSelection);

    slider1.addEventListener('input', updateCircle);
    slider2.addEventListener('input', updateCircle);



    slider1.addEventListener('input', updateChart);
    slider2.addEventListener('input', updateChart);

    // Initialize circle size
    updateCircle();
    updateChart();


});



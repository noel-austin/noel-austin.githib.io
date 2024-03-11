document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('slider');
    var circle = document.getElementById('circle');

    var initialSize = 500; // Initial size of the circle
    var initialFontSize = 4; // Initial font size in em

    var data1 = [
        { x: "General Waste", value: 100, fill: "#545454" },
        { x: "Recyclable Waste", value: 100, fill: "#00BF63" },
        { x: "Organic Waste", value: 100, fill: "#745D3B" },
        { x: "Bring Centre Waste", value: 100, fill: "#FFC001" },
        { x: "Contamination", value: 100, fill: "#FF3131" }
    ];

    var data2 = [
        { x: "General Waste", value: 100, fill: "#545454" },
        { x: "Recyclable Waste", value: 100, fill: "#00BF63" },
        { x: "Contamination", value: 100, fill: "#FF3131" },
        { x: "Bring Centre Waste", value: 100, fill: "#FFC001" }
    ];

    var chart1 = anychart.pie(data1);
    var chart2 = anychart.pie(data2);

    chart1.innerRadius("70%"); // Makes it a doughnut chart
    chart1.container('chart1');
    chart1.background().fill("#222222");
    chart1.legend(false);
    chart1.labels(false);

    chart1.draw();

    chart2.innerRadius("70%"); // Makes it a doughnut chart
    chart2.container('chart2');
    chart2.background().fill("#222222");
    chart2.legend(false);
    chart2.labels(false);
    chart2.draw();

    function updateChart() {
        var averageValue = parseInt(slider.value);
        var max = parseInt(slider.max); // Assuming both sliders have the same max
        var min = parseInt(slider.min); // Assuming both sliders have the same min
        var inverseSize = (max - averageValue);


        // Update chart data
        chart1.data([
            { x: "General Waste", value: 100, fill: "#545454" },
            { x: "Recyclable Waste", value: 100, fill: "#00BF63" },
            { x: "Organic Waste", value: 100, fill: "#745D3B" },
            { x: "Bring Centre Waste", value: 100, fill: "#FFC001" },
            { x: "Contamination", value: inverseSize, fill: "#FF3131" }
        ]);

        chart2.data([
            { x: "General Waste", value: 100, fill: "#545454" },
            { x: "Recyclable Waste", value: 100, fill: "#00BF63" },
            { x: "Contamination", value: inverseSize, fill: "#FF3131" },
            { x: "Bring Centre Waste", value: 100, fill: "#FFC001" }
        ]);
    }


    function updateCircle() {

        var sliderValue = parseInt(slider.value);

        var max = parseInt(slider.max); // Assuming both sliders have the same max
        var min = parseInt(slider.min); // Assuming both sliders have the same min
        var inverseSize = (max - sliderValue) / 100;
        circle.style.transform = 'scale(' + inverseSize + ')';

        var fontSize = initialFontSize * Math.sqrt(inverseSize);
        document.getElementById('title').style.fontSize = fontSize + 'em';

        var taxRate = document.getElementById('taxRate');
        var tax = (sliderValue);
        taxRate.textContent = `${tax}`;


        var popularity = 100 - sliderValue;
        var popularityBar = document.getElementById('popularityBar');
        if (popularityBar) {
            popularityBar.style.width = `${popularity}%`;
            popularityBar.textContent = ` ${popularity}%`;
        }

        if (popularity < 40) {
            popularityBar.style.backgroundColor = 'red';
        } else if (popularity < 70) {
            popularityBar.style.backgroundColor = 'orange';
        } else {
            popularityBar.style.backgroundColor = '#4CAF50'; // Default green color
        }
    }

    function clearTextSelection() {
        if (window.getSelection) { // All browsers except IE <9
            window.getSelection().removeAllRanges();
        } else if (document.selection) { // IE <9
            document.selection.empty();
        }
    }

    slider.addEventListener('mousedown', clearTextSelection);
    slider.addEventListener('input', updateCircle);
    slider.addEventListener('input', updateChart);

    // Initialize circle size
    updateCircle();
    updateChart();

});
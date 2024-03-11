document.addEventListener('DOMContentLoaded', function () {
    // Define the showChart function
    function showChart(chartId) {
        // Define the data for each chart
        const chartData = {
            'image1': [
                { x: "General Waste", value: 26, fill: "#545454" },
                { x: "Recyclable Waste", value: 24, fill: "#00BF63" },
                { x: "Contamination", value: 8, fill: "#FF3131" },
                { x: "Organic Waste", value: 21, fill: "#745D3B" },
                { x: "Bring Centre Waste", value: 19, fill: "#FFC001" }
            ],
            'image2': [
                { x: "General Waste", value: 15, fill: "#545454" },
                { x: "Recyclable Waste", value: 64, fill: "#00BF63" },
                { x: "Contamination", value: 10, fill: "#FF3131" },
                { x: "Organic Waste", value: 3, fill: "#745D3B" },
                { x: "Bring Centre Waste", value: 8, fill: "#FFC001" }
            ],
            'image3': [
                { x: "Recyclable Waste", value: 4, fill: "#00BF63" },
                { x: "General Waste", value: 2, fill: "#545454" },
                { x: "Organic Waste", value: 93, fill: "#745D3B" },
                { x: "Bring Centre Waste", value: 1, fill: "#FFC001" }
            ]
        };

        const chartImages = {
            'image1': '/pictures/genBinOutline.png',
            'image2': '/pictures/recBinOutline.png',
            'image3': '/pictures/orgBinOutline.png'

        }



        // Clear the chart container
        const chartContainer = document.getElementById('chartContainer');
        chartContainer.innerHTML = '<img id="chartImage" src="" alt="Chart Image" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30%;  display: none; max-height: 162.5px; max-width: 100px;">';

        // Create a chart based on the chartId
        anychart.onDocumentReady(function () {
            const chart = anychart.pie(chartData[chartId]);
            chart.legend(false);
            chart.innerRadius("70%");
            chart.labels().useHtml(true);
            chart.labels().format("<span style='font-size:11.25px'>{%value}%</span>");
            chart.tooltip().titleFormat(function () {
                return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
            });
            chart.tooltip().useHtml(true);
            chart.tooltip().format(function () {
                return '<div style="font-size: 1rem;">' + this.value + '%</div>';
            });
            chart.background().fill("none")
            chart.container('chartContainer');
            chart.draw();

            const chartImage = document.getElementById('chartImage');
            chartImage.src = chartImages[chartId];
            chartImage.style.display = 'block';
        });

        document.querySelectorAll('#buttonContainer .button').forEach(button => {
            if (button.getAttribute('data-chart') === chartId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Attach click event listeners to buttons
    document.querySelectorAll('#buttonContainer .button').forEach(button => {
        button.addEventListener('click', function () {
            const chartId = this.getAttribute('data-chart');
            showChart(chartId);
        });
    });

    // Display the default chart
    showChart('image1');
});
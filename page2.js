document.addEventListener('DOMContentLoaded', function () {
    var map = anychart.map();


    var budget = document.getElementById('costValue');
    // Load and set the geographical data for Ireland
    map.geoData(anychart.maps.ireland);
    map.unboundRegions().enabled(true);
    map.unboundRegions().fill("#606060");

    // Set the color for the regions
    // Change the background color of the map
    map.background().fill("#222222");

    var slider = document.getElementById('slider');


    // Set the container id
    map.container('mapContainer');

    // Draw the map
    map.draw();

    var data = ([
        { x: "General Waste", value: 25, fill: "#545454" }, // This value will be dynamically updated
        { x: "Recycling", value: 25, fill: "#00BF63" },
        { x: "Organic Waste", value: 25, fill: "#745D3B" },
        { x: "Bring Centre", value: 25, fill: "#FFC001" }
    ]);
    var barChart = anychart.column(data);
    // Assuming barChart is your AnyChart column chart instance
    var series = barChart.getSeriesAt(0); // Get the first series
    if (series) {
        series.normal().stroke(null); // Attempt to remove the stroke
    }

    barChart.xAxis().labels().fontSize(7.5);
    barChart.yAxis().labels().fontSize(12.5);
    barChart.barGroupsPadding(0.2);
    barChart.yScale().minimum(0);
    barChart.yScale().maximum(65);
    barChart.container("barChart");
    barChart.background().fill("none");
    barChart.draw();

    addMarkers(10);

    function addMarkers() {
        // Clear existing markers if necessary
        map.removeAllSeries();
        var percentage = slider.value;
        var dataSet = anychart.data.set();

        var numOfDots = Math.round(allBringCentres.length * (percentage / 100));
        var selectedData = allBringCentres.slice(0, numOfDots);
        dataSet.data(selectedData);

        var markers = map.marker(dataSet);
        markers.fill("#FFC001");
        markers.stroke(null);
        markers.labels(false);

        markers.size(3); // Adjust size as needed

        budget.textContent = (0 + percentage * 3000000).toLocaleString('en-US');;
        map.draw();
        updateChart();
    }

    function updateChart() {

        var valueX = slider.value;
        let newData =
            [
                { x: "General Waste", value: 59 - (13 * (valueX / 100)), fill: "#545454" }, // This value will be dynamically updated
                { x: "Recycling", value: 23 - (5 * (valueX / 100)), fill: "#00BF63" },
                { x: "Organic Waste", value: 18 - (3 * (valueX / 100)), fill: "#745D3B" },
                { x: "Bring Centre", value: 0 + (13 * (valueX / 100)), fill: "#FFC001" }
            ];
        barChart.data(newData);
        barChart.xAxis().labels().fontSize(7.5);
        barChart.yAxis().labels().fontSize(12.5);
        barChart.barGroupsPadding(0.2);
        barChart.yScale().minimum(0);
        barChart.yScale().maximum(65);
    }
    function clearTextSelection() {
        if (window.getSelection) { // All browsers except IE <9
            window.getSelection().removeAllRanges();
        } else if (document.selection) { // IE <9
            document.selection.empty();
        }
    }

    slider.addEventListener('mousedown', clearTextSelection);
    slider.addEventListener('input', addMarkers);


});

















var allBringCentres = [
    { lat: 53.383, long: -6.416 }, // Example coordinates
    { lat: 53.357, long: -7.690 },
    { lat: 53.041, long: -8.173 },
    { lat: 52.281, long: -8.107 },
    { lat: 51.930, long: -9.272 },
    { lat: 52.227, long: -7.075 },
    { lat: 53.605, long: -9.184 },
    { lat: 54.149, long: -8.481 },
    { lat: 54.188, long: -7.009 },
    { lat: 53.631, long: -7.207 },
    { lat: 53.225, long: -6.877 },
    { lat: 53.631, long: -7.954 },
    { lat: 53.199, long: -7.668 },
    { lat: 55.1834, long: -7.5935 },
    { lat: 54.2340, long: -7.9307 },
    { lat: 52.6301, long: -7.8861 },
    { lat: 53.3245, long: -6.5040 },
    { lat: 52.3439, long: -8.1949 },
    { lat: 53.6733, long: -8.630 },
    { lat: 53.6733, long: -7.3615 },
    { lat: 53.8537, long: -7.8703 },
    { lat: 54.3236, long: -8.1143 },
    { lat: 54.0923, long: -8.1586 },
    { lat: 54.0005, long: -9.9996 },
    { lat: 52.4204, long: -9.8706 },
    { lat: 53.1492, long: -6.9270 },
    { lat: 53.1083, long: -8.5996 },
    { lat: 52.5624, long: -7.1062 },
    { lat: 53.8387, long: -7.2219 },
    { lat: 53.8664, long: -9.9204 },
    { lat: 54.7572, long: -8.6101 },
    { lat: 53.3082, long: -6.5118 },
    { lat: 54.6296, long: -8.5628 },
    { lat: 52.8925, long: -8.5185 },
    { lat: 52.6302, long: -7.9759 },
    { lat: 53.9883, long: -6.9154 },
    { lat: 52.9908, long: -9.2590 },
    { lat: 53.8870, long: -8.6728 },
    { lat: 54.1247, long: -9.8573 },
    { lat: 54.7594, long: -7.8405 },
    { lat: 55.2239, long: -7.3224 },
    { lat: 53.0227, long: -7.1386 },
    { lat: 52.2006, long: -7.5256 },
    { lat: 53.6212, long: -6.4390 },
    { lat: 53.6106, long: -9.6449 },
    { lat: 53.5049, long: -6.1773 },
    { lat: 52.5533, long: -7.2917 },
    { lat: 53.1357, long: -6.3121 },
    { lat: 53.9388, long: -6.3929 },
    { lat: 54.9068, long: -7.6877 },
    { lat: 53.3688, long: -6.2480 },
    { lat: 52.2188, long: -8.5642 },
    { lat: 52.124, long: -9.1991 },
    { lat: 54.0381, long: -8.4096 },
    { lat: 52.5572, long: -6.3387 },
    { lat: 51.8838, long: -8.1848 },
    { lat: 52.0028, long: -8.6058 },
    { lat: 52.6614, long: -9.6456 },
    { lat: 52.8043, long: -9.4444 },
    { lat: 51.4595, long: -9.7656 },
    { lat: 54.9392, long: -7.9413 },
    { lat: 51.7091, long: -9.9858 },
    { lat: 53.4594, long: -6.2605 },
    { lat: 52.8034, long: -7.3402 },
    { lat: 54.3842, long: -8.5981 },
    { lat: 51.7535, long: -9.0155 },
    { lat: 52.4484, long: -6.5628 },
    { lat: 53.7444, long: -9.8386 },
    { lat: 52.8063, long: -6.5610 },
    { lat: 52.4540, long: -7.9235 },
    { lat: 52.0270, long: -9.2238 },
    { lat: 52.6265, long: -8.1067 },
    { lat: 53.1324, long: -8.9946 },
    { lat: 53.521, long: -7.9201 },
    { lat: 54.0182, long: -7.4768 },
    { lat: 52.1011, long: -7.7975 },
    { lat: 53.4892, long: -8.2748 },
    { lat: 53.4267, long: -6.3848 },
    { lat: 51.0564, long: -9.2451 },
    { lat: 54.0533, long: -8.2617 },
    { lat: 53.5914, long: -6.8225 },
    { lat: 53.1158, long: -9.0898 },
    { lat: 54.7908, long: -8.2101 },
    { lat: 53.3770, long: -7.9120 },
    { lat: 51.7809, long: -9.5970 },
    { lat: 52.4975, long: -9.0762 },
    { lat: 55.2354, long: -6.9934 },
    { lat: 52.0385, long: -9.7656 },
    { lat: 52.3368, long: -6.6700 },
    { lat: 52.9289, long: -6.2215 },
    { lat: 53.0445, long: -7.3471 },
    { lat: 54.0212, long: -7.9926 },
    { lat: 53.1560, long: -8.8471 },
    { lat: 54.110, long: -9.1455 }

];
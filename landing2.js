document.addEventListener('DOMContentLoaded', function () {
    var data1 = [
        {
            name: "Total Waste Generation", fill: "#8D9196", children: [
                {
                    name: "Recyling", fill: "#00BF63", children: [
                        { name: "Plastic", value: plasticBaseSize },
                        { name: "Paper", value: paperBaseSize },
                        { name: "Cardboard", value: cardboardBaseSize },
                        { name: "Metal", value: metalBaseSize },
                    ]
                },
                {
                    name: "General Waste", fill: "#545454", children: [
                        { name: "Nappies", value: nappiesBaseSize },
                        { name: "Fines", value: finesBaseSize },
                    ]
                },
                {
                    name: "Organic Waste", fill: "#745D3B", children: [
                        { name: "Garden Waste", value: gardenWasteBaseSize },
                        { name: "Food Waste", value: foodWasteBaseSize },
                    ]
                },
                {
                    name: "Bring Centre", fill: "#FFC001", children: [
                        { name: "Textiles", value: textilesBaseSize },
                        { name: "Weee", value: weeeBaseSize },
                        { name: "Hazardous Waste", value: hazardousWasteBaseSize },
                        { name: "Glass", value: glassBaseSize }
                    ]
                },
                {
                    name: "Contamination", fill: "#FF3131", value: contaminationBaseSize
                }
            ]
        }
    ];

    var sunburstChart = anychart.sunburst(data1, "as-tree");
    sunburstChart.labels().useHtml(true);
    sunburstChart.labels().format("<span style='font-size:50px'>{%name}<br>{%value}kg</span>");
    sunburstChart.labels().position("circular");

    sunburstChart.selected().fill(sunburstChart.normal().fill());
    sunburstChart.tooltip().format("{%name}");
    sunburstChart.calculationMode("parent-independent");
    sunburstChart.tooltip().useHtml(true);
    sunburstChart.tooltip().format(function () {
        // Customize tooltip title and content with HTML, including font size
        return '<div style="font-size: 4rem; font-weight: bold;">' + this.name + '</div>' +
            '<div style="font-size: 3rem;">' + this.value + 'kg per person</div>';
    });

    // Set the container id for the sunburstChart
    sunburstChart.container('circleChart');
    sunburstChart.background().fill("none");
    // Initialize sunburstChart drawing
    sunburstChart.draw();

    var data2 = ([
        { x: "General Waste", value: 59, fill: "#545454" }, // This value will be dynamically updated
        { x: "Recycling", value: 23, fill: "#00BF63" },
        { x: "Organic Waste", value: 18, fill: "#745D3B" },
        { x: "Bring Centre", value: 0, fill: "#FFC001" }
    ]);

    var data3 = ([
        { x: "General Waste", value: 18, fill: "#545454" }, // This value will be dynamically updated
        { x: "Recycling", value: 30, fill: "#00BF63" },
        { x: "Organic Waste", value: 39, fill: "#745D3B" },
        { x: "Bring Centre", value: 13, fill: "#FFC001" }
    ]);
    var barChart1 = anychart.column(data2);
    var barChart2 = anychart.column(data3);

    barChart1.title().useHtml(true);
    barChart1.title("<span style='font-size: 80px;color: #FFFFFF;'>Where is it going?</span><br/><span style='font-size: 34px; color: #FFFFFF;'>Actual segregation of <br/>household kerbside waste</span>");
    barChart1.xAxis().labels().fontSize(30);
    barChart1.yAxis().labels().fontSize(50);
    barChart1.barGroupsPadding(0.2);
    var series1 = barChart1.getSeriesAt(0);
    series1.normal().stroke(null);
    barChart1.yScale().minimum(0);
    barChart1.yScale().maximum(65);
    barChart1.container('barChart1');
    barChart1.background().fill("none");
    barChart1.tooltip().titleFormat("");
    barChart1.tooltip().useHtml(true);
    barChart1.tooltip().format(function () {
        // Customize tooltip title and content with HTML, including font size
        return '<div style="font-size: 4rem; font-weight: bold;">' + this.x + '</div>' +
            '<div style="font-size: 3rem;">' + this.value + '%</div>';
    });
    barChart1.draw();

    barChart2.title().useHtml(true);
    barChart2.title("<span style='font-size: 80px;color: #FFFFFF;'>Where should it go?</span><br/><span style='font-size: 34px; color: #FFFFFF;'>If household kerbside waste <br/>was segregated properly</span>");

    barChart2.xAxis().labels().fontSize(30);
    barChart2.yAxis().labels().fontSize(50);
    barChart2.barGroupsPadding(0.2);
    var series2 = barChart2.getSeriesAt(0);
    series2.normal().stroke(null);
    barChart2.yScale().minimum(0);
    barChart2.yScale().maximum(65);
    barChart2.container('barChart2');
    barChart2.background().fill("none");
    barChart2.tooltip().titleFormat("");
    barChart2.tooltip().useHtml(true);
    barChart2.tooltip().format(function () {
        // Customize tooltip title and content with HTML, including font size
        return '<div style="font-size: 4rem; font-weight: bold;">' + this.x + '</div>' +
            '<div style="font-size: 3rem;">' + this.value + '%</div>';
    });
    barChart2.draw();


});
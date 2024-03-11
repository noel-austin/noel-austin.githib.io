document.addEventListener('DOMContentLoaded', function () {


    socialProtectionVariable = document.getElementById('socialValue');
    healthVariable = document.getElementById('healthValue');
    housingVariable = document.getElementById('housingValue');
    transportVariable = document.getElementById('transportValue');
    educationVariable = document.getElementById('educationValue');
    justiceVariable = document.getElementById('justiceValue');
    newBudgetVariable = document.getElementById('recyclingAndWasteValue');

    finalHealth = document.getElementById('final-health');
    finaleducation = document.getElementById('final-education');
    finalSocial = document.getElementById('final-social');
    finalTransport = document.getElementById('final-transport');
    finalJustice = document.getElementById('final-justice');
    finalHousing = document.getElementById('final-housing');
    finalSpent = document.getElementById('finalSpent');



    var slider1 = document.getElementById('slider1');
    var slider2 = document.getElementById('slider2');
    var slider3 = document.getElementById('slider3');
    var slider4 = document.getElementById('slider4');
    var slider5 = document.getElementById('slider5');
    var totalWaste;


    const budgetSliders = [
        document.getElementById('slider1'),
        document.getElementById('slider2'),
        document.getElementById('slider3')
    ];
    const budgetValues = [
        document.getElementById('sliderValue1'),
        document.getElementById('sliderValue2'),
        document.getElementById('sliderValue3')
    ];

    const totalUsedSpan = document.getElementById('totalUsed');

    const unitValue = 3000000;
    let lastValues = [0, 0, 0];


    function checkAndUpdateSliders() {
        let totalUsedDollars = budgetSliders.reduce((acc, slider) => acc + (Number(slider.value) * unitValue), 0);

        // Check if the total dollar amount exceeds the budget
        if (totalUsedDollars > totalBudget) {
            // If so, revert each slider to its last valid value
            budgetSliders.forEach((slider, i) => {
                slider.value = lastValues[i];
            });
            // Update the displayed total to reflect the last valid total
            totalUsedDollars = lastValues.reduce((acc, val) => acc + (val * unitValue), 0);
        } else {
            // If under budget, update last valid values to current
            budgetSliders.forEach((slider, i) => lastValues[i] = Number(slider.value));
        }

        // Update displayed values
        totalUsedSpan.textContent = ` €${(totalUsedDollars / 1000000)}`;
        budgetSliders.forEach((slider, i) => budgetValues[i].textContent = `${(Number(slider.value) * unitValue / 1000000).toFixed(0)}m`);

    }
    popularity2 = document.getElementById('popularityBar2');
    popularity3 = document.getElementById('popularityBar3');

    const popularity = document.getElementById('popularityBar');
    const basePopularity = 100;
    const maxPopularityDecrease = 100 - minPopularity;
    let popLastValues = [0, 0];
    const popularitySliders = [document.getElementById('slider4'), document.getElementById('slider5')];
    const popularityValues = [document.getElementById('sliderValue4'), document.getElementById('sliderValue5')];
    const popUnitValue = 0.5;


    function updatePopularity() {
        // Calculate total decrease, with special handling for the mapped slider
        let totalDecrease = popularitySliders.reduce((acc, slider, index) => {
            let sliderValue = Number(slider.value);
            // If the slider is the one with a 0-30 range, map its value to 0-100
            if (index === 0) {
                sliderValue = (sliderValue / 30) * 100; // Map 0-30 to 0-100
            }
            return acc + sliderValue * popUnitValue;
        }, 0);

        if (totalDecrease > maxPopularityDecrease) {
            // Revert slider values if the total decrease exceeds the maximum allowed
            popularitySliders.forEach((slider, index) => {
                slider.value = popLastValues[index];
            });
            // Recalculate total decrease using reverted (and properly mapped) values
            totalDecrease = popLastValues.reduce((acc, value, index) => {
                let adjustedValue = value;
                if (index === 0) {
                    adjustedValue = (adjustedValue / 30) * 100; // Map 0-30 to 0-100 for reverted value
                }
                return acc + adjustedValue * popUnitValue;
            }, 0);
        } else {
            // Update last valid values to current
            popularitySliders.forEach((slider, index) => {
                popLastValues[index] = Number(slider.value);
            });
        }

        // Ensure currentPopularity does not exceed the base minus the maximum allowed decrease
        currentPopularity = Math.max(basePopularity - totalDecrease, basePopularity - maxPopularityDecrease);

        // Update the visual representation of popularity
        popularity.textContent = `${currentPopularity.toFixed(0)}%`;
        popularity.style.width = `${currentPopularity}%`;
        popularity.style.backgroundColor = currentPopularity <= 40 ? 'red' : (currentPopularity < 65 ? 'orange' : '#4CAF50');


        // Update displayed slider values (adjust if mapping needs to be displayed)
        popularitySliders.forEach((slider, index) => {
            popularityValues[index].textContent = slider.value; // Consider adjusting if displaying mapped values
        });
    }




    anychart.onDocumentReady(function () {
        // Data for the circle packing chart
        createWasteObjects();
        var wasteList = [plasticW, paperW, cardboardW, metalW, nappiesW, finesW, foodW, gardenW, weeeW, textilesW, hazardousW, glassW, contaminationW];
        var binList = [generalWasteBin, recyclingWasteBin, organicWasteBin, bringCentreBin];

        var budgetChart = anychart.pie([
            { x: "Social Protection", value: socialProtectionAllocation / 1000000 },
            { x: "Health", value: healthAllocation / 1000000 },
            { x: "Housing", value: housingAllocation / 1000000 },
            { x: "Education", value: educationAllocation / 1000000 },
            { x: "Transport", value: transportAllocation / 1000000 },
            { x: "Justice", value: 3538 },
            { x: "Other", value: 18001 },
            { x: "Recycling and Waste Budget", value: 0 }
        ]);
        var label = anychart.standalones.label();
        label.text("Total Budget: €96,578m");
        label.width("100%");
        label.height("100%");
        label.fontSize(22.5);
        label.fontColor("#fff");
        label.hAlign("center");
        label.vAlign("middle");

        // set the label as the center content
        budgetChart.center().content(label);
        budgetChart.innerRadius("70%"); // Makes it a doughnut chart
        budgetChart.container('budgetGraph');
        //budgetChart.background().fill("#222222");
        budgetChart.legend(true);
        budgetChart.legend().fontSize("0.875rem");
        budgetChart.legend().itemsLayout("vertical"); // Sets the legend items layout to vertical
        budgetChart.legend().padding(2.5, 0, 2.5, 0); // Top, Right, Bottom, Left padding of the legend
        budgetChart.legend().margin(0); // Sets the margin around the legend
        budgetChart.legend().position("left");
        budgetChart.legend().fontColor("#fff");
        budgetChart.legend().itemsFormat(function (item) {
            return item.x + ": €" + item.value.toLocaleString('en-US') + "m";
        });
        budgetChart.legend().iconSize(12.5);
        budgetChart.labels(false);
        budgetChart.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        budgetChart.tooltip().useHtml(true);
        budgetChart.tooltip().format(function () {
            return '<div style="font-size: 1rem;">€' + this.value.toLocaleString('en-US') + 'm</div>';
        });
        budgetChart.background().fill("none");

        budgetChart.draw();



        var chart1 = anychart.pie([
            { x: "General Waste", value: 30, fill: "#545454" },
            { x: "Recyclable Waste", value: 30, fill: "#00BF63" },
            { x: "Organic Waste", value: 30, fill: "#745D3B" },
            { x: "Bring Centre Waste", value: 30, fill: "#FFC001" },
            { x: "Contamination", value: 30, fill: "#FF3131" }
        ]);

        var chart2 = anychart.pie([
            { x: "General Waste", value: 30, fill: "#545454" },
            { x: "Recyclable Waste", value: 60, fill: "#00BF63" },
            { x: "Contamination", value: 30, fill: "#FF3131" },
            { x: "Bring Centre Waste", value: 30, fill: "#FFC001" }
        ]);

        var chart3 = anychart.pie([
            { x: "Recyclable Waste", value: 30, fill: "#00BF63" },
            { x: "Organic Waste", value: 90, fill: "#745D3B" },
            { x: "Contamination", value: 30, fill: "#FF3131" }
        ]);

        chart1.innerRadius("70%");
        chart1.container('chart1');
        //chart1.background().fill("#222222");
        chart1.legend(false);
        chart1.labels().useHtml(true);
        chart1.labels().format("<span style='font-size:0.625rem'>{%value}%</span>");
        chart1.background().fill("none");
        chart1.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold; ">' + this.x + '</div>'
        });
        chart1.tooltip().useHtml(true);
        chart1.tooltip().format(function () {
            return '<div style="font-size: 1rem; ">' + this.value + '%</div>';
        });
        chart1.draw();
        var sumPieChart1 = anychart.pie(chart1.data());
        sumPieChart1.innerRadius("70%"); // Makes it a doughnut chart
        sumPieChart1.container('sum-chart1');

        sumPieChart1.legend(false);
        sumPieChart1.labels().useHtml(true);
        sumPieChart1.labels().format("<span style='font-size:0.75rem'>{%value}%</span>");
        sumPieChart1.background().fill("none");
        sumPieChart1.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        sumPieChart1.tooltip().useHtml(true);
        sumPieChart1.tooltip().format(function () {
            return '<div style="font-size: 1rem;">' + this.value + '%</div>';
        });
        sumPieChart1.draw();

        chart2.innerRadius("70%"); // Makes it a doughnut chart
        chart2.container('chart2');
        //chart2.background().fill("none");
        chart2.legend(false);
        chart2.labels().useHtml(true);
        chart2.labels().format("<span style='font-size:0.625rem'>{%value}%</span>");
        chart2.background().fill("none");
        chart2.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        chart2.tooltip().useHtml(true);
        chart2.tooltip().format(function () {
            return '<div style="font-size: 1rem;">' + this.value + '%</div>';
        });
        chart2.draw();
        var sumPieChart2 = anychart.pie(chart2.data());
        sumPieChart2.innerRadius("70%"); // Makes it a doughnut chart
        sumPieChart2.container('sum-chart2');
        //sumPieChart2.background().fill("none");
        sumPieChart2.legend(false);
        sumPieChart2.labels().useHtml(true);
        sumPieChart2.labels().format("<span style='font-size:0.75rem'>{%value}%</span>");
        sumPieChart2.background().fill("none");
        sumPieChart2.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        sumPieChart2.tooltip().useHtml(true);
        sumPieChart2.tooltip().format(function () {
            return '<div style="font-size: 1rem;">' + this.value + '%</div>';
        });
        sumPieChart2.draw();

        chart3.innerRadius("70%"); // Makes it a doughnut chart
        chart3.container('chart3');
        //chart3.background().fill("none");
        chart3.legend(false);
        chart3.labels().useHtml(true);
        chart3.labels().format("<span style='font-size:0.625rem'>{%value}%</span>");
        chart3.background().fill("none");
        chart3.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        chart3.tooltip().useHtml(true);
        chart3.tooltip().format(function () {
            return '<div style="font-size: 1rem;">' + this.value + '%</div>';
        });
        chart3.draw();
        var sumPieChart3 = anychart.pie(chart3.data());
        sumPieChart3.innerRadius("70%"); // Makes it a doughnut chart
        sumPieChart3.container('sum-chart3');
        //sumPieChart3.background().fill("none");
        sumPieChart3.legend(false);

        sumPieChart3.labels().useHtml(true);
        sumPieChart3.labels().format("<span style='font-size:0.75rem; font-color: #fff'>{%value}%</span>");
        sumPieChart3.background().fill("none");
        sumPieChart3.tooltip().titleFormat(function () {
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>'
        });
        sumPieChart3.tooltip().useHtml(true);
        sumPieChart3.tooltip().format(function () {
            return '<div style="font-size: 1rem;">' + this.value + '%</div>';
        });
        sumPieChart3.draw();


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
        barChart.tooltip().titleFormat("");
        barChart.tooltip().useHtml(true);
        barChart.tooltip().format(function () {
            // Customize tooltip title and content with HTML, including font size
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>' +
                '<div style="font-size: 0.75rem;">' + this.value.toFixed(0) + '%</div>';
        });
        barChart.container("barChart");
        barChart.background().fill("none");
        var sumBarChart = anychart.column(data);
        sumBarChart.container("sum-bar-chart");
        sumBarChart.xAxis().labels().fontSize(7.5);
        sumBarChart.yAxis().labels().fontSize(12.5);
        sumBarChart.barGroupsPadding(0.2);
        sumBarChart.yScale().minimum(0);
        sumBarChart.yScale().maximum(65);
        sumBarChart.title().useHtml(true);
        sumBarChart.title("<span style='font-size: 17.5px;color: #FFFFFF;'>% of all waste found in each bin</span>");

        sumBarChart.tooltip().titleFormat("");
        sumBarChart.tooltip().useHtml(true);
        sumBarChart.tooltip().format(function () {
            // Customize tooltip title and content with HTML, including font size
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.x + '</div>' +
                '<div style="font-size: 0.75rem;">' + this.value.toFixed(0) + '%</div>';
        });
        sumBarChart.background().fill("none");
        var series2 = sumBarChart.getSeriesAt(0); // Get the first series
        if (series2) {
            series2.normal().stroke(null); // Attempt to remove the stroke
        }
        sumBarChart.draw();




        //var series = barChart.column(data);
        // series.normal().stroke("#222222");


        barChart.container("barChart");

        barChart.draw();



        var data1 = [
            {
                name: "Total Waste Generation", fill: "#8D9196", children: [
                    {
                        name: "Recyling", fill: "#00BF63", children: [
                            { name: plasticW.name, value: plasticW.size },
                            { name: paperW.name, value: paperW.size },
                            { name: cardboardW.name, value: cardboardW.size },
                            { name: metalW.name, value: metalW.size },
                        ]
                    },
                    {
                        name: "General Waste", fill: "#545454", children: [
                            { name: nappiesW.name, value: nappiesW.size },
                            { name: finesW.name, value: finesW.size },
                        ]
                    },
                    {
                        name: "Organic Waste", fill: "#745D3B", children: [
                            { name: gardenW.name, value: gardenW.size },
                            { name: foodW.name, value: foodW.size },
                        ]
                    },
                    {
                        name: "Bring Centre", fill: "#FFC001", children: [
                            { name: textilesW.name, value: textilesW.size },
                            { name: weeeW.name, value: weeeW.size },
                            { name: hazardousW.name, value: hazardousW.size },
                            { name: glassW.name, value: glassW.size }
                        ]
                    },
                    {
                        name: contaminationW.name, fill: "#FF3131", value: contaminationW.size
                    }
                ]
            }
        ];

        var chart = anychart.sunburst(data1, "as-tree");
        chart.labels().useHtml(true);
        chart.labels().format("<span style='font-size:12.5px'>{%name}<br>{%value}kg</span>");
        chart.labels().position("circular");

        chart.selected().fill(chart.normal().fill());
        chart.tooltip().format("{%name}");
        chart.calculationMode("parent-independent");
        chart.tooltip().useHtml(true);
        chart.tooltip().format(function () {
            // Customize tooltip title and content with HTML, including font size
            return '<div style="font-size: 1rem; font-weight: bold;">' + this.name + '</div>' +
                '<div style="font-size: 0.75rem;">' + this.value + 'kg per person</div>';
        });


        // Set the container id for the chart
        chart.container('circleChart');
        chart.background().fill("none");
        // Initialize chart drawing
        chart.draw();


        function updateValues() {
            checkAndUpdateSliders();
            updatePopularity();


            var value1 = parseInt(slider1.value);
            var value2 = parseInt(slider2.value);
            var value3 = parseInt(slider3.value);
            var value4 = parseInt(slider4.value) * (100 / 30);
            var value5 = parseInt(slider5.value);

            plasticW.size = plasticBaseSize - (0.2 * ((value1 + value2) / 200) * plasticBaseSize) - (0.2 * (value4 / 100) * plasticBaseSize);

            paperW.size = paperBaseSize - (0.2 * ((value1 + value2) / 200) * paperBaseSize) - (0.2 * (value4 / 100) * paperBaseSize);
            cardboardW.size = cardboardBaseSize - (0.2 * ((value1 + value2) / 200) * cardboardBaseSize) - (0.2 * (value4 / 100) * cardboardBaseSize);
            metalW.size = metalBaseSize - (0.2 * ((value1 + value2) / 200) * metalBaseSize) - (0.2 * (value4 / 100) * metalBaseSize);
            nappiesW.size = nappiesBaseSize - (0.2 * ((value1 + value2) / 200) * nappiesBaseSize);
            finesW.size = finesBaseSize - (0.2 * ((value1 + value2) / 200) * finesBaseSize);
            gardenW.size = gardenWasteBaseSize - (0.2 * ((value1 + value2) / 200) * gardenWasteBaseSize);
            foodW.size = foodWasteBaseSize - (0.2 * ((value1 + value2) / 200) * foodWasteBaseSize);
            textilesW.size = textilesBaseSize - (0.2 * ((value1 + value2) / 200) * textilesBaseSize);
            weeeW.size = weeeBaseSize - (0.2 * ((value1 + value2) / 200) * weeeBaseSize);
            hazardousW.size = hazardousWasteBaseSize - (0.2 * ((value1 + value2) / 200) * hazardousWasteBaseSize)
            glassW.size = glassBaseSize - (0.2 * ((value1 + value2) / 200) * glassBaseSize);
            contaminationW.size = contaminationBaseSize - ((value5 / 100) * contaminationBaseSize);

            plasticW.ratio = adjustArrayValues(plasticRatioBase.slice(), ((value1 + value2) / 200), plasticW.targetBin - 1);
            //let swag = plasticW.ratio[0] + plasticW.ratio[1] + plasticW.ratio[2] + plasticW.ratio[3];
            //console.log(plasticW.ratio + " = " + swag);
            paperW.ratio = adjustArrayValues(paperRatioBase.slice(), ((value1 + value2) / 200), paperW.targetBin - 1);
            cardboardW.ratio = adjustArrayValues(cardboardRatioBase.slice(), ((value1 + value2) / 200), cardboardW.targetBin - 1);
            metalW.ratio = adjustArrayValues(metalRatioBase.slice(), ((value1 + value2) / 200), metalW.targetBin - 1);

            nappiesW.ratio = adjustArrayValues(nappiesRatioBase.slice(), ((value1 + value2) / 200), nappiesW.targetBin - 1);
            finesW.ratio = adjustArrayValues(finesRatioBase.slice(), ((value1 + value2) / 200), finesW.targetBin - 1);

            foodW.ratio = adjustArrayValues(foodWasteRatioBase.slice(), ((value1 + value2) / 200), foodW.targetBin - 1);
            gardenW.ratio = adjustArrayValues(gardenWasteRatioBase.slice(), ((value1 + value2) / 200), gardenW.targetBin - 1);

            weeeW.ratio = adjustArrayValues(weeeRatioBase.slice(), (value3 / 100), weeeW.targetBin - 1);
            textilesW.ratio = adjustArrayValues(textilesRatioBase.slice(), (value3 / 100), textilesW.targetBin - 1);
            hazardousW.ratio = adjustArrayValues(hazardousWasteRatioBase.slice(), (value3 / 100), hazardousW.targetBin - 1);
            glassW.ratio = adjustArrayValues(glassRatioBase.slice(), (value3 / 100), glassW.targetBin - 1);

            generalWasteBin.genSize = Math.round((nappiesW.size * nappiesW.ratio[0]) + (finesW.size * finesW.ratio[0]));
            generalWasteBin.recSize = Math.round((plasticW.ratio[0] * plasticW.size) + (paperW.ratio[0] * paperW.size) + (cardboardW.ratio[0] * cardboardW.size) + (metalW.ratio[0] * metalW.size));
            generalWasteBin.orgSize = Math.round((foodW.ratio[0] * foodW.size) + (gardenW.ratio[0] * gardenW.size));
            generalWasteBin.bringSize = Math.round((weeeW.ratio[0] * weeeW.size) + (textilesW.ratio[0] * textilesW.size) + (hazardousW.ratio[0] * hazardousW.size) + (glassW.ratio[0] * glassW.size));
            generalWasteBin.conSize = Math.round(contaminationW.ratio[0] * contaminationW.size);
            //console.log(generalWasteBin.genSize, generalWasteBin.recSize, generalWasteBin.orgSize, generalWasteBin.bringSize, generalWasteBin.conSize);

            recyclingWasteBin.genSize = Math.round((nappiesW.size * nappiesW.ratio[1]) + (finesW.size * finesW.ratio[1]));
            recyclingWasteBin.recSize = Math.round((plasticW.ratio[1] * plasticW.size) + (paperW.ratio[1] * paperW.size) + (cardboardW.ratio[1] * cardboardW.size) + (metalW.ratio[1] * metalW.size));
            recyclingWasteBin.orgSize = Math.round((foodW.ratio[1] * foodW.size) + (gardenW.ratio[1] * gardenW.size));
            recyclingWasteBin.bringSize = Math.round((weeeW.ratio[1] * weeeW.size) + (textilesW.ratio[1] * textilesW.size) + (hazardousW.ratio[1] * hazardousW.size) + (glassW.ratio[1] * glassW.size));
            recyclingWasteBin.conSize = Math.round(contaminationW.ratio[1] * contaminationW.size);

            organicWasteBin.genSize = Math.round((nappiesW.size * nappiesW.ratio[2]) + (finesW.size * finesW.ratio[2]));
            organicWasteBin.recSize = Math.round((plasticW.ratio[2] * plasticW.size) + (paperW.ratio[2] * paperW.size) + (cardboardW.ratio[2] * cardboardW.size) + (metalW.ratio[2] * metalW.size));
            organicWasteBin.orgSize = Math.round((foodW.ratio[2] * foodW.size) + (gardenW.ratio[2] * gardenW.size));
            organicWasteBin.bringSize = Math.round((weeeW.ratio[2] * weeeW.size) + (textilesW.ratio[2] * textilesW.size) + (hazardousW.ratio[2] * hazardousW.size) + (glassW.ratio[2] * glassW.size));
            organicWasteBin.conSize = Math.round(contaminationW.ratio[2] * contaminationW.size);

            bringCentreBin.genSize = Math.round((nappiesW.size * nappiesW.ratio[3]) + (finesW.size * finesW.ratio[3]));
            bringCentreBin.recSize = Math.round((plasticW.ratio[3] * plasticW.size) + (paperW.ratio[3] * paperW.size) + (cardboardW.ratio[3] * cardboardW.size) + (metalW.ratio[3] * metalW.size));
            bringCentreBin.orgSize = Math.round((foodW.ratio[3] * foodW.size) + (gardenW.ratio[3] * gardenW.size));
            bringCentreBin.bringSize = Math.round((weeeW.ratio[3] * weeeW.size) + (textilesW.ratio[3] * textilesW.size) + (hazardousW.ratio[3] * hazardousW.size) + (glassW.ratio[3] * glassW.size));
            bringCentreBin.conSize = Math.round(contaminationW.ratio[3] * contaminationW.size);



            //console.log(plasticW.ratio);



            // plasticW.ratio = adjustRatio(plasticRatioBase, plasticW.targetBin - 1, ((value1 + value2) / 200));
            //console.log(plasticW.ratio);
            updateCharts();
            updateGoals();
        }

        const totalGen = document.getElementById('waste-gen');
        const genWaste = document.getElementById('general-waste');
        const bringUsage = document.getElementById('bring-usage');
        const goalCount = document.getElementById('goal-count');
        var goals = 0;
        function updateGoals() {

            var goal1 = 0;
            var goal2 = 0;
            var goal3 = 0;
            var generalWaste = Math.round(generalWasteBin.total / totalWaste * 100);
            var bringCentre = Math.round(bringCentreBin.total / totalWaste * 100);
            totalGen.textContent = `${totalWaste}/290kg`;
            if (totalWaste > 290) {
                totalGen.style.color = 'red';
                goal1 = 0;
            }
            else {
                totalGen.style.color = '#4CAF50'; // Default green color
                goal1 = 1;
            }

            genWaste.textContent = `${generalWaste}/35%`;
            if (generalWaste > 35) {
                genWaste.style.color = 'red';
                goal2 = 0;
            }
            else {
                genWaste.style.color = '#4CAF50'; // Default green color
                goal2 = 1;
            }

            bringUsage.textContent = `${bringCentre}/14%`;
            if (bringCentre < 14) {
                bringUsage.style.color = 'red';
                goal3 = 0;
            }
            else {
                bringUsage.style.color = '#4CAF50'; // Default green color
                goal3 = 1;
            }
            goals = goal1 + goal2 + goal3;
            goalCount.textContent = `${goals}/3`;


        }
        var endModal = document.getElementById("endModal");
        var value = document.getElementById('pop-value');
        var finalTotalWaste = document.getElementById("final-waste-gen");

        var finalTax = document.getElementById("final-tax");
        var finalFine = document.getElementById("final-fine");

        document.getElementById('next-challenge').addEventListener('click', function (event) {
            for (let x of wasteList) {
                currentTotalWaste += x.size;
            }
            finalTax.textContent = `${slider4.value}%`;
            finalFine.textContent = `€${slider5.value} per kg`;
            finalTotalWaste.textContent = currentTotalWaste.toFixed(2);
            value.textContent = currentPopularity;
            popularity2Value = currentPopularity;
            popularity2.textContent = `${popularity2Value.toFixed(0)}%`;
            popularity2.style.width = `${popularity2Value}%`;
            popularity2.style.backgroundColor = popularity2Value <= 40 ? 'red' : '#4CAF50'; // Change color based on value
            event.preventDefault();
            if (goals == 3) {
                // Show the modal if goals are completed

                endModal.style.display = "block";
                setTimeout(() => {
                    endModal.style.opacity = 1;
                    document.querySelector('.end-modal-content').style.transform = 'translateY(0px)';
                    document.querySelector('.end-modal-content').style.opacity = 1;
                    showFirstPage(); // Ensure it starts on the first page
                }, 10);
            } else {
                // Show alert if goals are not completed
                alert("You must complete all 3 goals to complete the final challenge!");
            }
        });

        document.getElementById('summarise').addEventListener('click', function (event) {
            setBudgetValues();
            updateBar3();
            event.preventDefault();
            endModal.style.opacity = 0;
            document.querySelector('.end-modal-content').style.transform = 'translateY(-12.5px)';
            document.querySelector('.end-modal-content').style.opacity = 0;
            endModal.addEventListener('transitionend', function () {
                endModal.style.display = "none";
            }, { once: true });
            // Show the modal if goals are completed

            summaryModal.style.display = "block";
            setTimeout(() => {
                summaryModal.style.opacity = 1;
                document.querySelector('.summary-modal-content').style.transform = 'translateY(0px)';
                document.querySelector('.summary-modal-content').style.opacity = 1;
                showFirstPage(); // Ensure it starts on the first page
            }, 10);


        });


        function setBudgetValues() {
            var totalTotal = deductions.healthDeduction + deductions.educationDeduction + deductions.socialDeduction + deductions.transportDeduction + deductions.justiceDeduction + deductions.housingDeduction;


            finalHealth.textContent = formatCurrency(deductions.healthDeduction);
            finaleducation.textContent = formatCurrency(deductions.educationDeduction);
            finalSocial.textContent = formatCurrency(deductions.socialDeduction);
            finalTransport.textContent = formatCurrency(deductions.transportDeduction);
            finalJustice.textContent = formatCurrency(deductions.justiceDeduction);
            finalHousing.textContent = formatCurrency(deductions.housingDeduction);
            finalSpent.textContent = formatCurrency(totalTotal);
        }

        function updateBudgetChart() {
            console.log("Budget chart upadted");
            budgetChart.data([
                { x: "Social Protection", value: (socialProtectionAllocation / 1000000) + parseInt(socialProtectionVariable.innerText) },
                { x: "Health", value: (healthAllocation / 1000000) + parseInt(healthVariable.innerText) },
                { x: "Housing", value: (housingAllocation / 1000000) + parseInt(housingVariable.innerText) },
                { x: "Education", value: (educationAllocation / 1000000) + parseInt(educationVariable.innerText) },
                { x: "Transport", value: (transportAllocation / 1000000) + parseInt(transportVariable.innerText) },
                { x: "Justice", value: (justiceAllocation / 1000000) + parseInt(justiceVariable.innerText) },
                { x: "Other", value: (otherAllocation / 1000000) },
                { x: "Recycling and Waste Budget", value: 0 + parseInt(newBudgetVariable.innerText) }
            ]);
            for (let x of budgetSliders) {
                x.value = 0;
            }
            totalUsedSpan.textContent = ` €${0}`;
            updateValues();
        }




        function formatCurrency(value, locale = 'en-US', currency = 'EUR') {
            const isNegative = value < 0;
            const formatter = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                currencyDisplay: 'symbol', // You can also use 'code' or 'name'
            });

            const formattedValue = formatter.format(Math.abs(value));
            const formattedValueWithSuffix = `${formattedValue}m`; // Append "m" directly
            return isNegative ? `-${formattedValueWithSuffix}` : formattedValueWithSuffix;
        }

        function updateCharts() {



            for (let x of binList) {
                updateBinSize(x);
            }


            chart.data([
                {
                    name: "Total Waste Generation", fill: "#8D9196", children: [
                        {
                            name: "Recyling", fill: "#00BF63", children: [
                                { name: plasticW.name, value: plasticW.size },
                                { name: paperW.name, value: paperW.size },
                                { name: cardboardW.name, value: cardboardW.size },
                                { name: metalW.name, value: metalW.size },
                            ]
                        },
                        {
                            name: "General Waste", fill: "#545454", children: [
                                { name: nappiesW.name, value: nappiesW.size },
                                { name: finesW.name, value: finesW.size },
                            ]
                        },
                        {
                            name: "Organic Waste", fill: "#745D3B", children: [
                                { name: gardenW.name, value: gardenW.size },
                                { name: foodW.name, value: foodW.size },
                            ]
                        },
                        {
                            name: "Bring Centre", fill: "#FFC001", children: [
                                { name: textilesW.name, value: textilesW.size },
                                { name: weeeW.name, value: weeeW.size },
                                { name: hazardousW.name, value: hazardousW.size },
                                { name: glassW.name, value: glassW.size }
                            ]
                        },
                        {
                            name: contaminationW.name, fill: "#FF3131", value: contaminationW.size
                        }
                    ]
                }
            ]);


            chart1.data([
                { x: "General Waste", value: ((generalWasteBin.genSize / generalWasteBin.total) * 100).toFixed(0), fill: "#545454" },
                { x: "Recyclable Waste", value: ((generalWasteBin.recSize / generalWasteBin.total) * 100).toFixed(0), fill: "#00BF63" },
                { x: "Organic Waste", value: ((generalWasteBin.orgSize / generalWasteBin.total) * 100).toFixed(0), fill: "#745D3B" },
                { x: "Bring Centre Waste", value: ((generalWasteBin.bringSize / generalWasteBin.total) * 100).toFixed(0), fill: "#FFC001" },
                { x: "Contamination", value: ((generalWasteBin.conSize / generalWasteBin.total) * 100).toFixed(0), fill: "#FF3131" }
            ]);
            sumPieChart1.data(chart1.data());

            chart2.data([
                { x: "General Waste", value: ((recyclingWasteBin.genSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#545454" },
                { x: "Recyclable Waste", value: ((recyclingWasteBin.recSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#00BF63" },
                { x: "Organic Waste", value: ((recyclingWasteBin.orgSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#745D3B" },
                { x: "Bring Centre Waste", value: ((recyclingWasteBin.bringSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#FFC001" },
                { x: "Contamination", value: ((recyclingWasteBin.conSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#FF3131" }
            ]);
            sumPieChart2.data(chart2.data());
            chart3.data([
                { x: "General Waste", value: ((organicWasteBin.genSize / organicWasteBin.total) * 100).toFixed(0), fill: "#545454" },
                { x: "Recyclable Waste", value: ((organicWasteBin.recSize / organicWasteBin.total) * 100).toFixed(0), fill: "#00BF63" },
                { x: "Organic Waste", value: ((organicWasteBin.orgSize / organicWasteBin.total) * 100).toFixed(0), fill: "#745D3B" },
                { x: "Bring Centre Waste", value: ((organicWasteBin.bringSize / organicWasteBin.total) * 100).toFixed(0), fill: "#FFC001" },
                { x: "Contamination", value: ((organicWasteBin.conSize / organicWasteBin.total) * 100).toFixed(0), fill: "#FF3131" }
            ]);
            sumPieChart3.data(chart3.data());
            totalWaste = generalWasteBin.total + recyclingWasteBin.total + organicWasteBin.total + bringCentreBin.total;
            let newData =
                [
                    { x: "General Waste", value: generalWasteBin.total / totalWaste * 100, fill: "#545454" }, // This value will be dynamically updated
                    { x: "Recycling", value: recyclingWasteBin.total / totalWaste * 100, fill: "#00BF63" },
                    { x: "Organic Waste", value: organicWasteBin.total / totalWaste * 100, fill: "#745D3B" },
                    { x: "Bring Centre", value: bringCentreBin.total / totalWaste * 100, fill: "#FFC001" }
                ];
            barChart.data(newData);
            barChart.xAxis().labels().fontSize(7.5);
            barChart.yAxis().labels().fontSize(12.5);
            barChart.barGroupsPadding(0.2);
            barChart.yScale().minimum(0);
            barChart.yScale().maximum(65);

            sumBarChart.data(newData);
            sumBarChart.xAxis().labels().fontSize(7.5);
            sumBarChart.yAxis().labels().fontSize(12.5);
            sumBarChart.barGroupsPadding(0.2);
            sumBarChart.yScale().minimum(0);
            sumBarChart.yScale().maximum(65);



        }
        var decreaseButtons = document.querySelectorAll('.chart-action');
        var increaseButtons = document.querySelectorAll('.chart-action');

        decreaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                updateBudgetChart();
            });
        });

        increaseButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                updateBudgetChart();
            });
        });




        function clearTextSelection() {
            if (window.getSelection) { // All browsers except IE <9
                window.getSelection().removeAllRanges();
            } else if (document.selection) { // IE <9
                document.selection.empty();
            }
        }


        slider1.addEventListener('mousedown', clearTextSelection);
        slider2.addEventListener('mousedown', clearTextSelection);
        slider3.addEventListener('mousedown', clearTextSelection);
        slider4.addEventListener('mousedown', clearTextSelection);
        slider5.addEventListener('mousedown', clearTextSelection);

        slider1.addEventListener('input', updateValues);
        slider2.addEventListener('input', updateValues);
        slider3.addEventListener('input', updateValues);
        slider4.addEventListener('input', updateValues);
        slider5.addEventListener('input', updateValues);

        updateValues();


    });
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the help button
var btn = document.getElementById("helpBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to show only the first page of the modal
function showFirstPage() {
    // Hide all pages
    document.querySelectorAll('.modal-page').forEach(page => {
        page.style.display = 'none';
    });
    // Show only the first page
    document.querySelector('.modal-page[data-page="1"]').style.display = 'block';
}

// When the page loads, open the modal on the first page
window.onload = function () {
    modal.style.display = "block";
    setTimeout(() => { // Allow for the modal to be displayed before starting the opacity transition
        modal.style.opacity = 1;
        document.querySelector('.modal-content').style.transform = 'translateY(0px)';
        document.querySelector('.modal-content').style.opacity = 1;
    }, 10); // Short delay to ensure the display: block has taken effect

}

// When the user clicks the button, open the modal and ensure it starts on the first page
btn.onclick = function () {
    modal.style.display = "block";
    setTimeout(() => {
        modal.style.opacity = 1;
        document.querySelector('.modal-content').style.transform = 'translateY(0px)';
        document.querySelector('.modal-content').style.opacity = 1;
        showFirstPage(); // Ensure it starts on the first page
    }, 10);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.opacity = 0;
    document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
    document.querySelector('.modal-content').style.opacity = 0;
    modal.addEventListener('transitionend', function () {
        modal.style.display = "none";
    }, { once: true }); // Use the { once: true } option to ensure the listener is removed after execution
}

// Navigate through modal pages
document.querySelectorAll('.next, .prev').forEach(button => {
    button.addEventListener('click', function () {
        const currentPage = this.closest('.modal-page');
        const nextPage = this.classList.contains('next') ? currentPage.nextElementSibling : currentPage.previousElementSibling;

        if (nextPage) {
            currentPage.style.display = 'none';
            nextPage.style.display = 'block';
        }
    });
});

document.querySelectorAll('.begin').forEach(button => {
    button.addEventListener('click', function () {
        modal.style.opacity = 0;
        document.querySelector('.modal-content').style.transform = 'translateY(-12.5px)';
        document.querySelector('.modal-content').style.opacity = 0;
        modal.addEventListener('transitionend', function () {
            modal.style.display = "none";
        }, { once: true });
    });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.opacity = 0;
        document.querySelector('.modal-content').style.transform = 'translateY(-12.5px)';
        document.querySelector('.modal-content').style.opacity = 0;
        modal.addEventListener('transitionend', function () {
            modal.style.display = "none";
        }, { once: true });
    }
}




function openNav() {
    document.getElementById("mySidenav").style.width = "50%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function incrementBudget(categoryId) {
    const categoryValueElement = document.getElementById(`${categoryId}Value`);
    let categoryValue = parseInt(categoryValueElement.innerText);
    let propertyName = categoryId + "Deduction";

    if (categoryValue <= 30) {
        categoryValue -= 30; // Decrease by a fixed amount or a chosen value
        categoryValueElement.innerText = categoryValue;
        if (deductions.hasOwnProperty(propertyName)) {
            deductions[propertyName] -= 30;
        }
        else {
            console.log("Increment: Property doesnt exist: ", propertyName);
        }
        // Increase Recycling and Waste Budget
        const recyclingValueElement = document.getElementById('recyclingAndWasteValue');
        let recyclingValue = parseInt(recyclingValueElement.innerText);
        recyclingValue += 30; // Increase by the same amount
        recyclingValueElement.innerText = recyclingValue;
        updateBudget(recyclingValue);
    }
}

function decrementBudget(categoryId) {
    const recyclingValueElement = document.getElementById('recyclingAndWasteValue');
    let recyclingValue = parseInt(recyclingValueElement.innerText);
    let propertyName = categoryId + "Deduction";
    const categoryValueElement = document.getElementById(`${categoryId}Value`);
    let categoryValue = parseInt(categoryValueElement.innerText);
    // Only allow incrementing if there's budget in Recycling and Waste
    if (recyclingValue > 0 && categoryValue <= -30) {
        recyclingValue -= 30; // Decrease Recycling and Waste by a fixed amount
        recyclingValueElement.innerText = recyclingValue;

        // Increase the specific category's budget

        categoryValue += 30; // Increase by the same amount
        categoryValueElement.innerText = categoryValue;
        updateBudget(recyclingValue);

        if (deductions.hasOwnProperty(propertyName)) {
            deductions[propertyName] += 30;
        }
        else {
            console.log("Increment: Property doesnt exist: ", propertyName);
        }
    }
}

function updateBudget(newBudget) {
    totalBudget = newBudget * 1000000;
    const allBudget = document.getElementById('allBudget');
    allBudget.textContent = newBudget;
}

function increasePop() {
    if (popularity2Value < 100) {
        popularity2Value += 5;
    }
    updateBar2();
}

function decreasePop() {
    console.log(popularity2Value);
    if (popularity2Value > 0) {
        popularity2Value -= 5;
    }
    updateBar2();


}
function updateBar2() {
    popularity2.textContent = `${popularity2Value.toFixed(0)}%`;
    popularity2.style.width = `${popularity2Value}%`;
    popularity2.style.backgroundColor = popularity2Value <= 40 ? 'red' : (popularity2Value < 65 ? 'orange' : '#4CAF50');
    updateBar3();
}
function updateBar3() {
    popularity3.textContent = `${popularity2Value.toFixed(0)}%`;
    popularity3.style.width = `${popularity2Value}%`;
    popularity3.style.backgroundColor = popularity2Value <= 40 ? 'red' : (popularity2Value < 65 ? 'orange' : '#4CAF50');

}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('slider1').addEventListener('input', function () {
        document.getElementById('sliderValue1').textContent = (this.value * 3000000);
    });
    document.getElementById('slider2').addEventListener('input', function () {
        document.getElementById('sliderValue2').textContent = (this.value * 3000000);
    });
    document.getElementById('slider3').addEventListener('input', function () {
        document.getElementById('sliderValue3').textContent = (this.value * 3000000);
    });
    document.getElementById('slider4').addEventListener('input', function () {
        document.getElementById('sliderValue4').textContent = this.value;
    });
    document.getElementById('slider5').addEventListener('input', function () {
        document.getElementById('sliderValue5').textContent = this.value;
    });

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
        if (totalUsedDollars > 999999999999999) {
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
        totalUsedSpan.textContent = `€${(totalUsedDollars / 1000000).toFixed(0)}m`;
        budgetSliders.forEach((slider, i) => budgetValues[i].textContent = `${(Number(slider.value) * unitValue / 1000000).toFixed(2)}M`);

    }





    anychart.onDocumentReady(function () {
        // Data for the circle packing chart
        createWasteObjects();
        var wasteList = [plasticW, paperW, cardboardW, metalW, nappiesW, finesW, foodW, gardenW, weeeW, textilesW, hazardousW, glassW, contaminationW];
        var binList = [generalWasteBin, recyclingWasteBin, organicWasteBin, bringCentreBin];




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
            textilesW.ratio = adjustArrayValues(textilesRatioBase.slice(), (value3 / 100), textilesW.targetBin - 1); ///texytiles cuhhh
            hazardousW.ratio = adjustArrayValues(hazardousWasteRatioBase.slice(), (value3 / 100), hazardousW.targetBin - 1);
            glassW.ratio = adjustArrayValues(glassRatioBase.slice(), (value3 / 100), glassW.targetBin - 1);

            console.log(textilesW.ratio[0] + ", " + textilesW.ratio[1] + ", " + textilesW.ratio[2] + ", " + textilesW.ratio[3]);

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

        document.getElementById('next-challenge').addEventListener('click', function (event) {
            if (goals != 3) {
                event.preventDefault();
                alert("You must complete all 3 goals to move on to the next challenge!");
            }
        });

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

            chart2.data([
                { x: "General Waste", value: ((recyclingWasteBin.genSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#545454" },
                { x: "Recyclable Waste", value: ((recyclingWasteBin.recSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#00BF63" },
                { x: "Organic Waste", value: ((recyclingWasteBin.orgSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#745D3B" },
                { x: "Bring Centre Waste", value: ((recyclingWasteBin.bringSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#FFC001" },
                { x: "Contamination", value: ((recyclingWasteBin.conSize / recyclingWasteBin.total) * 100).toFixed(0), fill: "#FF3131" }
            ]);

            chart3.data([
                { x: "General Waste", value: ((organicWasteBin.genSize / organicWasteBin.total) * 100).toFixed(0), fill: "#545454" },
                { x: "Recyclable Waste", value: ((organicWasteBin.recSize / organicWasteBin.total) * 100).toFixed(0), fill: "#00BF63" },
                { x: "Organic Waste", value: ((organicWasteBin.orgSize / organicWasteBin.total) * 100).toFixed(0), fill: "#745D3B" },
                { x: "Bring Centre Waste", value: ((organicWasteBin.bringSize / organicWasteBin.total) * 100).toFixed(0), fill: "#FFC001" },
                { x: "Contamination", value: ((organicWasteBin.conSize / organicWasteBin.total) * 100).toFixed(0), fill: "#FF3131" }
            ]);
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

        }

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
        document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
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
        document.querySelector('.modal-content').style.transform = 'translateY(-50px)';
        document.querySelector('.modal-content').style.opacity = 0;
        modal.addEventListener('transitionend', function () {
            modal.style.display = "none";
        }, { once: true });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('slider');
    var circle1 = document.getElementById('circle1');
    var circle2 = document.getElementById('circle2');
    var circle3 = document.getElementById('circle3');
    var circle4 = document.getElementById('circle4');


    var initialFontSize = 4;

    function updateCircles() {
        var sliderValue = parseInt(slider.value);
        var max = parseInt(slider.max);

        var inverseSize = (max + 40 - sliderValue) / 100;
        circle1.style.transform = 'scale(' + inverseSize + ')';
        circle2.style.transform = 'scale(' + inverseSize + ')';
        circle3.style.transform = 'scale(' + inverseSize + ')';
        circle4.style.transform = 'scale(' + inverseSize + ')';

        var fontSize = initialFontSize * Math.sqrt(inverseSize);
        document.getElementById('title1').style.fontSize = fontSize + 'em'
        document.getElementById('title2').style.fontSize = fontSize + 'em'
        document.getElementById('title3').style.fontSize = fontSize + 'em'
        document.getElementById('title4').style.fontSize = fontSize + 'em'

        var taxRate = document.getElementById('taxRate');
        var tax = (sliderValue / 100) * 30;
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
            popularityBar.style.backgroundColor = '#4CAF50';
        }

    }

    function clearTextSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) { // IE <9
            document.selection.empty();
        }
    }

    slider.addEventListener('mousedown', clearTextSelection);

    slider.addEventListener('input', updateCircles);
    updateCircles();

});



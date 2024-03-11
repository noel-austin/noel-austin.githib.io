let mapImage;
let canvasWidth;
let canvasHeight;
let mapWidth;
let mapHeight;
let dots1 = [];
let dots2 = [];
let dots3 = [];
let dot1; let dot2; let dot3; let dot4; let dot5; let dot6;
let dot7; let dot8; let dot9; let dot10; let dot11; let dot12;
let dot13; let dot14; let dot15; let dot16; let dot17; let dot18;
let dot19; let dot20; let dot21; let dot22; let dot23; let dot24;
let dot25; let dot26; let dot27; let dot28; let dot29;

function preload() {
    mapImage = loadImage("pictures/mapImage.png");
}

function setup() {
    canvasWidth = windowWidth / 2;
    canvasHeight = windowHeight + 500;
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(`map-sketch`);
    let aspectRatio = mapImage.width / mapImage.height;
    mapWidth = 2000
    mapHeight = mapWidth / aspectRatio;
    mapImage.resize(mapWidth, mapHeight);


}

function draw() {

    background("#222222");
    image(mapImage, 0, 0);
    for (let x of dots1) {
        x.render();
    }


}


function createDots() {
    dot1 = new Dot(50, 50);
    dot2 = new Dot(50, 50);
    dot3 = new Dot(50, 50);
    dot4 = new Dot(50, 50);
    dot5 = new Dot(50, 50);
    dot6 = new Dot(50, 50);
    dot7 = new Dot(50, 50);
    dot8 = new Dot(50, 50);
    dot9 = new Dot(50, 50);
    dots1.push(dot1, dot2, dot3, dot4, dot5, dot6, dot7, dot8, dot9);
    dot10 = new Dot(50, 50);
    dot11 = new Dot(50, 50);
    dot12 = new Dot(50, 50);
    dot13 = new Dot(50, 50);
    dot14 = new Dot(50, 50);
    dot15 = new Dot(50, 50);
    dot16 = new Dot(50, 50);
    dot17 = new Dot(50, 50);
    dot18 = new Dot(50, 50);
    dot19 = new Dot(50, 50);
    dots2.push(dot10, dot11, dot12, dot13, dot14, dot15, dot16, dot17, dot18, dot19);
    dot20 = new Dot(50, 50);
    dot21 = new Dot(50, 50);
    dot22 = new Dot(50, 50);
    dot23 = new Dot(50, 50);
    dot24 = new Dot(50, 50);
    dot25 = new Dot(50, 50);
    dot26 = new Dot(50, 50);
    dot27 = new Dot(50, 50);
    dot28 = new Dot(50, 50);
    dot29 = new Dot(50, 50);
    dots3.push(dot20, dot21, dot23, dot24, dot25, dot26, dot27, dot28, dot29);
}


class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        fill("yellow");
        circle(x, y, 50);
    }
}

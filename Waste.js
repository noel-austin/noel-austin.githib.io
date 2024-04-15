function createWasteObjects() {
    plasticW = new Waste("Plastic", 2, plasticSize, plasticRatio);
    paperW = new Waste("Paper", 2, paperSize, paperRatio);
    cardboardW = new Waste("Cardboard", 2, cardboardSize, cardboardRatio);
    metalW = new Waste("Metal", 2, metalSize, metalRatio);

    nappiesW = new Waste("Nappies", 1, nappiesSize, nappiesRatio);
    finesW = new Waste("Fines", 1, finesSize, finesRatio);

    foodW = new Waste("Food Waste", 3, foodWasteSize, foodWasteRatio);
    gardenW = new Waste("Garden Waste", 3, gardenWasteSize, gardenWasteRatio);

    weeeW = new Waste("WEEE", 4, weeeSize, weeeRatio);
    textilesW = new Waste("Textiles", 4, textilesSize, textilesRatio);
    hazardousW = new Waste("Hazardous Waste", 4, hazardousWasteSize, hazardousWasteRatio);
    glassW = new Waste("Glass", 4, glassSize, glassRatio);

    contaminationW = new Waste("Contamination", 0, contaminationSize, contaminationRatio);

    generalWasteBin = new Bin(1, 0, 0, 0, 0, 0);
    recyclingWasteBin = new Bin(2, 0, 0, 0, 0, 0);
    organicWasteBin = new Bin(3, 0, 0, 0, 0, 0);
    bringCentreBin = new Bin(4, 0, 0, 0, 0, 0);

    var binList = [generalWasteBin, recyclingWasteBin, organicWasteBin, bringCentreBin];




}


function updateBinSize(bin) {

    bin.total = bin.genSize + bin.recSize + bin.orgSize + bin.bringSize + bin.conSize;
}

class Waste {
    constructor(name, targetBin, size, ratio) {
        this.name = name;
        this.targetBin = targetBin;
        this.size = size;
        this.ratio = ratio;

    }
}

class Bin {
    constructor(id, genSize, recSize, orgSize, bringSize, conSize) {
        this.id = id;
        this.genSize = genSize;
        this.recSize = recSize;
        this.orgSize = orgSize;
        this.bringSize = bringSize;
        this.conSize = conSize;
        this.total = genSize + recSize + orgSize + bringSize + conSize;
    }
}
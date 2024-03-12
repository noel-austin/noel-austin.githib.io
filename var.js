const minPopularity = 0;
const minPopularityChallenge2 = 40;
let totalBudgetChallenge2 = 660000000;
let totalBudget = 150;
var popularity2;
var popularity2Value;
var popularity3;
var currentPopularity;
var currentTotalWaste = 0;

var finalTotalWasteBar = 0;
var finalGeneralWasteBin = 0;
var finalRecyclingWasteBin = 0;
var finalOrganicWasteBin = 0;
var finalBringCentreBin = 0;

const socialProtectionAllocationBase = 25228000000;
const healthAllocationBase = 22501000000;
const housingAllocationBase = 6945000000;
const educationAllocationBase = 14615000000;
const transportAllocationBase = 3556000000;
const justiceAllocationBase = 3538000000;
const otherAllocation = 18001000000;

let socialProtectionAllocation = socialProtectionAllocationBase;
let healthAllocation = healthAllocationBase;
let housingAllocation = housingAllocationBase;
let educationAllocation = educationAllocationBase;
let transportAllocation = transportAllocationBase;
let justiceAllocation = justiceAllocationBase;

let deductions = {
    socialDeduction: 0,
    healthDeduction: 0,
    housingDeduction: 0,
    educationDeduction: 0,
    transportDeduction: 0,
    justiceDeduction: 0
};

var totalGenBin;
var totalRecBin;
var totalOrgBin;




const width = window.innerWidth;
const height = window.innerHeight;
let canvasWidth;
let canvasHeight;
let box1x = width * 0.04;
let box1y = height / 2 + 1500;
let box2x = width * 0.28;
let box2y = height / 2 + 1500;
let box3x = width * 0.52;
let box3y = height / 2 + 1500;
let box4x = width * 0.76;
let box4y = height / 2 + 1500;
let boxWidth = width / 5
let boxHeight = height * 0.47;



let genBinWaste = [];
let recBinWaste = [];
let orgBinWaste = [];
let brngBinWaste = [];
let contaminationCircles = [];

let genBinCapacity = 0;
let recBinCapacity = 0;
let orgBinCapacity = 0;
let brngBinCapacity = 0;

let box1GenWeight = 0;
let box1RecWeight = 0;
let box1OrgWeight = 0;
let box1BrngWeight = 0;
let box1ContamWeight = 0;

let box2GenWeight = 0;
let box2RecWeight = 0;
let box2OrgWeight = 0;
let box2BrngWeight = 0;
let box2ContamWeight = 0;

let box3GenWeight = 0;
let box3RecWeight = 0;
let box3OrgWeight = 0;
let box3BrngWeight = 0;
let box3ContamWeight = 0;

let box4GenWeight = 0;
let box4RecWeight = 0;
let box4OrgWeight = 0;
let box4BrngWeight = 0;
let box4ContamWeight = 0;

let baseCircleSize = 3500;
////circle sizes - use Ireland as base number
/*let plasitcsBaseSize = baseCircleSize * 0.16;
let papersBaseSize = baseCircleSize * 0.10;
let cardboardBaseSize = baseCircleSize * 0.06;
let metalsBaseSize = baseCircleSize * 0.04;
let nappiesBaseSize = baseCircleSize * 0.06;
let finesBaseSize = baseCircleSize * 0.06;
let gardenWasteBaseSize = baseCircleSize * 0.14;
let foodWasteBaseSize = baseCircleSize * 0.16;
let textilesBaseSize = baseCircleSize * 0.06;
let weeeBaseSize = baseCircleSize * 0.04;
let hazardousWasteBaseSize = baseCircleSize * 0.03;
let contaminationBaseSize = baseCircleSize * 0.2//0.07;
*/
let plasticBaseSize = 58;
let paperBaseSize = 36;
let cardboardBaseSize = 21;
let metalBaseSize = 14;
let nappiesBaseSize = 22;
let finesBaseSize = 22;
let gardenWasteBaseSize = 51;
let foodWasteBaseSize = 58;
let textilesBaseSize = 22;
let weeeBaseSize = 14;
let hazardousWasteBaseSize = 11;
let glassBaseSize = 7;
let contaminationBaseSize = 25;//0.07;


let plasticSize = plasticBaseSize;
let paperSize = paperBaseSize;
let cardboardSize = cardboardBaseSize;
let metalSize = metalBaseSize;
let nappiesSize = nappiesBaseSize;
let finesSize = finesBaseSize;
let gardenWasteSize = gardenWasteBaseSize;
let foodWasteSize = foodWasteBaseSize;
let textilesSize = textilesBaseSize;
let weeeSize = weeeBaseSize;
let hazardousWasteSize = hazardousWasteBaseSize;
let glassSize = glassBaseSize;
let contaminationSize = contaminationBaseSize;


//////Proportions - use Ireland as base number
let plasticRatioBase = [0.69, 0.25, 0.06, 0];
let paperRatioBase = [0.5, 0.5, 0, 0];
let cardboardRatioBase = [0.17, 0.83, 0, 0];
let metalRatioBase = [0.5, 0.5, 0, 0];
let nappiesRatioBase = [1, 0, 0, 0];
let finesRatioBase = [1, 0, 0, 0];
let gardenWasteRatioBase = [0, 0, 1, 0];
let foodWasteRatioBase = [0.69, 0, 0.31, 0];
let textilesRatioBase = [0.73, 0.27, 0, 0];
let weeeRatioBase = [0.5, 0.5, 0, 0];
let hazardousWasteRatioBase = [0.67, 0.33, 0, 0];
let glassRatioBase = [0.5, 0.5, 0, 0]
let contaminationRatioBase = [0.5, 0.5, 0, 0];



let plasticRatio = plasticRatioBase;
let paperRatio = paperRatioBase;
let cardboardRatio = cardboardRatioBase;
let metalRatio = metalRatioBase;
let nappiesRatio = nappiesRatioBase;
let finesRatio = finesRatioBase;
let gardenWasteRatio = gardenWasteRatioBase;
let foodWasteRatio = foodWasteRatioBase;
let textilesRatio = textilesRatioBase;
let weeeRatio = weeeRatioBase;
let hazardousWasteRatio = hazardousWasteRatioBase;
let glassRatio = glassRatioBase;
let contaminationRatio = contaminationRatioBase;

let currentRatios = [];


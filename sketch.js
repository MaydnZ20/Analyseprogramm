let lengthInput;
let carCountSelector;
let systemSelector;

let textPylonHöhe;
let textBruckenlaenge;
let textVertikalkraft;
let textHorizontalkraft;

let bridgeLength = 600;
let bridgeLength2;
let Frv;
let Frh;
let carCount = 1;
let cableCount = 3;
let systemType = "Fächer";

function setup() {
  createCanvas(1240, 600, WEBGL);
  textPylonHöhe = createDiv("Pylonenhöhe: 200m");
  textPylonHöhe.position(20, 20);
  textPylonHöhe.style("color", "black");
  textPylonHöhe.style("font-size", "12px");

  textBrückenlänge = createDiv(`Brückenlänge: ${bridgeLength}m`);
  textBrückenlänge.position(20, 35);
  textBrückenlänge.style("color", "black");
  textBrückenlänge.style("font-size", "12px");

  textVertikalkraft = createDiv(`vertikale Kraft: ${Frv}N`);
  textVertikalkraft.position(20, 50);
  textVertikalkraft.style("color", "black");
  textVertikalkraft.style("font-size", "12px");

  textHorizontalkraft = createDiv(`horizontale Kraft: ${Frh}N`);
  textHorizontalkraft.position(20, 65);
  textHorizontalkraft.style("color", "black");
  textHorizontalkraft.style("font-size", "12px");


  
    createP("Systemtyp wählen:");
  systemSelector = createSelect();
  systemSelector.option("Fächer");
  systemSelector.option("Harfe");
  systemSelector.changed(() => systemType = systemSelector.value());

 createP("Brückenlänge wählen (100–800):");
  lengthInput = createInput(bridgeLength + "", "number");
  lengthInput.attribute("min", 100);
  lengthInput.attribute("max", 800);
  lengthInput.attribute("step", 10); 
  lengthInput.input(onLengthChanged);
  
  createP("Anzahl Autos wählen:");
  carCountSelector = createSelect();
  carCountSelector.option(1);
  carCountSelector.option(2);
  carCountSelector.option(3);
  carCountSelector.option(4);
  carCountSelector.option(5);
  carCountSelector.option(6)
  carCountSelector.option(7);
  carCountSelector.option(8);
  carCountSelector.option(9);
  carCountSelector.option(10);
  carCountSelector.changed(() => carCount = Number(carCountSelector.value()));
  
  bridgeLength2 = bridgeLength * 2
}

function onLengthChanged() {
  let v = Number(lengthInput.value());
  bridgeLength = constrain(v, 100,800);
  bridgeLength2 = bridgeLength * 2
  lengthInput.value(bridgeLength); 
}


function draw() {
  background(135, 206, 235); 
  orbitControl(); 
  drawBridge();
  drawCars();
  drawInfo();
}

  
function drawBridge(){
  // Boden
  push();
  rotateX(HALF_PI);
  fill(46, 36, 108);
  plane(2000, 1000);
  pop();

  // Fundamente
  drawPillar(-bridgeLength2/2, 0);
  drawPillar(0, 0);
  drawPillar(bridgeLength2/2, 0);

  // Brückenplattform
  push();
  translate(0, -100, 0);
  fill(120);
  box(bridgeLength2, 20, 120);
  fill(100);
  box(bridgeLength2, 40, 20);
  fill(180);
  translate(0, -15, 60);
  box(bridgeLength2, 10, 2);
  translate(0, 0, -120);
  box(bridgeLength2, 10, 2)
  pop();

  // Pylon  
  drawPylon(0, -100, 0, 200);

  // Tragseile
  stroke(255);
  strokeWeight(2);
  
  if (systemType === "Fächer") {
  line(bridgeLength2/6, -100, 0,-300);
  line(-bridgeLength2/6, -100, 0,-300);
  line(bridgeLength2/3, -100, 0,-300);
  line(-bridgeLength2/3, -100, 0,-300);
  line(bridgeLength2/2, -100, 0,-300);
  line(-bridgeLength2/2, -100, 0,-300);
    } else {
  line(bridgeLength2/6, -100, 0,-300 + (200/3)*2);
  line(-bridgeLength2/6, -100, 0,-300 + (200/3)*2);
  line(bridgeLength2/3, -100, 0,-300 + (200/3));
  line(-bridgeLength2/3, -100, 0,-300 + (200/3));
  line(bridgeLength2/2, -100, 0,-300);
  line(-bridgeLength2/2, -100, 0,-300);
  }
}

function drawPillar(x, y, z) {
  push();
  translate(x, y - 50, 0);
  fill(80);
  box(40, 100, 40);
  pop();
}

function drawPylon(x, y, z, height) {
  push();
  translate(x, y - height / 2, 0);
  fill(100);
  box(20, height, 20);
  pop();
}


// Autos verteilen
function drawCars() {
  let count = Number(carCount); 
  if (count < 1) return;

  let spacing = bridgeLength2 / (count + 1);

  for (let i = 0; i < count; i++) {
    let x = -bridgeLength2 / 2 + (i + 1) * spacing;
    let y = -10;
    let z = (i % 2 === 0) ? -30 : 30;

    drawCar(x, y, z);
  }
}


// Autos zeichnen
function drawWheel(x, y, z) {
  push();
  translate(x, y, z);
  rotateX(HALF_PI);
  cylinder(5, 5);
  pop();
}

function drawCar(x, y, z) {
  push();
  translate(x, y - 110, z);

  fill(0, 0, 0);
  box(40, 15, 20);
  push();
  translate(0, -10, 0);
  fill(0, 0, 0);
  box(25, 10, 18);
  pop();
  fill(0);
  drawWheel(-15, 8, -10);
  drawWheel(15, 8, -10);
  drawWheel(-15, 8, 10);
  drawWheel(15, 8, 10);
  pop();
  
}
function drawInfo() {
  
  // Kräfteberechnung  
  let totalLoad = carCount * 1200;
  let F = (totalLoad / cableCount) * 10;
  Frv = 0;
  Frh = 0;
  
  if (systemType === "Fächer") {
  let Vector1 = bridgeLength / 6;
  let Vector2 = (bridgeLength / 6)*2;
  let Vector3 = (bridgeLength / 6)*3;
    
    
  let angle1 = atan(200 / Vector1);
  let angle2 = atan(200 / Vector2);
  let angle3 = atan(200 / Vector3);
  let Fy1 = F / sin(angle1);
  let Fy2 = F / sin(angle2);
  let Fy3 = F / sin(angle3);
  Frv = Fy1 + Fy2 + Fy3;
  Frh = 0;
  } else {
  let Vector = (bridgeLength / 6) * 3;
  degrees();
  let angle = atan(200 / Vector);
  Frv = (F / sin(angle)) * 3;
  Frh = (F / sin(90)) * 3;
  }
  

// Kräftevektoren
let Fx = Frh;
let Fy = Frv;

let z = 75;
let y = -300;

// Vertikale Kraft 
push();
translate(0, y, z); 
stroke(0, 0, 255);
fill(0, 0, 255);
noStroke();

// Blauer Vektor
translate(0, Fy / 1000, 0); 
box(3, Fy / 500, 3);
translate(0, Fy / 1000 + 5, 0);
cone(6, 10);
pop();


// Horizontale Kräfte
if (Fx !== 0) {
  push();
  translate(0, y, z);
  noStroke();
  fill(255, 0, 0);
  translate(Fx / 1000 / 2, 0, 0); 
  box(Fx / 500, 3, 3);
  translate(Fx / 1000, 0, 0);
  rotateZ(-HALF_PI);
  cone(6, 10, 12);
  pop();
  push();
  translate(0, y, z);
  noStroke();
  fill(255, 0, 0);
  translate(-Fx / 1000 / 2, 0, 0); 
  box(Fx / 500, 3, 3);
  translate(-Fx / 1000, 0, 0);
  rotateZ(HALF_PI);
  cone(6, 10, 12);
  pop();
  
}
  
  // Texte 
textBrückenlänge.html(`Brückenlänge: ${bridgeLength}m`);
textVertikalkraft.html(`Vertikalkraft: ${Frv.toFixed(2)} N`);
textHorizontalkraft.html(`Horizontalkraft: ${Frh.toFixed(2)} N`);

   
  
}
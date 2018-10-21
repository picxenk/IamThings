var hfont;
var unit;
var fontSize;
var texts = [];
var mode = "ko";
var typingModel = "auto";

var lineX, lineY;

var autoTexts = "나는 지금 평균 200타수로 타이핑하고 있다.";
var dissembledAutoTexts, i;

function preload() {
  hfont = loadFont('./assets/D2Coding.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#000000");
  pg = createGraphics(windowWidth, windowHeight);
  pg.background('#000000');

  pg.textFont(hfont);
  unit = round(windowWidth / 20);
  fontSize = unit;
  pg.textSize(fontSize);

  lineX = unit/2;
  lineY = unit;

  dissembledAutoTexts = Hangul.d(autoTexts);
  i = 0;
}


function draw() {
  background(0);
  image(pg, 0, 0);
  // put drawing code here
  fill(200);
  rect(lineX+unit/2, 0, unit/10, unit);
}


function keyPressed() {
  console.log(keyCode);
  if (keyCode == 8) {
    texts.pop();
    if (typingModel == 'auto') {
      i = i - 1;
      console.log("index" + i + " : " + dissembledAutoTexts[i]);
    }

    refreshText();
  }
}

function keyTyped() {
  if (typingModel == 'self') {
    texts.push(key);
  } else {
    texts.push(dissembledAutoTexts[i]);
    i = i + 1;
  }
  refreshText();
  return false;
}

function refreshText() {
  pg.background(0);
  pg.fill(200);
  fullTexts = Hangul.a(texts);
  pg.text(fullTexts, lineX, lineY);
}

var unit;
var unitNumber = 21;

var hfont;
var fontSize;
var texts = [];
var fullTexts = "";


var mode = "ko";
var typingModel = "self";

var lineX, lineY;

var autoTexts = "나는 지금 평균 200타수로 타이핑하고 있다.";
var dissembledAutoTexts, i;

var cursor;


function preload() {
  hfont = loadFont('./assets/D2Coding.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#000000");
  pg = createGraphics(windowWidth, windowHeight);
  pg.background('#000000');


  pg.textFont(hfont);
  unit = round(windowWidth / unitNumber);
  fontSize = unit;
  pg.textSize(fontSize);

  cursor = new Cursor(unit);

  lineX = unit/2;
  lineY = unit;
  // cursorX = lineX;
  // cursorY = 0;

  dissembledAutoTexts = Hangul.d(autoTexts);
  i = 0;

}


function draw() {
  background(0);
  image(pg, 0, 0);

  // showCursor();
  cursor.show();
}


function isHangul(c) {
  if (Hangul.isHangul(c) || Hangul.isCho(c)) {
    return true;
  } else {
    return false;
  }
}

function keyPressed() {
  // console.log(keyCode);
  if (keyCode == 8) {
    texts.pop();
    if (typingModel == 'auto') {
      i = i - 1;
      // console.log("index" + i + " : " + dissembledAutoTexts[i]);
    }

    renderText();
  }
}


function keyTyped() {
  if (typingModel == 'self') {
    texts.push(key);
  } else {
    texts.push(dissembledAutoTexts[i]);
    i = i + 1;
  }
  renderText();
  return false;
}


function renderText() {
  pg.background(0);
  pg.fill(200);
  fullTexts = Hangul.a(texts);
  // pg.text(fullTexts, lineX, lineY);

  lineX = unit/2;
  lineY = unit;

  for (var i=0; i<fullTexts.length; i++) {
    var char = fullTexts[i];
    pg.text(char, lineX, lineY);
    if (isHangul(char)) {
      lineX = lineX + unit;
    } else {
      lineX = lineX + unit/2;
    }
    if (lineX >= unit*unitNumber - unit/2) {
      lineX = unit/2;
      lineY = lineY + unit;
    }
  }

  cursor.setPosition(lineX, lineY-unit);
}

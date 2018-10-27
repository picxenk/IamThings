var unit;
var unitNumber = 16;

var cursor;
var editor;
var editorH, topH;

var hfont;
var fontSize;
var texts = [];
var fullTexts = "";

var mode = "ko";
var typingModel = "self";

var autoTexts = "나는 지금 평균 200타수로 타이핑하고 있다.";
var dissembledAutoTexts, i;


function preload() {
  hfont = loadFont('./assets/D2Coding.ttf');
}


function setup() {
  frameRate(10);
  createCanvas(windowWidth, windowHeight);
  editorH = round(windowHeight*0.78);
  topH = windowHeight - editorH;

  unit = round(windowWidth / unitNumber);
  fontSize = unit;
  editor = new Editor(windowWidth, editorH);
  editor.setPosition(0, topH);
  editor.setupFont(hfont, fontSize);

  cursor = new Cursor(unit, editor.y);

  dissembledAutoTexts = Hangul.d(autoTexts);
  i = 0;
}


function draw() {
  background(0);

  editor.show();
  cursor.show();

  showGuide();
}


function showGuide() {
  strokeWeight(0.5);
  stroke('#777777');
  noFill();
  var w = windowWidth;
  var h = w / 9 * 16;
  rect(0, 0, w, h);
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

    var last = editor.renderText(texts);
    cursor.setPosition(last[0], editor.y+last[1]-unit);
  }
}


function keyTyped() {
  if (typingModel == 'self') {
    texts.push(key);
  } else {
    texts.push(dissembledAutoTexts[i]);
    i = i + 1;
  }

  var last = editor.renderText(texts);
  cursor.setPosition(last[0], editor.y+last[1]-unit);
  return false;
}

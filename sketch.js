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
var currentModel;
var modelSelf, modelSpeed;

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

  // init TypingModels
  modelSelf = new SelfTypingModel();
  modelSpeed = new SpeedTypingModel();
  currentModel = modelSelf;


  dissembledAutoTexts = Hangul.d(autoTexts);
  i = 0;

  background('#111111');
  showQuestion();
}


function draw() {

  editor.show();
  cursor.show();

  showGuide();
}


function showQuestion() {
  textFont(hfont);
  textSize(unit);
  fill(200);
  text("{ 디지털화된 사물이나 존재에 대해\n 생각해보십시오.\n 생각을 적어보십시오.\n 생각을 읽어보십시오.\n } 반복하십시오.", unit/2, unit);
}


function showGuide() {
  strokeWeight(0.5);
  stroke('#777777');
  // noFill();
  var w = windowWidth;
  var h = w / 9 * 16;
  // rect(0, 0, w, h);
  line(0, h, w, h);
}


function isHangul(c) {
  if (Hangul.isHangul(c) || Hangul.isCho(c)) {
    return true;
  } else {
    return false;
  }
}

function keyPressed() {
  currentModel.keyPressed();

  var last = editor.renderText(currentModel.texts);
  cursor.setPosition(last[0], editor.y+last[1]-unit);
}


function keyTyped() {
  if (key == 1) currentModel = modelSelf;
  if (key == 2) currentModel = modelSpeed;

  currentModel.keyTyped(key);

  var last = editor.renderText(currentModel.texts);
  cursor.setPosition(last[0], editor.y+last[1]-unit);
  return false;
}

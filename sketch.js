var unit;
var unitNumber = 16;

var cursor;
var editor;
var editorH, topH;

var hfont;
var fontSize;
var fullTexts = [];

var mode = "ko";
var currentModel;
var modelSelf, modelSpeed, modelOther;

var typeCount = 0;
var tLastTyped = 0;
var tRecentTypes = [];


var debug = true;

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
  modelOther = new OtherTypingModel();
  currentModel = modelSelf;

  background('#111111');
  showQuestion();
}


function draw() {

  if (typeCount > currentModel.typeLimit - 20) cursor.blinkFast();
  if (typeCount > currentModel.typeLimit) changeTypingModel();

  editor.show();
  cursor.show();

  showGuide();
}


function changeTypingModel() {
  if (debug) console.log("[Change TypingModel] befor :" + currentModel.name);

  fullTexts = fullTexts.concat(currentModel.texts);
  if (currentModel.name == 'self') {
    saveTexts(Hangul.a(currentModel.texts));
    currentModel = modelSpeed;
  } else if (currentModel.name == 'speed') {
    currentModel = modelOther;
  } else if (currentModel.name == 'other') {
    currentModel = modelSelf;
  }

  cursor.modelColor(currentModel.name);
  cursor.blinkSlow();
  currentModel.init();
  typeCount = 0;

  if (debug) console.log("[Change TypingModel] after :" + currentModel.name);
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




function timestamp() {
  var now = round(millis());
  var diff = now - tLastTyped;
  tLastTyped = now;

  if (diff > 5000) tRecentTypes = [];
  tRecentTypes.push(diff);

  if (tRecentTypes.length > 15) {
    tRecentTypes = tRecentTypes.slice(-15);
  }

  modelSpeed.averageRecentTypes(tRecentTypes);

  if (debug) console.log("tLastTyped : " + tLastTyped);
  if (debug) console.log("tRecentTypes : " + tRecentTypes);
  if (debug) console.log("avg speed : " + modelSpeed.speed);
}


function keyPressed() {
  timestamp();
  currentModel.keyPressed();

  var last = editor.renderText(fullTexts.concat(currentModel.texts));
  cursor.setPosition(last[0], editor.y+last[1]-unit);
}


function keyTyped() {
  // timestamp();
  if (key == 1) currentModel = modelSelf;
  if (key == 2) currentModel = modelSpeed;
  if (key == 9) changeTypingModel();

  currentModel.keyTyped(key);
  typeCount += 1;

  var last = editor.renderText(fullTexts.concat(currentModel.texts));
  cursor.setPosition(last[0], editor.y+last[1]-unit);
  return false;
}

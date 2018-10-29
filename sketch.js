var unit, qunit;
var unitNumber = 20;

var cursor;
var editor;
var editorH, topH;

var hfont;
var fontSize;
var fullTexts = [];

var lang = "ko";
var currentModel;
var modelSelf, modelSpeed, modelOther, modelML;
var modelChangeCount = 0;

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

  qunit = round(windowWidth/18);
  topH = qunit*7;
  editorH = windowHeight - topH;
  // topH = windowHeight - editorH;

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
  modelML = new MLTypingModel();
  currentModel = modelSelf;

  readGoogleSheet('otherTextsNew');
  readGoogleSheet('MLTexts');
  showQuestion();
}


function draw() {

  if (typeCount > currentModel.typeLimit - 20) {
    cursor.blinkFast();
  } else {
    cursor.blinkSlow();
  }
  if (typeCount > currentModel.typeLimit) changeTypingModel();

  editor.show();
  cursor.show();

  showGuide();
}


function changeTypingModel() {
  if (debug) console.log("[Change TypingModel] befor :" + currentModel.name);

  fullTexts = fullTexts.concat(currentModel.texts);
  if (currentModel.name == 'self') {
    saveTexts('otherTexts', Hangul.a(currentModel.texts));
    currentModel = modelSpeed;
  } else if (currentModel.name == 'speed') {
    currentModel = modelOther;
  } else if (currentModel.name == 'other') {
    currentModel = modelML;
  } else if (currentModel.name == 'ML') {
    currentModel = modelSelf;
  }

  cursor.modelColor(currentModel.name);
  cursor.blinkSlow();
  currentModel.init();
  typeCount = 0;
  modelChangeCount += 1;

  if (modelChangeCount % 10 == 0) saveGoogleSheet();

  if (debug) console.log("[Change TypingModel] after :" + currentModel.name);
}


function showQuestion() {
  background('#cccccc');
  textFont(hfont);
  var qunit = round(windowWidth/18);
  textSize(qunit);
  fill('#333333');
  text("디지털화된 사물이나 존재에 대해 {\n 생각해보십시오.\n 생각을 적어보십시오.\n 생각을 읽어보십시오.\n} 반복하십시오.", qunit/2, qunit*1.5);
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


function renderTexts() {
  var last = editor.renderText(fullTexts.concat(currentModel.texts));
  cursor.setPosition(last[0], editor.y+last[1]-unit);

  if (last[1]+unit*1.5 > editor.h) fullTexts = [];
}


function keyPressed() {
  timestamp();
  currentModel.keyPressed();
  if (keyCode == 8) {
    typeCount -= 1;
    if (typeCount < 0) typeCount = 1;
  }

  renderTexts();
}


function keyTyped() {
  // timestamp();
  if (key == 1) currentModel = modelSelf;
  if (key == 2) currentModel = modelSpeed;
  if (key == 9) {
    changeTypingModel();
    saveGoogleSheet();
  }

  currentModel.keyTyped(key);
  typeCount += 1;

  renderTexts();
  return false;
}

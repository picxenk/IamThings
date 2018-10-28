// Self  =====================================================================
function SelfTypingModel() {
  this.name = 'self';
  this.texts = [];
}

SelfTypingModel.prototype.init = function() {
  this.texts = [];
}

SelfTypingModel.prototype.keyPressed = function() {
  if (keyCode == 8) {
    this.texts.pop();
  }
}

SelfTypingModel.prototype.keyTyped = function(key) {
  this.texts.push(key);
}


// Speed  =====================================================================
function SpeedTypingModel() {
  this.name = 'speed';
  this.texts = [];
  this.sentence = "";
  this.i = 0;
  this.speed = 0;
}

SpeedTypingModel.prototype.init = function() {
  this.texts = [];
  this.i = 0;
}

SpeedTypingModel.prototype.keyPressed = function() {
  if (keyCode == 8) {
    this.texts.pop();
    this.i = this.i - 1;
    if (this.i < 0) this.i = 0;
  }
}

SpeedTypingModel.prototype.keyTyped = function(key) {
  var t = "나는 지금 대략 분당 "+this.speed+"타수로 타이핑하고 있다.";
  this.sentence = Hangul.d(t);
  this.texts.push(this.sentence[this.i]);
  this.i = this.i + 1;
  if (this.i >= this.sentence.length) this.i = 0;
}

SpeedTypingModel.prototype.averageRecentTypes = function(recentTypes) {
  var sum = 0;
  var num = recentTypes.length;

  if (num < 10)  {
    this.speed = 0;
  } else {

    for (var i=0; i<num; i++) {
      sum = sum + recentTypes[i];
    }
    var avg = sum / num;
    this.speed = round(60000/avg);
  }

  return this.speed;
}

// Other =====================================================================
function OtherTypingModel() {
  this.name = 'other';
  this.texts = [];
  this.sentence = "";
  this.i = 0;
}

OtherTypingModel.prototype.init = function() {
  this.texts = [];
  this.i = 0;
  var sentences = loadTexts();
  var num = sentences.length;
  if (num > 5) num = num - 5;
  var i = floor(random(num));
  this.sentence = Hangul.d(sentences[i]);

}

OtherTypingModel.prototype.keyPressed = function() {
  if (keyCode == 8) {
    this.texts.pop();
    this.i = this.i - 1;
    if (this.i < 0) this.i = 0;
  }
}

OtherTypingModel.prototype.keyTyped = function(key) {
  this.texts.push(this.sentence[this.i]);
  this.i = this.i + 1;
  if (this.i >= this.sentence.length) this.i = 0;
}

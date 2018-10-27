// Self  =====================================================================
function SelfTypingModel() {
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
  this.texts = [];
  this.sentence = Hangul.d("나는 지금 평균 200타수로 타이핑하고 있다.");
  this.i = 0;
}

SpeedTypingModel.prototype.keyPressed = function() {
  if (keyCode == 8) {
    this.i = this.i - 1;
  }
}

SpeedTypingModel.prototype.keyTyped = function(key) {
  this.texts.push(this.sentence[this.i]);
  this.i = this.i + 1;
}

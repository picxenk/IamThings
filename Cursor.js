function Cursor(unit, y) {
  this.x = unit/2;
  this.y = y;
  this.w = unit/4;
  this.h = unit;

  this.color = color(200);
  this.blinkTerm;
  this.blinkSlow();
}

Cursor.prototype.show = function() {
  this.blink();

  if (this.isOn) {
    fill(this.color);
  } else {
    fill(0);
  }
  noStroke();
  if (this.blinkTerm < 2) {
    var g = unit/8;
    rect(this.x, this.y+unit/5-g, this.w+(g*2), this.h+(g*2));
  } else {
    rect(this.x, this.y+unit/5, this.w, this.h);
  }
}

Cursor.prototype.blink = function() {
  if (frameCount % this.blinkTerm == 0) {
    if (this.isOn == true) this.isOn = false;
    else this.isOn = true;
  }
}

Cursor.prototype.blinkFast = function() {
  this.blinkTerm = 1;
}
Cursor.prototype.blinkSlow = function() {
  this.blinkTerm = 6;
}

Cursor.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
}

Cursor.prototype.modelColor = function(model) {
    if (model == 'self') this.color = color(200);
    else if (model == 'speed') this.color = color(200, 30, 30);
    else if (model == 'other') this.color = color(30, 200, 30);
    else if (model == 'ML') this.color = color(30, 30, 200);
}

function Cursor(unit) {
  this.x = unit/2;
  this.y = 0;
  this.w = unit/4;
  this.h = unit;
  this.color = color(200);
}

Cursor.prototype.show = function() {
  this.blink();

  if (this.isOn) {
    fill(this.color);
  } else {
    fill(0);
  }
  noStroke();
  rect(this.x, this.y+unit/5, this.w, this.h);
}

Cursor.prototype.blink = function() {
  if (frameCount % 5 == 0) {
    if (this.isOn == true) this.isOn = false;
    else this.isOn = true;
  }
}

Cursor.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
}

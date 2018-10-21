function Cursor(unit) {
  this.x = unit/2;
  this.y = 0;
  this.w = unit/4;
  this.h = unit;
  this.color = color(200);
}

Cursor.prototype.show = function() {
  fill(this.color);
  rect(this.x, this.y, this.w, this.h);
}

Cursor.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
}

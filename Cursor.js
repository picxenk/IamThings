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

Cursor.prototype.checkPosition = function(sentence) {
  var x = 0;
  for (var i=0; i<sentence.length; i++) {
    var w = sentence[i];
    if (isHangul(w)) {
      x = x + unit;
    } else {
      x = x + unit/2;
    }
  }
  // cursorX = lineX + x;
  this.x = lineX + x;

}

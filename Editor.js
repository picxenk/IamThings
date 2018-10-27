function Editor(w, h) {
  this.x = 0;
  this.y = 0;
  this.w = w;
  this.h = h;

  this.unit = 0;
  this.color = color('#000000');
  this.fontColor = color(200);

  // this.lineX = 0;
  // this.lineY = 0;

  this.pg = createGraphics(this.w, this.h);
  this.pg.background(this.color);

}


Editor.prototype.show = function() {
  image(this.pg, this.x, this.y);
}


Editor.prototype.setPosition = function(x, y) {
  this.x = x;
  this.y = y;
}


Editor.prototype.setupFont = function(aFont, fontSize) {
  this.unit = fontSize;
  // this.lineX = this.unit/2;
  // this.lineY = this.unit;
  this.pg.textFont(aFont);
  this.pg.textSize(fontSize);
}

Editor.prototype.renderText = function(texts) {
  this.pg.background(this.color);
  this.pg.fill(this.fontColor);
  var fullTexts = Hangul.a(texts);

  var lineX = this.unit/2;
  var lineY = this.unit;

  for (var i=0; i<fullTexts.length; i++) {
    var char = fullTexts[i];
    this.pg.text(char, lineX, lineY);
    if (isHangul(char)) {
      lineX = lineX + this.unit;
    } else {
      lineX = lineX + this.unit/2;
    }
    if (lineX >= this.unit*unitNumber - this.unit/2) {
      lineX = this.unit/2;
      lineY = lineY + this.unit;
    }
  }

  return [lineX, lineY];
  cursor.setPosition(lineX, lineY-unit);
}

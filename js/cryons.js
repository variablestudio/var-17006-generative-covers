//-----------------------------------------------------------------------------

var Crayon = {};

//-----------------------------------------------------------------------------

function SkCanvasCrayon(canvas) {
  this.canvas = canvas;
  this.styles = {};
  this.styles['default'] = this.createStyle();
  this.currentStyle = this.styles['default'];
}

SkCanvasCrayon.prototype.createStyle = function() {
  var style = new plask.SkPaint();
  style.setAntiAlias(true);
  return style;
};

SkCanvasCrayon.prototype.style = function(styleName) {
  if (!this.styles[styleName]) {
    this.styles[styleName] = this.createStyle();
  }
  this.currentStyle = this.styles[styleName];
  return this;
};

SkCanvasCrayon.prototype.color = function(c) {
  this.currentStyle.setColor(c[0], c[1], c[2], c[3]);
  return this;
};

SkCanvasCrayon.prototype.fill = function(enabled) {
  var on = (enabled !== undefined) ? enabled : true;
  if (on) this.currentStyle.setFill();
  else this.currentStyle.setStroke();
  return this;
};

SkCanvasCrayon.prototype.stroke = function(enabled) {
  //this.currentStyle.setStroke((enabled !== undefined) ? enabled : true);
  var on = (enabled !== undefined) ? enabled : true;
  if (on) this.currentStyle.setStroke();
  else this.currentStyle.setFill();
  return this;
};

SkCanvasCrayon.prototype.rect = function(x, y, w, h) {
  this.canvas.drawRect(this.currentStyle, x, y, w, h);
  return this;
};

SkCanvasCrayon.prototype.circle = function(x, y, r) {
  this.canvas.drawCircle(this.currentStyle, x, y, r);
  return this;
};

SkCanvasCrayon.prototype.line = function(x1, y1, x2, y2) {
  this.canvas.drawLine(this.currentStyle, x1, y1, x2, y2);
  return this;
};

SkCanvasCrayon.prototype.clear = function() {
  this.canvas.eraseColor(255, 255, 255, 255);
  return this;
};

(function() {
  if (typeof require !== 'undefined' && typeof document === 'undefined') {
    Crayon = SkCanvasCrayon;
    console.log("SkCanvasCrayon enabled");
  }
  else {
    console.log("SkCanvasCrayon disabled");
  }
})();


//-----------------------------------------------------------------------------

function HTMLCanvasCryon(canvas) {
  console.log("HTMLCanvasCryon", canvas)
  this.canvas = canvas;
  this.styles = {};
  this.styles['default'] = this.createStyle();
  this.currentStyle = this.styles['default'];
}

HTMLCanvasCryon.prototype.createStyle = function() {
  var style = new plask.SkPaint();
  style.setAntiAlias(true);
  return style;
};

HTMLCanvasCryon.prototype.style = function(styleName) {
  if (!this.styles[styleName]) {
    this.styles[styleName] = this.createStyle();
  }
  this.currentStyle = this.styles[styleName];
  return this;
};

HTMLCanvasCryon.prototype.color = function(c) {
  this.currentStyle.setColor(c[0], c[1], c[2], c[3]);
  return this;
};

HTMLCanvasCryon.prototype.fill = function(enabled) {
  var on = (enabled !== undefined) ? enabled : true;
  if (on) this.currentStyle.setFill();
  else this.currentStyle.setStroke();
  return this;
};

HTMLCanvasCryon.prototype.stroke = function(enabled) {
  //this.currentStyle.setStroke((enabled !== undefined) ? enabled : true);
  var on = (enabled !== undefined) ? enabled : true;
  if (on) this.currentStyle.setStroke();
  else this.currentStyle.setFill();
  return this;
};

HTMLCanvasCryon.prototype.rect = function(x, y, w, h) {
  this.canvas.drawRect(this.currentStyle, x, y, w, h);
  return this;
};

HTMLCanvasCryon.prototype.circle = function(x, y, r) {
  this.canvas.drawCircle(this.currentStyle, x, y, r);
  return this;
};

HTMLCanvasCryon.prototype.line = function(x1, y1, x2, y2) {
  this.canvas.drawLine(this.currentStyle, x1, y1, x2, y2);
  return this;
};

HTMLCanvasCryon.prototype.clear = function() {
  this.canvas.eraseColor(255, 255, 255, 255);
  return this;
};

(function() {
  if (typeof document !== 'undefined') {
    Crayon = HTMLCanvasCryon;
    console.log("HTMLCanvasCryon enabled");
  }
  else {
    console.log("HTMLCanvasCryon disabled");
  }
})();



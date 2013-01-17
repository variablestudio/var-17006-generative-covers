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

function HTMLCanvasCrayon(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.styles = {};
  this.styles['default'] = this.createStyle();
  this.currentStyle = this.styles['default'];
}

HTMLCanvasCrayon.prototype.createStyle = function() {
  var style = {
    color: [0, 0, 0, 255],
    stroke: true,
    fill: false
  };
  return style;
};

HTMLCanvasCrayon.prototype.style = function(styleName) {
  if (!this.styles[styleName]) {
    this.styles[styleName] = this.createStyle();
  }
  this.currentStyle = this.styles[styleName];
  return this;
};

HTMLCanvasCrayon.prototype.color = function(color) {
  if (typeof color == 'string') {
    this.currentStyle.color = color;
  }
  return this;
};

HTMLCanvasCrayon.prototype.fill = function(enabled) {
  var on;
  if (typeof enabled == 'string') {
    this.color(enabled);
    on = true;
  }
  else if (typeof enabled == "boolean") {
    on = enabled;
  }
  else {
    on = false;
  }
  this.currentStyle.fill = on;
  this.currentStyle.stroke = !on;
  return this;
};

HTMLCanvasCrayon.prototype.stroke = function(enabled) {
  var on;
  if (typeof enabled == 'string') {
    this.color(enabled);
    on = true;
  }
  else if (typeof enabled == "boolean") {
    on = enabled;
  }
  else {
    on = false;
  }
  this.currentStyle.stroke = on;
  this.currentStyle.fill = !on;
  return this;
};

HTMLCanvasCrayon.prototype.rect = function(x, y, w, h) {
  if (this.currentStyle.fill) {
    this.context.fillStyle = this.currentStyle.color;
    this.context.fillRect(x, y, w, h);
  }
  if (this.currentStyle.stroke) {
    this.context.strokeStyle = this.currentStyle.color;
    this.context.strokeRect(x, y, w, h);
  }
  return this;
};

HTMLCanvasCrayon.prototype.circle = function(x, y, r) {
  //this.canvas.drawCircle(this.currentStyle, x, y, r);
  return this;
};

HTMLCanvasCrayon.prototype.line = function(x1, y1, x2, y2) {
  this.context.beginPath();
  this.context.moveTo(x1, y1);
  this.context.lineTo(x2, y2);
  this.context.closePath();

  if (this.currentStyle.fill) {
    this.context.fillStyle = this.currentStyle.color;
    this.context.fill();
  }
  if (this.currentStyle.stroke) {
    this.context.strokeStyle = this.currentStyle.color;
    this.context.stroke();
  }
  return this;
};

HTMLCanvasCrayon.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  return this;
};

(function() {
  if (typeof document !== 'undefined') {
    Crayon = HTMLCanvasCrayon;
    console.log("HTMLCanvasCrayon enabled");
  }
  else {
    console.log("HTMLCanvasCrayon disabled");
  }
})();



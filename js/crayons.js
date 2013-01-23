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
  this.transformStack = [];
  this.savedTransformStacks = [];
}

HTMLCanvasCrayon.prototype.createStyle = function() {
  var style = {
    color: [0, 0, 0, 255],
    stroke: true,
    fill: false,
    fontName: "Arial",
    fontSize: 12,
    textLeading: 0 //the same as fontSize
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

//fontSize in px
HTMLCanvasCrayon.prototype.font = function(fontName, fontSize, textLeading) {
  if (typeof textLeading === "undefined") textLeading = 0;
  this.currentStyle.fontName = fontName;
  this.currentStyle.fontSize = Math.floor(fontSize);
  this.currentStyle.textLeading = textLeading;
};

HTMLCanvasCrayon.prototype.beforeDraw = function() {
  this.context.save();

  if (this.currentStyle.fill) {
    this.context.fillStyle = this.currentStyle.color;
  }

  if (this.currentStyle.stroke) {
    this.context.strokeStyle = this.currentStyle.color;
  }

  if (this.currentStyle.fontName && this.currentStyle.fontSize) {
    this.context.font = this.currentStyle.fontSize + "px" + " " + this.currentStyle.fontName;
  }

  this.transformStack.forEach(function(transform) {
    transform();
  });
};

HTMLCanvasCrayon.prototype.afterDraw = function() {
  this.context.restore();
};

HTMLCanvasCrayon.prototype.rect = function(x, y, w, h) {
  this.beforeDraw();

  if (this.currentStyle.fill) {
    this.context.fillRect(x, y, w, h);
  }
  if (this.currentStyle.stroke) {
    this.context.strokeRect(x, y, w, h);
  }

  this.afterDraw();
  return this;
};

HTMLCanvasCrayon.prototype.circle = function(x, y, r) {
  this.beforeDraw();
  this.canvas.drawCircle(this.currentStyle, x, y, r);
  this.afterDraw();
  return this;
};


HTMLCanvasCrayon.prototype.line = function(x1, y1, x2, y2) {
  this.beforeDraw();

  this.context.beginPath();
  this.context.moveTo(x1, y1);
  this.context.lineTo(x2, y2);
  this.context.closePath();

  if (this.currentStyle.fill) {
    this.context.fill();
  }
  if (this.currentStyle.stroke) {
    this.context.stroke();
  }

  this.afterDraw();
  return this;
};

HTMLCanvasCrayon.prototype.text = function(str, x, y) {
  this.beforeDraw();

  if (this.currentStyle.fill) {
    this.context.fillText(str, x, y);
  }
  if (this.currentStyle.stroke) {
    this.context.strokeText(str, x, y);
  }

  this.afterDraw();
};

//assumes that beforeDraw() was called and context has current font style set up
HTMLCanvasCrayon.prototype.textBlockSplitLines = function(str, maxWidth) {
  //var width = measureTextContext.measureText(text).width;
  var words = str.split(" ");
  var lines = [];
  var currentLine = "";
  while(words.length > 0) {
    var word = words.shift();
    var newLine = currentLine;
    if (newLine.length > 0) newLine += " ";
    newLine += word;
    var measurements = this.context.measureText(newLine);
    if (measurements.width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    }
    else {
      currentLine = newLine;
    }
  }
  lines.push(currentLine);
  return lines;
};

HTMLCanvasCrayon.prototype.textBlock = function(str, x, y, width) {
  this.beforeDraw();

  var lines = [];

  if (Object.prototype.toString.call(str) === '[object Array]') {
    lines = str;
  }
  else {
    lines = this.textBlockSplitLines(str, width);
  }

  var dy = y;// + this.currentStyle.fontSize;

  if (this.currentStyle.fill) {
    lines.forEach(function(line) {
      this.context.fillText(line, x, dy);
      dy += this.currentStyle.fontSize * (1.0 + this.currentStyle.textLeading);
    }.bind(this));
  }
  if (this.currentStyle.stroke) {
    this.context.strokeText(str, x, y);
  }

  this.afterDraw();

  return dy - y - this.currentStyle.fontSize * (1.0 + this.currentStyle.textLeading);
};

HTMLCanvasCrayon.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.reset();
  return this;
};

HTMLCanvasCrayon.prototype.translate = function(x, y) {
  var context = this.context;
  this.transformStack.push(function() {
    context.translate(x, y);
  });
  return this;
};

HTMLCanvasCrayon.prototype.rotate = function(deg) {
  var context = this.context;
  var rad = deg / 180 * Math.PI;
  this.transformStack.push(function() {
    context.rotate(rad);
  });
  return this;
};

HTMLCanvasCrayon.prototype.scale = function(x, y) {
  var context = this.context;
  this.transformStack.push(function() {
    context.scale(x, y);
  });
  return this;
};

HTMLCanvasCrayon.prototype.save = function() {
  var savedStack = this.transformStack.map(function(t) { return t; });
  this.savedTransformStacks.push(savedStack);
};

HTMLCanvasCrayon.prototype.restore = function() {
  if (this.savedTransformStacks.length > 0) {
    this.transformStack = this.savedTransformStacks.pop();
  }
};

HTMLCanvasCrayon.prototype.reset = function() {
  this.transformStack = [];
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



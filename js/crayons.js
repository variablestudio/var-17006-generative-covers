//-----------------------------------------------------------------------------

var Crayon = function() {};

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
    stroke: false,
    fill: "#000000",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: "normal",
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

HTMLCanvasCrayon.prototype.fill = function(enabledColor) {
  this.currentStyle.fill = enabledColor;
  return this;
};

HTMLCanvasCrayon.prototype.stroke = function(enabledColor) {
  this.currentStyle.stroke = enabledColor;
  return this;
};

//fontSize in px
HTMLCanvasCrayon.prototype.font = function(fontFamily, fontSize, fontWeight) {
  this.currentStyle.fontFamily = fontFamily;
  this.currentStyle.fontSize = Math.floor(fontSize);
  this.currentStyle.fontWeight = fontWeight || this.currentStyle.fontWeight;
  return this;
};

HTMLCanvasCrayon.prototype.paragraph = function(textAlign, textLeading) {
  this.currentStyle.textAlign = textAlign;
  this.currentStyle.textLeading = textLeading;
  return this;
};

HTMLCanvasCrayon.prototype.beforeDraw = function() {
  this.context.save();

  if (this.currentStyle.fill) {
    this.context.fillStyle = this.currentStyle.fill;
  }

  if (this.currentStyle.stroke) {
    this.context.strokeStyle = this.currentStyle.stroke;
  }

  if (this.currentStyle.fontFamily && this.currentStyle.fontSize) {
    this.context.font = this.currentStyle.fontWeight + " " + this.currentStyle.fontSize + "px" + " " + this.currentStyle.fontFamily;
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

  this.context.beginPath();
  this.context.arc(x, y, r, 0, 2 * Math.PI, false);
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

  if (Object.prototype.toString.call(str) === '[object Array]') {
    var dy = y;
    if (this.currentStyle.fill) {
      str.forEach(function(line) {
        this.context.fillText(line, x, dy);
        dy += this.currentStyle.fontSize * (1.0 + this.currentStyle.textLeading);
      }.bind(this));
    }
    if (this.currentStyle.stroke) {
      this.context.strokeText(str, x, y);
    }
  }
  else {
    if (this.currentStyle.fill) {
      this.context.fillText(str, x, y);
    }
    if (this.currentStyle.stroke) {
      this.context.strokeText(str, x, y);
    }
  }

  this.afterDraw();
  return this;
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
  return this;
};

HTMLCanvasCrayon.prototype.restore = function() {
  if (this.savedTransformStacks.length > 0) {
    this.transformStack = this.savedTransformStacks.pop();
  }
  return this;
};

HTMLCanvasCrayon.prototype.reset = function() {
  this.transformStack = [];
  return this;
};

HTMLCanvasCrayon.prototype.measureText = function(str) {
  if (Object.prototype.toString.call(str) === '[object Array]') {
    return this.measureTextLines(str);
  }

  var metrics = this.getFontMetrics(this.currentStyle.fontFamily, this.currentStyle.fontSize);
  var oldFont = this.context.font;
  this.context.font = this.currentStyle.fontSize + "px " + this.currentStyle.fontFamily;
  var width = this.context.measureText(str).width;
  this.context.font = oldFont;
  return {
    x : 0,
    y : -metrics.ascent,
    width : width,
    height : metrics.bboxHeight
  };
};

HTMLCanvasCrayon.prototype.measureTextLines = function(str) {
  var oldFont = this.context.font;
  this.context.font = this.currentStyle.fontSize + "px " + this.currentStyle.fontFamily;
  var metrics = this.getFontMetrics(this.currentStyle.fontFamily, this.currentStyle.fontSize);

  var lines = str;

  var maxWidth = 0;
  lines.forEach(function(line) {
    var lineWidth = this.context.measureText(line).width;
    maxWidth = Math.max(maxWidth, lineWidth);
  }.bind(this));

  var height = lines.length * this.currentStyle.fontSize + (lines.length - 1) * this.currentStyle.fontSize * this.currentStyle.textLeading + metrics.descent;

  this.context.font = oldFont;
  return {
    x : 0,
    y : -metrics.ascent,
    width : maxWidth,
    height : height
  };
};

//Based on code from http://mudcu.be/journal/2011/01/html5-typographic-metrics/ by Michael Deal
HTMLCanvasCrayon.prototype.getFontMetrics = function(fontFamily, fontSize) {
  var container;
  var control;
  var image;

  var direction = ""; // ltr, or rtl
  var whois = "jiraffe!|";
  var bboxHeight = 0; // size of text bounding-height
  var bboxWidth = 0; // size of text bounding-width
  var ascent = 0;
  var descent = 0;
  var emHeight = 0; // size of em-height (via measuring offsetTop of element below line-height=0)
  var enHeight = 0; // size of en-height

  direction = window.getComputedStyle(document.body, "")["direction"];

  // setting up html used for measuring text-metrics
  container = document.createElement("div");
  container.style.fontFamily = fontFamily;
  container.style.fontSize = fontSize + "px";
  container.style.position = "absolute";
  container.style.left = 0;
  container.style.top = 0;
  //document.body.insertBefore(container, document.body.childNodes[0]);
  document.body.appendChild(container);

  control = document.createElement("span");
  image = document.createElement("img");
  image.width = fontSize;
  image.height = 1;

  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  var c = canvas.getContext("2d");
  c.fillStyle = "#FF0000";
  c.fillRect(0, 0, 100, 100);
  image.src = canvas.toDataURL();

  control.appendChild(document.createTextNode(whois));
  control.appendChild(image);
  container.appendChild(control);

  // getting css equivalent of ctx.measureText()
  image.style.display = "none";
  control.style.display = "inline";
  bboxHeight = control.offsetHeight;
  bboxWidth = control.offsetWidth;

  // making sure super-wide text doesn't wrap
  image.style.display = "inline";
  var forceWidth = bboxWidth + image.offsetWidth;

  // capturing the "top" and "bottom" baseline
  control.style.cssText = "margin: " + fontSize + "px 0; display: block; width: " + forceWidth + "px";
  var TopBaseline = image.offsetTop - fontSize + 1;
  var HeightCSS = control.offsetHeight;
  var BottomBaseline = TopBaseline - HeightCSS;

  // capturing the "middle" baseline
  control.style.cssText = "line-height: 0; display: block; width: " + forceWidth + "px";
  var MiddleBaseline = image.offsetTop + 1;

  // calculate "em" and "en" height
  emHeight = (MiddleBaseline - 0.5) * 2;
  enHeight = emHeight / 2;

  // calculating the ascent and descent
  descent = -BottomBaseline;
  ascent = TopBaseline;

  document.body.removeChild(container);

  return {
    bboxHeight : bboxHeight,
    descent : descent,
    ascent : ascent,
    emHeight : emHeight,
    enHeight : enHeight
  };
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


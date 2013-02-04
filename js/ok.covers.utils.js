var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.Utils = {};

OK.Covers.Utils.formatAuthorName = function(name) {
  var tokens = name.split(', ');
  if (tokens.length == 2)
    return tokens[1] + ' ' + tokens[0];
  else
    return tokens[0];
};

OK.Covers.Utils.remap = function(value, oldMin, oldMax, newMin, newMax, clamp) {
  var newValue = newMin + (value - oldMin) / (oldMax - oldMin) * (newMax - newMin);
  if (clamp) {
    if (newValue < newMin) newValue = newMin;
    if (newValue > newMax) newValue = newMax;
  }
  return newValue;
};

OK.Covers.Utils.breakLines = function(crayon, str, maxWidth) {
  var words = str.split(" ");
  var lines = [];
  var currentLine = "";
  while(words.length > 0) {
    var word = words.shift();
    var newLine = currentLine;
    if (newLine.length > 0) newLine += " ";
    newLine += word;
    var measurements = crayon.measureText(newLine);
    if (measurements.width > maxWidth && currentLine.length > 0) {
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


OK.Covers.Utils.addCover = function() {
  var coverCanvas = document.getElementById("cover");
  var img = document.createElement("img");
  img.src = coverCanvas.toDataURL();
  img.className = "thumb";

  var covers = document.getElementById("covers");
  if (covers.childNodes.length == 0)
    covers.appendChild(img);
  else
    covers.insertBefore(img, covers.childNodes[0]);
};

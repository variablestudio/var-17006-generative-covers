var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  function formatAuthorName(name) {
    var tokens = name.split(', ');
    if (tokens.length == 2)
      return tokens[1] + ' ' + tokens[0];
    else
      return tokens[0];
  }

  function makeElem(type, attribs) {
    attribs = attribs || {};
    var elem = document.createElement(type);
    for(var i in attribs) {
      elem[i] = attribs[i];
    }
    return elem;
  }

  function makeCanvas(attribs) {
    var canvas = makeElem("canvas", attribs);
    return canvas;
  }

  function makeImg(attribs) {
    return makeElem("img", attribs);
  }

  function makeDiv(attribs) {
    return makeElem("div", attribs);
  }

  function makeText(text) {
    return document.createTextNode(text);
  }

  var measureText = (function() {
    var measureTextCanvas = document.createElement("canvas");
    var measureTextContext = measureTextCanvas.getContext('2d');
    return function(text, font, fontSize) {
      measureTextContext.font = fontSize + "pt " + font;

      measureTextContext.fillStyle = "#fF0000";

      var width = measureTextContext.measureText(text).width;
      var height = fontSize;
      return {
        width: width,
        height: height
      };
    };
  })();

  function measureTextObj(textObj) {
    return measureText(textObj.content, textObj.characterStyle.font, textObj.characterStyle.fontSize);
  }

  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    var margins = 0;
    var author = book.author;
    var title = book.title;

    crayon.clear();

    var niceBlue = "#27D1E7";
    var paleYellow = "rgb(255, 255, 240)";

    var colorHSL = chroma.hex(niceBlue).hsl();
    niceBlue = chroma.hsl(Math.random() * 255, 0.8, colorHSL[2]).hex();

    crayon.fill(niceBlue).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins);

    crayon.fill(paleYellow).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height/3 - 2 * margins);

    var step = 10 + Math.random() * 20;
      for(var i=0; i<1000; i+=step) {
        var a = { x : 0, y : 10 + i };
        var b = { x : 10 + i, y : 0 };

        crayon.reset();
        crayon.stroke("#FFFFFF").line(a.x, a.y, b.x, b.y);
        var k = Math.random();
        crayon.fill("#FFFFFF")
          .translate(a.x + (b.x - a.x) * k + 2, a.y + (b.y - a.y) * k + 2)
          .rotate(-45)
          .rect(0, 0, 10 + Math.random() * 200, 3);
      }

      /*
      var authorFontSize = view.size.height * 0.03;
      var titleFontSize = view.size.height * 0.06;

      var authorText = new PointText(new Point(view.size.width*0.1, view.size.height * 0.17));
      authorText.justification = "left";
      authorText.content = formatAuthorName(author);
      authorText.characterStyle = {
        fontFamily: "Arial",
        fontSize: authorFontSize,
        fillColor: "#DD4444"
      };

      function breakText(text, font, fontSize, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = "";
        while(words.length > 0) {
          var word = words.shift();
          var newLine = currentLine;
          if (newLine.length > 0) newLine += " ";
          newLine += word;
          var measurements = measureText(newLine, font, fontSize);
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
      }

      var titleWordsAnchor = new Point(view.size.width*0.1, view.size.height*0.1);
      var titleWordsLeading = titleFontSize * 0.5;
      var totalTextHeight = view.size.height;
      var maxTextWidth = 0;
      var titleWords;
      var drawDebug = false;

      var numTries = 0;
      while(totalTextHeight > view.size.height/2 && ++numTries < 10) {
        titleFontSize *= 0.9;
        titleWordsLeading = titleFontSize * 0.5;
        titleWords = breakText(title, "Arial", titleFontSize, view.size.width - titleWordsAnchor.x * 2);

        totalTextHeight = 0;
        maxTextWidth = 0;
        titleWords.forEach(function(word, wordIndex) {
          var measurements = measureText(word, "Arial", titleFontSize);
          totalTextHeight += measurements.height + titleWordsLeading;
          maxTextWidth = Math.max(maxTextWidth, measurements.width);
        });
      }

      var rect = new Path.Rectangle(new Point(margins, margins), new Size(view.size.width - 2 * margins, totalTextHeight + titleFontSize + view.size.height*0.1));
      rect.fillColor = paleYellow;

      authorText.point = new Point(authorText.point.x, totalTextHeight + titleFontSize + view.size.height*0.05);
      layer.addChild(authorText);

      titleWords.forEach(function(word, wordIndex) {
        var titleText = new PointText(new Point(titleWordsAnchor.x, titleWordsAnchor.y + wordIndex * (titleFontSize + titleWordsLeading)));
        titleText.justification = "left";
        titleText.content = word;
        titleText.characterStyle = {
          font: "Arial",
          fontSize: titleFontSize,
          fillColor: "#444"
        };
        var bounds = measureTextObj(titleText);
      });

      if (drawDebug) {
        var textBoundsRect = new Path.Rectangle(new Point(titleWordsAnchor.x, titleWordsAnchor.y - titleFontSize), new Size(maxTextWidth, totalTextHeight));
        textBoundsRect.strokeColor = "#FF0000";
      }

      view.draw();
      */
    var coverCanvas = document.getElementById("cover");
    var img = makeImg();
    img.src = coverCanvas.toDataURL();
    img.className = "thumb";
    document.body.appendChild(img);
  }

  return {
    name : "Minimal",
    makeCover : makeCover
  }
})());

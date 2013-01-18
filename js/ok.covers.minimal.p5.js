var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {

  function makeElem(type, attribs) {
    attribs = attribs || {};
    var elem = document.createElement(type);
    for(var i in attribs) {
      elem[i] = attribs[i];
    }
    return elem;
  }

  function makeImg(attribs) {
    return makeElem("img", attribs);
  }

  var processingInstance;
  var canvasWidth;
  var canvasHeight;

  function sketchProc(processing) {
    var p = processing;
    var authorFont;
    var titleFont;

    // Override draw function, by default it will be called 60 times per second
    p.setup = function() {
      p.size(canvasWidth, canvasHeight);
      p.noLoop();

      authorFont = p.createFont("Arial Bold", 20);
      titleFont = p.createFont("Arial", 20);
    };

    p.draw = function(book) {
      if (!book) return;

      var author = book.author;
      var title = book.title;

      var niceBlue = "#27D1E7";
      var paleYellow = [255, 255, 240];

      var colorHSL = chroma.hex(niceBlue).hsl();
      var colorHue = Math.random() * 255;
      niceBlue = chroma.hsl(colorHue, 0.84, 0.85).rgb;

      var niceBlueDark = chroma.hsl(colorHue, 0.84, 0.35).rgb;

      p.background(255);

      p.fill(255, 0, 0);
      p.textFont(authorFont);

      function breakText(text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = "";
        while(words.length > 0) {
          var word = words.shift();
          var newLine = currentLine;
          if (newLine.length > 0) newLine += " ";
          newLine += word;
          var lineWidth = p.textWidth(newLine);
          if (lineWidth > maxWidth) {
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

      p.background(niceBlueDark[0], niceBlueDark[1], niceBlueDark[2]);
      p.stroke(255);
      p.noFill();
      var randomShape = Math.floor(Math.random() * 3);
      for(var i=0; i<book.pageCount; i++) {
        var x = Math.random() * canvasWidth;
        var y = Math.random() * canvasWidth;

        var w = Math.random() * canvasWidth / 3;
        var h = Math.random() * canvasWidth / 3;
        switch(randomShape) {
          case 0: p.rect(x, y, w, h); break;
          case 1: p.ellipse(x, y, w, h); break;
          case 2: p.line(x, y, x + w, y + h); break;
        }
      }
      p.noStroke();

      p.textFont(titleFont);
      var titleLines = breakText(title, canvasWidth - 40);
      var lineHeight = 25;

      var textHeight = 65 + lineHeight * (titleLines.length - 1);
      dy = canvasHeight - textHeight;

      p.fill(30, 30, 30);
      p.rect(0, canvasHeight - textHeight - 40, canvasWidth, textHeight + 40);

      p.fill(niceBlue[0], niceBlue[1], niceBlue[2]);

      p.textFont(authorFont);
      p.text(author, 20, dy);

      dy += 40;
      p.textFont(titleFont);
      titleLines.forEach(function(line) {
        p.text(line, 20, dy);
        dy += lineHeight;
      });
    };
  }
  // attaching the sketchProc function to the canvas

  function makeCover(book) {
    console.log("makeCover");
    if (!processingInstance) {
      console.log("createProcessing");
      var canvas = document.getElementById("cover");
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      processingInstance = new Processing(canvas, sketchProc);
      console.log("createProcessing done");
    }

    console.log("draw");
    processingInstance.draw(book);
    console.log("done");
    /*
    with(paper) {

      var margins = 0;

      //clear
      project.activeLayer.remove();
      var layer = new Layer();

      

      //console.log(view, view.size);
      var rect = new Path.Rectangle(new Point(margins, margins), new Size(view.size.width - 2 * margins, view.size.height -  2 * margins));
      rect.fillColor = niceBlue;


      var step = 10 + Math.random() * 20;
      for(var i=0; i<1000; i+=step) {
        var a = new Point(0, 10 + i);
        var b = new Point(10 + i, 0);
        var line = new Path.Line(a, b);
        line.strokeColor = "#FFFFFF";
        var k = Math.random();
        var rect = new Path.Rectangle(new Point(a.x + (b.x - a.x) * k + 2, a.y + (b.y - a.y) * k + 2), new Size(10 + Math.random() * 200, 3));
        rect.rotate(-45);
        rect.fillColor = "#FFFFFF";
      }

      var path = new Path();
      path.strokeColor = '#FFF';
      var start = new Point(view.size.width/3, 0);
      path.moveTo(start);
      path.lineTo([0, view.size.width/3]);

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
    //}
  }

  return {
    name : "Minimal",
    makeCover : makeCover
  };
})());

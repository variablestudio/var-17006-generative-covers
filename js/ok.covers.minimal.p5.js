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
      startMeasuring();
      p.size(canvasWidth, canvasHeight);
      p.noLoop();

      authorFont = p.createFont("Arial Bold", 20);
      titleFont = p.createFont("Arial", 20);
      endMeasuring("p.setup");
    };

    p.draw = function(book) {
      if (!book) return;

      startMeasuring();
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

      p.background(niceBlue[0], niceBlue[1], niceBlue[2]);
      p.noStroke();
      p.fill(255);
      var randomShape = Math.floor(Math.random() * 3);
      for(var i=0; i<book.pageCount; i++) {
        var x = Math.random() * canvasWidth;
        var y = Math.random() * canvasWidth;

        var w = Math.random() * canvasWidth / 10;
        var h = Math.random() * canvasWidth / 10;
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
      p.rect(0, canvasHeight - textHeight - 40, canvasWidth, 1);

      p.fill(0);
      p.rect(0, canvasHeight - textHeight - 39, canvasWidth, textHeight + 39);

      p.fill(niceBlue[0], niceBlue[1], niceBlue[2]);

      p.textFont(authorFont);
      p.text(author, 20, dy);

      dy += 40;
      p.textFont(titleFont);
      titleLines.forEach(function(line) {
        p.text(line, 20, dy);
        dy += lineHeight;
      });
      endMeasuring("p.draw");
    };
  }
  // attaching the sketchProc function to the canvas

  function makeCover(book) {
    console.log("makeCover");
    if (!processingInstance) {
      startMeasuring();
      var canvas = document.getElementById("cover");
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      processingInstance = new Processing(canvas, sketchProc);
      endMeasuring("createProcessing");
    }

    console.log("draw");
    processingInstance.draw(book);
    console.log("done");

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

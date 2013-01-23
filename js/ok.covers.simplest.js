var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function formatAuthorName(name) {
    var tokens = name.split(', ');
    if (tokens.length == 2)
      return tokens[1] + ' ' + tokens[0];
    else
      return tokens[0];
  }

  function breakLines(crayon, str, maxWidth) {
    //var width = measureTextContext.measureText(text).width;
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
  }

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.clear();
    crayon.style("default");

    crayon.fill("#27D1E7").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var author = formatAuthorName(book.author.toUpperCase());

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08;
    var titleWidth = crayon.canvas.width * 0.8;

    crayon.style("title").font("Arial", titleFontSize, "bold").paragraph("left", 0.25).fill("#FFFFFF");

    var titleLines = breakLines(crayon, book.title.toUpperCase(), titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    crayon.style("author").font("Arial", authorFontSize).fill("#222222");
    var authorMeasurements = crayon.measureText(author);

    crayon.style("title").text(titleLines, titleX, titleY);
    crayon.style("author").text(author, titleX, titleY + titleMeasurements.height);


    var coverCanvas = document.getElementById("cover");
    var img = document.createElement("img");
    img.src = coverCanvas.toDataURL();
    img.className = "thumb";
    document.body.appendChild(img);
  }

  return {
    enabled : false,
    name : "Simplest",
    makeCover : makeCover
  };
})());

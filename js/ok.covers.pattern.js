var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.style("default");

    var margins = 0;

    crayon.clear();

    var niceBlue = "#27D1E7";
    var paleYellow = "rgb(255, 255, 255)";

    var colorHSL = chroma.hex(niceBlue).hsl();
    niceBlue = chroma.hsl(Math.random() * 255, 0.8, colorHSL[2]).hex();

    crayon.fill(niceBlue).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins);

    var step = 50 + Math.random() * 50;
    //var step = 10 + Math.random() * 20;
    var r = 10 + Math.random() * 50;
    var r2 = 5 + Math.random() * 10;

    for(var x=0; x<crayon.canvas.width; x+=step) {
      for(var y=0; y<crayon.canvas.height; y+=step) {
        crayon
          .save()
          .fill("#FFFFFF")
          .translate(x, y)
          .rotate(-45)
          .rect(-5 - r/2, 0, 10 + r*2, r2)
          .rotate(90)
          .rect(-5 - r/2, 0, 10 + r*2, r2)
          .restore();
      }
    }


    for(var i=0; i<1000*0; i+=step) {
      var a = { x : 0, y : 10 + i };
      var b = { x : 10 + i, y : 0 };

      crayon.save();
      crayon.stroke("#FFFFFF").line(a.x, a.y, b.x, b.y).stroke(false);
      var k = Math.random();
      crayon.fill("#FFFFFF")
        .translate(a.x + (b.x - a.x) * k + 1, a.y + (b.y - a.y) * k + 1)
        .rotate(-45)
        .rect(0, 0, 10 + Math.random() * 200, 3);
      crayon.restore();
    }


    var author = OK.Covers.Utils.formatAuthorName(book.author);

    var authorFontSize = crayon.canvas.height * 0.03;
    var titleFontSize = crayon.canvas.height * 0.05;

    var shiftY = 50;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08;
    var titleWidth = crayon.canvas.width * 0.8;

    crayon.style("title").font("Verdana", titleFontSize, "bold").paragraph("left", 0.25).fill("#333333");

    var titleLines = OK.Covers.Utils.breakLines(crayon, book.title, titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    titleY += shiftY;

    crayon.style("author").font("Verdana", authorFontSize).fill("#333333");
    var authorMeasurements = crayon.measureText(author);

    crayon.style("default").fill(paleYellow).rect(margins, margins + shiftY, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent/2 - shiftY);

    crayon.style("title").text(titleLines, titleX, titleY);
    crayon.style("author").text(author, titleX, titleY + titleMeasurements.height);

    var coverCanvas = document.getElementById("cover");
    var img = document.createElement("img");
    img.src = coverCanvas.toDataURL();
    img.className = "thumb";
    document.body.appendChild(img);
  }

  return {
    name : "Pattern",
    makeCover : makeCover
  };
})());

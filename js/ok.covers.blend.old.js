var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.style("default");

    var borderScale = 1 + Math.random();
    var hue = Math.random() * 60 - 30;
    var hue2 = 175 + Math.random() * 50;
    var minPageCount = 10;
    var maxPageCount = 500;
    var numX = OK.Covers.Utils.remap(book.pageCount, minPageCount, maxPageCount, 2, 100, true);

    var margins = 0;

    crayon.clear();

    var niceBlue = "#27D1E7";
    var paleYellow = "rgb(255, 255, 240)";
    var colorHSL = chroma.hex(niceBlue).hsl();
    var color = chroma.hsl(hue, 0.98, colorHSL[2]).hex();
    var color2 = chroma.hsl(hue2, 0.7, colorHSL[2]).hex();
    var lightColor = chroma.hsl(hue, 0.7, colorHSL[2] * 1.5).hex();
    var darkColor = chroma.hsl(hue, 0.8, colorHSL[2] * 0.5).hex();

    crayon.fill(paleYellow).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins);

    var author = OK.Covers.Utils.formatAuthorName(book.author);

    var w = crayon.canvas.width;
    var h = crayon.canvas.height;

    //crayon.style("blending").stroke(false);

    var bg = Pixels.fromCanvas(crayon.canvas);

    crayon.clear();
    crayon.fill(color); //"#FF9900"
    var c1 = [w/4 + Math.random() * w/2, h/4 + Math.random() * w/2, w*0.2 + Math.random() * w * 0.2];
    crayon.circle(c1[0], c1[1], c1[2]);

    var blue = Pixels.fromCanvas(crayon.canvas);

    crayon.clear();
    crayon.fill(color2); //"#00DDFF"
    var c2 = [w/4 + Math.random() * w/2, h/4 + w*0.2 + Math.random() * w/2, w/3];
    crayon.circle(c2[0], c2[1], c2[2]);
    var red = Pixels.fromCanvas(crayon.canvas);

    var blended;
    blended = Pixels.blend(bg, red);
    blended = Pixels.blend(blended, blue);

    //blended = Pixels.blend(blended, orange);

    //Pixels.blend(Pixels.blend(bg, red), blue), orange
    //var blended = Pixels.blend(blue, red);
    //var blended = Pixels.blend(red, blue, "cmyk");
    Pixels.draw(blended, crayon.canvas);

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var shiftY = 50;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08;
    var titleWidth = crayon.canvas.width * 0.8;

    crayon.style("title").font("Arial", titleFontSize, "bold").paragraph("left", 0.25).fill("#333333");

    var titleLines = OK.Covers.Utils.breakLines(crayon, book.title.toUpperCase(), titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    //titleY += shiftY;

    crayon.style("author").font("Verdana", authorFontSize).fill("#333333");
    var authorMeasurements = crayon.measureText(author);

    crayon.style("title").fill("#333333").text(titleLines, titleX, titleY);
    crayon.style("author").fill("#333333").text(author, titleX, titleY + titleMeasurements.height);



    crayon.style("title").fill("#FFFFFF")
    crayon.clip(function(context) {
      context.beginPath();
      context.arc(c1[0], c1[1], c1[2], 0, 2 * Math.PI, false);
      context.arc(c2[0], c2[1], c2[2], 0, 2 * Math.PI, false);
      context.clip();
    });
    crayon.text(titleLines, titleX, titleY);
    crayon.clip(false);

    crayon.style("author").fill("#FFFFFF");
    crayon.clip(function(context) {
      context.beginPath();
      context.arc(c1[0], c1[1], c1[2], 0, 2 * Math.PI, false);
      context.arc(c2[0], c2[1], c2[2], 0, 2 * Math.PI, false);
      context.clip();
    })
    crayon.text(author, titleX, titleY + titleMeasurements.height);
    crayon.clip(false);

    OK.Covers.Utils.addCover();
  }

  return {
    name : "Blend",
    makeCover : makeCover
  };
})());

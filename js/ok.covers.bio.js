var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.style("default");

    var minPageCount = 10;
    var maxPageCount = 500;

    var hue = 75 + Math.random() * 100;
    var margins = 0;

    crayon.clear();

    var niceBlue = "#27D1E7";
    var paleYellow = "rgb(255, 255, 240)";
    var colorHSL = chroma.hex(niceBlue).hsl();
    var color = chroma.hsl(hue, 0.8, 0.2).hex();
    var lightColor = chroma.hsl(hue, 0.5, colorHSL[2] * 1.2).hex();

    crayon.fill(lightColor).rect(margins, margins, crayon.canvas.width - 2 * margins, crayon.canvas.height - 2 * margins);

    crayon.fill(false).stroke("rgba(255, 255, 255, 0.15)", 3);

    var buds = [];
    crayon.save();

    var branchSchrink = 0.95;
    var branchMaxLevel = 17;
    var branchAngle = 15 + Math.random() * 15;
    var branchInitLen = crayon.canvas.width * (0.09 + Math.random() * 0.07);
    var branchStartX = crayon.canvas.width * (0.3 + 0.5 * Math.random());

    var branchingChance = 0.75 + Math.random() * 0.2;
    function grow() {
      if (buds.length == 0) {
        return;
      }

      var bud = buds.shift();
      var nx = bud.x + bud.len * Math.cos(bud.dir / 180 * Math.PI);
      var ny = bud.y + bud.len * Math.sin(bud.dir / 180 * Math.PI);
      crayon.line(bud.x, bud.y, nx, ny);

      if (bud.level >= branchMaxLevel) {
        return; //die
      }

      var chance = Math.random();
      if (chance < 0.25) { //go forward the same way
        bud.length *= branchSchrink;
        buds.push({
          x : nx,
          y : ny,
          dir : bud.dir,
          len : bud.len * branchSchrink,
          level : bud.level + 1
        });
      }
      else if (chance < branchingChance || bud.level <= 2) { //split
        buds.push({
          x : nx,
          y : ny,
          dir : bud.dir - branchAngle,
          len : bud.len * branchSchrink,
          level : bud.level + 1
        });
        buds.push({
          x : nx,
          y : ny,
          dir : bud.dir + branchAngle,
          len : bud.len * branchSchrink * branchSchrink,
          level : bud.level + 1
        });
      }
      else {
        //do nothing / die
      }

      grow();
    }

    buds.push({
      x : branchStartX,
      y : crayon.canvas.height,
      dir : -90,
      len : branchInitLen,
      level : 0
    });
    grow();

    while(buds.length > 0) {
      grow();
    }

    crayon.fill(false).stroke("#333333", 1);

    //branchAngle = 15 + Math.random() * 15;
    //branchInitLen = crayon.canvas.width * (0.09 + Math.random() * 0.07);
    branchStartX += 10;

    buds.push({
      x : branchStartX,
      y : crayon.canvas.height,
      dir : -90,
      len : branchInitLen,
      level : 0
    });
    grow();

    crayon.restore();


    var stack = [];


    var author = OK.Covers.Utils.formatAuthorName(book.author);

    var authorFontSize = crayon.canvas.height * 0.02;
    var titleFontSize = crayon.canvas.height * 0.03;

    var shiftY = 20;

    var titleX = crayon.canvas.width * 0.06;
    var titleY = crayon.canvas.width * 0.06;
    var titleWidth = crayon.canvas.width * 0.8;

    crayon.style("title").font("Libre Baskerville", titleFontSize, "bold").paragraph("left", 0.25).fill("#333333");

    var titleLines = OK.Covers.Utils.breakLines(crayon, book.title.toUpperCase(), titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    titleY += shiftY;

    crayon.style("author").font("Libre Baskerville", authorFontSize).fill("#333333");
    var authorMeasurements = crayon.measureText(author);

    crayon.style("default").stroke(false).fill(lightColor).rect(margins, margins + shiftY, crayon.canvas.width - 2 * margins, titleY + titleMeasurements.height + authorMeasurements.height + titleAscent/2 - shiftY);

    crayon.style("title").text(titleLines, titleX, titleY);
    crayon.style("author").text(author, titleX, titleY + titleMeasurements.height);

    OK.Covers.Utils.addCover();
  }

  return {
    name : "Bio",
    makeCover : makeCover
  };
})());

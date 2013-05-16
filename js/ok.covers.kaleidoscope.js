var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.clear();
    crayon.style("default");

    crayon.fill("#27D1E7").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var author = OK.Covers.Utils.formatAuthorName(book.author.toUpperCase());

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + authorFontSize;
    var titleWidth = crayon.canvas.width * 0.8;

    var titleSections = OK.Covers.Utils.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    crayon.style("drawing");
    //crayon.save();
    var nx = 2 + Math.floor(Math.random() * 10);
    var ny = 1 + Math.floor(Math.random() * 3);
    var thickness = 25 + Math.random() * 25;
    for(var i=0; i<nx; i++) {
      for(var j=0; j<ny; j++) {
        var dx = crayon.canvas.width / nx;
        var dy = crayon.canvas.height / ny;
        crayon.clipRect(dx * i, dy * j, dx, crayon.canvas.height / ny);
        //crayon.stroke("#FF0000", thickness).fill(false).circle(crayon.canvas.width/2 + dx * i, crayon.canvas.height/2 + dy * j, crayon.canvas.width/2 - 25);
        //crayon.stroke("#FFFFFF", thickness).fill(false).circle(crayon.canvas.width/2 + dx * i + 50, crayon.canvas.height/2 + dy * j + ddy, crayon.canvas.width/2 - 25);
        crayon.stroke("#FF0000", thickness).fill(false).line(0, Math.random()*crayon.canvas.height, crayon.canvas.width, Math.random()*crayon.canvas.height);
        crayon.stroke("#FFFFFF", thickness).fill(false).line(0, Math.random()*crayon.canvas.height, crayon.canvas.width, Math.random()*crayon.canvas.height);
      }
    }
    //crayon.restore();

    crayon.save();
    crayon.translate(titleX, titleY);
    crayon.style("text");
    crayon.font("Arial", titleFontSize, "bold").fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title.toUpperCase());
    crayon.font("Arial", titleFontSize*0.85, "normal").fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle.toUpperCase(), 0, titleFontSize/4);
    crayon.font("Arial", authorFontSize).fill("#222222").paragraph("left", 0.25, titleWidth, true).text(author, 0, authorFontSize/2);
    var offsetY = crayon.translateY;
    crayon.restore();

    crayon.style("debug").fill("#FFFFFF").rect(0, 0, crayon.canvas.width, offsetY - titleY + titleFontSize*1.5);

    crayon.save();
    crayon.translate(titleX, titleY);
    crayon.style("text");
    crayon.font("Arial", titleFontSize, "bold").fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title.toUpperCase());
    crayon.font("Arial", titleFontSize*0.85, "normal").fill("#999").paragraph("left", 0.25, titleWidth, true).text(subTitle.toUpperCase(), 0, titleFontSize/4);
    crayon.font("Arial", authorFontSize).fill("#222222").paragraph("left", 0.25, titleWidth, true).text(author, 0, authorFontSize/2);
    crayon.restore();



    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Kaleidoscope",
    makeCover : makeCover
  };
})());

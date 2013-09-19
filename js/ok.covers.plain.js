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

    crayon.fill("#FF9000").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var author = OK.Covers.Typography.formatAuthorName(book.author);

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + authorFontSize;
    var titleWidth = crayon.canvas.width * 0.8;

    var titleSections = OK.Covers.Utils.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    crayon.translate(titleX, titleY);
    crayon.font("Arial", titleFontSize, "bold").fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title);
    crayon.font("Arial", titleFontSize*0.85, "normal").fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    crayon.font("Arial", authorFontSize, author[1][1]).fill("#D6D6D6").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
    //0 + name.pixelLength of author[1][0] + " "
    crayon.font("Arial", authorFontSize, author[0][1]).fill("#D6D6D6").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0, authorFontSize/2);

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Simplest",
    makeCover : makeCover
  };
})());

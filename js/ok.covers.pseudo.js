var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    function Binding (bind_width, TapeColor, pattern, pattern1)

{


    var grad1 = crayon.context.createLinearGradient(bind_width, 0, 0, 0);
    grad1.addColorStop(1, '#100F0E');
    grad1.addColorStop(.95, '#131313');
    grad1.addColorStop(.90, '#161616');
    grad1.addColorStop(.85, '#585858');
    grad1.addColorStop(.76, '#141414');
    grad1.addColorStop(.70, '#505050');
    grad1.addColorStop(.01, '#505050');
    grad1.addColorStop(.005, '#3A3A3A');

    crayon.context.fillStyle = grad1;
    crayon.context.fillRect(0, 0, bind_width, crayon.canvas.height);

    var imgd = crayon.context.getImageData(0, 0, bind_width, crayon.canvas.height);
    var pix = imgd.data;
    var counter = 0;

    for (var i = 0, n = pix.length; i < n; i += 4) {


        if (counter < pattern) {

            counter++;

            pix[i] = pix[i] - 16; // red
            pix[i + 1] = pix[i + 1] - 16; // green
            pix[i + 2] = pix[i + 2] - 16; // blue


        } else {
            counter = 0;
        }
    }
    
    
    var imgd2 = crayon.context.getImageData(bind_width, 0, 600, crayon.canvas.height);
    var pix2 = imgd2.data;
    var counter = 0;

    for (var i = 0, n = pix2.length; i < n; i += 4) {


        if (counter < pattern1) {

            counter++;

            pix2[i] = pix2[i] - 16; // red
            pix2[i + 1] = pix2[i + 1] - 16; // green
            pix2[i + 2] = pix2[i + 2] - 16; // blue


        } else {
            counter = 0;
        }
    }

    crayon.context.putImageData(imgd, 0, 0);
    crayon.context.putImageData(imgd2, bind_width, 0);

};
      
    var colors = new Array("9F81C6", "08CED9", "CC9363", "5BD785", "B3C7CA", "89C9BB", "DD9A6C", "DF434B");

    var col_random = Math.round(Math.random()*7);
    color = colors[col_random];
      
    crayon.clear();
    crayon.style("default");

    crayon.fill(color).rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var page_number = book.pageCount;
    //500 is maximum - 10 minimum | 60 - 200
    //y = ((x - a1)/(a2 - a1)) * (b2 - b1) + b1
    if(page_number < 10) { page_number = 10; }
    if(page_number > 500) { page_number = 500; }
    var tape_width = Math.round(((page_number - 10)/(500 - 10)) * (200 - 60) + 60);
    console.log("tape width: " + tape_width);
      
    Binding(tape_width, "#131313", 8, 10);
      
    var author = OK.Covers.Typography.formatAuthorName(book.author);
    var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);

    var titleFontSize = crayon.canvas.height * 0.08;
    var authorFontSize = titleFontSize * fonts.PairRatio;

    var titleX = crayon.canvas.width * 0.08 + tape_width;
    var titleY = crayon.canvas.width * 0.08 + titleFontSize;
    var titleWidth = crayon.canvas.width * 0.8 - tape_width;

    var titleSections = OK.Covers.Typography.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    
    crayon.translate(titleX, titleY);
      
    title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
      
    crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(title);
        crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);
  
      
    if (Math.round(Math.random()) == 0) {
            crayon.context.font = "normal "+ authorFontSize +"px" + " " + fonts.authorFamily+fonts.authorFont;
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("000000").paragraph("left", -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + " ").width, authorFontSize / 2);
        } else {
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
        }

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Pseudo",
    makeCover : makeCover
  };
})());

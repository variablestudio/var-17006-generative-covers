var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;
    var letters = new Array("", "", "", "");
var style = {
        mainColor: "#FFFFFF",
        fillColor: "FFFFFF"
    };

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    function paperAging(year) {
    //1950 - 230/200/150
    // 25/55/95

    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();

    var range = currentYear - 1950;
    var timepos = currentYear - year;

    var R_colour = 235 - Math.round(timepos / range * 5);
    var G_colour = 245 - Math.round(timepos / range * 15);
    var B_colour = 250 - Math.round(timepos / range * 10);

    var colour_out = "rgb(" + R_colour + ", " + G_colour + ", " + B_colour + ")"
    return colour_out;

}
      
    crayon.clear();
    crayon.style("default");

    var year =  book.year; 
    
    var paper = paperAging(year);
    crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height);
    //crayon.fill("#FF9000").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

        style.mainColor = "#FBFBFB";
        var pattern = 7; //Math.round(Math.random()*5);
        switch(pattern)
        {
        //Pattern selector
        case 0:
        OK.Covers.Patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount, style);
        break;
        case 1:
        OK.Covers.Patterns.MarcinTilesControlA(crayon, 200, 200, 400, 400, 16, 96, style);
        break;
        case 2:
        OK.Covers.Patterns.MarcinLinesControl(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, style);
        break;
        case 3:
        OK.Covers.Patterns.FractalTreeControl(crayon, 200, 200, 400, 400, book.pageCount, style);
        break;
        case 4:
        OK.Covers.Patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height, style);
        break;
        case 5:
        var rand_mode = Math.round(Math.random()*2);
        var rand_cols = 3 + Math.round(Math.random()*7);  
        var rand_rows = rand_cols;
        var cluster_size = 400/rand_cols;
        var posx = 0;
        var posy = 0;//crayon.canvas.height - 50 - rand_rows*cluster_size;
        OK.Covers.Patterns.PixelGrid(crayon.context, 200, 200, rand_cols, rand_rows, cluster_size, rand_mode, style);
        break;
                
        case 6:
        var year =  book.year;
        var author = OK.Covers.Typography.formatAuthorName(book.author);
                
        letters[0] = author.name.charAt(0);
        letters[1] = author.surname.charAt(0);
        letters[2] = year.charAt(2);
        letters[3] = year.charAt(3);
        OK.Covers.Patterns.DividedLetters(crayon, 50, 250, 500, 500, letters);
        break;
        
        case 7:
        OK.Covers.Superformula.Initialize(crayon, 200, 200, 400, 400, Math.round(book.pageCount/2), paper);
        break;
                
        }
    

      
    //crayon.context.fillStyle = "f5f4ea";
    //crayon.context.fillRect(crayon.canvas.width*0.60, 0, crayon.canvas.width*0.40, crayon.canvas.height);
      
    var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.06;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        var titleX = crayon.canvas.width * 0.33;
        var titleY = crayon.canvas.height * 0.70 + titleFontSize;
        var titleWidth = crayon.canvas.width * 0.60;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];

        title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
        
        crayon.translate(titleX, titleY);
      
   // crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(title);
        //crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);

    var titleLines = OK.Covers.Typography.breakLines(crayon, book.title, titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    //titleY += shiftY;


            //crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
           // crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
        
      
    OK.Covers.Utils.addCover();
  }

  return {
    name : "SwissQuad",
    makeCover : makeCover
  };
})());

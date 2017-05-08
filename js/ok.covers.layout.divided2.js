//LAYOUT RULES
//


var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;
  var img_matrix = new Array(16);
  var letters = new Array("", "", "", "");
    
 function paperAging(year) {
    //1950 - 230/200/150
    // 25/55/95

    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();

    var range = currentYear - 1950;
    var timepos = currentYear - year;

    var R_colour = 255 - Math.round(timepos / range * 25);
    var G_colour = 255 - Math.round(timepos / range * 55);
    var B_colour = 255 - Math.round(timepos / range * 95);

    var colour_out = "rgb(" + R_colour + ", " + G_colour + ", " + B_colour + ")"
    return colour_out;

}
    
function renderMatrix(bm_data) {
    
    var tempCanvas = document.createElement("canvas"),
    tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = crayon.canvas.width*2;
    tempCanvas.height = crayon.canvas.height*2;
    

// Append for debugging purposes, just to show what the canvas did loo k like before the transforms.
    document.body.appendChild(tempCanvas);

    for (y = 0; y < 3; y++) {
        for (x = 0; x < 3; x++) {
            var side_width = crayon.canvas.width ;
            var side_width = crayon.canvas.width;
            tempCtx.putImageData(bm_data[Math.round(Math.random() * 15)], x * side_width / 2 * 1.02, y * side_width / 2 * 1.02);
        }
    }
crayon.context.save();
crayon.context.translate(50, crayon.canvas.height*0.67);
crayon.context.rotate(-45);
crayon.context.drawImage(tempCanvas, 0,0);
crayon.context.restore(); 
document.body.removeChild(tempCanvas);
}

function drawLetters(letters, x, y, side) {
    
    var draw_canvas = document.createElement("canvas");
    draw_canvas.width = crayon.canvas.width;
    draw_canvas.height = crayon.canvas.width;
    var d = draw_canvas.getContext("2d");
  
    
    for (var l = 0; l < 4; l++) {

        d.fillStyle = "rgb(" + (200 + (25 - Math.round(Math.random() * 50))) + ", 130, 155)";
        d.fillRect(x, y, side, side);

        var fontScale = side * 1.45;
        d.fillStyle = "#3b253c";
        d.font = "bold " + fontScale + "px Arial";

        var metrics = d.measureText(letters[l]);
        var width = metrics.width;

        d.fillText(letters[l], x + side / 2 - width / 2, y + side / 2 + fontScale / 2.85);

        img_matrix[(l * 4 + 0)] = d.getImageData(x, y, side / 2, side / 2);
        img_matrix[(l * 4 + 1)] = d.getImageData(x + side / 2, y, side / 2, side / 2);
        img_matrix[(l * 4 + 2)] = d.getImageData(x, y + side / 2, side / 2, side / 2);
        img_matrix[(l * 4 + 3)] = d.getImageData(x + side / 2, y + side / 2, side / 2, side / 2);

    }
    
    //console.log("BD: " + img_matrix[0]);
}
    
  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }
      
    crayon.clear();
    crayon.style("default");
    var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);

    var author = OK.Covers.Typography.formatAuthorName(book.author);
    var year =  book.year; 
    
    var paper = paperAging(year);
    crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height);
    
    letters[0] = author.name.charAt(0);
    letters[1] = author.surname.charAt(0);
    letters[2] = year.charAt(2);
    letters[3] = year.charAt(3);
      

    drawLetters(letters, 0, 0, crayon.canvas.width * 1);
    renderMatrix(img_matrix);
      
    //console.log(letters);


    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.1;
    var titleWidth = crayon.canvas.width * 0.4;

    
    var longest = OK.Covers.Typography.longestWord(book.title);
      
    var titleSections = OK.Covers.Typography.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

     var authorFontSize = crayon.canvas.height * 0.02;
    var titleFontSize = crayon.canvas.height * 0.05;

    var shiftY = 50;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + 15;
    var titleWidth = crayon.canvas.width * 0.32;

    crayon.context.save();
    //crayon.style("title").font("UbuntuCondensed", titleFontSize, "normal").paragraph("left", 0.25).fill("#333333");

    //crayon.context.save();
    
      
    var titleLines = OK.Covers.Typography.breakLines(crayon, book.title, titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;


    titleY += titleAscent;

    titleY += shiftY;
      
    
    //crayon.save();
    crayon.style("author").font("BenchNine", authorFontSize*2).fill("#333333");
    var authorMeasurements = crayon.measureText(author);
    //crayon.style("title").text(titleLines, titleX, titleY);
    crayon.style("author").text(author.name.substring(0,1).toUpperCase() + ". " + author.surname.toUpperCase(), titleX, 750);
    
    crayon.context.translate(-titleX, -750);
    //title = OK.Covers.Typography.addLigatures(title, "Arial");
    //crayon.font("OpenSansSemi", titleFontSize, "normal", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title);
    //crayon.font("Arial", titleFontSize*0.85, "normal", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
      
   crayon.context.translate(40, 45);
      
    title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);

        crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(title.toUpperCase());
        crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle.toLowerCase(), 0, titleFontSize / 4);

    //crayon.context.translate(-titleX, -titleY);
      
    
    
    
    //crayon.translate(tmp, 0);
    //crayon.font("UbuntuCondensed", authorFontSize, author[0][1]).fill("#313131").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0, authorFontSize/2);
    crayon.context.restore();
    OK.Covers.Utils.addCover();
    
  }

  return {
    enabled : false,
    name : "Divided II",
    makeCover : makeCover
  };
})());

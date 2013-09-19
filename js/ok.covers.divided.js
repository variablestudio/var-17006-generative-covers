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
    for (y = 0; y < 3; y++) {
        for (x = 0; x < 3; x++) {
            var side_width = crayon.canvas.width * 0.55;
            var side_width = crayon.canvas.width * 0.55;
            crayon.context.putImageData(bm_data[Math.round(Math.random() * 15)], 52 + x * side_width / 2 * 1.02, 250 + y * side_width / 2 * 1.02);
        }
    }
}

function drawLetters(letters, x, y, side) {
    
    var draw_canvas = document.createElement("canvas");
    draw_canvas.width = crayon.canvas.width * 0.55;
    draw_canvas.height = crayon.canvas.width * 0.55;
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


    var author = OK.Covers.Typography.formatAuthorName(book.author);
    var year =  book.year; 
    
    var paper = paperAging(year);
    crayon.fill(paper).rect(0, 0, crayon.canvas.width, crayon.canvas.height);
    
    letters[0] = author[1][0].charAt(0);
    letters[1] = author[0][0].charAt(0);
    letters[2] = year.charAt(2);
    letters[3] = year.charAt(3);
      

    drawLetters(letters, 0, 0, crayon.canvas.width * 0.55);
    renderMatrix(img_matrix);
      
    //console.log(letters);
      
    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.038;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + authorFontSize;
    var titleWidth = crayon.canvas.width * 0.4;

    var titleSections = OK.Covers.Utils.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    crayon.translate(titleX, titleY);
    crayon.font("Arial", titleFontSize, "bold").fill("#000000").paragraph("left", 0.1, titleWidth, true).text(title);
    crayon.font("Arial", titleFontSize*0.85, "normal").fill("#000000").paragraph("left", 0.1, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    //crayon.font("Arial", authorFontSize, author[1][1]).fill("#313131").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
    //0 + name.pixelLength of author[1][0] + " "
    //crayon.font("Arial", authorFontSize, author[0][1]).fill("#313131").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0, authorFontSize/2);

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Divided",
    makeCover : makeCover
  };
})());

var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;
  var numberOfSides = 6,
      outerSize = 40,
      innerSize = 20,
      rows = 14;
      cols = 9;

    
    var colour_matrix = coloursArray(numberOfSides);
    
    function coloursArray(sides) {
    var colours = new Array(sides / 2);
    for (var c = 0; c < sides / 2; c++) {
        //64 -192
        colours[c] = 64 + 128 / (sides / 2 - 1) * c;
    }

    return colours;
    }
    
    function drawShape( x, y, solid, chaos )
{

    if(chaos == true) { var counter = Math.round(Math.random()*((numberOfSides/2)-1)); }
    else{
        var counter = 0; }

    
Xcenter = 75 * x;
        var test_n = x % 2;
        if (test_n == 0) {
            Ycenter = 82 * y;
        } else {
            Ycenter = 47 + 82 * y;
        }

        
    if(solid == true) { 
        
      crayon.context.beginPath();
      crayon.context.arc(Xcenter, Ycenter, 30 , 0, 2 * Math.PI, false);
      crayon.context.fillStyle = "#FFFFFF";
      crayon.context.fill();
      crayon.context.closePath();
        
        
    }

        for (var i = 1; i <= numberOfSides; i += 1) {


            if (i == 1) {

                crayon.context.beginPath();
                crayon.context.moveTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0));
                crayon.context.lineTo(Xcenter + innerSize * Math.cos(0), Ycenter + innerSize * Math.sin(0));
                crayon.context.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + outerSize * Math.cos(0), Ycenter + outerSize * Math.sin(0));
                crayon.context.closePath();
                crayon.context.fillStyle = "rgb(" + colour_matrix[counter] + ", " + colour_matrix[counter] + ", " + colour_matrix[counter] + ")";
                if (counter < numberOfSides / 2 - 1) {
                    counter++;
                } else {
                    counter = 0;
                }
                crayon.context.fill();
            } else {



                crayon.context.beginPath();
                crayon.context.moveTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + outerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin(i * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + innerSize * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin(i * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + innerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + innerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides));
                crayon.context.lineTo(Xcenter + outerSize * Math.cos((i - 1) * 2 * Math.PI / numberOfSides), Ycenter + outerSize * Math.sin((i - 1) * 2 * Math.PI / numberOfSides));
                crayon.context.closePath();

                crayon.context.fillStyle = "rgb(" + colour_matrix[counter] + ", " + colour_matrix[counter] + ", " + colour_matrix[counter] + ")";
                crayon.context.fill();
                if (counter < numberOfSides / 2 - 1) {
                    counter++;
                } else {
                    counter = 0;
                }


            }
        }    
}


  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    var extra = 2 + Math.round(Math.random() * (cols - 4) / 2) * 2
    
    crayon.clear();
    crayon.style("default");

    crayon.fill("#D6D6D6").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {

    drawShape(x, y, false, true);
    
    }
    }
      
    crayon.context.rect(0, 40+82*6.5, 600, 800);
    crayon.context.fillStyle = "#FFFFFF";
    crayon.context.fill();
        
    drawShape(extra,rows-7, true, true);


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
    title = OK.Covers.Typography.addLigatures(title, "Andada");
    //crayon.font("Andada", titleFontSize, "bold", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title);
    //crayon.font("Andada", titleFontSize*0.85, "normal", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    //crayon.font("Arial", authorFontSize, author[1][1], 0).fill("#FF9000").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
    //0 + name.pixelLength of author[1][0] + " "
    //crayon.font("Arial", authorFontSize, author[0][1], 0).fill("#FF9000").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0 + crayon.measureText(author[1][0] + " ").width, authorFontSize/2);

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Hexagons",
    makeCover : makeCover
  };
})());

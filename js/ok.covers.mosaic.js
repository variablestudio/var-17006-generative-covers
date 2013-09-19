var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  
PixelGrid = function (width, height, x_pos, y_pos, cluster, mode) {

    for (x = 0; x < width*cluster / cluster; x++) {
        for (y = 0; y < height*cluster / cluster; y++) {

            var color = ~~ (Math.random() * 360);
            crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
            
            //if(mode == "mixed") { var randShape = Math.round((Math.random() * 5)); }
            //if(mode == "corners") { var randShape = 4; }
            //if(mode == "pixels") { var randShape = 0; }
            
            if(mode == 0) { var randShape = Math.round((Math.random() * 5)); }
            if(mode == 1) { var randShape = 4; }
            if(mode == 2) { var randShape = 0; }

            switch (randShape) {

            case 0:
                crayon.context.beginPath();
                crayon.context.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                break;

            case 1:
                crayon.context.beginPath();
                crayon.context.moveTo(x_pos + cluster/2 + x * cluster, y_pos + y * cluster);
                crayon.context.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster);
                crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                break;

            case 2:
                crayon.context.beginPath();
                crayon.context.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster);
                crayon.context.lineTo(x_pos + x * cluster, y_pos + cluster + y * cluster);
                crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();

                crayon.context.beginPath();
                crayon.context.moveTo(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster);
                crayon.context.lineTo(x_pos + x * cluster, y_pos + y * cluster);
                crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                break;

            case 3:
                crayon.context.beginPath();
                crayon.context.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                break;

            case 4:
                crayon.context.beginPath();
                crayon.context.moveTo(x_pos + x * cluster, y_pos + y * cluster);
                crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + y * cluster);
                crayon.context.lineTo(x_pos + cluster + x * cluster, y_pos + cluster + y * cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                break;

            case 5:
                crayon.context.beginPath();
                crayon.context.rect(x_pos + x * cluster, y_pos + y * cluster, cluster, cluster);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();
                crayon.context.beginPath();
                crayon.context.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false);
                crayon.context.closePath();
                crayon.context.fillStyle = "#EBE9DB";
                crayon.context.fill();
                break;

            default:
                crayon.context.beginPath();
                crayon.context.arc(x_pos + cluster/2 + x * cluster, y_pos + cluster/2 + y * cluster, cluster/2, 0, 2 * Math.PI, false);
                crayon.context.closePath();
                crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                crayon.context.fill();

            }
        }
    }
};
    
  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.clear();
    crayon.style("default");

    crayon.fill("#f2f1ee").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
    
    var rand_mode = Math.round(Math.random()*2);
      
    //update with random numbers of cols and rows!!!!!!!!!!!!!!!!!
    //calculate proper cluster size from these numbers
    
    var rand_cols = 5 + Math.round(Math.random()*7);  
    var rand_rows = rand_cols;
    
    //console.log("canvas width: " + crayon.canvas.width);
    var cluster_size = (crayon.canvas.width-100)/rand_cols;
    var posx = 50;
    var posy = crayon.canvas.height - 50 - rand_rows*cluster_size;
    PixelGrid(rand_cols, rand_rows, posx, posy, cluster_size, rand_mode);
      
    var author = OK.Covers.Typography.formatAuthorName(book.author);

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.04;

    var titleX = crayon.canvas.width * 0.08;
    var titleY = crayon.canvas.width * 0.08 + authorFontSize;
    var titleWidth = crayon.canvas.width * 0.8;

    var titleSections = OK.Covers.Utils.breakTitle(book.title);
    var title = titleSections[0];
    var subTitle = titleSections[1];

    crayon.translate(titleX, titleY);
    title = OK.Covers.Typography.addLigatures(title, "Andada");
    crayon.font("Andada", titleFontSize, "bold", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(title);
    crayon.font("Andada", titleFontSize*0.85, "normal", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
    //crayon.font("Arial", authorFontSize, author[1][1], 0).fill("#FF9000").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
    //0 + name.pixelLength of author[1][0] + " "
    //crayon.font("Arial", authorFontSize, author[0][1], 0).fill("#FF9000").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0 +              crayon.measureText(author[1][0] + " ").width, authorFontSize/2);

    OK.Covers.Utils.addCover();
  }

  return {
    enabled : false,
    name : "Mosaic",
    makeCover : makeCover
  };
})());

var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function () {
    var crayon;


    function makeCover(book) {
        if (!crayon) {
            crayon = new Crayon(document.getElementById("cover"));
        }

        crayon.clear();
        crayon.style("default");

        crayon.fill("#f2f1ee").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

        var rand_mode = Math.round(Math.random() * 2);

        //update with random numbers of cols and rows!!!!!!!!!!!!!!!!!
        //calculate proper cluster size from these numbers

        var rand_cols = 5 + Math.round(Math.random() * 7);
        var rand_rows = rand_cols;

        //console.log("canvas width: " + crayon.canvas.width);
        var cluster_size = (crayon.canvas.width - 100) / rand_cols;
        var posx = 50;
        var posy = crayon.canvas.height - 50 - rand_rows * cluster_size;
        //  PixelGrid(rand_cols, rand_rows, posx, posy, cluster_size, rand_mode);

        var author = OK.Covers.Typography.formatAuthorName(book.author);

        var authorFontSize = crayon.canvas.height * 0.025;
        var titleFontSize = crayon.canvas.height * 0.1;

        var titleX = crayon.canvas.width * 0.08;
        var titleY = crayon.canvas.width * 0.08 + authorFontSize;
        var titleWidth = 400;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];


        title = title.trim();
        title = OK.Covers.Typography.addLigatures(title, "BenchNine");
        crayon.context.font = titleFontSize + "pt BenchNineLight";
        crayon.context.textAlign = "center";
        crayon.context.fillStyle = "black";
        var block_width = crayon.context.measureText(title.toUpperCase()).width;


        var randShape = 4; //Math.round(Math.random()*5);
        switch (randShape) {

        case 0:
            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    var color = ~~ (Math.random() * 360);
                    crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    crayon.context.fillRect((600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7, block_width / 7);

                }
            }
            break;

        case 1:

            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    //var color = ~~ (Math.random() * 360);
                    //crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    OK.Covers.Elements.PixelElement(crayon.context, (600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7);

                }
            }
            break;

        case 2:

            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    //var color = ~~ (Math.random() * 360);
                    //crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    var letters = new Array("", "", "", "");
                    var year = book.year;

                    letters[0] = author.name.charAt(0);
                    letters[1] = author.surname.charAt(0);
                    letters[2] = year.charAt(2);
                    letters[3] = year.charAt(3);
                    OK.Covers.Elements.LetterElement(crayon, letters, (600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7);

                }
            }
            break;


        case 3:

            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    //var color = ~~ (Math.random() * 360);
                    //crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    OK.Covers.Elements.TileElement(crayon, (600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7);

                }
            }
            break;

        case 4:
                
            var hue = Math.random() * 360;
            var niceBlue = "#27D1E7";
            //var paleYellow = "rgb(255, 255, 255)";
            var colorHSL = chroma.hex(niceBlue).hsl();
            var color = chroma.hsl(hue, 0.8, colorHSL[2]).hex();
            var lightColor = chroma.hsl(hue, 0.8, colorHSL[2] * 1.5).hex();
            //var numX = 2 + Math.floor(Math.random() * 10);
            var radius = (0.2 + 0.5 * Math.random());
            var radius2 = (0.1 + 0.4 * Math.random());
            //var shape = Math.floor(Math.random() * 2);

            //var r = block_width / 7 / 2 * radius;
            //var r2 = block_width / 7 / 2 * radius2;

            //var margins = 0;
            var borderScale = 1 + Math.random();

            crayon.context.fillStyle = color;
            crayon.context.fillRect(0,0,600,800);
            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    //var color = ~~ (Math.random() * 360);
                    //crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    OK.Covers.Elements.SolidTileElement(crayon, (600 - block_width)/2 + a * block_width/7, 180 - block_width / 7, block_width/7, color, lightColor, radius, radius2, borderScale);

                }
            }
            break;
                
        case 5:

            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    //var color = ~~ (Math.random() * 360);
                    //crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    OK.Covers.Elements.HexElement(crayon, (600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7);

                }
            }
            break;

        default:
            for (a = 0; a < 8; a++) {
                if (a == 0 || a == 2 || a == 4 || a == 6) {

                    var color = ~~ (Math.random() * 360);
                    crayon.context.fillStyle = "hsl(" + color + ", 60%, 60%)";
                    crayon.context.fillRect((600 - block_width) / 2 + a * block_width / 7, 180 - block_width / 7, block_width / 7, block_width / 7);

                }
            }

        }


        //crayon.translate(titleX, titleY);
        crayon.context.fillStyle = "black";
        crayon.context.fillText(title.toUpperCase(), 300, 280, 400);
        

        //author = author.name + author.surname;
        crayon.context.font = authorFontSize + "pt BenchNineLight";
        crayon.context.textAlign = "right";
        crayon.context.fillStyle = "black";
        crayon.context.fillText(author.name + " " + author.surname, (600 - block_width) / 2 + block_width, 700);
        //crayon.font("BenchNineLight", titleFontSize, "normal", 0).fill("#000000").paragraph("center", 0.25, titleWidth, true).text(title.toUpperCase());
        //crayon.font("Andada", titleFontSize*0.85, "normal", 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(subTitle, 0, titleFontSize/4);
        //crayon.font("Arial", authorFontSize, author[1][1], 0).fill("#FF9000").paragraph("left", 0.25, titleWidth, false).text(author[1][0], 0, authorFontSize/2);
        //0 + name.pixelLength of author[1][0] + " "
        //crayon.font("Arial", authorFontSize, author[0][1], 0).fill("#FF9000").paragraph("left", -0.25, titleWidth, true).text(author[0][0], 0 +                  crayon.measureText(author[1][0] + " ").width, authorFontSize/2);

        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "Fourth Elements",
        makeCover: makeCover
    };
})());
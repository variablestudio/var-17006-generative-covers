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

        //reset transform
        crayon.translate(0, 0);
        crayon.context.translate(0, 0);


        var outOfThree = Math.round(Math.random() * 2);
        if (outOfThree == 0) {
            crayon.fill("#D6D6D6").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
            var txt_c = "#000000";
            var txt_c2 = "#FF9000";
        }
        if (outOfThree == 1) {
            crayon.fill("#FF9000").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
            var txt_c = "#FFFFFF";
            var txt_c2 = "#000000";
        }
        if (outOfThree == 2) {
            crayon.fill("#000000").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
            var txt_c = "#FFFFFF";
            var txt_c2 = "#FF9000";
        }

        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.072;
        var authorFontSize = titleFontSize * fonts.PairRatio;
        
        //longest word
        var longest = OK.Covers.Typography.longestWord(book.title);
        console.log("longest word: " + longest);
        
        //remapping 
        //OK.Covers.Utils.remap = function(value, oldMin, oldMax, newMin, newMax, clamp) 
        
        if(longest > 10) { var downsize = OK.Covers.Utils.remap((longest-10), 0, 20, 0, 50); titleFontSize = titleFontSize - downsize; console.log("new size: " + titleFontSize); }
        if(book.title.length < 24) { titleFontSize = titleFontSize*1.1; }
        
        var titleX = crayon.canvas.width * 0.08;
        var titleY = crayon.canvas.width * 0.08 + titleFontSize;
        var titleWidth = crayon.canvas.width * 0.75;

        title = OK.Covers.Typography.addLigatures(book.title, fonts.titleFamily);
        var titleSections = OK.Covers.Typography.breakTitle(title);
        var title = titleSections[0];
        var subTitle = titleSections[1];
        
        crayon.translate(titleX, titleY);

        crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill(txt_c).paragraph("left", fonts.titleLine, titleWidth, true).text(title.toUpperCase());
        crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill(txt_c).paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);

        var titleLines = OK.Covers.Typography.breakLines(crayon, book.title, titleWidth);
        var titleMeasurements = crayon.measureText(titleLines);
        var titleAscent = -titleMeasurements.y;

        titleY += titleAscent;

        if (Math.round(Math.random()) == 0 && (author.name.length + author.surname.length) < 16) {
 
            //spit
            crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill(txt_c2).paragraph("left", 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            crayon.context.font = "normal " + authorFontSize + "px" + " " + fonts.authorFamily + fonts.authorFont;
            crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill(txt_c2).paragraph("left", -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + " ").width, authorFontSize / 2);
            
        } else {
            
            //in one raw
            crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill(txt_c2).paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill(txt_c2).paragraph("left", 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
            
          
            
        }

        crayon.context.fillStyle = txt_c;
        crayon.context.fillRect(titleX, (crayon.canvas.height - crayon.canvas.width * 0.08), 52, 4);

        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "bonedupl",
        makeCover: makeCover
    };
})());
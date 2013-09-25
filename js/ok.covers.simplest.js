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

        crayon.fill("#D6D6D6").rect(0, 0, crayon.canvas.width, crayon.canvas.height);

        
        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.06;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        var titleX = crayon.canvas.width * 0.08;
        var titleY = crayon.canvas.width * 0.08 + titleFontSize;
        var titleWidth = crayon.canvas.width * 0.8;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];

        title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
        
        crayon.translate(titleX, titleY);
    
        crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(title);
        crayon.font(fonts.titleFamily+fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill("#000000").paragraph("left", fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4);
  
        console.log(fonts.titleFamily);
        //crayon.context.font = "normal " + authorFontSize + "px BenchNine";
        //var randAuthor = Math.round(Math.random());
        
        if (Math.round(Math.random()) == 0) {
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#FF9000").paragraph("left", 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            //crayon.context.font = "normal "+ authorFontSize +"px" + " " + fonts.authorFamily+fonts.authorFont;
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#FF9000").paragraph("left", -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + " ").width, authorFontSize / 2);
        } else {
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#FF9000").paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#FF9000").paragraph("left", 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
        }
        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "Circular Chaos",
        makeCover: makeCover
    };
})());
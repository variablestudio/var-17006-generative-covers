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

        
        crayon.fill("#FAFAF0").rect(0, 0, crayon.canvas.width, crayon.canvas.height);


        for (var c = 0; c < 32; c++)
        {
        var chaos_r = 25 + Math.round(Math.random()*100);
        var chaos_x = 50 + Math.round(Math.random()*500);
        var chaos_y = 50 + Math.round(Math.random()*700);
        
        if( c != 0 ) { crayon.context.beginPath(); crayon.context.moveTo(prevX, prevY); crayon.context.lineTo(chaos_x, chaos_y); crayon.context.closePath(); crayon.context.strokeStyle = "rgba(49,49,49,0.5)"; crayon.context.stroke(); prevX = chaos_x; prevY = chaos_y; } else { prevX = chaos_x; prevY = chaos_y; }
        crayon.context.beginPath();
        crayon.context.arc(chaos_x, chaos_y, chaos_r, 0, 2 * Math.PI, false);
        crayon.context.closePath();
        crayon.context.fillStyle = "rgba(250, 10, 90, " + Math.random() + ")";
        crayon.context.fill();
        }
        
        crayon.context.fillStyle = "rgba(255, 255, 255, 0.66)";
        crayon.context.fillRect(40, 0, 328, crayon.canvas.height);
        
        
        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.06;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        var titleX = crayon.canvas.width * 0.13;
        var titleY = crayon.canvas.width * 0.08 + titleFontSize;
        var titleWidth = crayon.canvas.width * 0.36;

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
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2);
            crayon.context.font = "normal "+ authorFontSize +"px" + " " + fonts.authorFamily+fonts.authorFont;
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#000000").paragraph("left", -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + " ").width, authorFontSize / 2);
        } else {
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.nameStyle, 0).fill("#000000").paragraph("left", -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2);
            crayon.font(fonts.authorFamily+fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill("#000000").paragraph("left", 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2);
        }
        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "Circular Chaos",
        makeCover: makeCover
    };
})());
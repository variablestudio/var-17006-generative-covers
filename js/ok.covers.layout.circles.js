var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function () {
    var crayon;
    
    function makeCover(book) {
       
            crayon = new Crayon(document.getElementById("cover"));
       

        crayon.clear();
        crayon.style("default");

        crayon.fill("#DEDEDE").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
        //crayon.fill("#DDDDDD").rect(25, 25, 550, 750);

        crayon.context.save();
        
        var def_year = book.year;
        var def_pages = book.pageCount;
        var def_sections = book.sectionCount;
        
        
        var a = 0;
        var b = 0;
        
        var a_ratio = 0.01 + Math.random()*0.09;
        var b_ratio = 0.01 + Math.random()*0.09;
        
        crayon.context.save();
        crayon.context.translate(-700, -480);
        
        
        var light = 60;
        var color = Math.round(Math.random()*360);
        
        for(l = 0; l < 1024; l++)
        { 
        
        
        var  x0 = OK.Covers.Utils.remap(Math.sin(a), -10, 10, 1, 2000);
        var  y0 = OK.Covers.Utils.remap(Math.cos(a), -10, 10, 1, 2000);
        
        var x1 = OK.Covers.Utils.remap(Math.sin(b), -5, 5, 1, 2000);
        var y1 = OK.Covers.Utils.remap(Math.cos(b), -5, 5, 1, 2000);
        
        crayon.context.beginPath();
        crayon.context.moveTo(x0, y0);
        crayon.context.lineTo(y1, x1);
        crayon.context.closePath();
        crayon.context.lineWidth = 0.5 + Math.random()*5;
        crayon.context.strokeStyle = "hsla(" + color + ", 60%, " + light + "%, 0.4)";
        //crayon.context.strokeStyle = "hsla(" + color + ", 60%, 60%, 0.3)";
        crayon.context.stroke();
        //color++;
        if(light < 100) { light++; } else { light = 60; }
        
        a = a + a_ratio;
        b = b + b_ratio;
        
        } 
        
        crayon.context.restore();
        
        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.08;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        //var titleX = stitch_width + crayon.canvas.width * 0.08;
        //var titleY = 800/sect + titleFontSize*0.8;
        //var titleWidth = crayon.canvas.width * 0.5;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];

        title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
        
        //crayon.translate(titleX, titleY);
        
         
        
        OK.Covers.Utils.addCover();
        crayon.context.closePath();
        //crayon.fill("#d9d5c3").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
        
    }

    return {
        enabled: false,
        name: "Circles",
        makeCover: makeCover
    };
})());
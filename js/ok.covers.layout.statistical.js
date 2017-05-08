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

        crayon.fill("#34264e").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
        //crayon.fill("#DDDDDD").rect(25, 25, 550, 750);

        crayon.context.save();
        
        var def_year = book.year;
        var def_pages = book.pageCount;
        var def_sections = book.sectionCount;
        
        //x1 > 18..21 - 50 - 550;
        var x1 = OK.Covers.Utils.remap(parseInt(def_year.substring(0,2)), 18, 21, 0, 600);
        var y1 = OK.Covers.Utils.remap(parseInt(def_year.substring(2)), 0, 99, 0, 800);
        
        var x2 = OK.Covers.Utils.remap(parseInt(def_sections), 0, 30, 0, 600);
        var y2 = OK.Covers.Utils.remap(parseInt(def_pages), 0, 1000, 0, 800);

        var color = 50;
        var hue = Math.random()*360;
        
        //crayon.context.strokeWidth = 10;
        
        //crayon.context.beginPath();
        //crayon.context.moveTo(0,50);
        //crayon.context.lineTo(120, 50);
        //crayon.context.lineTo(120, 0);
        //crayon.context.lineTo(120, 50);
        //crayon.context.closePath();
        //crayon.context.strokeStyle = "hsl(" + hue + ", 60%, 60%)";
        //crayon.context.stroke();
        
        //crayon.context.beginPath();
        //crayon.context.moveTo(0,750);
        //crayon.context.lineTo(120, 750);
        //crayon.context.lineTo(120, 800);
        //crayon.context.lineTo(120, 750);
        //crayon.context.closePath();
        //crayon.context.strokeStyle = "hsl(" + hue + ", 60%, 60%)";
        //crayon.context.stroke();
        
        for(s = 0; s < parseInt(def_sections); s++)
        {
        
        var l_width = 100; //    - s*(10/parseInt(def_sections));
        var l_height = 700/parseInt(def_sections)
        crayon.context.lineWidth = 2.5 + Math.random()*16;
        crayon.context.beginPath();
        crayon.context.moveTo(600-l_width + 5,50 + s*l_height + 5);
        crayon.context.quadraticCurveTo(30 + Math.random()*500, 50+s*l_height + -125 + Math.random()*250,0, 50+ Math.random()*750);
        crayon.context.fillStyle = "hsl(" + hue + ", 60%, " + color + "%)";
        crayon.context.fillRect(600 - l_width, 50 + s*l_height, l_width, l_height);
        //crayon.context.lineTo(120, 50+ (s+1)*l_height);
        //crayon.context.lineTo(120, 50+ s*l_height);
        //crayon.context.closePath();
        var rand_alpha = 0.5 + Math.random();
        crayon.context.strokeStyle = "hsla(" + hue + ", 60%, 60%," + rand_alpha + ")";
        crayon.context.stroke();
        color = color + 40/parseInt(def_sections);
        
        }
        console.log("datas: " + x1 + " " + y1 + " " + x2 + " " + y2);
        crayon.context.restore();
        
        var fonts = OK.Covers.Typography.pairSelector(this.name, book.title);
        var author = OK.Covers.Typography.formatAuthorName(book.author);
        
        var titleFontSize = crayon.canvas.height * 0.08;
        var authorFontSize = titleFontSize * fonts.PairRatio;

        var titleX = crayon.canvas.width * 0.16;
        var titleY = crayon.canvas.width * 0.08 + titleFontSize;
        var titleWidth = crayon.canvas.width * 0.68;

        var titleSections = OK.Covers.Typography.breakTitle(book.title);
        var title = titleSections[0];
        var subTitle = titleSections[1];

        title = OK.Covers.Typography.addLigatures(title, fonts.titleFamily);
        
        crayon.translate(titleX, titleY);
    
        
        OK.Covers.Utils.addCover();
    }

    return {
        enabled: false,
        name: "Statistical",
        makeCover: makeCover
    };
})());
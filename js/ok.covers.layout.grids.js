var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function () {
    var crayon;
    
    function makeCover(book) {
       
            crayon = new Crayon(document.getElementById("cover"));
       

        crayon.clear();
        crayon.style("default");

        crayon.fill("#9dbbdd").rect(0, 0, crayon.canvas.width, crayon.canvas.height);
        //crayon.fill("#DDDDDD").rect(25, 25, 550, 750);

        crayon.context.save();
        
        var def_year = book.year;
        var def_pages = book.pageCount;
        var def_sections = book.sectionCount;
        
        //x1 > 18..21 - 50 - 550;

        var sect = parseInt(def_sections);
        if(sect < 6) { sect = 6; }

        var color = 50;
        var hue = Math.random()*360;
        
        crayon.context.strokeStyle = "#FFFFFF";
        crayon.context.lineWidth = 1;
        crayon.context.beginPath();
        crayon.context.moveTo(25,25);
        crayon.context.lineTo(25,775);
        crayon.context.lineTo(575,775);
        crayon.context.lineTo(575,25);
        crayon.context.lineTo(25,25);
        crayon.context.closePath();
        crayon.context.stroke();
        
        var rows = 5 + Math.round(Math.random()*8);
        
        var rowsArray = new Array(rows);
        
        for(r = 1; r < rows - 1; r++)
        {
        var random_n = Math.random()*1000000;
        var new_y = 25 + Math.round((750/rows)*Math.round(OK.Covers.Utils.remap(random_n, 0, 1000000, 1, rows)));
        rowsArray[r-1] = new_y;
        crayon.context.moveTo(25, new_y);
        crayon.context.lineTo(575,new_y);
        crayon.context.stroke();
        }
        
        rowsArray.push(25);
        rowsArray.push(775);
        
        rowsArray.sort();
   
        var cols = 2 + Math.round(Math.random()*3);
        var colsArray = new Array(cols);
        
        for(rr = 0; rr < rowsArray.length; rr++)
        {
  
        for(c = 1; c < cols - 1; c++)
        {
        var random_n = Math.random()*1000000;
        var new_x = 25 + Math.round((550/cols)*Math.round(OK.Covers.Utils.remap(random_n, 0, 1000000, 1, cols)));
        colsArray[c-1] = new_x;
        crayon.context.moveTo(new_x, rowsArray[rr]);
        crayon.context.lineTo(new_x, rowsArray[rr+1]);
        crayon.context.lineTo(new_x, rowsArray[rr]);
        crayon.context.stroke();
        //def_y = rowsArray[c];
        //if(c < cols.length - 2 ) { next_y = rowsArray[c+1]; } else { next_y = 775; }
        }
        
        colsArray.push(25);
        colsArray.push(575);
        colsArray.sort();
        
        for(cc = 0; cc < colsArray.length; cc++)
        {
        crayon.context.moveTo(colsArray[cc+1], rowsArray[rr]);
        crayon.context.lineTo(colsArray[cc], rowsArray[rr+1]);
        crayon.context.lineTo(colsArray[cc+1], rowsArray[rr]);
        crayon.stroke();
            
        }
            
        }
        
        crayon.context.strokeStyle = "#FFFFFF";
        crayon.context.lineWidth = 1;
        
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
        name: "Grids",
        makeCover: makeCover
    };
})());
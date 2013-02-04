var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.push((function() {
  var crayon;

  function formatAuthorName(name) {
    var tokens = name.split(', ');
    if (tokens.length == 2)
      return tokens[1] + ' ' + tokens[0];
    else
      return tokens[0];
  }

  var mainCategories = [
    { color2 : "#604D7A", color : "#9F81C6"/*purple*/, tags : [ "ekonomia", "prawo", "zarządzanie" ] },
    { color2 : "#02939C", color : "#08CED9"/*skyblue*/, tags : [ "psychologia społeczna", "socjologia", "demografia", "krytyka społeczna" ] },
    { color2 : "#875F40", color : "#CC9363"/*brown*/, tags : [ "zabytki", "urbanistyka", "architektura" ] },
    { color2 : "#398D57", color : "#5BD785"/*green*/, tags : [ "geografia", "turystyka" ] },
    { color2 : "#819193", color : "#B3C7CA"/*grey*/, tags : [ "edukacja", "Akme", "varsavianistyka", "teatr" ] },
    { color2 : "#64948A", color : "#89C9BB"/*teal*/, tags : [ "literatura", "politologia", "filozofia" ] },
    { color2 : "#A67451", color : "#DD9A6C"/*orange*/, tags : [ "kulturoznawstwo", "historia sztuki", "kultura staropolska" ] },
    { color2 : "#9A2C33", color : "#DF434B"/*red*/, tags : [ "archeologia", "historia", "nowożytność", "starożytność", "średniowiecze", "XIX wiek", "XX wiek", "historia antyczna" ] }
  ];

  function breakLines(crayon, str, maxWidth) {
    //var width = measureTextContext.measureText(text).width;
    var words = str.split(" ");
    var lines = [];
    var currentLine = "";
    while(words.length > 0) {
      var word = words.shift();
      var newLine = currentLine;
      if (newLine.length > 0) newLine += " ";
      newLine += word;
      var measurements = crayon.measureText(newLine);
      if (measurements.width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = word;
      }
      else {
        currentLine = newLine;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function makeCover(book) {
    if (!crayon) {
      crayon = new Crayon( document.getElementById("cover") );
    }

    crayon.clear();
    crayon.style("default");

    var categoryColor = "#B3C7CA";
    var categoryColor2 = "#000000";
    var hitCount = 0;
    mainCategories.forEach(function(categoryGroup) {
      book.categories.forEach(function(category) {
        if (categoryGroup.tags.indexOf(category) !== -1) {
          categoryColor = categoryGroup.color;
          categoryColor2 = categoryGroup.color2;
          hitCount++;
        }
      });
    });

    console.log("hitCount", hitCount);

    crayon.fill(categoryColor).rect(0, 0, crayon.canvas.width, crayon.canvas.height);

    var author = formatAuthorName(book.author.toUpperCase());

    var authorFontSize = crayon.canvas.height * 0.04;
    var titleFontSize = crayon.canvas.height * 0.06;

    var titleX = crayon.canvas.width * 0.13;
    var titleY = crayon.canvas.width * 0.08;
    var titleWidth = crayon.canvas.width * 0.8;

    crayon.style("title").font("Arial", titleFontSize, "bold").paragraph("left", 0.25).fill("#FFFFFF");

    var titleLines = breakLines(crayon, book.title.toUpperCase(), titleWidth);
    var titleMeasurements = crayon.measureText(titleLines);
    var titleAscent = -titleMeasurements.y;

    titleY += titleAscent;

    crayon.style("author").font("Arial", authorFontSize).fill("#000000");
    var authorMeasurements = crayon.measureText(author);

    var pageCount = "" + book.pageCount;

    crayon.style("count").font("Futura", authorFontSize * 5).fill(categoryColor2);
    var countMeasurements = crayon.measureText(pageCount);

    crayon.style("title").text(titleLines, titleX, titleY);
    crayon.style("author").text(author, titleX, titleY + titleMeasurements.height);
    crayon.style("count").text(pageCount, titleX, titleY + titleMeasurements.height - countMeasurements.y);

    crayon.style("default").fill(categoryColor2).rect(0, 0, crayon.canvas.width * 0.05, crayon.canvas.height);


    var coverCanvas = document.getElementById("cover");
    var img = document.createElement("img");
    img.src = coverCanvas.toDataURL();
    img.className = "thumb";
    document.body.appendChild(img);
  }

  return {
    name : "Data",
    makeCover : makeCover
  };
})());

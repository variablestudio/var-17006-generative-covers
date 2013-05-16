var OK = OK || {};
OK.Data = OK.Data || {};

OK.Data.loadTextFile = function(path, callback) {
  var r = new XMLHttpRequest();
  r.open("GET", path, true);
  r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
    callback(r.responseText);
  };
  r.send();
};


OK.Data.loadCSVFile = function(path, callback) {
  OK.Data.loadTextFile(path, function(data) {
    callback(CSVToArray(data));
  });
};

OK.Data.fromCSV = function(path, callback) {
  OK.Data.loadCSVFile(path, function(data) {
    var colNames = data.shift();
    var books = data.map(function(bookAttribs) {
      return {
        categories: bookAttribs[0].split(',').map(function(c) { return c.trim(); }),
        author: bookAttribs[1],
        title: bookAttribs[2],
        publicationTitle: bookAttribs[3],
        publisher: bookAttribs[4],
        year: bookAttribs[5],
        pageCount: bookAttribs[6]
      };
    });

    var totalPageCount = 0;
    var minPageCount = 100000;
    var maxPageCount = 0;
    books.forEach(function(book) {
      totalPageCount += book.pageCount;
      minPageCount = Math.min(minPageCount, book.pageCount);
      maxPageCount = Math.max(maxPageCount, book.pageCount);
    });
    var avgPageCount = totalPageCount / books.length;
    console.log("Ok.Data avgPageCount", avgPageCount, "minPageCount", minPageCount, "maxPageCount", maxPageCount);

    callback(books);
  });
};

OK.Data.fromJSON = function(path, callback) {
  OK.Data.loadTextFile(path, function(data) {
    var books = JSON.parse(data);
    callback(books);
  });
};
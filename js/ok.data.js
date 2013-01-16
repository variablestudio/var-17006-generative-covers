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
    console.log(colNames);
    var books = data.map(function(bookAttribs) {
      return {
        categories: bookAttribs[0],
        author: bookAttribs[1],
        title: bookAttribs[2],
        publicationTitle: bookAttribs[3],
        publisher: bookAttribs[4],
        year: bookAttribs[5],
        pageCount: bookAttribs[6]
      };
    });

    callback(books);
  });
};

OK.Data.fromJSON = function(path, callback) {
  OK.Data.loadTextFile(path, function(data) {
    callback(JSON.parse(data));
  });
};
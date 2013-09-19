var books = [];
var numSourcesLoaded = 0;

var autoAdding = false;
var autoAddingInterval = 100;

var measureDate = []
function startMeasuring() {
  measureDate.push((new Date()).getTime());
}
function endMeasuring(msg) {
  var date = (new Date()).getTime();
  var startDate = measureDate.pop();
  console.log(msg + " : " + Math.floor((date - startDate)/10)/100);
}

window.onload = function() {
  startMeasuring();
  OK.Data.fromCSV("data/okladki.csv", onBooksLoaded);
  OK.Data.fromJSON("data/books.json", onBooksLoaded);

  initForm();
}

function onBooksLoaded(loadedBooks) {
  console.log('onBooksLoaded');
  books = books.concat(loadedBooks);
  if (++numSourcesLoaded == 2) {
    processBooks();
    endMeasuring("Loading books");
    makeCovers();
  }
}

function processBooks() {
  var categories = {};
  books.forEach(function(book) {
    book.categories.forEach(function(category) {
      categories[category] = categories[category] ? categories[category] + 1 : 1;
    });
  });
  var categoriesNames = [];
  for(var categoryName in categories) {
    categoriesNames.push({name:categoryName, count:categories[categoryName]});
  }
  categoriesNames.sort(function(a, b) {
    return a.count - b.count;
  });
  //console.log(categoriesNames);
  categoriesNames.forEach(function(category) {
    //console.log(JSON.stringify(category));
    console.log(category.name, category.count, 'bla', 1, category);
    //console.log(category.name);
  })
}

function makeCovers() {
  paper.setup('cover');

  var i = 0;
  function nextCover() {
    //startMeasuring();

    if (autoAdding && i < 40) {
      var coverAlgorithmId = Math.floor(Math.random() * OK.Covers.length);
      //coverAlgorithmId = 5;
      OK.Covers[coverAlgorithmId].makeCover(books[i]);
      i = (i + 1) % books.length;
    }

    setTimeout(nextCover, autoAddingInterval);
  }

  nextCover();
}

function initForm() {
  var autoAdd = document.getElementById("autoAdd");
  autoAdd.addEventListener("change", function() {
    autoAdding = autoAdd.checked;
  });

  var algorithm = document.getElementById("algorithm");
  var title = document.getElementById("title");
  var author = document.getElementById("author");
  var publisher = document.getElementById("publisher");
  var year = document.getElementById("year");
  var pageCount = document.getElementById("pageCount");
  var category = document.getElementById("category");

  for(var i=0; i<OK.Covers.length; i++) {
    var coverAlgo = OK.Covers[i];
    var option = document.createElement("option");
    option.innerText = coverAlgo.name;
    option.value = i;
    algorithm.appendChild(option);
  }

  addBtn.addEventListener("click", function() {
    var algoId = algorithm.options[algorithm.selectedIndex].value;
    var book = {
      title : title.value,
      author : author.value,
      publisher : publisher.value,
      year : year.value,
      pageCount : pageCount.value,
      categories : [category.value]
    }
    OK.Covers[algoId].makeCover(book);
  })
}

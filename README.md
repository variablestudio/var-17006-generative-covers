# Generative Covers

Generative Book Covers for Biblioteka Otwartej Nauki http://bon.edu.pl

## Requirements

- Node.js v6+

## Usage

### From command line

```sh
# clone the repo
git clone https://github.com/variablestudio/var-bon-generative-covers

# install dependencies
cd var-bon-generative-covers
npm install

# generate cover
node index.js -a "Jacek Jowalski" -t "Generatywne okładki" -o cover.svg
```

#### Available options:
```text
node index.js [options]

-t, --title [title]        Book Title
-a, --author [author]      Author name
-p, --pages [pages]        Number of pages in the book
-s, --sections [sections]  Number of sections in the book
-y, --year [year]          Publication year
-f, --file [file]          Input json file
-o, --outfile [outfile]    Output svg file

-V, --version              Output the version number
-h, --help                 Output usage information
```

### As a module

```sh
# create new project
mkdir new-project
cd new-project
npm init

# install covers generator as a dependency
npm install variablestudio/var-bon-generative-covers

# touch index.js
```

```javascript
// index.js
const makeCover = require('var-bon-generative-covers')
const book = {
  author: 'Jan Kowalski',
  title: 'Generatywne okładki',
  pages: 123,
  sections: 5,
  year: 2017
}
const svg = makeCover(book)
console.log(svg) //
```

## Credits

- Marcin Ignac - idea, design, code
- Vladimir Kuchinov - typography, design, code

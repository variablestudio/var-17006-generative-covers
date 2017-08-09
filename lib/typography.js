const Typography = {}

Typography.formatAuthorName = function (name) {
  var authorOut = {}
  // var authorOut = new Array(["name", "normal"], ["surname", "normal"]);

  // console.log("current name: " + name);
  name = name.replace('  ', ' ')
  var tokens = name.split(/[, ]/)
  if (tokens.length !== 2) { tokens = name.split(' ') }

  var option = Math.round(Math.random() * 6)

  // trim
  // tokens[0] = tokens[0].trim();
  // tokens[1] = tokens[1].trim();

  // selection of different variations with bold/italic and upperCase options

  switch (option) {
    case 0:
      authorOut.surname = tokens[0]
      // authorOut.surnameStyle = "normal";
      authorOut.name = tokens[1]
      // authorOut.nameStyle = "normal";
      break

    case 1:
      authorOut.surname = tokens[0].toUpperCase()
      // authorOut.surnameStyle = "normal";
      authorOut.name = tokens[1]
      // authorOut.nameStyle = "normal";
      break

    case 2:
      authorOut.surname = tokens[0].toUpperCase()
      // authorOut.surnameStyle = "normal";
      authorOut.name = tokens[1].toUpperCase()
      // authorOut.nameStyle = "normal";
      break

    case 3:
      authorOut.surname = tokens[0].toUpperCase()
      authorOut.surnameStyle = 'bold'
      authorOut.name = tokens[1]
      // authorOut.nameStyle = "normal";
      break

    case 4:
      authorOut.surname = tokens[0].toUpperCase()
      // authorOut.surnameStyle = "normal";
      authorOut.name = tokens[1]
      authorOut.nameStyle = 'italic'
      break

    case 5:
      authorOut.surname = tokens[0].toUpperCase()
      authorOut.surnameStyle = 'bold'
      authorOut.name = tokens[1]
      authorOut.nameStyle = 'italic'
      break

    case 6:
      authorOut.surname = tokens[0].toUpperCase()
      authorOut.surnameStyle = 'lighter'
      authorOut.name = tokens[1]
      authorOut.nameStyle = 'bold'
      break

    default:
      authorOut.surname = tokens[0]
      // authorOut.surnameStyle = "normal";
      authorOut.name = tokens[1]
      // authorOut.nameStyle = "normal";
  }
  return authorOut
}

Typography.addLigatures = function (sourceStr, fontname) {
  var outputStr = ''

  var mark = 'left'
  // Polish quatation marks #x201E/#x201D outer, #xBB/#xAB inner
  sourceStr = sourceStr.replace(/\"/, String.fromCharCode(parseInt('201E', 16)))
  sourceStr = sourceStr.replace(/\"/, String.fromCharCode(parseInt('201D', 16)))

  // console.log('font to check: ' + fontname)

  outputStr = sourceStr

  switch (fontname) {
    case 'Anaheim':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      outputStr = outputStr.replace(/ff/g, String.fromCharCode(parseInt('fb00', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'Andada':

      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'BenchNine':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ff/g, String.fromCharCode(parseInt('FB00', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'FrancoisOne':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'Merriweather':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      outputStr = outputStr.replace(/ff/g, String.fromCharCode(parseInt('fb00', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'MerriweatherSans':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      outputStr = outputStr.replace(/ff/g, String.fromCharCode(parseInt('fb00', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'Oswald':

      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'PTSans':

      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'PTSerif':

      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'RobotoSlab':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    case 'SourceCode':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb02', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb01', 16)))
      break

    case 'SourceSans':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb02', 16)))
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb00', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb01', 16)))
      break

    case 'UbuntuCondensed':

      outputStr = outputStr.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)))
      outputStr = outputStr.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16)))
      // outputStr = outputStr.replace(/ff/g, String.fromCharCode(parseInt('fb00', 16)));
      outputStr = outputStr.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)))
      outputStr = outputStr.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)))
      break

    default:
      outputStr = sourceStr
  }

  return outputStr
}

Typography.breakTitle = function (title) {
  var t = title
  title = title.trim()
  var len = title.length

  // Full stop (.) is dangerous as dividing titlte to headline and subtitle. Because there
  // could be name in titles like C. W. Mills
  // Clasically only semi-columns (:) are used to build hierarchy in titling.
  var regExp = /[\:]/
  var dot = title.match(regExp)
  if (dot) {
    var dotPos = title.indexOf(dot)
    var subTitleStart = dotPos
    if (dot != '(') subTitleStart += 1
    // uppercase headtitle
    return [ title.substr(0, dotPos).toUpperCase(), title.substr(subTitleStart).trim() ]
  }

  return [title, '']
}

// Should be slightly updated by angle_ratio and centered leaders
// url link...

Typography.breakLines = function (crayon, str, maxWidth) {
  var words = str.split(' ')
  var lines = []
  var currentLine = ''
  while (words.length > 0) {
    var word = words.shift()
    var newLine = currentLine
    if (newLine.length > 0) newLine += ' '
    newLine += word
    var measurements = crayon.measureText(newLine)
    if (measurements.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = newLine
    }
  }
  lines.push(currentLine)
  return lines
}

Typography.longestWord = function (text) {
  var longest = 0

  tokens = text.split(' ')

  tokens.forEach(
    function addNumber (value) { if (value.length > longest) { longest = value.length } }
  )

  return longest
}

Typography.pairSelector = function (layout, title) {
  var out_fonts = new Array(8)
  var title_stats = title.length
  switch (layout) {
    case 'Simplest':
      var available_pairs = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      break

    case 'Pseudo':
      var available_pairs = new Array(7, 7, 7)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      break

    case 'Circular Chaos':
      var available_pairs = new Array(7, 7, 7)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      break

    case 'Circular Chaos II':
      var available_pairs = new Array(7, 7, 7)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      break

    case 'Cube':
      var available_pairs = new Array(7, 7, 7)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      break

    default:
      var available_pairs = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8)
      // var pair = Math.floor(Math.random() * 9)
      // var available_pairs = new Array(pair, pair, pair)
      out_fonts = Typography.TypePairs(available_pairs, title_stats)
      /*
      var fonts = {}
      fonts.titleFamily = 'Arial'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0.0
      fonts.authorFamily = 'Arial'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.5
      out_fonts = fonts
      */

  }

  return out_fonts
}

Typography.TypePairs = function (pairs, title_stats) {
  // Title Font | Author Font | Title Length | Parent Layout (optional)

  // WIDER AND BOLD
  // Francois One (ligatures) | Bench Nine | Short & Medium
  // Roboto Slab | Source Sans | Short
  // Andada | BenchNine Light | Short

  // MIDDLE RANGE
  // PT Sans Regular | PT Serif Regular/Bold/Italic | Short & Medium
  // Anaheim Regular | PT Serif Regular/Bold/Italic | Short & Medium
  // Source Code | Oswald | Short & Medium | Fractal Tree
  // Merriweather Sans / Merriweather Serif | Medium

  // NARROW - GOOD FOR LONG TITLES
  // BenchNine Light | Ubuntu Condensed | Short/Medium/Wide
  // Ubuntu Condensed | Oswald Light/Regular/ no Italic

  // Array for two types: [0] name, size(scale) and weight/style
  // var fonts = new Array(8);
  fonts = new Object()

  // narrow pairs array by title length
  console.log('title length: ' + title_stats)

  // if(title_stats > 72) { pairs = pairs.splice(7,2); console.log("deleted " + pairs); }

  // random selector out of all pre-defined pair for current layout
  var pickMe = Math.round(Math.random() * (pairs.length - 1))
  console.log('pickMe: ' + pickMe + ' case: ' + pairs[pickMe])
  fonts[8] = pairs[pickMe]

  switch (pairs[pickMe]) {
    case 0:
      fonts.titleFamily = 'FrancoisOne'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = -0.1
      fonts.authorFamily = 'BenchNine'
      fonts.authorFont = ''
      fonts.authorStyle = 'lighter'
      fonts.PairRatio = 0.8
      break

    case 1:
      fonts.titleFamily = 'RobotoSlab'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0
      fonts.authorFamily = 'SourceSans'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.72
      break

    case 2:
      fonts.titleFamily = 'Andada'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0
      fonts.authorFamily = 'BenchNine'
      fonts.authorFont = ''
      fonts.authorStyle = 'lighter'
      fonts.PairRatio = 0.5
      break

    case 3:
      fonts.titleFamily = 'PTSans'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0
      fonts.authorFamily = 'PTSerif'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.72
      break

    case 4:
      fonts.titleFamily = 'Anaheim'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0
      fonts.authorFamily = 'PTSerif'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.56
      break

    case 5:
      fonts.titleFamily = 'SourceCode'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = -0.1
      fonts.authorFamily = 'Oswald'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.8
      break

    case 6:
      fonts.titleFamily = 'MerriweatherSans'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = 0
      fonts.authorFamily = 'Merriweather'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.8
      break

    case 7:
      fonts.titleFamily = 'BenchNine'
      fonts.titleFont = ''
      fonts.titleStyle = 'lighter'
      fonts.titleLine = 0
      fonts.authorFamily = 'UbuntuCondensed'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.45
      break

    case 8:
      fonts.titleFamily = 'UbuntuCondensed'
      fonts.titleFont = ''
      fonts.titleStyle = 'normal'
      fonts.titleLine = -0.1
      fonts.authorFamily = 'Oswald'
      fonts.authorFont = ''
      fonts.authorStyle = 'normal'
      fonts.PairRatio = 0.75
      break
  }

  return fonts
}

module.exports = Typography

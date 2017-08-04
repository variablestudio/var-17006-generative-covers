var fs = require('fs')
var lines = fs.readFileSync(__dirname + '/fonts/include.css', 'utf8').split('\n')
var fonts = lines.filter((line) => line.indexOf('font-family') !== -1)
fonts = fonts.map((line) => {
  return line.trim().replace('font-family: \'', '').replace('\';', '')
})
var fontsStr = fonts.map((font) => {
  return `<p style="font-family: ${font}">This is ${font}</p>`
}).join('\n')


fs.writeFileSync('fonts.html', fontsStr)


setTimeout(console.log, 100000)

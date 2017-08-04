const FontFaceObserver = require('fontfaceobserver')

const fonts = [
  'BenchNineLight', 'Anaheim', 'Andada', 'ArchivoNarrow', 'ArchivoNarrowBold',
  'ArchivoNarrowItalic', 'Cousine', 'CousineBold', 'CousineItalic',
  'Enriqueta', 'FrancoisOne', 'MerriweatherSans', 'MerriweatherSansBold', 'MerriweatherSansLight',
  'OpenSansExtra', 'OpenSansSemi', 'Oswald', 'OswaldBold', 'OswaldLight', 'PTSans', 'PTSansBold',
  'PTSerif', 'PTSerifBold', 'PTSerifItalic', 'RobotoSlab', 'RobotoSlabBold', 'RobotoSlabThin',
  'SourceCode', 'SourceCodeBold', 'SourceCodeLight', 'SourceSans', 'SourceSansBold', 'SourceSansLight',
  'UbuntuCondensed', 'Varela'
]

function load (cb) {
  console.log('fonts: loading', fonts)
  Promise.all(fonts.map((fontFamily) => {
    const font = new FontFaceObserver(fontFamily)
    return font.load()
  })).then(() => {
    console.log('fonts: loading done')
    cb()
  }, (e) => {
    console.log('fonts: loading failed', e)
  })
}

module.exports = {
  load: load,
  list: fonts
}

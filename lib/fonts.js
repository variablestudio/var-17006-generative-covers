const opentype = require('opentype.js')
const async = require('async')

const fonts = [
  { name: 'Anaheim', file: 'fonts/anaheim/anaheim-regular-webfont.ttf' },
  { name: 'Andada', file: 'fonts/andada/andada-regular-webfont.ttf' },
  { name: 'ArchivoNarrow', file: 'fonts/archivonarrow/archivonarrow-regular-webfont.ttf' },
  { name: 'ArchivoNarrowBold', file: 'fonts/archivonarrow/archivonarrow-bold-webfont.ttf' },
  { name: 'ArchivoNarrowItalic', file: 'fonts/archivonarrow/archivonarrow-italic-webfont.ttf' },
  { name: 'BenchNineLight', file: 'fonts/benchninelight/benchnine-light-webfont.ttf' },
  { name: 'Cousine', file: 'fonts/cousine/cousine-regular-webfont.ttf' },
  { name: 'CousineBold', file: 'fonts/cousine/cousine-italic-webfont.ttf' },
  { name: 'CousineItalic', file: 'fonts/cousine/cousine-bold-webfont.ttf' },
  { name: 'Enriqueta', file: 'fonts/enriqueta/enriqueta-regular-webfont.ttf' },
  { name: 'EnriquetaBold', file: 'fonts/enriqueta/enriqueta-bold-webfont.ttf' },
  { name: 'FrancoisOne', file: 'fonts/francoisone/francoisone-webfont.ttf' },
  { name: 'LibreBaskerville', file: 'fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf' },
  { name: 'LibreBaskervilleBold', file: 'fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf' },
  { name: 'LibreBaskervilleItalic', file: 'fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf' },
  { name: 'MerriweatherSans', file: 'fonts/merriweathersans/merriweathersans-regular-webfont.ttf' },
  { name: 'MerriweatherSansBold', file: 'fonts/merriweathersans/merriweathersans-bold-webfont.ttf' },
  { name: 'MerriweatherSansLight', file: 'fonts/merriweathersans/merriweathersans-light-webfont.ttf' },
  { name: 'OpenSansExtraBold', file: 'fonts/opensansextra/opensans-extrabold-webfont.ttf' },
  { name: 'OpenSansSemiBold', file: 'fonts/opensanssemi/opensans-semibold-webfont.ttf' },
  { name: 'Oswald', file: 'fonts/oswald/oswald-regular-webfont.ttf' },
  { name: 'OswaldBold', file: 'fonts/oswald/oswald-bold-webfont.ttf' },
  { name: 'OswaldLight', file: 'fonts/oswald/oswald-light-webfont.ttf' },
  { name: 'PTSans', file: 'fonts/ptsans/pt_sans-web-regular-webfont.ttf' },
  { name: 'PTSansBold', file: 'fonts/ptsans/pt_sans-web-bold-webfont.ttf' },
  { name: 'PTSansBoldItalic', file: 'fonts/ptsans/pt_sans-web-bolditalic-webfont.ttf' },
  { name: 'PTSansItalic', file: 'fonts/ptsans/pt_sans-web-italic-webfont.ttf' },
  { name: 'PTSerif', file: 'fonts/ptserif/pt_serif-web-regular-webfont.ttf' },
  { name: 'PTSerifBold', file: 'fonts/ptserif/pt_serif-web-bold-webfont.ttf' },
  { name: 'PTSerifItalic', file: 'fonts/ptserif/pt_serif-web-italic-webfont.ttf' },
  { name: 'RobotoSlab', file: 'fonts/robotoslab/robotoslab-regular-webfont.ttf' },
  { name: 'RobotoSlabBold', file: 'fonts/robotoslab/robotoslab-bold-webfont.ttf' },
  { name: 'RobotoSlabThin', file: 'fonts/robotoslab/robotoslab-thin-webfont.ttf' },
  { name: 'SourceCode', file: 'fonts/sourcecode/sourcecodepro-regular-webfont.ttf' },
  { name: 'SourceCodeBold', file: 'fonts/sourcecode/sourcecodepro-bold-webfont.ttf' },
  { name: 'SourceCodeLight', file: 'fonts/sourcecode/sourcecodepro-light-webfont.ttf' },
  { name: 'SourceSans', file: 'fonts/sourcesans/sourcesanspro-regular-webfont.ttf' },
  { name: 'SourceSansBold', file: 'fonts/sourcesans/sourcesanspro-bold-webfont.ttf' },
  { name: 'SourceSansLight', file: 'fonts/sourcesans/sourcesanspro-light-webfont.ttf' },
  { name: 'UbuntuCondensed', file: 'fonts/ubuntucond/ubuntucondensed-regular-webfont.ttf' },
  { name: 'Varela', file: 'fonts/varela/varela-regular-webfont.ttf' },

  { name: 'AverageSans', file: 'fonts/average/averagesans-regular-webfont.ttf' },
  { name: 'Merriweather', file: 'fonts/merriweather/merriweather-regular-webfont.ttf' },
  { name: 'MerriweatherBold', file: 'fonts/merriweather/merriweather-bold-webfont.ttf' },
  { name: 'Oxygen', file: 'fonts/oxygen/oxygen-regular-webfont.ttf' },
  { name: 'OxygenBold', file: 'fonts/oxygen/oxygen-bold-webfont.ttf' },
  { name: 'OxygenLight', file: 'fonts/oxygen/oxygen-light-webfont.ttf' }
]

function load (cb) {
  console.log('Loading fonts')
  async.forEach(fonts, (fontInfo, done) => {
    opentype.load(fontInfo.file, function (err, font) {
      console.log(`Loading fonts: ${fontInfo.name}`)
      fontInfo.font = font
      done(err)
    })
  }, () => {
    console.log('Loading fonts DONE')
    cb()
  })
}

module.exports = {
  load: load,
  list: fonts
}

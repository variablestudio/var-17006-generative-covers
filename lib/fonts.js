const FontFaceObserver = require('fontfaceobserver')

const fonts = [
  'BenchNineLight', 'Anaheim', 'Andada', 'ArchivoNarrow', 'ArchivoNarrowBold',
  'ArchivoNarrowItalic', 'Cousine', 'CousineBold', 'CousineItalic',
  'Enriqueta', 'FrancoisOne', 'MerriweatherSans', 'MerriweatherSansBold', 'MerriweatherSansLight',
  'OpenSansExtraBold', 'OpenSansSemi', 'Oswald', 'OswaldBold', 'OswaldLight', 'PTSans', 'PTSansBold',
  'PTSerif', 'PTSerifBold', 'PTSerifItalic', 'RobotoSlab', 'RobotoSlabBold', 'RobotoSlabThin',
  'SourceCode', 'SourceCodeBold', 'SourceCodeLight', 'SourceSans', 'SourceSansBold', 'SourceSansLight',
  'UbuntuCondensed', 'Varela'
]

./fonts/anaheim/anaheim-regular-webfont.ttf
./fonts/andada/andada-regular-webfont.ttf
./fonts/archivonarrow/archivonarrow-bold-webfont.ttf
./fonts/archivonarrow/archivonarrow-italic-webfont.ttf
./fonts/archivonarrow/archivonarrow-regular-webfont.ttf
./fonts/average/averagesans-regular-webfont.ttf
./fonts/benchninelight/benchnine-light-webfont.ttf
./fonts/cousine/cousine-bold-webfont.ttf
./fonts/cousine/cousine-italic-webfont.ttf
./fonts/cousine/cousine-regular-webfont.ttf
./fonts/enriqueta/enriqueta-bold-webfont.ttf
./fonts/enriqueta/enriqueta-regular-webfont.ttf
./fonts/francoisone/francoisone-webfont.ttf
./fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf
./fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf
./fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf
./fonts/merriweather/merriweather-bold-webfont.ttf
./fonts/merriweather/merriweather-regular-webfont.ttf
./fonts/merriweathersans/merriweathersans-bold-webfont.ttf
./fonts/merriweathersans/merriweathersans-light-webfont.ttf
./fonts/merriweathersans/merriweathersans-regular-webfont.ttf
./fonts/opensansextra/opensans-extrabold-webfont.ttf
./fonts/opensanssemi/opensans-semibold-webfont.ttf
./fonts/oswald/oswald-bold-webfont.ttf
./fonts/oswald/oswald-light-webfont.ttf
./fonts/oswald/oswald-regular-webfont.ttf
./fonts/oxygen/oxygen-bold-webfont.ttf
./fonts/oxygen/oxygen-light-webfont.ttf
./fonts/oxygen/oxygen-regular-webfont.ttf
./fonts/ptsans/pt_sans-web-bold-webfont.ttf
./fonts/ptsans/pt_sans-web-bolditalic-webfont.ttf
./fonts/ptsans/pt_sans-web-italic-webfont.ttf
./fonts/ptsans/pt_sans-web-regular-webfont.ttf
./fonts/ptserif/pt_serif-web-bold-webfont.ttf
./fonts/ptserif/pt_serif-web-italic-webfont.ttf
./fonts/ptserif/pt_serif-web-regular-webfont.ttf
./fonts/robotoslab/robotoslab-bold-webfont.ttf
./fonts/robotoslab/robotoslab-regular-webfont.ttf
./fonts/robotoslab/robotoslab-thin-webfont.ttf
./fonts/sourcecode/sourcecodepro-bold-webfont.ttf
./fonts/sourcecode/sourcecodepro-light-webfont.ttf
./fonts/sourcecode/sourcecodepro-regular-webfont.ttf
./fonts/sourcesans/sourcesanspro-bold-webfont.ttf
./fonts/sourcesans/sourcesanspro-light-webfont.ttf
./fonts/sourcesans/sourcesanspro-regular-webfont.ttf
./fonts/ubuntucond/ubuntucondensed-regular-webfont.ttf
./fonts/varela/varela-regular-webfont.ttf
./node_modules/rune.font.js/test/HelveticaLT.ttf


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

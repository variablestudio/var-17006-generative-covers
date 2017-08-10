const Rune = require('rune.js')
const opentype = require('opentype.js')
const fonts = require('./fonts.js')

const W = 400
const H = 400

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = './fonts/include.css'
document.head.appendChild(link)

fonts.load(() => {
  const container = document.createElement('div')
  container.id = 'container'
  document.body.appendChild(container)
  container.style.position = 'absolute'
  container.style.top = '20px'
  container.style.left = '20px'

  const r = new Rune({
    container: '#container',
    width: W,
    height: H,
    debug: true
  })

  r.rect(0, 0, W, H)
    .fill(220)
    .stroke(false)

  let tx = 20
  let ty = r.height / 2
  const str = 'This is a piece of text Śą'
  const text = r.text(str, tx, ty)
    .fill(255, 0, 0)
    .stroke(false)
    .fontSize(32)
  // .textAlign('center')
    .fontFamily('PTSans')
  // .fontWeight('bold')
  console.log(text)

  // todo: caching
  function measureText (text) {

    const ns = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(ns, 'svg')
    svg.style.position = 'absolute'
    svg.style.top = '-1000px'
    document.body.appendChild(svg)
    const textElem = document.createElementNS(ns, 'text')
    if (!text.state.fontFamily) throw new Error('MeasureText: no fontFamily')
    if (!text.state.fontSize) throw new Error('MeasureText: no fontSize')
    textElem.style.fontFamily = text.state.fontFamily
    textElem.style.fontSize = text.state.fontSize
    textElem.style.fontWeight = text.state.fontWeight || 'normal'
    textElem.style.fontStyle = text.state.fontStyle || 'normal'
    //todo
    //textElem.textAlign = text.state.textAlign || 'left'

    svg.appendChild(textElem)
    textElem.innerHTML = text.state.text
    return textElem.getBBox()
  }

  const bbox = measureText(text)

  console.log(bbox)
  r.rect(tx + bbox.x, ty + bbox.y, bbox.width, bbox.height)
    .stroke(255, 0, 0)
    .fill(false)

  r.draw()


  var canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  canvas.style.position = 'absolute'
  canvas.style.top = '20px'
  canvas.style.left = '20px'
  document.body.appendChild(canvas)
  var ctx = canvas.getContext('2d')

  // opentype.load('fonts/francoisone/francoisone-webfont.ttf', function(err, font) {
  opentype.load('fonts/ptsans/pt_sans-web-regular-webfont.ttf', function(err, font) {
    if (err) {
      alert('Could not load font: ' + err);
    } else {
      // Use your font here.
      console.log(font)
      ctx.fillStyle = 'rgb(220, 220, 220)'
      // ctx.fillRect(0, 0, W, H)
      // font.drawMetrics(ctx, text.state.text, tx, ty, 32, {})
      font.draw(ctx, text.state.text, tx, ty, 32, { kerning: true })
      var w = font.getAdvanceWidth(text.state.text, 32, {})

      ctx.strokeStyle = '#0000FF'
      ctx.beginPath()
      var asc = 32 * font.ascender / font.unitsPerEm
      var desc = 32 * font.descender / font.unitsPerEm
      ctx.moveTo(tx, ty)
      ctx.lineTo(tx + w, ty)
      ctx.moveTo(tx, ty - asc)
      ctx.lineTo(tx + w, ty - asc)
      ctx.moveTo(tx, ty - desc)
      ctx.lineTo(tx + w, ty - desc)
      ctx.stroke()
      ctx.closePath()

      var path = font.getPath(text.state.text, tx, ty, 32, { kerning: true })
      var bbox = path.getBoundingBox()
      ctx.strokeStyle = '#00FF00'
      console.log('bbox', bbox)
      //ctx.strokeRect(bbox.x1, bbox.y1, bbox.x2 - bbox.x1, bbox.y2 - bbox.y1)
      path.stroke = '#FF6600'
      // path.draw(ctx)

      console.log('font', font)
    }
  });
})

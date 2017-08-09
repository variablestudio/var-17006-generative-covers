var Pixels = {}

Pixels.fromImage = function (img, targetWidth, targetHeight) {
  var c = document.createElement('canvas')
  c.width = targetWidth || image.width
  c.height = targetHeight || image.height
  var ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0, c.width, c.height)

  var pixels = ctx.getImageData(0, 0, c.width, c.height)
  return pixels
}

Pixels.fromCanvas = function (canvas) {
  var ctx = canvas.getContext('2d')
  var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  return pixels
}

Pixels.draw = function (pixels, canvas) {
  var ctx = canvas.getContext('2d')
  ctx.putImageData(pixels, 0, 0)
}

Pixels.newPixels = function (w, h) {
  var c = document.createElement('canvas')
  var ctx = c.getContext('2d')
  return ctx.createImageData(w, h)
}

Pixels.grayscale = function (pixels) {
  var d = pixels.data
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i]
    var g = d[i + 1]
    var b = d[i + 2]
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b
    d[i] = d[i + 1] = d[i + 2] = v
  }
  return pixels
}

Pixels.whiteBalance = function (pixels, r, g, b) {
  var d = pixels.data
  for (var i = 0; i < d.length; i += 4) {
    d[i] *= 255 / r
    d[i + 1] *= 255 / g
    d[i + 2] *= 255 / b
  }
  return pixels
}

Pixels.autoWhiteBalance = function (pixels) {
  var whiteColor = Pixels.getWhiteCorner(pixels)
  return Pixels.whiteBalance(pixels, whiteColor[0], whiteColor[1], whiteColor[2])
}

Pixels.getAvgColor = function (pixels, sx, sy, w, h) {
  sx = Math.floor(sx)
  sy = Math.floor(sy)
  w = Math.floor(w)
  h = Math.floor(h)
  var d = pixels.data
  var avgColor = [0, 0, 0, 0]
  var pixelCount = 0
  var dataLength = pixels.width * pixels.height * 4
  for (var y = sy; y < sy + h; y++) {
    for (var x = sx; x < sx + w; x++) {
      var i = (x + y * pixels.width) * 4
      if (i < 0 || i >= dataLength) continue

      avgColor[0] += d[i + 0]
      avgColor[1] += d[i + 1]
      avgColor[2] += d[i + 2]
      avgColor[3] += d[i + 3]
      pixelCount++
    }
  }
  avgColor[0] = Math.floor(avgColor[0] / pixelCount)
  avgColor[1] = Math.floor(avgColor[1] / pixelCount)
  avgColor[2] = Math.floor(avgColor[2] / pixelCount)
  avgColor[3] = Math.floor(avgColor[3] / pixelCount)
  return avgColor
}

Pixels.getWhiteCorner = function (pixels) {
  var a = Pixels.getAvgColor(pixels, 0, 0, 5, 5)
  var b = Pixels.getAvgColor(pixels, pixels.width - 6, 0, 5, 5)
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2, (a[3] + b[3]) / 2]
}

Pixels.covolve = function (pixels, kernel, base, totalSum) {
  totalSum = totalSum || 1
  var kernelSize = Math.sqrt(kernel.length)
  var r = Math.floor(kernelSize / 2)
  var numPixels = pixels.width * pixels.height * 4
  var d = pixels.data
  var resultPixels = Pixels.newPixels(pixels.width, pixels.height)
  var rd = resultPixels.data
  for (var y = 0; y < pixels.height; y++) {
    for (var x = 0; x < pixels.width; x++) {
      var i = (x + y * pixels.width) * 4
      for (var c = 0; c <= 3; c++) {
        var sum = 0
        var ki = 0
        for (var dy = -r; dy <= r; dy++) {
          for (var dx = -r; dx <= r; dx++) {
            var j = ((x + dx) + (y + dy) * pixels.width) * 4
            if (j < 0 || j >= numPixels) {
              continue
            }
            sum += kernel[ki] * d[j + c]
            ki++
          }
        }
        rd[i + c] = base + sum / totalSum
      }
      rd[i + 3] = 255
    }
  }
  return resultPixels
}

Pixels.threshold = function (pixels, level) {
  var d = pixels.data
  var value = 0
  for (var i = 0; i < d.length; i += 4) {
    value = (d[i] < level) ? 0 : 255

    d[i ] = value
    d[i + 1] = value
    d[i + 2] = value
    d[i + 3] = 255
  }

  return pixels
}

Pixels.binarizeEdges = function (pixels) {
  var d = pixels.data
  var value = 0
  for (var i = 0; i < d.length; i += 4) {
    value = (Math.abs(d[i] - 127) > 5) ? 0 : 255

    d[i ] = value
    d[i + 1] = value
    d[i + 2] = value
    d[i + 3] = 255
  }

  return pixels
}

Pixels.erode = function (pixels) {
  var d = pixels.data
  var value = 0
  var resultPixels = Pixels.newPixels(pixels.width, pixels.height)
  var numPixels = pixels.width * pixels.height * 4
  var rd = resultPixels.data

  var shifts = [
    (-pixels.width - 1) * 4,
    (-pixels.width) * 4,
    (-pixels.width + 1) * 4,
    -1 * 4,
    0,
    1 * 4,
    (pixels.width - 1) * 4,
    (pixels.width) * 4,
    (pixels.width + 1) * 4
  ]

  for (var y = 0; y < pixels.height; y++) {
    for (var x = 0; x < pixels.width; x++) {
      var i = (x + y * pixels.width) * 4
      var value = 0

      for (var s = 0; s < shifts.length; s++) {
        var j = i + shifts[s]
        if (j < 0 || j >= numPixels) continue
        if (d[j] > 127) {
          value = 255
          break
        }
      }

      rd[i + 0] = value
      rd[i + 1] = value
      rd[i + 2] = value
      rd[i + 3] = 255
    }
  }

  return resultPixels
}

Pixels.dilate = function (pixels) {
  var d = pixels.data
  var value = 0
  var resultPixels = Pixels.newPixels(pixels.width, pixels.height)
  var numPixels = pixels.width * pixels.height * 4
  var rd = resultPixels.data

  var shifts = [
    (-pixels.width - 1) * 4,
    (-pixels.width) * 4,
    (-pixels.width + 1) * 4,
    -1 * 4,
    0,
    1 * 4,
    (pixels.width - 1) * 4,
    (pixels.width) * 4,
    (pixels.width + 1) * 4
  ]

  for (var y = 0; y < pixels.height; y++) {
    for (var x = 0; x < pixels.width; x++) {
      var i = (x + y * pixels.width) * 4
      var value = 255

      for (var s = 0; s < shifts.length; s++) {
        var j = i + shifts[s]
        if (j < 0 || j >= numPixels) continue
        if (d[j] < 127) {
          value = 0
          break
        }
      }

      rd[i + 0] = value
      rd[i + 1] = value
      rd[i + 2] = value
      rd[i + 3] = 255
    }
  }

  return resultPixels
}

Pixels.blur = function (pixels) {
  var gaussianBlurKernel = [
    2, 4, 5, 4, 2,
    4, 9, 12, 9, 4,
    5, 12, 15, 12, 5,
    4, 9, 12, 9, 4,
    2, 4, 5, 4, 2
  ]
  var sum = 159
  var pixels = Pixels.covolve(pixels, gaussianBlurKernel, 0, sum)
  return pixels
}

Pixels.walkTillWhite = function (pixels, sx, sy, dx, dy) {
  var p = {
    x: Math.floor(sx),
    y: Math.floor(sy)
  }
  var watchdog = 0
  while (p.x >= 0 && p.x < pixels.width && p.y >= 0 && p.y < pixels.height) {
    if (++watchdog > 100000) {
      console.log('Watchdog broken ', watchdog, 'x: ' + p.x, 'y: ' + p.y)
      break
    }
    p.x += dx
    p.y += dy
    var index = (p.x + (p.y * pixels.width)) * 4
    var brightness = (pixels.data[index] + pixels.data[index + 1] + pixels.data[index + 2]) / 3
    if (brightness > 150) {
      break
    }
  }
  return p
}

Pixels.blend = function (pixels1, pixels2, mode) {
  mode = 'cmyk'
  if (pixels1.width != pixels2.width || pixels1.width != pixels2.width) {
    throw 'Pixels.blend pixel sizes have to be the same'
  }
  var d1 = pixels1.data
  var d2 = pixels2.data
  var resultPixels = Pixels.newPixels(pixels1.width, pixels1.height)

  var rd = resultPixels.data

  for (var y = 0; y < pixels1.height; y++) {
    for (var x = 0; x < pixels1.width; x++) {
      var i = (x + y * pixels1.width) * 4

      rd[i + 0] = (d2[i + 3]) ? Math.floor(d1[i ] * d2[i ] / 255) : d1[i ]
      rd[i + 1] = (d2[i + 3]) ? Math.floor(d1[i + 1] * d2[i + 1] / 255) : d1[i + 1]
      rd[i + 2] = (d2[i + 3]) ? Math.floor(d1[i + 2] * d2[i + 2] / 255) : d1[i + 2]

      var k1 = d1[i + 3] / 255
      var k2 = d2[i + 3] / 255

      // rd[i+0] = Math.floor(k1 * d1[i+3] + k2 * d1[i  ] * d2[i  ] / 255);
      // rd[i+1] = Math.floor(k1 * d1[i+3] + k2 * d1[i+1] * d2[i+1] / 255);
      // rd[i+2] = Math.floor(k1 * d1[i+3] + k2 * d1[i+2] * d2[i+2] / 255);
      rd[i + 3] = Math.min(255, d1[i + 3] + d2[i + 3])
    }
  }

  return resultPixels
}

module.exports = Pixels

const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

OK.Covers.Superformula = {}

OK.Covers.Superformula.Initialize = function (area, pos_x, pos_y, width, height, sections, paper) {
  var c_rand = Math.random() * 360
  area.context.fillStyle = '#FEFEFE'
  area.context.fillRect(50, 250, 500, 500)
  area.context.save()
  area.context.translate(15, 100)
  var a
  var b
  var m
  var n1
  var n2
  var n3
  var radius

// interpolated values
  var aCur = -5.5 + Math.random() * 13
  var bCur = -5.5 + Math.random() * 13
  var mCur = -5.5 + Math.random() * 13
  var n1Cur = -5.5 + Math.random() * 13
  var n2Cur = -5.5 + Math.random() * 13
  var n3Cur = -5.5 + Math.random() * 13
  var radiusCur = 999 + Math.random() * 70

// colour
  var cl = 100

  var rad_steps = sections
  var steps = 1024

// tresholds
  var randomizingTreshold = 0.02
  var interpolationSpeed = 0.15

  var canvasWidth = area.canvas.width
  var canvasHeight = area.canvas.height
// var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

  function drawPixel (x, y) {
    var index = (x + y * canvasWidth) * 4
    canvasData.data[index + 0] = 255
    canvasData.data[index + 1] = 255
    canvasData.data[index + 2] = 255
    canvasData.data[index + 3] = 255
  }

  function updateCanvas () {
    area.context.putImageData(canvasData, 0, 0)
  }

  function randomize () {
    a = 1
    b = 1

    // 4 elements for shapes
    m = 7
    n1 = 3 // Math.round(Math.random ()*5);
    n2 = 4 // Math.round(Math.random()*5);
    n3 = 17 // Math.round(-1 + Math.random ()*5);
  }

  function getNextMaxR (steps) {
    var maxR = 0

    for (p = 0; p < steps; p++) {
      phi = ((p - 0) / (steps - 0)) * (2 * Math.PI - 0) + 0
        // phi = map(p, 0, steps, 0, 2 * Math.PI);
      r = superFormula(phi, a, b, m, n1, n2, n3)

        // var deb_div = document.getElementById('debugger');
        // deb_div.innerHTML = deb_div.innerHTML + ' num: ' + r;

        // maxR = (Math.abs(r) > maxR) ? Math.abs(r) : maxR;
      if (Math.abs(r) > maxR) {
        maxR = Math.abs(r)
      } else {
        maxR = maxR
      }
    }
    return maxR
  }

  function superFormula (phi, a, b, m, n1, n2, n3) {
    var r = (Math.pow(Math.pow(Math.abs(Math.cos(m * phi / 4) / a), n2) + Math.pow(Math.abs(Math.sin(m * phi / 4) / b), n3), -1 / n1))

    return r
  }

  function isClose (tresh) {
    var returnValue = new Boolean()
    if ((Math.abs(a - aCur) <= tresh) && (Math.abs(b - bCur) <= tresh) && (Math.abs(n1 - n1Cur) <= tresh) && (Math.abs(n2 - n2Cur) <= tresh) && (Math.abs(n3 - n3Cur) <= tresh)) {
      returnValue = true
    } else {
      returnValue = false
    }
    // alert(returnValue);
    return returnValue
  }

  function interpolateValues (t) {
    aCur = (((t - 0) / (1 - 0)) * (a - aCur) + aCur)
    // aCur = (int)map (t, 0, 1, aCur,  a);
    bCur = (((t - 0) / (1 - 0)) * (b - bCur) + bCur)
    // bCur = (int)map (t, 0, 1, bCur,  b);
    mCur = Math.round(((t - 0) / (1 - 0)) * (m - mCur) + mCur)
    // mCur = (int)map (t, 0, 1, mCur,  m);
    n1Cur = ((t - 0) / (1 - 0)) * (n1 - n1Cur) + n1Cur
    n2Cur = ((t - 0) / (1 - 0)) * (n2 - n2Cur) + n2Cur
    n3Cur = ((t - 0) / (1 - 0)) * (n3 - n3Cur) + n3Cur
    // n1Cur = map (t, 0, 1, n1Cur,  n1);
    // n2Cur = map (t, 0, 1, n2Cur,  n2);
    // n3Cur = map (t, 0, 1, n3Cur,  n3);

    radiusCur = ((t - 0) / (1 - 0)) * (radius - radiusCur) + radiusCur
    // radiusCur = map (t, 0, 1, radiusCur,  radius);

    // var deb_div = document.getElementById('debugger');
    // deb_div.innerHTML = deb_div.innerHTML + radius + ' ' + radiusCur;
  }

  function Superformula (radialSteps, internalSteps, outerWeight, innerWeight) {
    var internalRadiusMultiplier = ((area.canvas.height * 0.9) / getNextMaxR(100)) / (rad_steps * 3)

    // var deb_div = document.getElementById('debugger');
    // deb_div.innerHTML = deb_div.innerHTML + ' internalRadiusMultiplier: ' + getNextMaxR(100);

    for (var i = 0; i < internalSteps; i++) {
      area.context.beginPath()
      for (var p = 0; p < radialSteps; p++) {
            // var phi = map(p, 0, radialSteps, 0, 2 * Math.PI);
            // y = ((x - a1)/(a2 - a1)) * (b2 - b1) + b1;

        var phi = ((p - 0) / (radialSteps - 0)) * (2 * Math.PI - 0) + 0
            // alert(phi);
        var r1 = superFormula(phi, aCur, bCur, mCur, n1Cur, n2Cur, n3Cur)
        var r2 = superFormula(phi, a, b, m, n1, n2, n3)

            // fill(128);

        var rr = ((i - 0) / ((internalSteps - 1) - 0)) * (r2 - r1) + r1
            // var rr = map(i, 0, internalSteps - 1, r1, r2);
        var rad = ((i - 0) / ((internalSteps - 1) - 0)) * (internalRadiusMultiplier - radiusCur) + radiusCur
            // var rad = map(i, 0, internalSteps - 1, radiusCur, internalRadiusMultiplier);

            // var weight = 2; //0.5*(map (i, 0, internalSteps-1, outerWeight, innerWeight));
            // var alpha = map (i,0, internalSteps-1, 255, 1);
            // noStroke();
            // colorMode(HSB);
            // fill(190,  255, cl);
            // strokeWeight (weight);

        var x = Math.round(area.canvas.width / 2 + (rr * rad * Math.cos(phi)))
        var y = Math.round(area.canvas.height / 2 + (rr * rad * Math.sin(phi)))

        if (p == 0) {
          var tmp1 = 0
        } else {
          if (p == 1) {
            area.context.moveTo(x, y)
            var start_x = x
            var start_y = y
          } else {
            area.context.lineTo(x, y)
                    // ctx.stroke();
                    // drawPixel(x, y);
          }
        }

            // ctx.beginPath();
      }

      area.context.lineTo(start_x, start_y)
      area.context.closePath()

      area.context.fillStyle = 'hsl(' + c_rand + ', 100%, ' + cl + '%)'

      area.context.fill()

        // closePath();
        // alert('drawing');
      cl = cl - 100 / (rad_steps)
    }
  };

  radius = 80
  randomize()

  if (isClose(randomizingTreshold) == true) {
    // alert('true');
    // time to set new values
    randomize()
    mR = getNextMaxR(300)
    radius = ((canvas.height * 0.9) / mR) / 2
  } else {
    interpolateValues(interpolationSpeed)
    // alert('false');
  }

  Superformula(steps, rad_steps, 3, 1)
// updateCanvas();
  area.context.restore()

  area.context.fillStyle = paper
  area.context.fillRect(0, 0, 600, 250)
  area.context.fillRect(0, 0, 50, 800)
  area.context.fillRect(550, 0, 50, 800)
  area.context.fillRect(0, 750, 600, 50)
}

const screenshot = require('screenshot-desktop')
const sharp = require('sharp')
const INTERVAL = 6 * 1000
const MAX = 20
const rand = (min, max) => Math.floor((Math.random() * max) + min)

const restart = () => {
  // git push origin master
  // restart
}

const grab = (nth = 0) => {

  // restart every INTERVAL
  if (nth >= MAX) {
    restart()
    return;
  }

  let start = Date.now()
  console.time(nth)
  screenshot().then(img => {
    sharp(img)
      .resize(960)
      .blur(40)
      .webp()
      .toFile(`output/sc-${String(nth).padStart(2,0)}.webp`, () => {
        let elapsed = Date.now() - start
        setTimeout(() => {
          console.timeEnd(nth)
          grab(nth+1)
        }, INTERVAL - elapsed)
      })
  })
}

grab(0)

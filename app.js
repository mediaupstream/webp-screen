const screenshot = require('screenshot-desktop')
const sharp = require('sharp')
const INTERVAL = 6 * 1 * 1000

const rand = (min, max) => Math.floor((Math.random() * max) + min)

const grab = (nth = 0) => {
  let start = Date.now()
  console.time(nth)
  screenshot().then(img => {
    sharp(img)
      .resize(960)
      .blur(40)
      .webp()
      .toFile(`grab/sc-${String(nth).padStart(8,0)}.webp`, () => {
        let elapsed = Date.now() - start
        setTimeout(() => {
          console.timeEnd(nth)
          grab(nth+1)
        }, INTERVAL - elapsed)
      })
  })
}

grab(0)

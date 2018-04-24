const git = require('simple-git/promise')
const screenshot = require('screenshot-desktop')
const sharp = require('sharp')
const INTERVAL = 6 * 1000
const MAX = 3
const rand = (min, max) => Math.floor((Math.random() * max) + min)

const restart = async () => {
  try {
    let status = await git().add(['-A'])
      .commit('bot: 👽 Created new output images')
      .push('origin', 'master')
    console.log(status)
  } catch (e) {
    console.log(e)
  }
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

// grab(0)

restart()

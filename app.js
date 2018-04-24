const git = require('simple-git')
const screenshot = require('screenshot-desktop')
const sharp = require('sharp')

const INTERVAL = 6 * 10 * 1000
const MAX = 20

//
// Restart every INTERVAL * MAX milliseconds
// Add new files, commit, and upload to github
//
const restart = () => {
  console.log('restarting...')
  git()
    .add('output/*')
    .commit('bot: Adding images')
    .push('origin', 'master', grab)
}

//
// Grab a screenshot of my com pu tor
// resize, blur, save as webp
//
const grab = (nth = 0) => {
  // restart
  if (nth >= MAX) {
    restart()
    return;
  }
  let start = Date.now()
  screenshot().then(img => {
    sharp(img)
      .resize(960)
      .blur(40)
      .webp()
      .toFile(`output/sc-${String(nth).padStart(2,0)}.webp`, () => {
        let elapsed = Date.now() - start
        setTimeout(() => {
          grab(nth+1)
        }, INTERVAL - elapsed)
      })
  })
}

module.exports = {
  restart,
  grab,
}

const readingTime = require('reading-time')

const file = require('./B88486320Z.json')

const blocks = file.content.blocks
let content = []

if (!blocks) {
  return
}

blocks.forEach(block => {
  if (block.kind !== 'text') {
    return
  }

  content.push(block.text)
})

console.log(readingTime(content[0]))

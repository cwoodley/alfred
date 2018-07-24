import * as readingTime from 'reading-time'

export function getReadingTimeForArticle(article: { content: { blocks: Array<{ kind: string; text: string }> } }) {
  const textBlocks: string[] = []

  const { content } = article
  if (content && content.blocks) {
    content.blocks.forEach(block => {
      if (block.kind !== 'text') {
        return
      }
      textBlocks.push(block.text)
    })
  }
  return readingTime(textBlocks.join())
}

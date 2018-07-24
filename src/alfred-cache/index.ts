import { getReadingTimeForArticle } from './time'

const BASE_URL = 'https://content.thewest.com.au'

export class AlfredCache {
  private curationCache: object
  private articlesCache: object

  constructor() {
    this.curationCache = {}
    this.articlesCache = {}
  }

  public async loadCurations(topics: string[]) {
    await Promise.all(topics.map(async topic => await this.loadCuration(topic)))
  }

  // loads the curation and populates the reading time for the curation articles, also fetches the articles within the curation
  private async loadCuration(topic: string = 'news') {
    const response = await fetch(`${BASE_URL}/v4/curation/${topic}`)
    const json = await response.json()

    // extract article id's for the curation
    // Get the content for each article id
    // update reading times on the curation
    await Promise.all(
      json.articles.map(async (article: { readingTime: object; id: string }) => {
        await this.getPublicationContent(article.id)
        article.readingTime = this.getArticle(article.id).readingTime
      }),
    )
    // update the cache
    this.curationCache[topic] = json
  }

  // get the specific curation from the cache
  public getCurations(topics: string[]) {
    const articles: any[] = []
    topics.forEach(topic => {
      articles.push(...this.curationCache[topic].articles)
    })
    return { articles }
  }

  // get the specific article from the cache
  public getArticle(id: string) {
    return this.articlesCache[id]
  }

  // Gets an article and calculates its time
  private async getPublicationContent(id: string) {
    const response = await fetch(`${BASE_URL}/v4/publication/${id}`)
    const json = await response.json()

    // calculate the reading time
    json.readingTime = getReadingTimeForArticle(json)
    this.articlesCache[id] = json
  }

  public async getTopics() {
    const response = await fetch(`${BASE_URL}/taxonomy/navigation-menu`)
    const json = await response.json()

    const topics: string[] = []

    json.forEach((element: any) => {
      topics.push(element.id)
    })

    return topics
  }
}

import * as React from 'react'
import { AlfredCache } from './alfred-cache'
import './App.css'
import { Article } from './types/article'
import { SaveTopics } from 'src/SaveTopics'
import { ButtonGroup } from './ButtonGroup'
import * as store from 'store'

type Props = {}

type State = {
  topic: string
  topicList: string[]
  articles: Array<Article>
  unFiltered: Array<Article>
  buttonValues: number[]
  selectedTotalToRead: number
  totalRead: number
}

class App extends React.Component<Props, State> {
  private cache = new AlfredCache()

  constructor(props: Props) {
    super(props)
    this.state = {
      topic: 'news',
      unFiltered: [],
      topicList: [],
      articles: [],
      buttonValues: [5, 10, 15],
      selectedTotalToRead: 5,
      totalRead: this.getReadTotal(),
    }
  }

  onTotalReadClick(totalMin: number) {
    let currentTime = 0
    const articlesToRead: Array<Article> = []
    if (this.state.articles.length > 0) {
      this.state.unFiltered.forEach(article => {
        const articleMin = article.readingTime.minutes
        // if the article goes over the totalMin then just exit
        if (currentTime + articleMin > totalMin) {
          return
        }
        // article will fit within totalMin
        if (currentTime < totalMin) {
          articlesToRead.push(article)
          currentTime += articleMin
        }
      })
      this.setState({ articles: articlesToRead, selectedTotalToRead: totalMin })
    }
  }

  handleTopicSelect = (event: any) => {
    store.set('topic', event.target.name)
    this.getTopicArticles(event.target.name)
  }

  setTopics = async () => {
    const topicList = await this.cache.getTopics()
    this.setState({ topicList: topicList })
  }

  async getTopicArticles(topic: any) {
    await this.cache.loadCuration(topic)
    const curation = this.cache.getCuration(topic)
    this.setState({ unFiltered: curation.articles, articles: curation.articles })
    this.onTotalReadClick(this.state.selectedTotalToRead)
    // console.log(curation)
  }

  componentWillMount() {
    this.setTopics()

    if (!store.get('topic')) {
      this.getTopicArticles('news')
      return
    }
    this.getTopicArticles(store.get('topic'))
  }

  getReadTotal() {
    let read = store.get('articlesRead')
    let total = 0
    if (read && read.length > 0) {
      read.forEach((article: Article) => {
        total += Math.round(article.readingTime.minutes)
      })
    }
    return total
  }

  articleRead(article: Article) {
    let read = store.get('articlesRead')
    if (!read) {
      read = []
    }
    if (read.length > 0) {
      const item = read.find((r: Article) => r.id === article.id)
      // you already read it so dont count it
      if (!item) {
        read.push(article)
      }
    } else {
      read.push(article)
    }
    store.set('articlesRead', read)
    this.setState({ totalRead: this.getReadTotal() })
  }

  renderArticle(article: Article) {
    return (
      <article key={article.id}>
        <a onClick={() => this.articleRead(article)} href={article._self} target="_blank">
          <h3 className="headline">
            <span className="kicker">{article.headKicker}</span>
            <span className="heading">{article.heading}</span>
          </h3>
          <p className="teaser">{article.homepageTeaser}</p>
          <div className="article-data">
            <span className="reading-time">
              <span className="number">{Math.round(article.readingTime.minutes)}</span>
              <span className="timescale">mins</span>
            </span>
            <div className="article-creation">
              <p className="byline">
                {article.byline && article.byline.text}
                <span className="position">
                  {article.profiles.length > 0 ? article.profiles[0].position : undefined}
                </span>
              </p>
              <time dateTime="blah">{new Date(article.publicationDate).toLocaleString()}</time>
            </div>
          </div>
        </a>
      </article>
    )
  }

  renderArticles() {
    return <div>{this.state.articles.map((article: Article) => this.renderArticle(article))}</div>
  }

  totalReadBanner() {
    const totalRead = this.state.totalRead
    return totalRead > 0 ? (
      <div className="ribbon-read">
        <p>
          <span className="time">{totalRead}</span> minutes reading completed
        </p>
      </div>
    ) : (
      <noscript />
    )
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <header>
            <h1>Alfred...</h1>
            <ButtonGroup
              onClick={(m: number) => this.onTotalReadClick(m)}
              values={this.state.buttonValues}
              selectedValue={this.state.selectedTotalToRead}
            />
            {this.totalReadBanner()}
          </header>
          <main>
            <div className="sidebar">
              <h2 className="label">{this.state.topic}</h2>
            </div>
            <div>
              <SaveTopics topics={this.state.topicList} selectAction={this.handleTopicSelect} />
              {this.renderArticles()}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App

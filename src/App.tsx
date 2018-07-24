import * as React from 'react'
import { AlfredCache } from './alfred-cache'
import './App.css'
import { Article } from './types/article'
import { SaveTopics } from 'src/SaveTopics'
import { ButtonGroup } from './ButtonGroup'
import * as store from 'store'

type Props = {}

type State = {
  topics: string[]
  topicList: string[]
  articles: Array<Article>
  unFiltered: Array<Article>
  buttonValues: number[]
  selectedTotalToRead: number
  totalRead: number
  articlesRead: Array<Article>
  selectedTopics: string[]
}

class App extends React.Component<Props, State> {
  private cache = new AlfredCache()

  constructor(props: Props) {
    super(props)
    this.state = {
      topics: ['news'],
      unFiltered: [],
      topicList: [],
      articles: [],
      buttonValues: [5, 10, 30],
      selectedTotalToRead: 5,
      totalRead: this.getReadTotal(),
      articlesRead: store.get('articlesRead') || [],
      selectedTopics: [],
    }
  }

  onTotalReadClick(totalMin: number) {
    let currentTime = 0
    const articlesToRead: Array<Article> = []
    if (this.state.articles.length > 0) {
      this.state.unFiltered.forEach(article => {
        const articleSeconds = article.readingTime.time
        // if the article goes over the totalMin then just exit
        if ((currentTime + articleSeconds) / 60000 > totalMin) {
          return
        }
        // article will fit within totalMin
        if (currentTime / 60000 < totalMin) {
          articlesToRead.push(article)
          currentTime += articleSeconds
        }
      })
      this.setState({ articles: articlesToRead, selectedTotalToRead: totalMin })
    }
  }

  handleTopicsSelected = (selectedTopics: string[]) => {
    this.setState({ selectedTopics: selectedTopics })
    this.getTopicArticles(selectedTopics)
  }

  setTopics = async () => {
    const topicList = await this.cache.getTopics()
    this.setState({ topicList: topicList })
  }

  async getTopicArticles(topics: string[]) {
    await this.cache.loadCurations(topics)
    const curation = this.cache.getCurations(topics)
    this.setState({ unFiltered: curation.articles, articles: curation.articles, topics })
    this.onTotalReadClick(this.state.selectedTotalToRead)
  }

  componentWillMount() {
    this.setTopics()

    if (!store.get('topics')) {
      this.getTopicArticles(['news'])
      return
    }
    this.getTopicArticles(store.get('topics'))
  }

  getReadTotal() {
    let read = store.get('articlesRead')
    let total = 0
    if (read && read.length > 0) {
      read.forEach((article: Article) => {
        total += article.readingTime.time
      })
    }
    return Math.round(total / 60000)
  }

  articleHasBeenRead(article: Article) {
    return this.state.articlesRead.findIndex(a => a.id === article.id) > -1
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
    this.setState({ totalRead: this.getReadTotal(), articlesRead: read })
  }

  renderArticle(article: Article) {
    const articleReadClass = this.articleHasBeenRead(article) ? 'visited' : undefined
    const showSeconds = article.readingTime.time < 60000
    const time = article.readingTime.time

    return (
      <article key={article._self}>
        <a className={articleReadClass} onClick={() => this.articleRead(article)} href={article._self} target="_blank">
          <div className="visited-item">
            <span className="tick">&#10003;</span> <span className="done">done</span>
          </div>
          <h3 className="headline">
            <span className="kicker">{article.headKicker}</span>
            <span className="heading">{article.heading}</span>
          </h3>
          <h4 style={{ color: '#7d7d7d', backgroundColor: '#eaeaea', display: 'inline-block', padding: 5, fontSize: 12 }}>
            {article.topics.primary.id}
          </h4>
          <p className="teaser">{article.homepageTeaser}</p>
          <div className="article-data">
            <span className="reading-time">
              <span className="number">{showSeconds ? Math.round(time / 1000) : Math.round(time / 60000)}</span>
              <span className="timescale">{showSeconds ? 'secs' : 'mins'}</span>
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
              {this.state.topics.map((t, i) => (
                <h2 key={i} style={{ width: '100%' }} className="label">
                  {t}
                </h2>
              ))}
            </div>
            <div>
              <SaveTopics
                topics={this.state.topicList}
                selectedTopics={this.state.topics}
                onSelected={this.handleTopicsSelected}
              />
              {this.renderArticles()}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App

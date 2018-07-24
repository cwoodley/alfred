import * as React from 'react'
import { AlfredCache } from './alfred-cache'
import './App.css'
import { Article } from './types/article'
import { SaveTopics } from 'src/SaveTopics'
import { ButtonGroup } from './ButtonGroup'

type Props = {}

type State = {
  topic: string
  articles: Array<Article>
  unFiltered: Array<Article>
}

class App extends React.Component<Props, State> {
  private cache = new AlfredCache()

  constructor(props: Props) {
    super(props)
    this.state = {
      topic: 'news',
      unFiltered: [],
      articles: [],
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
      this.setState({ articles: articlesToRead })
    }
  }

  async componentWillMount() {
    await this.cache.loadCuration(this.state.topic)
    const curation = this.cache.getCuration(this.state.topic)
    console.log(curation)
    this.setState({ unFiltered: curation.articles, articles: curation.articles })
  }

  renderArticle(article: Article) {
    return (
      <article key={article.id}>
        <a href="http://google.com" target="_blank">
          <h3 className="headline">
            <span className="kicker">{article.headKicker}</span>
            {article.heading}
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

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <header>
            <h1>Alfred...</h1>
            <ButtonGroup onClick={(m: number) => this.onTotalReadClick(m)} />
          </header>
          <main>
            <div className="sidebar">
              <h2 className="label">Most popular</h2>
            </div>
            <div>
              <SaveTopics topics={['sport', 'lifestyle', 'business']} />
              {this.renderArticles()}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App

import * as React from 'react'
import { AlfredCache } from './alfred-cache'
import './App.css'
import { Article } from './types/article'

type Props = {}

type State = {
  topic: string
  articles: Array<Article>
}

class App extends React.Component<Props, State> {
  private cache = new AlfredCache()

  constructor(props: Props) {
    super(props)
    this.state = {
      topic: 'news',
      articles: [],
    }
  }

  async componentWillMount() {
    await this.cache.loadCuration(this.state.topic)
    const curation = this.cache.getCuration(this.state.topic)
    console.log(curation)
    this.setState({ articles: curation.articles })
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
          <h1>Alfred...</h1>
          <main>
            <div className="sidebar">
              <h2 className="label">Most popular</h2>
            </div>
            {this.renderArticles()}
          </main>
        </div>
      </div>
    )
  }
}

export default App

import * as React from 'react'
import { AlfredCache } from './alfred-cache'
import './App.css'
import { Article } from './types/article'
import { SaveTopics } from 'src/SaveTopics'
import * as store from 'store'

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

  handleTopicSelect = (event: any) => {
    store.set('topic', event.target.name)
    this.getTopicArticles(event.target.name)
  }

  async getTopicArticles(topic: any) {
    await this.cache.loadCuration(topic)
    const curation = this.cache.getCuration(topic)
    console.log(curation)
    this.setState({ articles: curation.articles })
  }

  async componentWillMount() {
    if (!store.get('topic')) {
      this.getTopicArticles('news')
    }

    this.getTopicArticles(store.get('topic'))
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

            <div className="select-time">
              <p>How many minutes?</p>
              <div className="button-group">
                <button type="button">5</button>
                <button type="button">10</button>
                <button type="button">15</button>
              </div>
            </div>
            <div className="ribbon-read">
              <p>
                <span className="time">10</span> minutes reading completed
              </p>
            </div>
          </header>
          <main>
            <div className="sidebar">
              <h2 className="label">Most popular</h2>
            </div>
            <div>
              <SaveTopics topics={['sport', 'lifestyle', 'business']} selectAction={this.handleTopicSelect} />
              {this.renderArticles()}
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App

import * as React from 'react'
import { AlfredCache } from 'src/alfred-cache'
import './App.css'

class App extends React.Component {
  private cache = new AlfredCache()

  componentWillMount() {
    this.cache.loadCuration()
  }

  public render() {
    return (
      <div className="App">
        <div className="wrapper">
            <header>
                <h1>Alfred...</h1>
                <div className="button-group">
                    <button type="button">5</button>
                    <button type="button">10</button>
                    <button type="button">15</button>
                    <button type="button">20</button>
                </div>
            </header>
            <main>
                <div className="sidebar">
                    <h2 className="label">Most popular</h2>
                </div>
                <div>
                   <article>
                       <a href="http://google.com" target="_blank">
                        <h3 className="headline"><span className="kicker">Good Job</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                        <p className="teaser">Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue.</p>
                        <div className="article-data">
                            <span className="reading-time"><span className="number">1</span><span className="timescale">mins</span></span>
                            <div className="article-creation">
                                <p className="byline">Gary Adshead | <span className="position">Political Editor</span></p>
                                <time dateTime="blah">Wednesday, 28th November 2016, 2:14pm</time>
                            </div>
                        </div>
                       </a>
                    </article>
                    <article>
                       <h3 className="headline"><span className="kicker">Good Job</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                       <p className="teaser">Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue.</p>
                       <div className="article-data">
                        <span className="reading-time"><span className="number">1</span><span className="timescale">mins</span></span>
                        <div className="article-creation">
                            <p className="byline">Gary Adshead <span className="position">Political Editor</span></p>
                            <time dateTime="blah">Wednesday, 28th November 2016, 2:14pm</time>
                        </div>
                       </div>
                    </article>
                </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App

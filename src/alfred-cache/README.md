# Usage

Instantiate a new alfred cache! Then load a curation and retrieve it!

```ts
  private cache = new AlfredCache()

  cache.loadCuration() // will by default load the news curation

  // but other curations can be loaded by just doing
  cache.loadCuration('sport')

  // curation json can be requested via

  cache.getCuration(topic) // where by topic is either 'news' 'sport' etc

  // to retrieve an individual article

  cache.getArticle(id)
```

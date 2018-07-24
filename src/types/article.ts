export interface ListArticle extends ReadingTime {
  _self: string
  id: string
  kind: 'article' | 'redirect'
  slug: string
  byline?: { text: string }
  heading: string
  headKicker: string
  homepageTeaser: string
  homepageHead: string
  socialImage: object | null
  socialTeaser: string | null
  socialHead: string | null
  source: string
  status: string
  created: string // ISO string
  lastUpdated: string // ISO string
  publicationDate: string // ISO string
  isSponsored: boolean
  cardImages: object[]
  mainImages: object[]
  mainVideo: object | null
  topics: {
    primary: object
    secondary: object[]
  }
  redirectUrl: string | null
  canonicalUrl: string | null
  canonicalTitle: string | null
  blogState: object | null
  profiles: { position: string }[]
}
export interface Article extends ListArticle {
  _self: string
  id: string
  kind: 'article' | 'redirect'
  slug: string
  byline?: { text: string }
  heading: string
  headKicker: string
  homepageTeaser: string
  homepageHead: string
  socialImage: object | null
  socialTeaser: string | null
  socialHead: string | null
  source: string
  status: string
  created: string // ISO string
  lastUpdated: string // ISO string
  publicationDate: string // ISO string
  isSponsored: boolean
  mainImages: object[]
  mainVideo: object | null
  topics: {
    primary: object
    secondary: object[]
  }
  redirectUrl: string | null
  canonicalUrl: string | null
  canonicalTitle: string | null
  blogState: object | null
  content: object[]
  relatedStories: object[]
  keywords: string[]
  hasOovvuuRecommendations: boolean
}

export interface ReadingTime {
  readingTime: {
    minutes: number
  }
}

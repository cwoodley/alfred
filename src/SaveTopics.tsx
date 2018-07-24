import * as React from 'react'

type Props = {
  topics: string[]
  selectAction: (any: any) => void
}

export class SaveTopics extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const topics = this.props.topics

    return (
      <div className="topic-section">
        <p>Tell us your topics of interest</p>
        {topics &&
          topics.map((topic, id) => {
            return (
              <button key={id} name={topic} onClick={this.props.selectAction}>
                {topic}
              </button>
            )
          })}
      </div>
    )
  }
}

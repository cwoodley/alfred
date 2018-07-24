import * as React from 'react'

type Props = {
  topics: string[]
  selectedTopics: string[] // ['news', 'sport]
  onSelected: (selectedTopics: string[]) => void
}

type State = {
  selectedTopics: string[]
}

export class SaveTopics extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedTopics: this.props.selectedTopics,
    }
  }

  clickAction(topic: string, isSelected: boolean) {
    let currentTopics = this.state.selectedTopics
    const isNotInState = currentTopics.findIndex(t => topic === t) === -1

    if (isNotInState) {
      currentTopics.push(topic)
    } else {
      currentTopics = currentTopics.filter(i => i !== topic)
    }

    this.setState({ selectedTopics: currentTopics })
    this.props.onSelected(currentTopics)
  }

  render() {
    const topics = this.props.topics

    return (
      <div className="topic-section">
        <p>Tell us your topics of interest</p>
        {topics &&
          topics.map((topic, id) => {
            const isSelected = this.state.selectedTopics.findIndex(t => topic === t) >= 0
            return (
              <button
                key={id}
                name={topic}
                className={isSelected ? 'active' : undefined}
                onClick={() => this.clickAction(topic, isSelected)}
              >
                {topic}
              </button>
            )
          })}
      </div>
    )
  }
}

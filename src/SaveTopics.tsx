import * as React from "react"
import * as store from "store"

type Props = {
  topics: string[]
}

interface IState {
  [topicName: string]: boolean
}

export class SaveTopics extends React.Component<Props,IState> {
  constructor(props: Props) {
    super(props)
  }

  handleChange = (event: any) => {
    const topic = event.target

    if (!topic.checked) {
      this.setState({
        [topic.name]: false
      })
      store.remove(topic.name)

      return
    }

    store.set(topic.name, true)

    this.setState({
      [topic.name]: true
    })

  }

  render() {

    const topics = this.props.topics

    return (
      <div>
        topics:
        <form>
        {
          topics && 
          (topics.map((topic, id) => {
            return (
              <li key={id}>
                {topic}
                <input type="checkbox" name={topic} onChange={this.handleChange} />
              </li>
            )
          }))
        }
        </form>
      </div>
    )
  }
}
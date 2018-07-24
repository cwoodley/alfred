import * as React from 'react'
import './App.css'

type Props = { onClick: any }
export const ButtonGroup = ({ onClick }: Props) => {
  return (
    <div className="select-time">
      <p>How many minutes?</p>
      <div className="button-group">
        <button onClick={() => onClick(5)} type="button">
          5
        </button>
        <button onClick={() => onClick(10)} type="button">
          10
        </button>
        <button onClick={() => onClick(15)} type="button">
          15
        </button>
      </div>
    </div>
  )
}

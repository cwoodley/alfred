import * as React from 'react'
import './App.css'

type Props = { onClick: any; values: number[] }
export const ButtonGroup = ({ onClick, values }: Props) => {
  return (
    <div className="select-time">
      <p>How many minutes?</p>
      <div className="button-group">
        {values.map(v => (
          <button onClick={() => onClick(v)} type="button">
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

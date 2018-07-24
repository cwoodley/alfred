import * as React from 'react'
import './App.css'

type Props = { onClick: any; values: number[]; selectedValue: number }

export const ButtonGroup = ({ onClick, values, selectedValue }: Props) => {
  return (
    <div className="select-time">
      <p>How many minutes?</p>
      <div className="button-group">
        {values.map(v => (
          <button className={selectedValue === v ? 'clicked' : undefined} onClick={() => onClick(v)} type="button">
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

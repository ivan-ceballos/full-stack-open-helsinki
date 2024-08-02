import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{text === 'positive' ? `${value}%` : value}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) return <p>No feedback given</p>

  const average = ((good - bad) / total).toFixed(2)
  const positive = (good / total * 100).toFixed(2)

  return (
    <table>
        <StatisticsLine text='good' value={good}/>
        <StatisticsLine text='neutral' value={neutral}/>
        <StatisticsLine text='bad' value={bad}/>
        <StatisticsLine text='all' value={total}/>
        <StatisticsLine text='average' value={average}/>
        <StatisticsLine text='positive' value={positive}/>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
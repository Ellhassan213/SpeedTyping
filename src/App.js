import React, {useEffect, useRef, useState} from "react"

const App = () => {
  const START_TIME = 5
  const COUNT_DOWN_INTERVAL = 1000
  const [textArea, setTextArea] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(START_TIME)
  const [wordCount, setWordCount] = useState("")
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const textAreaRef = useRef(null)

  const countWords = (text) => {
    const wordsArr = text.trim().split(" ")
    const count = wordsArr.filter(word => word !== "").length
    return count
  }

  const handleChange = (event) => {
    const {value} = event.target
    setTextArea(value)
  }

  const startGame = () => {
    setIsTimeRunning(true)
    setTimeRemaining(START_TIME)
    setTextArea("")
    setWordCount("")
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
  }

  const endGame = () => {
    setIsTimeRunning(false)
    setWordCount(countWords(textArea))
  }

  useEffect(() => {
    setTimeout(() => {
      if(isTimeRunning && timeRemaining > 0) {
        setTimeRemaining(prev => prev - 1)
      }
      else if(timeRemaining === 0){
        endGame()
      }
    }, COUNT_DOWN_INTERVAL)
  }, [isTimeRunning, timeRemaining])

  return (
    <div>
      <div><h1>Show me what you got</h1> <i className="ri-fire-fill"></i></div>
      <textarea
        ref = {textAreaRef}
        type="text"
        name="textArea"
        value={textArea}
        onChange={handleChange}
        disabled={!isTimeRunning}
      />
      <h2>Time Remaining: {timeRemaining} seconds</h2>
      <button disabled={isTimeRunning} onClick={startGame}>START</button>
      <h2>Word Count: {wordCount}</h2>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react';
import '../../index.css'

const Test = () => {

  const [wordsArray, setWordsArray] = useState<string[]>([])
  const [lettersArray, setLettersArray] =  useState<string[]>([])
  const selectedWordCount = 30;
  const textFileLength = wordsArray.length
  const [typeareaHovered, setTypeareaHovered] = useState(true);
  let [caretPosition, setCaretPosition] = useState(0)
  const [gotCorrect, setGotCorrect] = useState<boolean[]>([])


  //generating a initial prompt and defining function for refreshing the prompt using a button

  useEffect(() => {
    fetch('../../../words.txt')
    .then((response) => 
      response.text())
    .then((text) => {
      setWordsArray(text.split(/\s+/)); // Split words file by whitespace
    })
    .catch((error) => console.error('Error fetching the text file:', error));
  }, [])


  useEffect(() => {
    generateNewTest();
  }, [wordsArray]);

  const generateNewTest = () => {  //returns a new set of Letters
    setCaretPosition(0)
    setGotCorrect([])
  
    if (textFileLength === 0) {
      // console.log("wordsArray is empty")
      return;
    }

    const selectedWords = []

    for (let i = 0; i < selectedWordCount; i++) {
      let index = Math.floor(Math.random() * textFileLength);
      selectedWords.push(wordsArray[index])
    }

    const splitToWords = selectedWords.map(word => word.split(''))  //splits each word into a seperate array of letters
    const addSpaces = splitToWords.map(subArray => [...subArray, ' '])
    const splitToLetters = addSpaces!.flat()

    setLettersArray(splitToLetters.slice(0, splitToLetters.length - 1))
    setTypeareaHovered(true)
  }

  const keyPressed = (event: any) => {
    const letterToCompareTo = lettersArray[caretPosition]
    const newGotCorrect = [...gotCorrect]
    
    if (event.key === letterToCompareTo) {
      newGotCorrect[caretPosition] = true
      setCaretPosition(pos => pos + 1)
    } else if (event.key === 'Backspace') {
      if (caretPosition != 0) {
        setCaretPosition(pos => pos - 1)
        console.log("caret position:" + caretPosition)
      }
    } else {
      newGotCorrect[caretPosition] = false
      setCaretPosition(pos => pos + 1)
    }
  
    setGotCorrect(newGotCorrect)
    console.log(caretPosition)

  }

  //when user selects get user input to see how many characters they have typed, make all typed characters appear red

  return (
    <div className='bg-green-300 text-green-700 flex flex-col items-center justify-center h-[75vh] space-y-4'>
        <div className='w-1/2 pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          onFocus={() => setTypeareaHovered(true)} 
          onBlur={() => setTypeareaHovered(false)}
          onKeyDown={keyPressed}
        >
          {lettersArray.map((letter, index) => (
            <div key={index} className={`relative ${gotCorrect[index] ? 'text-green-700': 'text-red-600'}`}>
              {letter === " " ? (
                <div key={index}>&nbsp;</div>
              ) : (
                letter
              )}
              {index === caretPosition && typeareaHovered && (
                <div className="absolute left-0 w-1 h-7 bg-black top-2 blink"></div>
              )}
            </div>
          ))}
        </div>
        <button onClick = {generateNewTest} className='border-6'>refresh the test</button>
    </div> 
  )
}

export default Test;
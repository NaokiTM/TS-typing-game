import { useState, useEffect } from 'react';
import '../../index.css'

const Test = () => {

  const [wordsArray, setWordsArray] = useState<string[]>([])
  const [lettersArray, setLettersArray] =  useState<string[]>([])
  const selectedWordCount = 30;
  const textFileLength = wordsArray.length
  const [typeareaHovered, setTypeareaHovered] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0)

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
  
    if (textFileLength === 0) {
      // console.log("wordsArray is empty")
      return;
    }

    const selectedWords = []

    for (let i = 0; i < selectedWordCount; i++) {
      let index = Math.floor(Math.random() * textFileLength);
      selectedWords.push(wordsArray[index])
    }

    const splitToLetters = selectedWords.map(word => word.split(''))  //splits each word into a seperate array of letters

    for (let i = 0; i < selectedWordCount - 1; i++) {
      splitToLetters[i].push("_")
    }

    setLettersArray(splitToLetters.flat())  //converts nested array of words as letters into a single array of letters
  }

  const startTest = () => {


  }

  //when user selects get user input to see how many characters they have typed, make all typed characters appear red

  return (
    <div className='bg-green-300 text-green-700 flex flex-col items-center justify-center h-[75vh] space-y-4'>
        <div className='w-1/2 pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          onFocus={() => setTypeareaHovered(true)} 
          onBlur={() => setTypeareaHovered(false)}
          onKeyDown={startTest}
        >
          {lettersArray.map((letter, index) => (
            <div key={index} className="">
              {letter}
              {index === caretPosition && typeareaHovered &&(
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
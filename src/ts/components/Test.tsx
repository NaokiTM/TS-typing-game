import { useState, useEffect, useRef } from 'react';
import fetchWords from '../hooks/fetchWords';
import useGenerateNewTest from '../hooks/newTest';
import '../../index.css'

const Test = () => {
  const wordsArray = fetchWords();
  const selectedWordCount = 30;
  const [typeareaHovered, setTypeareaHovered] = useState(true);
  const typeAreaRef = useRef<HTMLDivElement>(null); 

  const { lettersArray, caretPosition, gotCorrect, generateNewTest, keyPressed } = useGenerateNewTest(wordsArray, selectedWordCount);

  //generating a initial prompt and defining function for refreshing the prompt using a button

  useEffect(() => {
    if (typeAreaRef.current) {
      typeAreaRef.current.focus();  // focus when component mounts
    }
  }, [lettersArray]);  //only after lettersArray has been set, meaning the blank words are already generated

  //when user selects get user input to see how many characters they have typed, make all typed characters appear red

  return (
    <div className='bg-green-300 text-green-700 flex flex-col items-center justify-center h-[75vh] space-y-4'>
        <div className='w-1/2 pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          ref={typeAreaRef}  // Attach ref to typing area
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
import { useState, useEffect, useRef } from 'react';
import fetchWords from '../hooks/fetchWords';
import handleTest from '../hooks/handleTest';
import '../../index.css'

const Test = () => {
  const wordsArray = fetchWords();
  const selectedWordCount = 30;
  const [typeareaHovered, setTypeareaHovered] = useState(true);
  const typeAreaRef = useRef<HTMLDivElement>(null); 

  //object destructuring returned from newTest hook
  const { lettersArray, caretPosition, letterStatus, generateNewTest, keyPressed } = handleTest(wordsArray, selectedWordCount);

  //focus typing area when component mounts
  useEffect(() => {
    if (typeAreaRef.current) {
      typeAreaRef.current.focus();
    }
  }, [lettersArray]);

  return (
    <div className='bg-green-300 text-stone-900 flex flex-col items-center justify-center h-[75vh] space-y-4'>
        <div className='w-1/2 pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          ref={typeAreaRef}  // Attach ref to typing area
          onFocus={() => setTypeareaHovered(true)} 
          onBlur={() => setTypeareaHovered(false)}
          onKeyDown={keyPressed}
        >
          {lettersArray.map((letter, index) => (  //maps letters/words, caret and whitespace into the typing area
            <div key={index} className={`relative ${
            letterStatus[index] === 'neutral' ? 'text-stone-900' :
            letterStatus[index] === 'correct' ? 'text-green-500' :
            letterStatus[index] === 'incorrect' ? 'text-red-600' :
            ''
          }`}>
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
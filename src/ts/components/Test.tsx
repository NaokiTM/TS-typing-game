import { useState, useEffect, useRef } from 'react';
import { BiRefresh } from "react-icons/bi";
import fetchWords from '../hooks/fetchWords';
import handleTest from '../hooks/handleTest';

import '../../index.css'

const Test: React.FC = () => {
  const wordsArray = fetchWords();
  const selectedWordCount = 30;
  const [typeareaHovered, setTypeareaHovered] = useState(true);
  const typeAreaRef = useRef<HTMLDivElement>(null); 

  //object destructuring returned from newTest hook
  const { lettersArray, caretPosition, letterStatus, generateNewTest, keyPressed, score, wpm} = handleTest(wordsArray, selectedWordCount);

  //focus typing area when component mounts
  useEffect(() => {
    if (typeAreaRef.current) {
      typeAreaRef.current.focus();
    }
  }, [lettersArray]);

  return (
    <div className='bg-neutral-800 text-neutral-500 flex flex-col items-center justify-center h-[75vh] space-y-4'>
        <div className='w-1/2 pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          ref={typeAreaRef}  // Attach ref to typing area
          onFocus={() => setTypeareaHovered(true)} 
          onBlur={() => setTypeareaHovered(false)}
          onKeyDown={keyPressed}
        >
          {lettersArray.map((letter, index) => (  //maps letters/words, caret and whitespace into the typing area
            <div key={index} className={`relative ${
            letterStatus[index] === 'neutral' ? 'text-neutral-500' :
            letterStatus[index] === 'correct' ? 'text-white' :
            letterStatus[index] === 'incorrect' ? 'text-red-600' :
            ''
          }`}>
              {letter === " " ? (
                <div key={index}>&nbsp;</div>
              ) : (
                letter
              )}
              {index === caretPosition && typeareaHovered && (
                <div className="absolute left-0 w-1 h-7 bg-indigo-600 top-2 blink"></div>
              )}
            </div>
          ))}
        </div>
        <button onClick = {generateNewTest} className='border-6 text-4xl'><BiRefresh /></button>
        <div>{score}</div>
        <div>{wpm}</div>
    </div> 
  )
}

export default Test;
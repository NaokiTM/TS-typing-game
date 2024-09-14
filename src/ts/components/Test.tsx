import { useState, useEffect, useRef } from 'react';
import { BiRefresh } from "react-icons/bi";
import useChangeTheme from '../hooks/useChangeTheme';
import fetchWords from '../hooks/fetchWords';
import handleTest from '../hooks/handleTest';

import '../../index.css'

const Test: React.FC = () => {
  const { theme } = useChangeTheme()

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
    <div className={`${theme.secondary} ${theme.neutral} flex flex-col items-center justify-center h-[75vh] space-y-4`}>
        <div className='w-[90%] pb-8 relative flex flex-row flex-wrap' 
          tabIndex={0}
          ref={typeAreaRef}  // Attach ref to typing area
          onFocus={() => setTypeareaHovered(true)} 
          onBlur={() => setTypeareaHovered(false)}
          onKeyDown={keyPressed}
        >
          {lettersArray.map((letter, index) => (  //maps letters/words, caret and whitespace into the typing area
            <div key={index} className={`relative ${
            letterStatus[index] === 'neutral' ? `${theme.neutral}` :
            letterStatus[index] === 'correct' ? `${theme.correct}` :
            letterStatus[index] === 'incorrect' ? `${theme.incorrect}` :
            ''
          }`}>
              {letter === " " ? (
                <div key={index}>&nbsp;</div>
              ) : (
                letter
              )}
              {index === caretPosition && typeareaHovered && (
                <div className={`absolute left-0 w-[3px] h-9 rounded-xl ${theme.primary} top-2 blink`}></div>
              )}
            </div>
          ))}
        </div>
        <button onClick = {generateNewTest} id = "refreshButton" className='border-6 text-4xl'><BiRefresh /></button>
        <div className='text-sm'>Tab + enter to refresh test</div>
        <div>{score}</div>
        <div>{wpm}</div>
    </div> 
  )
}

export default Test;
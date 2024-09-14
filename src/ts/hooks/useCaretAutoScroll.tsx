import { useEffect, useRef } from 'react';

const useCaretAutoScroll = (caretPosition: number, lettersArray: string) => {
    
    //attach onto the typearea and caret elements 
    const typeAreaRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = typeAreaRef.current;
        const caret = caretRef.current;
    
        if (container && caret) {
          const containerRect = container.getBoundingClientRect();
          const caretRect = caret.getBoundingClientRect();
    
          if (caretRect.bottom > containerRect.bottom) {
            container.scrollTop += (caretRect.bottom - containerRect.bottom); 
          } else if (caretRect.top < containerRect.top) {
            container.scrollTop -= (containerRect.top - caretRect.top); 
          }
        }
      }, [caretPosition, lettersArray]); //update depending on caret position according to the letters array
    
}

export default useCaretAutoScroll
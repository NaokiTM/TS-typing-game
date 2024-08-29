import { useState, useEffect } from 'react';

const useGenerateNewTest = (wordsArray: string[], selectedWordCount: number) => {
    const [lettersArray, setLettersArray] = useState<string[]>([]);
    const [caretPosition, setCaretPosition] = useState(0);
    const [gotCorrect, setGotCorrect] = useState<boolean[]>([]);

    const textFileLength = wordsArray.length;

    useEffect(() => {
        if (textFileLength > 0) {
            generateNewTest();
        }
    }, [textFileLength]);

    const generateNewTest = () => {
        setCaretPosition(0);
        setGotCorrect([]);

        if (textFileLength === 0) return;

        const selectedWords = [];
        for (let i = 0; i < selectedWordCount; i++) {
        let index = Math.floor(Math.random() * textFileLength);
        selectedWords.push(wordsArray[index]);
        }

        const splitToWords = selectedWords.map(word => word.split(''));
        const addSpaces = splitToWords.map(subArray => [...subArray, ' ']);
        const splitToLetters = addSpaces.flat();

        setLettersArray(splitToLetters.slice(0, splitToLetters.length - 1));
    }

    const keyPressed = (event: any) => {
        const letterToCompareTo = lettersArray[caretPosition];
        const newGotCorrect = [...gotCorrect];
    
        if (event.key === letterToCompareTo) {
          newGotCorrect[caretPosition] = true;
          setCaretPosition(pos => pos + 1);
        } else if (event.key === 'Backspace') {
          if (caretPosition !== 0) {
            setCaretPosition(pos => pos - 1);
          }
        } else {
          newGotCorrect[caretPosition] = false;
          setCaretPosition(pos => pos + 1);
        }
    
        setGotCorrect(newGotCorrect);
    };

    return {
        lettersArray,
        caretPosition,
        gotCorrect,
        generateNewTest,
        keyPressed,
    };
}

export default useGenerateNewTest
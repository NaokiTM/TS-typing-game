import { useState, useEffect } from 'react';

const useGenerateNewTest = (wordsArray: string[], selectedWordCount: number) => {
    const [lettersArray, setLettersArray] = useState<string[]>([]);
    const [caretPosition, setCaretPosition] = useState(0);
    const [gotCorrect, setGotCorrect] = useState<boolean[]>([]);
    const textFileLength = wordsArray.length;

    //generateNewTest doesn't run if no words available
    useEffect(() => {
        if (textFileLength > 0) {
            generateNewTest();
        }
    }, [textFileLength]);

    const generateNewTest = () => {
        setCaretPosition(0);
        setGotCorrect([]);

        //counts and selects the number of words needed
        const selectedWords = [];
        for (let i = 0; i < selectedWordCount; i++) {
            let index = Math.floor(Math.random() * textFileLength);
            selectedWords.push(wordsArray[index]);
        }

        //formats selectedWords into a flat array of letters and whitespace
        const splitToWords = selectedWords.map(word => word.split(''));
        const addSpaces = splitToWords.map(subArray => [...subArray, ' ']);
        const splitToLetters = addSpaces.flat();
        setLettersArray(splitToLetters.slice(0, splitToLetters.length - 1));
    }

    const keyPressed = (event: any) => {
        const letterToCompareTo = lettersArray[caretPosition];

        //copy of gotCorrect used to modify the number of correct inputs
        const newGotCorrect = [...gotCorrect];
    
        if (event.key === letterToCompareTo) {
            //input matches correct letter, updates caret position
            newGotCorrect[caretPosition] = true;
            setCaretPosition(pos => pos + 1);
        } else if (event.key === 'Backspace') {
            //caret position decremented if not already at the start
            // (further logic needed to reset result of the letter being typed)
            if (caretPosition !== 0) {
                setCaretPosition(pos => pos - 1);
            }
        } else {
            //input doesn't match correct letter; input counted as wrong, caret position incremented
            newGotCorrect[caretPosition] = false;
            setCaretPosition(pos => pos + 1);
        }

        //merges the copy array contents into the original
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
import { useState, useEffect } from 'react';
import Timer from './Timer';

const handleTest = (wordsArray: string[], selectedWordCount: number) => {
    const { seconds, resetTimer ,startTimer, stopTimer} = Timer()

    const [firstKeyDown, setFirstKeyDown] = useState<boolean>();
    const [lettersArray, setLettersArray] = useState<string[]>([]);
    const [caretPosition, setCaretPosition] = useState(0);
    const [letterStatus, setLetterStatus] = useState<string[]>([]);
    const [score, setScore] = useState<string>()
    const [wpm, setWpm] = useState<string>()
    const textFileLength = wordsArray.length;

    //generateNewTest doesn't run if no words available
    useEffect(() => {
        if (textFileLength > 0) {
            generateNewTest();
        }
    }, [textFileLength]);

    const generateNewTest = () => {
        setCaretPosition(0);
        setLetterStatus([]);
        setScore('');
        setWpm('')
        setFirstKeyDown(false);

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
        const newLetterStatus = [...letterStatus]; // copy of letterStatus used to change the total number of correct inputs

        //if keys haven't been pressed yet, then when the first key goes down the timer starts 
        if (!firstKeyDown) {
            setFirstKeyDown(true)
            startTimer()
        }

        //end of test
        if (caretPosition == lettersArray.length) {
            stopTimer()
            calculateScore()
            resetTimer()
        }
    
        if (event.key === letterToCompareTo) {
            //input matches correct letter, updates caret position
            newLetterStatus[caretPosition] = 'correct';
            setCaretPosition(pos => pos + 1);
        } else if (event.key === 'Backspace') {
            //caret position decremented if not already at the start
            // (further logic needed to reset result of the letter being typed)
            if (caretPosition !== 0) {
                setCaretPosition(pos => pos - 1);
                newLetterStatus[caretPosition - 1] = 'neutral'
            }
        } else {
            //input doesn't match correct letter; input counted as wrong, caret position incremented
            newLetterStatus[caretPosition] = 'incorrect';
            setCaretPosition(pos => pos + 1);
        }

        //merges the copy array contents into the original
        setLetterStatus(newLetterStatus); 
    };

    const calculateScore = () => {
        // WPM
        const minutes = seconds / 60;
        setWpm(Math.round(selectedWordCount / minutes) + " WPM");

        //only counts correct letters
        const gotCorrect = letterStatus.filter(status => status === 'correct').length; 
        setScore(`Your score was ${gotCorrect} characters correct out of ${lettersArray.length}`);
    };

    return {
        lettersArray,
        caretPosition,
        letterStatus,
        generateNewTest,
        keyPressed,
        score, 
        wpm
    };
}

export default handleTest
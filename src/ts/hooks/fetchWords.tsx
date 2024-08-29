import { useState, useEffect } from 'react';

export const fetchWords = () => {
    const [wordsArray, setWordsArray] = useState<string[]>([]);

    useEffect(() => {
      fetch('../../../words.txt')
        .then((response) => response.text())
        .then((text) => {
          setWordsArray(text.split(/\s+/)); // Split words file by whitespace
        })
        .catch((error) => console.error('Error fetching the text file:', error));
    }, []);


    return wordsArray;
}

export default fetchWords
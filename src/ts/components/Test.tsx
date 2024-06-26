import { useState, useEffect } from 'react';

const Test = () => {

  const [wordsArray, setWordsArray] = useState<string[]>([])
  const [testString, setTestString] = useState<string>()
  const selectedWordCount = 20;


  useEffect(() => {
    fetch('../../../words.txt')
    .then((response) => 
      response.text())
    .then((text) => {
      setWordsArray(text.split(/\s+/)); // Split words file by whitespace
      const initialTestString = generateNewTest();
      setTestString(initialTestString);
    })
    .catch((error) => console.error('Error fetching the text file:', error));
  }, [])


  useEffect(() => {
    generateNewTest();
  }, [wordsArray]);


  const generateNewTest = () => {
  
    if (wordsArray.length === 0) {
      console.log("words array is empty")
      return;
    }

    const newSelectedWords = []

    for (let i = 0; i < selectedWordCount; i++) {
      let index = Math.floor(Math.random() * wordsArray.length);
      newSelectedWords.push(wordsArray[index])
    }

    setTestString(newSelectedWords.join(" "))
    return testString
  }
  

  return (
    <div className='bg-green-300 text-green-700 flex flex-col items-center justify-center h-[70vh] space-y-4 font-mono text-xl '>
      <div>{testString}</div>
      <button onClick = {generateNewTest} className=''>refresh the test</button>
    </div> 
  )
}

export default Test;
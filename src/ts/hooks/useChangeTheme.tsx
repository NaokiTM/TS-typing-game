import { useState } from 'react';

const useChangeTheme = () => {
  // State to hold the current theme class names
  const [theme, setTheme] = useState({
    primary: 'bg-indigo-600',      // Default value
    secondary: 'bg-neutral-800',  // Default value
    gradPrimary: 'from-indigo-600',
    gradSecondary: 'to-neutral-800',
    correct: 'text-white', // Default value
    incorrect: 'text-red-600 underline', // Default value
    neutral: 'text-neutral-500',  // Default value
    navText: 'text-white'
  });

  const changeTheme = ({ primary, secondary, gradPrimary, gradSecondary, correct, incorrect, neutral, navText }: { primary: string, secondary: string, gradPrimary: string, gradSecondary: string, correct: string, incorrect: string, neutral: string, navText: string}) => {
    setTheme({
      primary: `${primary}`,
      secondary: `${secondary}`,
      gradPrimary: `${gradPrimary}`,
      gradSecondary: `${gradSecondary}`,
      correct: `${correct}`,
      incorrect: `${incorrect}`,
      neutral: `${neutral}`,
      navText: `${navText}`
    });
  };

  return {theme, changeTheme}
}
export default useChangeTheme;
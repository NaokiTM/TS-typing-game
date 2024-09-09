import Title from './components/Title'
import Test from './components/Test'
import Options from '../ts/components/Options'
import Gradient from '../ts/components/Gradient'
import "../index.css"


function App() {
  return (
    <>
      <div className='font-mono text-2xl leading-loose'>
        <Title />
        <Gradient />
        <Test />
        <Options />
      </div>
    </>
  )
}

export default App

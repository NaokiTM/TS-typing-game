import Title from './components/Title'
import Test from './components/Test'
import Options from '../ts/components/Options'
import "../index.css"

function App() {
  return (
    <>
      <div className='font-mono text-2xl leading-loose'>
        <Title />
        <Test />
        <Options />
      </div>
    </>
  )
}

export default App

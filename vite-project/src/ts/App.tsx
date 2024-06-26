import Title from './components/Title'
import Test from './components/Test'
import Options from '../ts/components/Options'
import "../index.css"

function App() {
  return (
    <>
      <div className='bg-black'>
        <Test />
        <Title />
        <Options />
      </div>
    </>
  )
}

export default App

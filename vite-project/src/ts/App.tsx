import styles from '../index.module.css'
import Test from './components/Test'
import Options from '../ts/components/Options'

function App() {

  return (
    <>
      <div className = {styles.test}>
        <Test />
      </div>

      <div  className = {styles.options}>
        <Options />
      </div>
    </>
  )
}

export default App

import styles from './app.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        <Button>
          Hello World!
        </Button>
        <a
          className={styles['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

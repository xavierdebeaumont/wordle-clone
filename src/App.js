import './App.css'
import Header from './components/Layout/Header';
import Board from './components/Game/Board/Board';
import Keyboard from './components/Game/Keyboard/Keyboard';
import Game from './components/Game/Game';
import GameOver from './components/Layout/GameOver';
import { initialBoard } from './Utils'
import { useEffect, useState, createContext } from 'react';
import { fetchWords } from './Utils';

export const AppContext = createContext();

function App() {
  const [solution, setSolution] = useState('');
  const [wordSet, setWordSet] = useState(new Set());
  const [board, setBoard] = useState(initialBoard);
  const [currInput, setCurrInput] = useState({ attempt: 0, letterPos: 0 })
  const [lettersInfo, setLettersInfo] = useState({});
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [showGameOverScreen, setShowGameOverScreen] = useState(true);
  console.log(solution)

  useEffect(() => {
    fetchWords().then((words) => {
      setSolution(words.solution);
      setWordSet(words.wordSet);
    })
  }, [])

  const onSelectLetter = (keyValue) => {
    if (currInput.letterPos > 4) {
      return;
    }
    const newBoard = [...board]
    newBoard[currInput.attempt][currInput.letterPos] = keyValue;
    setBoard(newBoard)
    setCurrInput((prevInput) => {
      return { ...prevInput, letterPos: prevInput.letterPos + 1 }
    })
  }

  const onDelete = () => {
    if (board[currInput.attempt][currInput.letterPos - 1] !== "") {
      const newBoard = [...board]
      newBoard[currInput.attempt][currInput.letterPos - 1] = ""
      setBoard(newBoard)
      if (currInput.letterPos !== 0) {
        setCurrInput((prevInput) => {
          return { ...prevInput, letterPos: prevInput.letterPos - 1 }
        })
      }
    }
  }

  const onEnter = () => {
    const currWord = board[currInput.attempt].join("").toLowerCase();
    if (currInput.letterPos !== 5) return;
    if (wordSet.has(currWord)) {
      setCurrInput((prevInput) => {
        return { ...prevInput, attempt: prevInput.attempt + 1, letterPos: 0 }
      })
      if (currWord === solution) {
        setGameOver({ gameOver: true, guessedWord: true })
        return;
      }
    }
    if (currInput.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }

  const closeModalHandler = () => {
    setShowGameOverScreen(false);
  }

  return (
    <div className="App">
      <Header />
      {/* {solution} */}
      <Game>
        <AppContext.Provider value={{ board, setBoard, currInput, setCurrInput, onSelectLetter, onEnter, onDelete, solution, lettersInfo, setLettersInfo, gameOver, setGameOver }}>
          <Board board={board} />
          {gameOver.gameOver && showGameOverScreen && <GameOver onConfirm={closeModalHandler}/>}
          <Keyboard />
        </AppContext.Provider>
      </Game>  
    </div>
  );
}

export default App;

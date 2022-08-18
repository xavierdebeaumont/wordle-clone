import "./App.css";
import Header from "./components/Layout/Header";
import Board from "./components/Game/Board/Board";
import Keyboard from "./components/Game/Keyboard/Keyboard";
import Game from "./components/Game/Game";
import GameOver from "./components/Layout/GameOver";
import { initialBoard } from "./Word";
import { useEffect, useState, createContext, useMemo } from "react";
import { fetchWords, fetchAllowedWords } from "./Word";
import { generatePatternDictionary, bestMoves } from "./WordSuggestion";

export const AppContext = createContext();

function App() {
  const [solution, setSolution] = useState("");
  const [wordSet, setWordSet] = useState(new Set());
  const [allowedWordSet, setAllowedWordSet] = useState(new Set());
  const [board, setBoard] = useState(initialBoard);
  const [currInput, setCurrInput] = useState({ attempt: 0, letterPos: 0 });
  const [lettersInfo, setLettersInfo] = useState({});
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [showGameOverScreen, setShowGameOverScreen] = useState(true);
  const [replay, setReplay] = useState(0);
  console.log(solution);

  // const {patternDictionary, wordInformation} = useMemo(() => {
  //   return generatePatternDictionary([...wordSet]);
  // }, [wordSet]);

  // const {bestWord, bestInfo} = useMemo(() => {
  //   return bestMoves(wordInformation);
  // }, [wordInformation]);

  useEffect(() => {
    fetchWords().then((words) => {
      setSolution(words.solution);
      setWordSet(words.wordSet);
    });
  }, [replay]);

  useEffect(() => {
    fetchAllowedWords().then((words) => {
      setAllowedWordSet(words);
    });
  }, []);

  const onSelectLetter = (keyValue) => {
    if (currInput.letterPos > 4) {
      return;
    }
    const newBoard = [...board];
    newBoard[currInput.attempt][currInput.letterPos] = keyValue;
    setBoard(newBoard);
    setCurrInput((prevInput) => {
      return { ...prevInput, letterPos: prevInput.letterPos + 1 };
    });
  };

  const onDelete = () => {
    if (board[currInput.attempt][currInput.letterPos - 1] !== "") {
      const newBoard = [...board];
      newBoard[currInput.attempt][currInput.letterPos - 1] = "";
      setBoard(newBoard);
      if (currInput.letterPos !== 0) {
        setCurrInput((prevInput) => {
          return { ...prevInput, letterPos: prevInput.letterPos - 1 };
        });
      }
    }
  };

  const onEnter = () => {
    const currWord = board[currInput.attempt].join("").toLowerCase();
    if (currInput.letterPos !== 5) return;
    if (allowedWordSet.has(currWord)) {
      setCurrInput((prevInput) => {
        return { ...prevInput, attempt: prevInput.attempt + 1, letterPos: 0 };
      });
      if (currWord === solution) {
        setGameOver({ gameOver: true, guessedWord: true });
        return;
      }
    }
    if (currInput.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  const closeModalHandler = () => {
    setShowGameOverScreen(false);
  };

  const replayHandler = () => {
    setBoard(new Array(6).fill("").map(() => Array(5).fill("")));
    setCurrInput({ attempt: 0, letterPos: 0 });
    setLettersInfo({});
    setGameOver({ gameOver: false, guessedWord: false });
    setShowGameOverScreen(true);
    setReplay((prevNum) => prevNum + 1);
  };

  return (
    <div className="App">
      <Header />
      <Game>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currInput,
            setCurrInput,
            onSelectLetter,
            onEnter,
            onDelete,
            solution,
            lettersInfo,
            setLettersInfo,
            gameOver,
            setGameOver,
            replay,
          }}
        >
          <Board board={board} />
          {gameOver.gameOver && showGameOverScreen && (
            <GameOver onConfirm={closeModalHandler} onReplay={replayHandler} />
          )}
          <Keyboard />
        </AppContext.Provider>
      </Game>
    </div>
  );
}

export default App;

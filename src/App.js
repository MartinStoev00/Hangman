import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import Popup from './components/Popup'
import Notifications from './components/Notifications'
import {showNotifications} from './helpers/Helpers'
import Spinner from './components/Spinner'
import axios from 'axios'

let words;
let selectedWord = "";

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)

  function playAgain() {
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])

    const random = Math.floor(Math.random() * words.length)
    selectedWord = words[random]
  }

  useEffect(() => {
    axios.get("https://random-word-api.herokuapp.com/word?number=10").then(res => {
      words = [...res.data]
      selectedWord = words[Math.floor(Math.random() * words.length)];
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = event => {
      const {key, keyCode} = event;
      if (playable && keyCode >= 65 && keyCode <= 90) { 
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter])
          } else {
            showNotifications(setShow)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters  , letter])
          } else {
            showNotifications(setShow)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [correctLetters, wrongLetters, playable])

  return (
    <>
      <Header /> 
      {loading && <Spinner />}
      {!loading && 
      <>
        <div className="game-container">
          <Figure
            wrongLetters={wrongLetters}
          />
          <WrongLetters 
            wrongLetters={wrongLetters} 
          />
          <Word 
            selectedWord={selectedWord} 
            correctLetters={correctLetters}
          />
        </div>
        <Popup 
          wrongLetters={wrongLetters} 
          correctLetters={correctLetters} 
          selectedWord={selectedWord} 
          setPlayable={setPlayable} 
          playAgain={playAgain}
        />
        <Notifications 
          showNotifications={show}
        />
      </>
      }
    </>
  );
}

export default App;

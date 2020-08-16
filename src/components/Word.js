import React from 'react';
import Syn from './Syn'

const Word = ({ selectedWord, correctLetters }) => {

  return (
    <div className="word">
      {selectedWord.split('').map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ''}
          </span>
        )
      })}
      <Syn selectedWord={selectedWord} />
    </div>
  )
}

export default Word
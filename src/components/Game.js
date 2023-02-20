import { useRef, useState } from 'react'
import './Game.css'

const Game = ({
  verifyLetter, 
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score}) => {
  
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
      e.preventDefault()
      //enviando a letra selecionada no formulario para verificar se a letra estar certa
      verifyLetter(letter)

      //zerando o estado da letra
      setLetter("")

      letterInputRef.current.focus()
  }
  return (
    <div className='game'>
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivimhe a palavra:</h1>
      <h3 className='tip'>
          Dica sobre a palavra:
          <span> {pickedCategory} </span>
      </h3>
      <p>Você ainda tem {guesses} tentativas.</p>
      <div className='wordContainer'>
         {letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
               <span key={i} className='letter'>
                  {letter}
              </span>
            ) : (
              <span key={i} className='blankSquare'></span>
            )
         ))}
         
          
      </div>
      <div className='letterContainer'>
            <p>Tente advinhar uma letra da palavra</p>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name='letter' 
                maxLength='1' 
                required
                onChange={(e) => setLetter(e.target.value)}
                value={letter} 
                ref={letterInputRef}
                />
              <button>jogar!</button>
            </form>
          </div>
          <div className='wrongLetterContainer'>
              <p>Letras já utilizadas:</p>
             {wrongLetters.map((letter, i) => (
               <span key={i}>{letter}, </span>
             ))}
          </div>
    </div>
  )
}

export default Game
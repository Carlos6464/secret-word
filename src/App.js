//css
import './App.css';
//react
import { useState, useEffect, useCallback } from 'react';

//dados
import { wordsList } from './data/words'

//componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

 const stages = [
    {id:1, name:"start"},
    {id:2, name:"game"},
    {id:3, name:"end"}
  ];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  //state da palavra selecionada
  const [pickedWord, setPickedWord] = useState("")
  //state da categoria
  const [pickedCategory, setPickedCategory] = useState("")
  // as letras das palavars
  const [letters, setLetters] = useState([])

  //letras advinhadas
  const [guessedLetters, setGuessedLetters] = useState([])
  //letras erradas
  const [wrongLetters, setWrongletters] = useState([])
  //tentativas
  const [guesses, setGuesses] = useState(guessesQty)
  //pontuação
  const [score, setScore] = useState(0)

  const pickWordAndcategory = useCallback(() => {
    const categories = Object.keys(words)
    //retonar uma categoria eleatoria do objeto utilizando Object.Keys
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    //retornar uma palavra correspondente aquela categoria selecionada acima
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {category, word}
  },[words])

  const startGame = useCallback(() => {
    //resetar tudo
    clearLettersStates()
    /*função que tem como obejetivo trazer uma categoria aleatoria e as palavras que pertencem aquela categoria*/
    const { category, word } = pickWordAndcategory()

    /**
     * Função para pegar a palavra e separar como um array de letras
     */
    let wordLetters = word.split("")
    //colocando todas as palavras em minusculo
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //alterando os estados dos states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndcategory])
  
  const verifyLetter = (letter) => {
      //normalizando as letras que chegam  na função
      const normalizeLetter = letter.toLowerCase();

      //verificando se as letras ja foram selecionadas para evitar que o jogador não perca tentativas atoa
      if(guessedLetters.includes(normalizeLetter) || wrongLetters.includes(normalizeLetter)){
        return;
      }

      //verificando se as letras selecionadas estão certas ou erradas e caso esteja certa adicionando e letra au array da palavra
      if(letters.includes(normalizeLetter)){
          setGuessedLetters((actualGuessedLetters) => [
            ...actualGuessedLetters,
            normalizeLetter
          ])
      }else{
          setWrongletters((actualWrongLetters) => [
            ...actualWrongLetters,
            normalizeLetter
          ])
          //diminuindo as tentativas do usuario com o erro da letra
          setGuesses((actualGuesses) => actualGuesses - 1)
      }
  }
  // função para resetar os estados dos letras certas e erradas
  const clearLettersStates = () => {
    
    setGuessedLetters([])
    setWrongletters([])
  }

 
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

   useEffect(() => {
    if(guesses <= 0){
      clearLettersStates()
      setGameStage(stages[2].name)
    }
  },[guesses])


   // condição de vitoria do jogo
  useEffect(() => {
    //eliminando as letras iguais
    const uniqueLetters = [...new Set(letters)];

   

    // verificar se a palavra estar certa
    if (guessedLetters.length === uniqueLetters.length) {
      // adicionando pontos ao acerto
      setScore((actualScore) => (actualScore += 100));
     
      // resetar o jogo apos o acerto de uma palavra
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/> }
      {gameStage === "game" && <Game verifyLetter={verifyLetter} 
      pickedWord = {pickedWord}
      pickedCategory = {pickedCategory}
      letters = {letters}
      guessedLetters = {guessedLetters}
      wrongLetters = {wrongLetters}
      guesses = {guesses}
      score = {score}/> }
      {gameStage === "end" && <GameOver retry={retry} score={score}/> }
    </div>
  );
}

export default App;

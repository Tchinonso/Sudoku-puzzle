import axios from 'axios'
import react, { useEffect, useState } from 'react'




function App() {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

function getRandomWords(){


  const options = {
    method: 'GET',
    url: 'http://localhost:8000/results',
    params: {
      level: chosenLevel,
      area: 'sat'
    },
  };
  
     axios.request(options)
            .then(function(response){
                console.log(response.data);
                setWords(response.data)
            }).catch(function(error){
                console.error(error);
                console.log(error.response.status);
            })
}



  //this is now handled in the backend
//   const options = {
//     method: 'GET',
//     url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
//     params: {
//       level: '3',
//       area: 'sat'
//     },
//     headers: {
//       'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//       'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
//     }
//   };
  
//      axios.request(options)
//             .then(function(response){
//                 console.log(response.data);
//                 setWords(response.data)
//             }).catch(function(error){
//                 console.error(error);
//                 console.log(error.response.status);
//             })
// }

// quizlist is from the api array
console.log(words && words.quizlist);

useEffect(()=>{
  if(chosenLevel) getRandomWords()
},[chosenLevel])

function checkAnser(option, optionIndex, correctAnswer){
  console.log(optionIndex, correctAnswer)
  if(optionIndex == correctAnswer){
    setCorrectAnswers([...correctAnswers, option])
    setScore((score) => score + 1)
  } else {
    setScore((score) => score - 1)
  }
  setClicked([...clicked, option])
}

  return (
    <div className="App">

     {!chosenLevel && <div className='level-selector'>
      <h1>Word association app</h1>
      <p>select your level to start</p>
     <select name='levels' id='levels' value={chosenLevel} onChange={(e) => setChosenLevel(e.target.value)}>
     <option value={null}>
        select level
       </option>
       <option value='1'>
        Level 1
       </option>
       <option value='2'>
        Level 2
       </option>
       <option value='3'>
        Level 3
       </option>
      </select>
     </div>}

     {chosenLevel && words && <div className='question-area'>
      <h2>Welcome to level: {chosenLevel}</h2>
      <h3>Your score is : {score}</h3>

      {words.quizlist.map((eachquiz, eachquizIndex) => (
      <div key={eachquizIndex} className='question-box'>
        {eachquiz.quiz.map((tip, _i) =>(
          <p key={_i}>{tip}</p>
        ))}

        <div className='question-btns'>
          {eachquiz.option.map((option, optionIndex) => {
            <div key={optionIndex} className='question-btn'>
              <button disabled={clicked.includes(option)} onClick={() => checkAnser(option, optionIndex + 1, eachquiz.correct)}>{option}</button>
              {correctAnswers.includes(option) && <p>Correct</p>}
            </div>
          })}
        </div>


       <p>{eachquiz.correct}</p>
      </div>
      )
      )}

      <button onClick={() => setChosenLevel(null)}>Go Back</button>

     </div>}

    </div>
  );
}

export default App;

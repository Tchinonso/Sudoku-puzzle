const puzzleBoard = document.getElementById('puzzle')
const btnSolve = document.getElementById('solve-button')
const solutionShow = document.getElementById('solution')
const squares = 81
let submission = []


for(let i = 0;i < squares;i++){
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type','number')
    inputElement.setAttribute('min',1)
    inputElement.setAttribute('max',9)

    if(
        ((i % 9 == 0 || 1 % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || 1 % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || 1 % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || 1 % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || 1 % 9 == 7 || i % 9 == 8) && i > 53)
    ){
        inputElement.classList.add('odd-section')
    }





    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input =>{
        if(input.value){
            submission.push(input.value)
        }else{
            submission.push('.')
        }
    })
    console.log(submission);
}

// btnSolve.addEventListener('click', joinValues)
// btnSolve.addEventListener('click', solve)

// const populateValues = (answer) => {
//     const inputs = document.querySelectorAll('input')
//     if(answer === 81)
//     inputs.forEach((input, index) => {
//         input.value = solution[index]
//     })
// }

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if(isSolvable && solution){
        inputs.forEach((input, index) => {
            input.value = solution[index]
        })
        solutionShow.innerHTML = 'Answer'
    }else{
        solutionShow.innerHTML = 'not solvable'
    }
}


const solve = () => {
    // import axios from 'axios';

    joinValues()
    const data = { numbers: submission.join('')}
    console.log('data', data);

    //bringing the backend into the frontend

    fetch('http://localhost:8080/solve', {
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        populateValues(data.solvable, data.solution)
        submission = []
    })
    .catch((error) => {
        console.error('Error:', error)
    })


    //the data is now passed through the backend
    // const options = {
    //     method: 'POST',
    //     url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
    //     headers: {
    //       'content-type': 'application/json',
    //       'X-RapidAPI-Key': process.env.rapid_api_key,
    //       'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
    //     },
    //     data: {
    //       input: data
    //     }
    //   };
      
    //    axios.request(options)
    //       .then(function(response){
    //           console.log(response.data);
    //           populateValues(response.data.solvable, response.data.solution)
    //       }).catch(function(error){
    //           console.error(error);
    //           console.log(error.response.status);
    //       })

    }

    btnSolve.addEventListener('click', solve)

    // axios.request(options)
    // .then(function(response){
    //     console.log(response.data);
    // }).catch(function(error){
    //     console.error(error);
    //     console.log(error.response.status);
    // })
    


    // try {
    //     const response = axios.request(options);
    //     console.log(response.data);
    // } catch (error) {
    //     console.error(error);
    // }


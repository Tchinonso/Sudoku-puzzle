const colors = ['red', 'blue', 'black']
const arrayObj = [
    {
        name: 'John Mark',
        address: 'Lagos',
        email: 'johnmark@gmail.com'
    },
    {
        name: 'John Doe',
        address: 'Abuja',
        email: 'johndoe@gmail.com'
    },
    {
        name: 'David Mark',
        address: 'Benue',
        email: 'davidmark@gmail.com'
    },
    {
        name: 'James Joseph',
        address: 'Uyo',
        email: 'jamesjoe@gmail.com'
    },
    {
        name: 'John F Kennedy',
        address: 'Calaber',
        email: 'johnfken@gmail.com'
    },
    {
        name: 'Arthur Marshall',
        address: 'Jos',
        email: 'arthurmarshall@gmail.com'
    },
]


// console.log(colors);
// console.log(colors[2]);
const bodyEl = document.getElementById('bodyEl')

const newColors = colors.map((color,i) => {
    // console.log(color);
    // const addEl = document.createElement(<h1>{color}</h1>)
    // addEl.setAttribute('type','strings')

    // bodyEl.appendChild(addEl)
    // bodyEl.classList.add('<h1>color</h1>')
})

const newArrayObj = arrayObj.map(object => {
    console.log(object.name);
    console.log(object.address);
    console.log(object.email);
})

const spreadArray = [...colors, ...arrayObj]
console.log(spreadArray);
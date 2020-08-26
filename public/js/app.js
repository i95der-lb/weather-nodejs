console.log('Client-side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'ERROR!'
                messageTwo.textContent = data.error
            }
            else {
                messageOne.textContent = 'The weather forecast for: ' + data.location
                messageTwo.innerHTML = 'Description: ' + data.description + '<br />Temperature: ' + data.temperature + '<br />Feels like: ' + data.feelslike 
            }
        })
    })
})
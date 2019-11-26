const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pMessage1 = document.querySelector('#pMessage1')
const pMessage2 = document.querySelector('#pMessage2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    pMessage1.textContent = "Loading..."
    pMessage2.textContent = ''
    fetch('/weather?adress='+search.value).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                pMessage1.textContent = data.error
                console.log(data.error)
            } else {
                pMessage1.textContent = data.location 
                pMessage2.textContent =  data.forecast
                console.log(data)
            }

        })

    })

  
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()
const port = process.env.PORT || 3000

// Define paths for express
const viewsPath = path.join(__dirname,'../templates/views')
const partilsPath = path.join(__dirname,'../templates/partials')

//set hbs para views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partilsPath)

//Set static directory server
app.use(express.static(path.join(__dirname,'../public')))

//route para a view
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather!',
        name: 'Elcio'
    })
})

//route para a view
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help!',
        name: 'Elcio'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title: 'About',
        name: 'Elcio'
    })

})

app.get('/weather',(req,res)=>{

    if(!req.query.adress)
    {
        return res.send({
            error: 'Adress not informed!'
        })
    }
    console.log(req.query)

    geocode(req.query.adress,(error,{latitude, longitude, location}={})=>{

        if(error) return res.send({error })
        
        forecast(latitude,longitude, (error, forecastData) => {
            
            if(error) return res.send({error })
            
            res.send({
                location,
                adress: req.query.adress,
                forecast: forecastData
            })
           
        })
    })

})

app.get('/products',(req,res)=>
{
    if(!req.query.search)
    {
        return res.send({
            error: 'You most prodive a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/b',(req,res)=>{

    res.send('teste!')

})

app.get('/help/*',(req,res)=>
{
    res.render('404',{
        title: '404',
        name: 'Elcio',
        errorMessage: 'Help Page! Article not Found!'
    })
})

app.get('*',(req,res)=>
{
    res.render('404',{
        title: '404',
        name: 'Elcio',
        errorMessage: 'Page not Found!'
    })

})

app.listen(port,()=>{
    console.log('Server is up port 3000')
})



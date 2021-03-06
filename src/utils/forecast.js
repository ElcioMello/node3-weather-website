const request = require('request')

const forecast = (latitude=0, longitude=0, callback)=>
{
    const url = 'https://api.darksky.net/forecast/e497efc77de7e4ff03deab566969a39e/'+latitude+','+longitude+'?units=si&lang=pt'

    request({url, json:true}, (error, {body}={})=>{

        if (error) {
            callback("Unable Connect",undefined)
        }else if(body.error)
        {
            callback(body.error,undefined)
        }
        else{
            let percPrecip = body.currently.precipProbability * 100
            callback(undefined,body.daily.data[0].summary+" A temperatura é de "+body.currently.temperature+" graus. Existe "+percPrecip+"% de chance de chover." )
        }
        
    })

}

module.exports = forecast

const request = require('request')
const geocode =(adress,callback)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoiZWxjaW9tZWxsbyIsImEiOiJjazNicHhhMnYwZm16M2VudjNwaHR4MmU5In0.TKmxvwzO4glf8kbobr0cVg&language=pt&limit=1'
    request({url, json: true}, (error,{body})=>{
    
        if(error)
        {
           callback('Não foi possivel conectar!',undefined)
        }else if(body.features.length >0 )
        {
            const local = {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,local)
        }
        else{
            callback('Localização não encontrada!',undefined)
        }
    })
}

module.exports = geocode
const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/910786923b2a248c505d63d2ec3fcc21/'+longitude+','+latitude
    
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Cannot find address',undefined)
        }
        else if(body.error){
            callback('No information available',undefined)
        }
        else {
            callback(undefined,{
                forecastData:body.daily.data[0].summary + ' There is a ' + body.currently.precipProbability + '% chance of rain.',
                temp: body.currently.temperature
            })
        }
    })
}

module.exports=forecast
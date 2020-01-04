const path=require('path')
const express=require('express')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath )

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Harjot Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Harjot Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help:'THis is ',
        name:'Harjot Singh'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
        
            forecast(latitude, longitude, (error, {forecastData,temp}) => {
                if (error)
                {
                    return res.send({
                        error:error
                    })
                }

                res.send({
                    Address:req.query.address,
                    location:location,
                    forecast:forecastData,
                    temp:temp
                })

            })
        
            
        })

    }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        message:'Help article not found',
        name:'Harjot Singh'
    })
})

app.get('/product')

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not Found',
        name:'Harjot Singh'
    })
})

app.listen(3000,()=>{
    console.log('Server Started')
})
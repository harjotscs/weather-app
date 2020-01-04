

const weatherForm=document.querySelector('#form1')
const search=document.querySelector('#search')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const units=document.querySelector('#form2')
const f=document.querySelector('#f')
const c=document.querySelector('#c')



    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const location=search.value
        messageOne.textContent='Loading...'
        messageTwo.textContent=''
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
                if (data.error)
                {
                    messageOne.textContent=data.error
                }
                else{
                    if(f.checked===false){
                        console.log(data.temp)
                        data.temp=((data.temp-32)*5)/9
                        data.temp=data.temp.toPrecision(4)
                    }
                    messageOne.textContent=data.location
                    messageTwo.textContent=data.forecast+' It is currently '+data.temp+' degress Out'
                }
            })  
        })  
        
        console.log('Testing')
        
    })

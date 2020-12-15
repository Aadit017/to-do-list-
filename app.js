const express=require('express')
const bodyParser=require('body-parser')
const { response } = require('express')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static("public"))
let items =["This is the home list "]
let workItems=["This is the work list "] 
let dc=1 // this is actually to tell as to stay on which page 
app.get('/',function(req,res){ 
    dc=0;
    let options={ 
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let date=new Date()
    let theDay=date.toLocaleDateString("en-US" ,options)
    res.render("list",{day:theDay,listItem:items})
    // res.end()
    // by writing res.end() i wasnt able to use the sendFile option 
})
app.get('/work',function(req,res){ 
    dc=2;
    res.render("list",{day:"work",listItem:workItems})
})
app.post('/',function(req,res){
item=req.body.newToDo
if(dc==0){
res.redirect('/')
items.push(item)
}else{ 
    res.redirect('/work')
    workItems.push(item)
}
})

app.listen(3000 ,() => console.log("starting the server "))
 
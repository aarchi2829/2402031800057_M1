import express from 'express'
const app= express()
app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
   res.send("<h1>Home page</h1>")
})

app.get('/about', (req, res) =>{
    var user =[
        {name:'Aarchi', age:20, city:'Ahmedabad'},
        {name:'sam', age:10, city:'mumbai'},
        {name:'simba', age:12, city:'manali'},
        {name:'brownie', age:20, city:'assam'},
        {name:'nova', age:10, city:'kerala'}
    ];
    //let items= ['Apple', 'Banana', 'Mango', 'Cherry']
   res.render("about", {
    title:'Home Page', 
    message:"welcome!!",
    items: user
})
})

app.listen(3000,()=>{
    console.log("Server started successfully on port : 3000")
})
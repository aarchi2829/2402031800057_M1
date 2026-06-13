const express = require('express')
const app = express()
app.listen(3000, () =>{
    console.log('successfully connected on port 3000.')
})
app.set('view engine','ejs' )
//app.get('/', (req, res) =>{
   //res.send("<h1>Welcome to home page</h1>")
//})
//app.get('/about', (req, res) =>{
   //res.send("<h1>About page </h1>")
//)
app.get('/gallery', (req, res) =>{
   res.send("<h1>Gallery page </h1>")
})
//app.get('/user', (req, res) =>{
  // res.send("<h1>User page </h1>")
//})
app.get('/about/:id', (req, res) =>{
   res.send(req.params)
})
app.get('/user/:userid/book/:bookid', (req, res) =>{
   res.send(req.params)
})
   app.get('/search' , (req, res) => {
    const name= req.query.name
    const age= req.query.age
    const city= req.query.city
    res.send(`Search results for  Name: ${name}, Age:${age}, City:${city}`)

})
app.get('/', (req, res)=>{
    const users= [
        {id: 1, name: 'sam'},
        {id: 2, name: 'simba'}
    ]
    //res.json(users)
    res.jsonp(users)
    //res.json(
        //{name:'Rashika', age: 19}
    //)
})
//app.get('/about', (req, res)=>{
    //res.redirect('/user');
//})
//app.get('/user', (req, res)=>{
    //res.send("<h1>User page</h1>")
//})
app.get('/about', (req, res)=>{
    res.redirect(301,'https://www.google.com/');
})
app.get('/user', (req, res)=>{
    res.render('user');
})
app.get('/end', (req, res)=>{
    res.write('This is testing')
    res.end()
})
app.get('/error', (req, res)=>{
    res.sendStatus(404);
})

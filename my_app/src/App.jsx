//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
//import heroImg from './assets/hero.png'
//import './App.css'
//import Hello from "./Hello"
//import Hello1 from "./Hello1"
//import Bye from "./Bye"
//import Hello2 from "./Hello2"
//import Button from "./Button"


import { BrowserRouter, Routes, Route, Link, useParams} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Products from "./Products"
import Phone from "./Phone"
import Laptop from "./Laptop"

 function App() {

  function User(){
    console.log(useParams())
    const {id} = useParams()
    return<h2>User Profile for ID:{id}</h2>
  }

  function NotFound(){
    return <h2>404 - Page Not Foumd</h2>
  }

 /* const hobbies = ["reading", "coding"]

  function Message (){
    alert("Hello from message box")
  }

   function ByeMessage (){
    alert("Hello from  Bye message box")
  }*/

  return(
    <>

    {/*<h1>App Component</h1>*/}

    {/* <Hello /> */}
    {/* <Hello1 /> */}

    {/*<img src={reactLogo}  width="100px" height="100px"/>*/}
    {/* <Bye /> */}

    {/*<Hello2 name="aarchiiii" age={20} city="ahmedabad" hobbies={hobbies}/>*/}
    {/*<Button label="Click Me" handleClick={Message} />*/}
    {/*<Button label=" Just Click " handleClick={ByeMessage} />*/}


     <BrowserRouter>

     <h1>React Router Example</h1>

     <nav>
     <Link to="/">Home</Link> |
     <a href="/about">About</a> |
     <a href="/contact">Contact</a>|
     <Link to="/user">User</Link>|
     <Link to="/products">Products</Link>
     
     </nav>



     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/user/:id" element={<User/>} />
      <Route path="/products" element={<Products/>}>
        <Route path="phone" element={<Phone/>} />
        <Route path="laptop" element={<Laptop/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
     </Routes>
     </BrowserRouter>

    </>
  )
  
}

export default App

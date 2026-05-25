import './App.css'

function Hello1() {
    const  isVisible  = true;

    return (
        <div>
            <h1 className={isVisible ? "visible" : "invisible"}>  Conditinal rendering</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequuntur molestiae perferendis? Exercitationem repellendus doloribus eius ducimus perspiciatis nemo, hic expedita tenetur adipisci et molestiae, ipsa iusto voluptatum animi cupiditate?</p>
        </div>
    )
   // let message;

    //if (isLoggedIn) {
      //  message = <h1>Welcome user !</h1>
    //} else {
      //  message = <h2>Please login</h2>
    //}
    //return <div>{message}</div>
}



export default Hello1


import { useNavigate } from "react-router-dom"

export default function Home (){

    const Navigate= useNavigate();
    const goToAbout = () =>{
        Navigate("/about")

    }
    return (
        <div>
            <h2>Welcome to Home Page</h2>
            <button onClick={goToAbout}>Go To About</button>
        </div>
)
}
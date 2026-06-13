
function Hello(){
    const getName = (yourname) => {
        return yourname;
    }
    function handleClick(){
        alert("Button clicked")
    }
    const handleInput =(event) => {
        console.clear()
        console.log("Value:", event.target.value)
    }
    const name="aarchi"
    const name1="a"
    const handleMouseOver = () => console.log("Mouse is over the text")
    const handleDoubleClick = () => console.log("text double clicked")
    return(
        <>
        <h1>Hello {getName(name)}</h1>
        <h2>Byee {getName(name1)}</h2>
        <p onMouseOver={handleMouseOver} onDoubleClick={handleDoubleClick}>Lorem ipsum dolor, sit amet uos! Quis autem  corporis facere.</p>
        <button onClick={handleClick}>Click me</button>
        <button onClick={()=>alert("hello this is inline function")}>say hello</button>
        <br />
        <input type="text" onChange={handleInput} placeholder="type here"/>
        </>
    )
}
export default Hello 
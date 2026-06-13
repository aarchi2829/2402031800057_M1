function Hello2 ({name="aarchi", age=20, city="ahmedabad", hobbies}){

    //const {name,age,city}=props

    return(
    <div>
        <h2>Hello, {name}</h2>
        <p>age : {age}</p>
        <p>city : {city}</p>
       <ul>
        {hobbies.map((hobby, index)=> (
            <li key={index}>{hobby}</li>
        ))}
        </ul>
    </div>

    )
}
export default Hello2
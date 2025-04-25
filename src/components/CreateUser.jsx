import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateUser = () => {
    var style={margin:".5em"}
    var navigate = useNavigate()
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")
    const[email,setEmail]=useState("")
    const[confirmPassword,setConfirmPassword]=useState("")
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    //create user
    async function handleCreateUser(e) {
        e.preventDefault(); 
        var isValid=verifyInput();
        
        console.log(isValid+" is valid")
        if(isValid){
            const NewUser={username:username,
            password:password,
            email:email,
            firstName:firstName,
            lastName:lastName}
            console.log(JSON.stringify(NewUser)+" is the new user in handle create user")
            try {
               
                const url="http://localhost:5000/api/createUser"
                await axios.post(url,NewUser)
                navigate("/")
            }
            catch(err){
              console.log(err+" found errors")
            }
        }
    }
    //verify input for empty fields and passwords match
    function verifyInput(){
        var isValid=true
        if(!(confirmPassword===password)){
            alert("passwords dont match")
            isValid=false
        }
        else if(firstName===''||lastName===''){
           alert("one of name fields is empty")
           isValid=false
        }
        else if(email==='' || username ===''){
           alert("email field or username is empty")
           isValid=false
        }
        else if(password==='' || confirmPassword ===''){
            alert("one of the password fields is empty")
            isValid=false
        }
        else
        {console.log("no problems")}
        return(isValid)
        
    }
    return (<>
    <h2>Create User Form</h2>
    <form style={{display:"flex",flexDirection:"column",alignItems:"center",border:"solid",height:"auto"}} >
        <label style={style}>Username:</label>
        <input value={username} style={style} type="text" id="username" name="username" onChange={(e)=>setUserName(e.target.value)} required/>
        <br/>
        <label style={style}>Password:</label>
        <input value={password} style={style} type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>
        <br/>
        <label style={style}>Email:</label>
        <input value={email} style={style} type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required/>
        <br/>
        <label style={style}>Confirm Password:</label>
        <input value={confirmPassword} style={style} type="password" id="confirmPassword" name="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} required/>
        <br/>
        <label style={style}>First Name</label>
        <input value={firstName} style={style} type="text" id="firstName" name="firstName" onChange={(e)=>setFirstName(e.target.value)} required/>
        <br/>
        <label style={style}>Last Name</label>
        <input value={lastName} style={style} type="text" id="lastName" name="lastName" onChange={(e)=>setLastName(e.target.value)} required/>
        <br/>
        <button type="submit" onClick={(e)=>handleCreateUser(e)}>Register</button>
    </form>
    <h3>back to login</h3>
    <button onClick={() => navigate("/")}>login page</button>
    </>  );
}
 
export default CreateUser;
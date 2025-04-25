import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const  LoginPage= ({handleLogin}) => {
    var navigate = useNavigate()
    const[username,setUserName]=useState("")
    const[password,setPassword]=useState("")
    
    var style={margin:".5em"}

    
    async function verify(username,password){
        const url="http://localhost:5000/api/getUsernames"
        var promise=await axios.post(url)
        var usernames=await promise.data
        var isValid=true;
        console.log(JSON.stringify(usernames)+" is the usernames")
       
       if(username==='' || password===''){
           alert("empty fields")
           isValid=false
           return isValid
       }
       else if(!usernames.includes(username)){
         alert(username+" doesnt exist")
         isValid=false
         return isValid
       }
       return isValid
    }
    async function handleSubmit(e){
        e.preventDefault(); 
        var isValid=true
        isValid=await verify(username,password);
       
        if(isValid){
            try{
              await handleLogin(e,{username,password})
            }
            catch(err){
                console.log(err+" is errors")
            }
        }
        else alert("login failed")
    }
    return ( <>
        <h1>Job Finder App</h1>
        <h2>Login Page</h2>
        <form style={{padding:".5em"}} onSubmit={(e)=>{e.preventDefault();handleSubmit(e)}}>
            <label style={style} >Username:</label>
            <input style={style} type="text" id="username" name="username" onChange={(e)=>setUserName(e.target.value)} required/>
            <br/>
            <label style={style} >Password:</label>
            <input style={style} type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} required/>
            <br/>  
            <button type="submit" >Login</button>
        </form>
        <h3>New User?</h3>
        <button onClick={() => navigate("/createUser")}>Create User</button>
    </> );
}
 
export default LoginPage;
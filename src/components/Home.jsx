import React from 'react';  
import Navbar from './Navbar';
const Home = ({User}) => {
   function logOut(){
     User(null)
   }
    return (<div id='home'>
    <h1>Welcome to the Home Page</h1>
    <Navbar/>
    <br/>
    <h3>Here you can find all information about your job search</h3>
    <button onClick={logOut}>Logout</button>
    </div>);
}
 
export default Home;
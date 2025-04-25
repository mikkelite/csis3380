import { Link } from "react-router-dom";
import React from 'react';

const Navbar = () => {
    return ( <>

        <table>
            <thead >           
                <tr style={{fontSize:"1.5em"}}>
                    <th></th>
                    <th>Home</th> 
                    <th>History</th> 
                    <th>Admin</th>
                    <th>Job List</th>
                    <th>Profile</th>
                </tr>
            </thead>
            <tbody>
                <tr > 
                    <td style={{textDecoration:"underline",textDecorationColor: "blue",fontSize:"1.5em",border:"none"}}>Links:</td>
                    <td>{<Link to={"/Home"}>To the Home page<br/></Link>}</td>
                    <td>{<Link to={"/History"}>To your history<br/></Link>}</td>
                    <td>{<Link to={"/Admin"}>Add Jobs and Account Settings<br/></Link>}</td>
                    <td>{<Link to={"/JobList"}>Jobs applied to and their status<br/></Link>}</td>
                    <td>{<Link to={"/Profile"}>Profile<br/></Link>}</td>
                </tr>
            </tbody>
            </table>
        </> );
}
 
export default Navbar;
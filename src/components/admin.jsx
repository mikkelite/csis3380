import React from 'react';
import Navbar from './Navbar';
import JobForm from './JobForm';
import axios from 'axios';
import JobList from './jobList';


const Admin = (props) => {
   
    var newJob={}
    async function deleteAll(){
        const url="http://localhost:5000/api/deleteAll"
        await axios.delete(url).then((response) => {
            console.log(response.data);
            props.setWereJobsRetrieved(false)
        })
        .catch((error) => {
            console.error('Error deleting jobs:', error);
        });
        alert("if you need sample data requires reload from cmd/server")
      
        
       
    }
    //addJob function to send the new job to the server, formJob is from jobForm.jsx
    async function addJob(formJob) {
        console.log(formJob);

        newJob = formJob;
        console.log(JSON.stringify(newJob));
        const url = "http://localhost:5000/api/addJob";
        await axios.post(url, newJob).then((response) => {
            console.log(response.data);
        });
        props.setWereJobsRetrieved(false)
    }
  
    return ( <>
    <Navbar/>
    {/* Profile Information*/}
    <div style={{flexDirection:"row",marginTop:"5%",display:"flex",justifyContent:"center",borderWidth:".15em"}}>
 
        {/* Job Form */}
        <JobForm addJob={(formJob)=>addJob(formJob)} />
    </div>
    <h1>Edit a Job</h1>
    <div id='jobListAdmin'>
        {/* Job List */}
        <JobList jobs={props.jobs} context={'admin'} updateJob={props.updateJob} 
        createHistoryLog={(job)=>props.createHistoryLog(job)} setWereJobsRetrieved={props.setWereJobsRetrieved}/>
    </div>
    <br/>
    <button style={{backgroundColor:"red"}} onClick={deleteAll}>delete all records</button>

    
    </> );
}
 
export default Admin;
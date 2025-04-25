import { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    var style={borderStyle:"solid", borderColor:"black", borderWidth:"1px",
    paddingLeft:"1em",width:"auto",backgroundColor:"rgb(134, 122, 122)"};
    
    //start of joblist
const JobList = ({context,jobs,setWereJobsRetrieved=(f)=>f,updateJob=(f)=>f,createHistoryLog=(f)=>f}) =>{
    const Thiscontext=context
    var navigator=useNavigate()
    const Jobs=jobs
    console.log("jobs: ",Jobs)
    //delete one job
    async function deleteOne(job){
        console.log(JSON.stringify(job)+" job in DeleteOne in frontend")
        const url=`http://localhost:5000/api/deleteOne/${job._id}` 
        await axios.post(url,job).then(setWereJobsRetrieved(false))
       
         
    }
    {/*for each status background color*/}
    const statusMap = {
        "Applied": "green",
        "Rejected": "rgb(195, 55, 34)",
        "Accepted": "teal",
        "Interview": "#dfdd4f",
    };
    //criteria from user
    const [locationExpectation,setExpectation]=useState("")
    const [idealJobType,setIdealJobType]=useState("")
    const [idealMinSalary,setIdealMinSalary]=useState(1000000)
    return ( <div>
     {Thiscontext==='app'?<Navbar/>:null}
     {/*no navbar if its not the read only list*/}
    <label style={{fontSize:"1.5em"}}>location:</label>{/*ideal location*/}
     <select style={{width:"20%",marginLeft:".5em",marginRight:".5em"}} name="expectation" id="expectation" onChange={(e)=>setExpectation(e.target.value)}>
        <option value="Remote">Remote</option>  
        <option value="On-site">On-site</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Contract">Contract</option>
     </select>
    <label style={{fontSize:"1.5em"}}>Job Type:</label>{/*ideal job type*/}
        <select style={{width:"20%",marginLeft:".5em"}} name="idealJobType" id="idealJobType" onChange={(e)=>setIdealJobType(e.target.value)}>     
            <option value="Part-time">Part-time</option>  
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
        </select>
    <br/>
    <label style={{fontSize:"1.5em",marginRight:".5em"}}>minimum salary:</label>{/*ideal location*/}
    <input type="number" onBlur={(e) => { setIdealMinSalary(e.target.value); console.log(idealMinSalary); } } />
   
    <br/>
    {/*instructions on page*/}
    <h2 style={{borderStyle:"ridge",borderBottomWidth:".5px",display:"inline-block",padding:".75em"}}>List of your Jobs</h2>
    <h3 style={{textDecoration:"underline",fontStyle:"italic"}}>job response older than 30 days appear as 
        <p style={{color:"rgb(206, 36, 13)",display:"inline"}}> red</p></h3>
    <h3 style={{textDecoration:"underline",fontStyle:"italic"}}>your criteria that matches is
        <p style={{color:"rgb(47, 197, 122)",display:"inline"}}> green </p>excluding status</h3>
        {/*table*/}
    <table style={{width:"100%", border:"1px solid black", borderCollapse:"collapse"}}>
        {/*Headers */}  
        <thead>
            <tr style={{textDecoration:"underline"}}> 
                <th>Company</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>days since Applied</th>
            </tr>
        </thead>

        <tbody>
    {Jobs.map((job)=>{
        return<tr key={job._id} >{/*id for the row*/}
            <td style={style}>{job.company}</td>{/*company*/}
            {/*if from app.jsx no dropdown*/Thiscontext==='app'?<td style={{backgroundColor:statusMap[job.status],borderColor:"black",borderWidth:"2px"}}>{job.status}</td>:<td style={{padding:"0px"}}>
                <select value={job.status} onChange={ (e)=>{const updatedJob =
                 { ...job, status: e.target.value };updateJob(updatedJob); createHistoryLog(updatedJob);{/*update job status and create History Log*/}}}
                 style={{backgroundColor:statusMap[job.status],borderColor:"black",borderWidth:"2px",width:"100%",height:"100%"}}>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Other">Other</option>
                </select></td> /*status if from admin.jsx*/}  
            <td style={{...style,backgroundColor:job.Salary>=idealMinSalary?"rgb(47, 197, 122)":"rgb(31, 118, 199)"}}>{job.Salary}</td>{/*salary*/}
            <td style={{...style,backgroundColor:job.location===locationExpectation?"rgb(47, 197, 122)":"rgb(31, 118, 199)"}}>{job.location}</td>{/*location*/}
            <td style={{...style,backgroundColor:job.jobType===idealJobType?"rgb(47, 197, 122)":"rgb(31, 118, 199)"}}>{job.jobType}</td>{/*job type*/}
            <td style={{width:"10%",borderStyle:"solid",borderWidth:"1px", borderColor:"black",backgroundColor:job.daysSinceApplied<30?"orange":"rgb(206, 36, 13)"}}>{job.daysSinceApplied}</td>{/* response two lines here*/}
           { Thiscontext==='app'?"": <td><button onClick={()=>deleteOne(job)}>delete</button></td>}
       
        </tr>
        
    })}
    </tbody>
    </table>
    </div> 
    );//*end of return*}
}
 
export default JobList;
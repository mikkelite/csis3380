import { useState } from 'react';
import React, { use } from 'react';
const JobForm = (props) => {
    var formStyle={margin:".3em",marginTop:".4em",padding:".3em"}
    //new job, which will be made from form...default values:
    const [newJob,setJob]=useState({
        company:"",
        status:"Applied",
        daysSinceApplied: 0, 
        Salary: 5, 
        location: "", 
        jobType: "", 
        description: "place holder",
        dateApplied:new Date().toLocaleString('en-Ca', {year: 'numeric', month: '2-digit', day: '2-digit'}),
    })
    const SubmitJob=(e)=>{
        e.preventDefault()
        console.log(newJob)
        var isValid=true
        var splitDate=newJob.dateApplied.split("-")
        //Check if all required fields are filled out
        if(newJob.company==="" ||  newJob.salary===0 || newJob.location==="" || newJob.description==="" || newJob.jobType===""){
            alert("Please fill out all required fields")
            isValid=false
        }
        //date validation
        else if(splitDate.length!==3){
            console.log("Invalid date: - not 3 parts")
            alert("Invalid date format numbers not seperated by - or too many -")
            isValid=false
        }
        //sfds-ff-24 not numeric
        else if(isNaN(splitDate[0])||isNaN(splitDate[1])||isNaN(splitDate[2])){
            console.log("Invalid date NaN")
               alert("Invalid date format, not numeric")
               isValid=false 
        }
        //55555-555-555 etc
        else if(splitDate[0].length>4||splitDate[1].length>2||splitDate[2].length>2){
            console.log("Invalid date format")
            alert("Invalid date format, too many digits")
            isValid=false 
        }
        //out of range ex:3000-13-33
        else if(splitDate[0].length<4|| splitDate[0]<1900||splitDate[1]<1||splitDate[1]>12||splitDate[2]<1||splitDate[2]>31){
            console.log("Invalid date, range")
            alert("Invalid date format, out of range")
            isValid=false 
        }
        //otherwise its good
        if(isValid){
         props.addJob(newJob)
        }

    }
    return (
        <div style={{width:"50%",marginTop:"1%",marginBottom:"1%"}}>
            <h2>Add a new Job</h2>
            {/*Form*/}
            <form style={{padding:"1em",display:"flex",flexDirection:"column",alignItems:"center",border:"solid",height:"auto"}}  onSubmit={(event)=>SubmitJob(event)} method="post">          
                {/*company*/}
                <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                    <label style={formStyle}>Company</label>
                    <input style={formStyle} onChange={(e)=>setJob({...newJob, company:e.target.value })} type="text" placeholder="Company" />
                </div>
                    <br style={formStyle}/>
                {/*Description*/}
                <div style={{display:"flex",flexDirection:"column",width:"100%",height:"60%"}}>
                    <label style={formStyle}>Description</label>
                    <textarea style={{formStyle}} onChange={(e)=>setJob({...newJob, description:e.target.value })} placeholder="description ex:can be job title/role etc "/>
                        
                </div>
                    <br style={formStyle}/>
                    {/*Location*/}
                    <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
                    <label style={formStyle} >Location</label>
                    <select onChange={(e)=>setJob({...newJob, location:e.target.value })} style={formStyle} placeholder="Location" >
                        <option value="Remote">Remote</option>  
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <br style={formStyle}/>
                {/*Salary*/}
                <div style={{display:"flex",flexDirection:"column",width:"60%"}}>
                    <label style={formStyle}>Salary</label>
                    <input style={formStyle} onChange={(e)=>setJob({...newJob, salary:e.target.value })} type="number" placeholder="Salary" />
                </div>
                <br style={formStyle}/>
          
                {/*Job type*/}
                <div style={{display:"flex",flexDirection:"column"}}>
                    <label style={formStyle}>jobType</label>
                    <select  style={formStyle} onChange={(e)=>{setJob({...newJob, jobType:e.target.value }); console.log(e.target.value)}} name="jobType" id="jobType">
                        <option value=" ">Select job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Hybrid">Accepted</option>
                    </select>
                </div>
           
                 {/*Optional*/}
                 <h3 style={{textDecoration:"underline"}}>Optional fields</h3>

                 <label style={formStyle}>Date Applied: (if job was applied to before today)</label>
                 <input style={{...formStyle,width:"80%"}} onChange={(e)=>setJob({...newJob, dateApplied:e.target.value })} type="text" placeholder="yyyy-mm-dd/yyyy-m-d" />
                
                {/*Status*/}
                <div style={{display:"flex",flexDirection:"column"}}>   
                    <label style={formStyle}>Status</label>
                    <select style={formStyle} onChange={(e)=>setJob({...newJob, status:e.target.value })} name="status" id="status">
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
              
                {/*Button */}
                <br style={formStyle}/>
                <button type="submit">Submit</button>          
            </form>
        </div>  
    );
}
 
export default JobForm;
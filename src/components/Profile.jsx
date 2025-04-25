
import { useState } from "react";
import Navbar from "./Navbar";
const Profile = ({User,jobs,HistoryLogs}) => {
    var count=0
    var user = {}
    var hours=0
    var dateToday=new Date().getTime()
    var userDate=new Date(User.dateCreated)
    var difference=dateToday-userDate.getTime()
    var SinceUnemployed=Math.floor(difference/(1000*3600*24))
    var SinceUnemployedhours=Math.floor(difference/(1000*3600))
    console.log(userDate+  " Date")
    console.log(SinceUnemployed+ " today")
    function daysSinceLastApplied(jobs){
            var recent=0
            jobs.forEach(job=>{
                var tempJobDate=new Date(job.dateApplied)
                tempJobDate=tempJobDate.getTime()
                console.log(tempJobDate)
              
                if(recent<tempJobDate){
                       recent=tempJobDate
                }
            })
            var now=new Date().getTime()
            console.log(now+" is now")
            console.log(recent+ " is recent")
            var HourDifference=now-recent
            HourDifference=(HourDifference/(1000*3600))
            console.log(HourDifference+" is lowest or more recent time")
            return Math.floor(HourDifference)
   }
    
    
    function countInterviews(HistoryLogs) {
        HistoryLogs.forEach(element => {
            console.log(JSON.stringify(element)) 
            if(element.status==="Interview"){             
                  count++
            }
        });
    }
    hours=daysSinceLastApplied(jobs)
    countInterviews(HistoryLogs)
    user=User
    const pStyle={borderWidth:".05em",borderStyle:"solid",padding:".5em",borderColor:"black",marginTop:"0",
        marginBottom:"0.1em",backgroundColor:"#f0f0f0",borderRadius:".5em",boxShadow:"2px 2px 5px #888888",
        opacity:".9",textAlign:"center",fontSize:".5em"}
    return (  <>
    <Navbar />    
    <div style={{width:"80%",marginBottom:"5%",border:"solid",borderColor:"black",backgroundColor:"#f0f0f0",borderRadius:".5em",
    boxShadow:"2px 2px 5px #888888",opacity:".9",textAlign:"center",fontSize:"1.5em",marginLeft:"10%",marginRight:"10%",
        backgroundImage:"linear-gradient(to bottom,#dfdd4f,rgb(33, 144, 158))",padding:".5em"}} id="profile">
        <h2>Your Profile</h2>
        <p style={pStyle}>{'Welcome to your profile'} <br/> {`${user?user.firstName:'guest'}`}</p>
        <br/>
        <p style={pStyle}>{`Joined: `}</p>
        <p style={{...pStyle,borderStyle:"none",display:"inline-block"}}>{`${user?user.dateCreated:'guest'}`}</p>
        <p style={pStyle}>{`this is the number of jobs you have applied for: `}</p>
        <p style={{...pStyle,borderStyle:"none",display:"inline-block"}}>{`${jobs.length}`}</p>
        <p style={pStyle}>{`Days since last job applied for: `}</p>
        <p style={{...pStyle,borderStyle:"none",display:"inline-block"}}>{`${hours+" hours"}`}</p>
        <p style={pStyle}>{`Total interviews(Based on history logs): `}</p>
        <p style={{...pStyle,borderStyle:"none",display:"inline-block"}}>{`${count}`}</p>
        <p style={pStyle}>{`Total days unemployed: `}</p>
        <p style={{...pStyle,borderStyle:"none",display:"inline-block"}}>{`${"days "+SinceUnemployed+" hours:"+SinceUnemployedhours}`}</p>
    
    </div>  
    </> );
}
 
export default Profile;
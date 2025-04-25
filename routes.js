import express from 'express';
import mongoose from 'mongoose';
import url from './server_urls.js';
import jobs from './jobs.js'
import {job} from './model/jobsSchema.js';
import {history} from './model/historySchema.js';
import {user} from './model/userSchema.js'
import cors from 'cors';


const app=express();
const PORT=5000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
//startup
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

const start = async () => {  
  try {
      await mongoose.connect(url)
      console.log('Connected to MongoDB');
      console.log('start of app')
      console.log('-------------------------------------------')
      
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
}
start();

getintialData(jobs);
//-------------------
async function getintialData(jobs){
    var jobz=await getAllJobs()
    console.log("populate if no data found")
    console.log(jobz.length +' = how many jobs found')
    if(jobz.length===0){
        console.log("since no jobs found, added sample set")
        try {
            saveJobs(jobs)
            
            
        }catch(error){
            console.error('Error saving jobs:', error);
        }
    }
}

//api endpoints
//----------------------------------------------------------
//user endpoints

app.post('/api/createUser',async (req,res)=>{
    var userRetrieved=await req.body
    console.log("user: "+JSON.stringify(userRetrieved))
    await user.insertOne(userRetrieved)
    res.status(200).json('User created successfully')
})
app.post('/api/getUser',async(req,res)=>{
      var data=await req.body
      var userMatch=await user.find({username:data.username,password:data.password})
      console.log(JSON.stringify(data)+ " the data passed /api/getUser")
      console.log(userMatch+" is the matched user")
      console.log("this is /api/getUser")
      res.send(userMatch)
     
})
app.post('/api/getUsernames',async(req,res)=>{
  var users=await user.find()
  var userInfo=await users
  var usernames=[]
    console.log(JSON.stringify(userInfo) +"------ USER INFO SERVER")
  userInfo.forEach((user) => {
    console.log(JSON.stringify(user)+"----- USER")
    usernames.push(user.username)
  });
  res.json(usernames)
})

//job endpoints
//---------------------------------------------------
app.get('/api/getAlljobs',async (req,res)=>{
    try {
        var jobs=await getAllJobs()  
        console.log("call from /api/getAlljobs")
        console.log(jobs.length+" length")
        jobs=await updateAlljobs(jobs)
        for (const job of jobs) {
            job.daysSinceApplied= updateDays(job);         
            await updateJobSinceApplied(job)              
        }
        res.json(jobs)
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
async function updateAlljobs(jobz){
    console.log("updateAlljobs(jobz)")
    if(jobz.length===0){
        console.log("probably after (delete all)")           
    }
    console.log(JSON.stringify(jobz)+" jobs at end of updateAlljobs(jobz)")
  
    return jobz
}
//delete apis for jobs
app.delete('/api/deleteAll',async (req,res)=>{ 
    await job.deleteMany({}).then(() => {
        console.log('All jobs deleted from database');
    })
    .catch((error) => {
        console.error('Error deleting jobs:', error);
    });

    res.json('deleted all jobs')
})
app.post('/api/deleteOne/:id',async(req,res)=>{
    const parameters=await req.params.id
    console.log(parameters)
    try{
      await job.deleteOne({_id:parameters})
    }
    catch(error){
     console.log(error+" in trying to delete one job")
    }
    res.send("response from /api/deleteOne/:id")
})
//add
app.post('/api/addJob',async (req,res)=>{
   
    var jobForm=req.body
    console.log("jobForm: "+jobForm)
    await saveJob(jobForm)
    res.status(200).json('Job added successfully')
})
//update
app.post('/api/updateJob/:id/:status',async (req,res)=>{    
    var jobId=await req.params.id
    var jobStatus=await req.params.status
    console.log("url parameters id: "+jobId)
    console.log("url parameters status: "+jobStatus)
    await updateJobStatus(jobId,jobStatus)
    res.status(200).json('Job status updated successfully')
})
//---------------------------------------------------
//history table endpoints
//no function associated with this endpoint
//get
app.get('/api/getHistoryLogs',async (req,res)=>{
    try {
        var historyJobs=await history.find()
        res.json(historyJobs)
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
//add
app.post('/api/createHistoryLog',async (req,res)=>{
    var job=await req.body
    console.log("/api/createHistoryLog: the job: "+job)
    await createHistoryLog(job)
    res.status(200).json('Job history log created successfully')
})
//functions for saving and deleting jobs (CRUD operations)
//----------------------------------------------------------
//update days since applied on startup
function updateDays(job){
    var dateApplied=new Date(job.dateApplied)
    var dateToday=new Date().getTime()
    var SinceResponseMilli=dateToday-dateApplied.getTime()
    var daysSinceResponse=Math.floor(SinceResponseMilli/(1000*3600*24))
    return daysSinceResponse
}
//save one
async function saveJob(jobForm){
    await job.insertOne(jobForm)
    .then(() => {
        console.log('A job is saved to database from admin form');
    })
    .catch((error) => {
        console.error('Error saving job:', error);
    });
}



//update job status
async function updateJobStatus(id, status){
    console.log('updating job status')
    console.log("this is the id in updateJobStatus() "+id)
    await job.updateOne({ _id: id },{ $set: { status: status } })
    .then(() => {
        console.log('Job status updated in database');
    })
    .catch((error) => {
        console.error('Error updating job status:', error);
    });
}
//update job since Applied
async function updateJobSinceApplied(jobData){
  await job.updateOne({ _id: jobData._id },{ $set: { daysSinceApplied: jobData.daysSinceApplied } })
}
//get all jobs
async function getAllJobs(){
    const jobs=await job.find()
    console.log("getAlljobs()")
    return jobs
}
//save jobs from jobs.js (testing) or multiple jobs 
async function saveJobs(jobData){
    await job.insertMany(jobData)
        .then(() => {
            console.log('Jobs saved to database');
        })
        .catch((error) => {
            console.error('Error saving jobs:', error);
        });
}
//-------------------
//History table functions
async function createHistoryLog(job){
    console.log('creating history log')
    console.log("this is the job "+JSON.stringify(job))
    const historyJob={
        Company: job.company,
        status: job.status,
        description: job.description,
        daysSinceApplied: job.daysSinceApplied,
        dateApplied: job.dateApplied,
 /* Company: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    daysSinceApplied: {type: Number, required: true},
    dateApplied: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now} */   
    }
    await history.insertOne(historyJob)
    .then(() => {
        console.log('A job is saved to history database');
    })
    .catch((error) => {
        console.error('Error saving job:', error);
    });
}
//-------------------


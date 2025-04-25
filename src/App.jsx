import {  Route } from 'react-router-dom'
import React from 'react'
import { Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import History from './components/History'
import Admin from './components/admin'
import JobList from './components/jobList'
import Login from './components/loginPage'
import CreateUser from './components/CreateUser'
import Profile from './components/Profile'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'






function App() {
  var navigator=useNavigate()
  const[User,setUser]=useState(()=>{
      // Retrieve user from local storage on initial load
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null
  })
  const [areHistoryLogs, setIsLogsRetrieved] = useState(false);
  const [wereJobsRetrieved, setWereJobsRetrieved] = useState(false);
  //all stored jobs
  const[jobs,setJobs]=useState([]);
  const[HistoryLogs,setHistoryLog]=useState([]);

  
  //get all jobs from the server
  const getJobs = async () => {
    const url = "http://localhost:5000/api/getAlljobs"
    var response = await axios.get(url)
    var allJobs = await response.data
    setWereJobsRetrieved(true)
    setJobs(allJobs)
    if(jobs.length===0 && allJobs===undefined){
     console.log("there was no current jobs stored in database or local storage")   
    }
    
    return allJobs
  }
  const getHistoryLog = async () => {
    const url = "http://localhost:5000/api/getHistoryLogs"
    var response = await axios.get(url)
    var historyLogs =await response.data
    setIsLogsRetrieved(true)
    setHistoryLog(historyLogs)
    if(HistoryLogs.length===0 && historyLogs.length===0){
      console.log("there was no current history logs stored in database or local storage")
      
    }
    return historyLogs

  }
  const updateJob= async (job) => {
    setJobs((prevJobs) =>
      prevJobs.map((j) => (j._id === job._id ? { ...j, status: job.status } : j))
    );
    console.log("job in update job/app.jsx: ",job)
    const url = `http://localhost:5000/api/updateJob/${job._id}/${job.status}`
    await axios.post(url)

  }

  const createHistoryLog = async (job) => {
    console.log("in createHistoryLog() react-job:"+JSON.stringify(job))
    console.log("in createHistoryLog() react-job company:"+job.company)
   
    const url = "http://localhost:5000/api/createHistoryLog"
    await axios.post(url,job)
    setIsLogsRetrieved(false)
  }
  //useEffect to get all jobs from the server
  useEffect(() => {
    console.log('useEffect called either for retrieving jobs or retrieving history logs')
    fetchData();
  },[wereJobsRetrieved, areHistoryLogs,User]);
   //fetch data function to get all jobs and history logs
  async function fetchData(){
    console.log("successfully called get jobs: ",wereJobsRetrieved)
    console.log("successfully called get history logs: ",areHistoryLogs)
    
      if(!wereJobsRetrieved){
        var jobsFound=await getJobs();
        console.log("jobs found: ",jobsFound)
      }
      else if(!areHistoryLogs){
        var historyFound=await getHistoryLog();
        if(historyFound.length>0){
          console.log("history logs found: ",historyFound)
        }
        else{
          console.log("no history logs found")
        }
      }
      if(User){
        localStorage.setItem('user', JSON.stringify(User));
      }
      else{
        navigator("/")
      }
   
  }; 
 
  async function handleLogin(e,user) { 
     
    console.log("Login button clicked! (from app.jsx)");
   
    const url="http://localhost:5000/api/getUser"
    var promise=await axios.post(url,user)
    var foundUser=promise.data[0]
    setUser(foundUser)
    
    navigator('/Home')
   
  }
  //html for the app
  return (
    <>
    <Routes>
      <Route path="/" element={<Login handleLogin={handleLogin}/>} />
      <Route path="/createUser" element={<CreateUser />}/>
      <Route path="/Home" element={<Home User={setUser}/>} />
      <Route path="/History" element={<History HistoryLogs={HistoryLogs}/>} />
      <Route path="/Admin" element={<Admin jobs={jobs} updateJob={updateJob} createHistoryLog={createHistoryLog} setWereJobsRetrieved={setWereJobsRetrieved}/>} />
      <Route path="/JobList" element={<JobList jobs={jobs} context={'app'}/>} />
      <Route path="/Profile" element={<Profile jobs={jobs} User={User} HistoryLogs={HistoryLogs}/>} />  
    </Routes>
    </>
  )
}

export default App

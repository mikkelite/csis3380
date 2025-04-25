import mongoose from "mongoose"
//job model
const jobSchema = new mongoose.Schema({
    company: { type: String, required: true,unique: true },
    status: { type: String, required: true },
    daysSinceApplied: { type: Number, required: true },
    Salary: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    description: { type: String},
    dateApplied:{type:String,required:true}
})
export const job=mongoose.model("Job", jobSchema)
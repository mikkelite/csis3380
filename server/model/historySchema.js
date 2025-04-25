import mongoose from "mongoose"
// history model
const historySchema = new mongoose.Schema({
    Company: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    daysSinceApplied: {type: Number, required: true},
    dateApplied: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now}
})
export const history=mongoose.model("historyLogs", historySchema)
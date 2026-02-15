import mongoose, {Schema} from "mongoose";

const meetingSchema = new Schema({
    user_Id: {type: String},
    meeting_Id: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true}
}); 

const Meeting = mongoose.model('Meeting', meetingSchema);

export { Meeting };

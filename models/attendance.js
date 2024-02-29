const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dli: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["P", "A"],
  },
  reason: {
    type: String,
    default: "",
  },
});
/**
 * Event is any drill, SSB or sports class, or any internal or external event,
 * that is to take place in the name of NCC.
 * eventName - Name of the event
 * description - Description of the event, what is it about, what will happen, Who will take the class etc
 * date - Date and time of the event
 * venue - Event venue
 */
const attendanceSchema = new mongoose.Schema({
  attendes: {
    type: [attendeeSchema],
    required: true,
  },
});

const Attendance = mongoose.model("attendances", attendanceSchema);
module.exports = Attendance;

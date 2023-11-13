const mongoose = require("mongoose");

/**
 * Event is any drill, SSB or sports class, or any internal or external event,
 * that is to take place in the name of NCC.
 * eventName - Name of the event
 * description - Description of the event, what is it about, what will happen, Who will take the class etc
 * date - Date and time of the event
 * venue - Event venue
 */
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
    enum: ["class", "camp", "Internal event", "External event", "other"],
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  venue: {
    type: String,
    required: true,
  },
  attendance: {
    type: mongoose.ObjectId,
  },
  Report: String,
});

const Event = mongoose.model("events", eventSchema);
module.exports = Event;

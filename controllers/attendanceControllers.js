const { catchAsyncError } = require("../utils/catchAsyncError");
const Event = require("../models/event");
const Attendance = require("../models/attendance");
/**
 * To mark a students attendance for an event
 * Request body will be
 * name : Name of the student
 * status : either "present" or "absent"
 * reason : Reason required if absent
 */
exports.markStatus = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  const attendance = await Attendance.findById(event.attendance);
  attendance.attendes.addToSet(req.body);
  const confirmation = await attendance.save();
  console.log(confirmation);
  res.status(200).json({
    success: true,
  });
});
exports.changeStatus = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  const attendance = await Attendance.findById(event.attendance);
  let ind = attendance.attendes.findIndex((ele) => ele.name === req.body.name);
  let confirmation;
  if (ind === -1) {
    confirmation = attendance.attendes.addToSet(req.body);
  } else {
    confirmation = attendance.attendes.set(ind, req.body);
  }
  const newAtten = await attendance.save();
  res.status(200).json({
    success: true,
    attendance: newAtten,
  });
});

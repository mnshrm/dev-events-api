const { catchAsyncError } = require("../utils/catchAsyncError");
const Event = require("../models/event");
const Attendance = require("../models/attendance");
const ErrorHandler = require("../utils/errorHandler");
/**
 * To mark a students attendance for an event
 * Request body will be
 * name : Name of the student
 * dli : dli number of the cadet
 * company : cadet's company
 * status : either "present" or "absent"
 * reason : Reason required if absent
 */
exports.markStatus = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ErrorHandler("Event does not exist", 404);
  const attendance = await Attendance.findById(event.attendance);
  attendance.attendes.addToSet(req.body);
  const confirmation = await attendance.save();
  res.status(200).json({
    success: true,
    attendance: confirmation,
  });
});

/**
 * To change attendance status of a cadet
 * If a cadet exists in the attendance then his status his changed
 * If a cadet does not exists then his attendance is created
 * Request body will be
 * name : Name of the student
 * dli : dli number of the cadet
 * company : cadet's company
 * status : either "present" or "absent"
 * reason : Reason required if absent
 */
exports.changeStatus = catchAsyncError(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ErrorHandler("Event does not exist", 404);
  const attendance = await Attendance.findById(event.attendance);
  let ind = attendance.attendes.findIndex((ele) => ele.dli === req.body.dli);
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

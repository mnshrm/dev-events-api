const Event = require("../models/event");
const Attendance = require("../models/attendance");
const { catchAsyncError } = require("../utils/catchAsyncError");
const { ErrorHandler } = require("../utils/errorHandler");

/**
 * Request Body
 * eventName - String
 * description - String
 * date - String (ISO string)
 * venue - String
 */
exports.createEvent = catchAsyncError(async (req, res, next) => {
  const attendance = new Attendance({
    eventName: req.body.eventName,
    attendes: [],
  });

  const event = new Event({ ...req.body, attendance: attendance._id });
  const eventConfirmation = await event.save();
  let attendanceConfirmation;
  if (eventConfirmation) {
    attendanceConfirmation = await attendance.save();
  } else throw new ErrorHandler("Could not create event", "500");

  res.status(200).json({
    success: true,
    createdEvent: eventConfirmation,
    createdAttendance: attendanceConfirmation,
  });
});

/**
 * To get all the events and there details
 */
exports.getAllEvents = catchAsyncError(async (req, res, next) => {
  const events = await Event.find();
  res.status(200).json({
    success: true,
    events,
  });
});

/**
 * To get an event's report
 */
exports.getEventReport = catchAsyncError(async (req, res, next) => {
  const eventID = req.params.id;
  const eventDetails = await Event.findById(eventID);

  if (eventDetails) {
    const attendance = await Attendance.findById(eventDetails.attendance);

    res.status(200).json({
      success: true,
      event: { ...eventDetails._doc, attendance },
    });
  } else {
    res.status(404).json({
      success: false,
      msg: "event does not exist",
    });
  }
});

/**
 * To change event details
 */
exports.changeEventDetails = catchAsyncError(async (req, res, next) => {
  const confirmation = await Event.updateOne({ _id: req.params.id }, req.body);
  res.status(200).json({
    success: confirmation.acknowledged,
    modifiedCount: confirmation.modifiedCount,
  });
});

/**
 * To delete an event
 */
exports.deleteEvent = catchAsyncError(async (req, res, next) => {
  const deletedEvent = await Event.findByIdAndDelete(req.params.id);
  await Attendance.findByIdAndDelete(deletedEvent.attendance);
  res.status(200).json({
    success: true,
  });
});

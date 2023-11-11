const {
  markStatus,
  changeStatus,
} = require("../controllers/attendanceControllers");

const express = require("express");

const router = express.Router();

/**
 * POST /:id : to mark attendance
 * PUT /:id : to change attendance
 */
router.route("/:id").post(markStatus).put(changeStatus);

exports.attendanceRouter = router;

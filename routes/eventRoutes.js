const express = require("express");

const router = express.Router();

/**
 * POST / : To create an event
 * GET / : To get all events
 */
router.route("/").post(createEvent).get(getAllEvents);

/**
 * GET /:id : get details of a specific event
 * POST /:id : change event details
 */
router
  .route("/:id")
  .get(getEventReport)
  .put(changeEventDetails)
  .delete(deleteEvent);

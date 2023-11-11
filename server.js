process.on("uncaughtException", (err) => {
  console.log("There is an error");
  console.log(err);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});

const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server started at port " + process.env.PORT);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
  console.log("Shutting down server");
  process.exit(1);
});

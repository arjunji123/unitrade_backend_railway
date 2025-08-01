const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const mysqlPool = require("./config/mysql_database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Error: " + err.message);
  console.log("Shutting down the server due to unhandled uncaught exceptions");
  process.exit(1);
});

//console.log(testing);

//connectDatabase();
/*mysqlPool.query('select 1').then((error)=>{
    console.log('mysql connection established');
})*/

mysqlPool
  .query("SELECT 1")
  .then(([rows, fields]) => {
    console.log("MySQL connection established");
  })
  .catch((err) => {
    console.error("Error establishing MySQL connection:", err);
  });

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0"; // 👈 important

const server = app.listen(PORT, HOST, () => {
  console.log("server is working on port " + PORT);
});
app.get("/", (req, res) => {
  res.send("Server is live!");
});
// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error("Error: " + err.message);
  console.error("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
// setTimeout(() => {
//   console.log("Exiting server after timeout (test mode)");
//   process.exit(0);
// }, 10000); // 10 seconds

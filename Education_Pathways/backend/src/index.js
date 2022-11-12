/*
 * Run the server
 */

const app = require("./app.js");
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

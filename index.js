//instatiate express module
const express = require("express");

//use express in app variable
const app = express();

require("dotenv").config();

//import route module
const router = require("./src/routes");

const routerV2 = require("./src/routes/routeV2");

//define the server port
const port = 5000;

//use bodyparser, sehingga kita bisa mengirim request json dari client
app.use(express.json());

//akses upload directory
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", router);
app.use("/api/v2", routerV2);

//when this node.js app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port} !!!`));

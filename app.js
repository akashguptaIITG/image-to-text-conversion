const vision = require("@google-cloud/vision");
const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const MAX_REQUEST_COUNT = 500;
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", require("./routes"));

app.listen(port, () => console.log(`Example app listening on port: ${port}`));

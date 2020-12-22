const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", require("./routes"));

app.listen(port, () => console.log(`Example app listening on port: ${port}`));

const express = require("express");

const { sequelize } = require("./models");

const router = require("./src/router");

const app = express();
app.use(express.json());
app.use(router);
const port = 5000;

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  await sequelize.authenticate();
  console.log("database authenticated");
});

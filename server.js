const app = require("./app");

const mongoose = require("mongoose");

const { USER_REG_DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(USER_REG_DB_HOST)
  .then(app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

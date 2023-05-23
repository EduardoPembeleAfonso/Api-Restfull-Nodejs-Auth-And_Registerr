const mongoose = require("mongoose");
const { mongodb_url } = require("../.env");

mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connectado ao mongodb");
  })
  .catch((error) => {
    console.log("error ao conectar ao mongodb : ", error);
  });

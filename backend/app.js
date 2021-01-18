const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const paymentRoutes = require("./routes/payment-routes");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", paymentRoutes);
// app.use((req, res, next) => {
//   const error = new HttpError("Could not find this route.", 404);
//   throw error;
// });

// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   console.log(error.message);
// });
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "roiim",
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at Port ${PORT}...`));
  })
  .catch((err) => console.log(err));

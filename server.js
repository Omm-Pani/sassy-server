const express = require("express");
const mongoose =require("mongoose")
const cors = require('cors');
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
const { register, login } = require("./user");





//Routes
app.post("/register", register);
app.post("/login",login);









//Database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Succesfully connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
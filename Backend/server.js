const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");
const companyRoute = require("./routes/companyRoutes");

const app = express();

app.use(express.json());
app.use("/post", postRoute);
app.use("/user", userRoute);
app.use("/company", companyRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in dev mode on port ${PORT}`));

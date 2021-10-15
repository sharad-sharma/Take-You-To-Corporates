const express = require('express');

const app = express();

// set up routes
// app.use("/auth", authRoutes);
// app.use("/profile", profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.send("Take you to Corporates");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});
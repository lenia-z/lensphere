const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/images", express.static("./public/images"));

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const galleryRouter = require("./routes/gallery");
app.use("/gallery", galleryRouter);

const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

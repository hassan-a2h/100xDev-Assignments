const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;

app.use((err, req, res, next) => {
    res
        .status(500)
        .send('Could not process request - ' + err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

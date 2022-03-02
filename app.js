const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');

const app = express();
dotenv.config();
app.use(express.json());


mongoose
 .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
})
 .then(() => {
     console.log("Database connection success!!!");
 })
 .catch((err) => {
     console.log("Database connection failed...");
     console.error(err);
     process.exit(1);
 });

 const userRouter = require('./router/user');
 app.use('/user', userRouter);

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
    console.log(`Server is runing port: ${port}`)
});
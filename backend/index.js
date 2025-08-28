// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);

const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send('First Pay backend is running ,please test the server by third party api calls');
})

const startServer= async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI);
     console.log("MONGO DB Connected");
     app.listen(PORT, () => {
         console.log(`Successfully Connected to ${PORT} port`);
       });
    }
    catch(err){
     console.error("MongoDB Connection Failed:", err.message);
     process.exit(1);//exit with failure 
    }
 };
 
 
startServer();

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
      message: err.message || 'Something went wrong! GLOBAL ERROR',
    });
  });
import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.DB_CONNECT,{
        dbName: "PORTFOLIO"
    }).then(()=>{
        console.log("Connected to database.")
    }).catch((error)=>{
        console.log(`Some Error Occured while Connectionf To Database: ${error}`);
    })
}


export default dbConnection;
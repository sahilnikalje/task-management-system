require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT 

const startServer=async()=>{
    try{
        await connectDB()
        app.listen(PORT, ()=>{
            console.log(`Server running on PORT ${PORT}`)
        })
    }
    catch(err){
        process.exit(1)
    }
}
startServer()

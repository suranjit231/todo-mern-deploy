import mongoose from "mongoose";



//========= connecting mongodb using mongoose =================//
const connectMongodb = async()=>{
    const url = `${process.env.DB_URl}/Task_DB`
    try{
        await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log("mongodb is connected!")

    }catch(error){
        console.log(error);
        console.log("mongodb connection falid!")

    }

}

export default connectMongodb;
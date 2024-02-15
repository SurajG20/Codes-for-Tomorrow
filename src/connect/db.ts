import mongoose from "mongoose";

const connectDB = (url:string)=>{
  try {
    console.log('Db Connected')
    return mongoose.connect(url)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
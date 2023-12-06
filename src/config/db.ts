import mongoose from "mongoose"
import { config } from "."

const connectDB = async () => {
    const conn = await mongoose.connect(config.db.mongoURI)

    console.log(`MongoDB Connected ;)`) 
}

export default connectDB
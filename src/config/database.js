'use strict';

import mongoose from 'mongoose';


const urlMongoDb = process.env.MONGODB_URL;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

const connectDB = async () => {
    try {
        await mongoose.connect(
            urlMongoDb,
            connectionParams
        )
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export { connectDB }
  

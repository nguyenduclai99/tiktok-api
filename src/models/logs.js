import mongoose from 'mongoose';

const logs = new mongoose.Schema({
    ip: {
        type: String
    },
    headers: {
        type: Object
    },
    end_point: {
        type: String
    },
    created_at: {
        type: String
    }
})

const logsApi = mongoose.model("logs", logs);

export { logsApi }
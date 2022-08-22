import mongoose from 'mongoose';

const logsCallApiSchema = new mongoose.Schema({
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

const logsCallApi = mongoose.model("logs_call_api", logsCallApiSchema);

export { logsCallApi }
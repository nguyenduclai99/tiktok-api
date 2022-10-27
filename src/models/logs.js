import mongoose from 'mongoose';

const logs = new mongoose.Schema({
    params: {
        type: Object
    },
})

const logsApi = mongoose.model("logs", logs);

export { logsApi }
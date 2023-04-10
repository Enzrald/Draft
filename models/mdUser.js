import mongoose from 'mongoose';

const scmUser = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updateDate: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('mdUser',scmUser)
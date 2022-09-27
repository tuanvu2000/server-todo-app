const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

todoSchema.plugin(toJSON);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
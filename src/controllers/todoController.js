const Todo = require('../models/todo');

const postTodo = async (req, res) => {
    try {
        const newTodo = await Todo.create({
            text: req.body.text,
            completed: false,
        })
        res.status(200).json({ message: 'create todo success', data: newTodo });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getTodos = async (req, res) => {
    try {
        const list = await Todo.find().sort('-createdAt');
        res.status(200).json({ message: 'get list todo success', data: list});
    } catch (error) {
        res.status(500).json(error);
    }
}

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json({ message: 'get todo success', data: todo });
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'delete todo success' });
    } catch (error) {
        res.status(500).json(error);
    }
}

const putStatusCompleted = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(503).json({ message: 'Todo does not exist' });
        }
        const reqBody = {
            completed: req.query.completed,
            completedAt: req.query.completed === "true" ? Date.now() : null,
        }
        Object.assign(todo, reqBody);
        await todo.save();

        res.status(200).json({ message: 'update status success', data: todo });
    } catch (error) {
        res.status(500).json(error);
    }
}

const putTextTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(503).json({ message: 'Todo does not exist' });
        }
        Object.assign(todo, { text: req.body.text });
        await todo.save();

        res.status(200).json({ message: 'update text todo success', data: todo });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    postTodo,
    getTodo,
    getTodos,
    deleteTodo,
    putStatusCompleted,
    putTextTodo
};
const router = require('express').Router();
const todoController = require('../controllers/todoController');

router.get('/', todoController.getTodos);

router.post('/', todoController.postTodo);

router.get('/:id', todoController.getTodo);

router.delete('/:id', todoController.deleteTodo);

router.put('/:id', todoController.putStatusCompleted);

router.put('/edit/:id', todoController.putTextTodo);

module.exports = router;
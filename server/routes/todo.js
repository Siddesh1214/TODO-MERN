const express = require('express');
const { createTodo, getMyTodo, editTodo, deleteTodo } = require('../controllers/Todo');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


router.post('/createTodo', isAuthenticated, createTodo);
router.get('/getMyTodos', isAuthenticated, getMyTodo);
router.put('/editTodo/:id', isAuthenticated, editTodo);
router.delete('/deleteTodo/:id', isAuthenticated, deleteTodo);

module.exports = router;


// const express = require('express');
// const { signup, login } = require('../controllers/User');
// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;
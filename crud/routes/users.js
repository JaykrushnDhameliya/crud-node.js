const express = require('express');
const Controller = require('../controllers/users');

const router = express.Router();

router.get('/', Controller.getUser);
router.get('/:id', Controller.getUserId);
router.post('/', Controller.createUser);
router.delete('/:id', Controller.deleteUser);
router.put('/:id', Controller.updateUser)


module.exports = router;
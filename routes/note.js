const express = require('express')
const router = express.Router()

const create = require('../controllers/note/create')
const remove = require('../controllers/note/delete')
const update = require('../controllers/note/update')
const get = require('../controllers/note/get')
const getOne = require('../controllers/note/getOne')

const auth = require('../middleware/auth')

router.post('/', auth, create)
router.delete('/:id', auth, remove)
router.put('/:id', auth, update)
router.get('/', auth, get)
router.get('/:id', auth, getOne)

module.exports = router
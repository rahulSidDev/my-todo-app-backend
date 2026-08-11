const express = require('express')
const router = express.Router()

const create = require('../controllers/note/create')
const trashed = require('../controllers/note/getTrashed')
const trash = require('../controllers/note/patchTrash')
const removeOne = require('../controllers/note/deleteOne')
const remove = require('../controllers/note/delete')
const restore = require('../controllers/note/patchRestore')
const update = require('../controllers/note/update')
const get = require('../controllers/note/get')
const getOne = require('../controllers/note/getOne')
const checkbox = require('../controllers/note/patchCheckbox')

const auth = require('../middleware/auth')

router.post('/', auth, create)

router.delete('/:id', auth, removeOne)
router.delete('/', auth, remove)

router.put('/:id', auth, update)

router.patch('/trash/:id', auth, trash)
router.patch('/restore/:id', auth, restore)
router.patch('/checkbox/:id', auth, checkbox)

router.get('/', auth, get)
router.get('/trashed', auth, trashed)
router.get('/:id', auth, getOne)

module.exports = router
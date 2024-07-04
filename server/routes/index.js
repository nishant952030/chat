const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkmail')
const checkPass = require('../controller/checkpass')
const userDetails = require('../controller/userDetails')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/uptadeDetails')
const searchUser = require('../controller/searchUser')
const allUsers = require('../controller/allUsers')
const router = express.Router()
// create the user api
router.post('/register', registerUser)
router.post('/login', checkEmail);
router.post('/password', checkPass);
router.get('/user-details', userDetails)
router.get('/logout', logout)
router.post('/update-user', updateUserDetails)
router.post('/search-user', searchUser)
router.get('/all-friends',allUsers)

module.exports = router
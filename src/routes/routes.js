const express = require('express')
const router = express.Router()

const userControls = require('../controller/userController')
const taskControls = require('../controller/taskController')
const verification = require('../middlewares/verification')
const admin = require('../middlewares/admin')
const taskPerformed = require('../middlewares/taskPerformed')
const verified = require('../middlewares/verified')

router.post('/login',verified, userControls.login)
router.post('/register', userControls.registration)
router.post('/send-otp/:email', userControls.send_otp)
router.get('/verify-otp/:email/:otp', userControls.verify_otp)

router.get('/blogs', taskControls.allBlogs)
router.get('/blogs/:category', taskControls.allBlogsByCategory)
router.get('/blogID/:id', taskControls.getBlogById)
router.get('/user/:id', verification, taskControls.getUser)
router.post('/comment', verification, taskControls.postComment)
router.get('/all-comments/:id', taskControls.getAllComments)
router.get('/search/:key', taskControls.searchByName)

router.get('/dashboard/:id', verification, taskControls.dashboard)

// after login
router.post('/createBlog', verification, taskControls.createBlog)
router.post('/updateBlog/:id', verification, taskControls.updateBlog)
router.get('/delete-blog/:id', verification, taskControls.deleteBlog)
router.post('/user-update/:id', verification, userControls.updateUser)

module.exports = router
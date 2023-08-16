// get models
const blogModel = require("../models/blogModel")
const commentModel = require("../models/commentModel")
const userModel = require("../models/userModel")


// create blog
exports.createBlog = async (req, res) => {
  try {
    let reqBody = req.body
    let createBlog = await blogModel.create(reqBody)
    res.status(200).json({
      status: 1,
      data: createBlog
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    let blogID = req.params.id
    console.log(blogID)

    let deletion = await blogModel.deleteOne({ _id: blogID })
    res.status(200).json({
      status: 1,
      data: deletion
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// update blog
exports.updateBlog = async (req, res) => {
  try {
    let blogID = req.params.id
    let reqBody = req.body

    let update = await blogModel.updateOne({ _id: blogID }, reqBody)
    res.status(200).json({
      status: 1,
      data: update
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get all blogs
exports.allBlogs = async (req, res) => {
  try {
    let list = await blogModel.find().select("blogTitle blogText category blogCoverImg _id")

    res.status(200).json({
      status: 1,
      data: list
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get all blogs by category
exports.allBlogsByCategory = async (req, res) => {
  try {
    let list = await blogModel.find({category: req.params.category}).select("blogTitle blogText category blogCoverImg _id")

    res.status(200).json({
      status: 1,
      data: list
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get blog by id
exports.getBlogById = async (req, res) => {
  try {
    let id = req.params.id
    let blog = await blogModel.findOne({_id: id})
    let user = await userModel.findOne({ _id: blog.author }).select("pfp first_name last_name")

    res.status(200).json({
      status: 1,
      data: blog,
      user: user
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get user
exports.getUser = async (req, res) => {
  try {
    let id = req.params.id
    let user = await userModel.findOne({_id: id}).select("pfp first_name last_name")

    res.status(200).json({
      status: 1,
      data: user
    })
  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// post a comment
exports.postComment = async (req, res) => {
  try {
    let comment = req.body
    let createNew = await commentModel.create(comment)
    let commentCount = await blogModel.updateOne({ _id: req.body.commentedOnPost }, { $inc: { commentCount : +1}})
    let findPostAuthor = await blogModel.findOne({ _id: req.body.commentedOnPost }).select("author")
    let userCommentCount = await userModel.updateOne({ _id: findPostAuthor.author }, { $inc: { totalCommentCount: +1 } })

    res.status(200).json({
      status: 1,
      data: findPostAuthor, userCommentCount
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get all comments of a post
exports.getAllComments = async (req, res) => {
  try {
    let id = req.params.id
    let comments = await commentModel.find({ commentedOnPost: id }).select("commentText commentAuthor")
    res.status(200).json({
      status: 1,
      data: comments
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// get all blogs by category
exports.blogCategory = async (req, res) => {
  try {
    let category = req.params.category
    let query = { category: category}
    
    if (req.headers['email']){
      query = { category: category, email: req.headers['email'] }      
    }

    let list = await blogModel.find(query)
    res.status(200).json({
      status: 1,
      data: list
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// count blogs
exports.countBlogs = async (req, res) => {
  try{
    let email = req.headers['email']

    let all = await blogModel.find({email: email}).count('total')
    let tech = await blogModel.find({ email: email, status: "tech"}).count('total')
    let science = await blogModel.find({ email: email, status: "science"}).count('total')
    let history = await blogModel.find({ email: email, status: "history"}).count('total')
    
    res.status(200).json({
      status: 1,
      data: {
        all: all,
        tech: tech,
        science: science,
        history: history
      }
    })
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// search blog by name
exports.searchByName = async (req, res) => {
  try {
    let key = req.params.key
    let blogs = await blogModel.find({ blogTitle: { $regex: key, $options: 'i' } })
    
    res.status(200).json({
      status: 1,
      data: blogs
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

exports.dashboard = async (req, res) => {
  try {
    let id = req.params.id
    let user = await userModel.findOne({_id: id})
    let posts = await blogModel.find({author: id})

    res.status(200).json({
      status: 1,
      user: user,
      blogs: posts
    })
    
  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}
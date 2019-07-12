// Retrieve all blogs
// Retrieve blogs by query for title(slug)
// Retrieve all blogs by query for a tag (req.query.(name of property youre looking for??) and tags are put in as a string array ["", ""]
// Retrieve a blog by id
// Edit a blog
// Delete a blog

import express from 'express'
import _blogsService from '../services/BlogsService.js'

export default class BlogController {

  async createBlog(req, res, next) {
    try {
      let blog = await _blogsService.create(req.body)
      res.send(blog)
    } catch (error) { next(error) }
  }

  async getBlog(req, res, next) {
    try {
      let blog = await _blogsService.findById(req.params.blogId)
      if (!blog) {
        return res.status(400).send("Gyar! Tis not the blog ye be lookin fer")
      }
      res.send(blog)
    } catch (error) { next(error) }
  }

  async getAllBlogs(req, res, next) {
    try {
      let blogs = await _blogsService.find()
      res.send(blogs)
    } catch (error) { next(error) }
  }

  async editBlog(req, res, next) {
    try {
      let editBlog = await _blogsService.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
      res.send(editBlog)
    } catch (error) { next(error) }
  }

  async getBlogByTags(req, res, next) {
    try {
      if (!req.query.tag) {
        return next()
      }
      let blog = await _blogsService.find({ tags: { $in: [req.query.tag] } })
      res.send(blog)
    } catch (error) { next(error) }
  }


  async deleteBlog(req, res, next) {
    try {
      let blog = await _blogsService.findByIdAndDelete(req.params.blogId)
      res.send("blog has been sent to davey jones!")
    } catch (error) { next(error) }

  }

  constructor() {
    this.router = express.Router()
      .post('', this.createBlog)
      .get('', this.getAllBlogs)
      .get('/:blogId', this.getBlog)
      .get('', this.getBlogByTags)

      .put('/:blogId', this.editBlog)
      .delete('/:blogId', this.deleteBlog)

  }
}
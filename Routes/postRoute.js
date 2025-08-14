import Router from 'express'
import { createPost, getPosts, getAPost, updatePost, deletePost } from '../Controllers/postController.js'
import { authMiddleware, adminCheck } from '../Middleware/authmiddleware.js'


const postRouter = Router()

postRouter
          .post('/post/create',authMiddleware,adminCheck, createPost)
          .get('/posts', getPosts)
          .get('/post/:id', getAPost)
          .put('/update/:id',authMiddleware,adminCheck, updatePost)
          .delete('/delete/:id',authMiddleware,adminCheck, deletePost)


export default postRouter          
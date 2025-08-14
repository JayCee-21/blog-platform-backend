import Router from 'express'
import { createComment, getComments, deleteComment } from '../Controllers/commentController.js'
import { authMiddleware } from '../Middleware/authmiddleware.js'

const commentRouter = Router()

commentRouter
            .post('/comment', authMiddleware, createComment)
            .get('/comments', getComments)
            .delete('/:commentId', authMiddleware, deleteComment)

    
    export default commentRouter        
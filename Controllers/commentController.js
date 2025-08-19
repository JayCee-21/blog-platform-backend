import Comment from "../Models/commentModel.js";

//create comment
export const createComment = async(req, res) => {
    const { text, postId } = req.body
    if(!text || !postId ) {
        return res.status(400).json({message: "Please provide all fields"})
    }
     

    // adding a comment to the post
    try {
        const comment = new Comment({
            text,
            post:postId,
            author:req.user.id
        })

        //saving the comment
        await comment.save()
        res.status(200).json({message: "Comment added", comment})

    } catch (error) {
        res.status(500).json(error)
    }
}


//get comments (public)
export const getComments = async(req,res) => {
    try {
        const comments = await Comment.find().populate('author', 'username')
        if(!comments) {
            return res.status(404).json({message: "Comment not found"})
        }
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


//delete comment by logged-in user or admin
export const deleteComment = async(req, res) => {
    const commentId = req.params.commentId

    try {
        const comment = await Comment.findByIdAndDelete(commentId)
        if(!comment) {
            return res.status(404).json({message: "Comment not found"})
        }

        //logged-in user or admin only
        if(comment.author.toString() !== req.user.id && !req.user.admin) {
            return res.status(403).json({message: "Not Authorised to delete this comment"})
        }

        res.status(200).json({message: "Comment deleted successfully"})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
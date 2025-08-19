import Post from "../Models/postModel.js";



export const createPost = async(req, res) => {
    const {title, content} = req.body
    if(!title || !content) {
        return res.status(400).json({message: "Please Provide all Fields"})
    }
       try {
        const post = new Post({
        title,
        content, 
        author: req.user._id
    })
    await post.save()
    res.status(200).json({message: "Post Created Successfully", post})

       } catch (error) {
        res.status(500).json({error:error.message})
       }
}

export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find().populate("author", "username")
        return res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export const getAPost = async(req,res) => {
    const { id } = req.params
     
    try {
        const post = await Post.findById(id).populate("author", "username")
        if(!post) {
            return res.status(400).json({message: "Post not found"})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


// update post by admin
export const updatePost = async(req,res) => {
    const { id } = req.params
    const { title, content } = req.body

    try {
        const post = await Post.findById(id)
        if(!post) {
            return res.status(400).json({message: "Post not found"})
        }
        // check if the post to be updated is by admin
        if(!req.user.admin) {
            return res.status(404).json({message: "Not Authorized to update this post"})
        }

         //update provide fields
         post.title = title ?? post.title
         post.content = content ?? post.content

         const UpdatedPost = await post.save()
         res.status(200).json({message: "Post Updated Successfully", UpdatedPost})

    } catch (error) {
        res.status(500).json(error)
    }
}

// delete post by author or admin
export const deletePost =async(req,res) => {
    const { id } = req.params

    try {
        const post = await Post.findByIdAndDelete(id)
        if(!post) {
            return res.status(400).json({message: "Post not found"})
        }

        //only admin
        if(!req.user.admin) {
            return res.status(404).json({message: "Not Authorized to delete this post"})
        }

        res.status(200).json({message: "Post deleted successfully"})

    } catch (error) {
        res.status(500).json(error)
    }
}
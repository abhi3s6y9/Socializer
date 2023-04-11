const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    let post = await Post.findById(req.body.post);

    if(post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        post.save();

        res.redirect('/');
    }
}

module.exports.destroy = async function(req, res){
    let comment = await Comment.findById(req.params.id);
    if(comment.user == req.params.id){
        let postId = comment.post;
        await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
        comment.deleteOne(comment._id);

        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    let post = await Post.findById(req.params.id);

    // .id means converting the object id into string
    if(post.user == req.user.id){
        // we should not use post.id instead of post._id as post.id is the method provided by mongoose and it returns a string instead of object which is returned by post._id
        // await Post.findByIdAndDelete(post._id);
        post.deleteOne(post._id);

        await Comment.deleteMany({post: req.params.id});

        return res.redirect('back');
    }
    else{
        return res.redirect('back');
    }
}

const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){

    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
    
        req.flash('success', 'Post Published!');
        return res.redirect('back');
    }
    catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){

    try{

        let post = await Post.findById(req.params.id);
    
        // .id (not ._id) means converting the object id into string.
        if(post.user == req.user.id){
            // we should not use post.id instead of post._id as post.id is the method provided by mongoose and it returns a string instead of object which is returned by post._id
            // await Post.findByIdAndDelete(post._id);
            post.deleteOne(post._id);
    
            await Comment.deleteMany({post: req.params.id});

            req.flash('success', 'Post and associated comments deleted!');
    
            return res.redirect('back');
        }
        else{
            req.flash('error', "You are not authorised to delete this post");
            return res.redirect('back');
        }

    }

    catch(err){
        // console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

const Post = require('../models/post');

module.exports.home = async function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');
    
    // Populate the user of each post
    var posts = await Post.find()
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                })
                .exec();

    return res.render('home', {
        title: "Home page",
        posts: posts
    });

}
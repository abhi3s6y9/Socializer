const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');
    
    try{
        // Populate the user of each post
        var posts = await Post.find()
                    .populate('user')
                    .populate({
                        path: 'comments',
                        populate: {
                            path: 'user'
                        }
                    });
    
        let users = await User.find();
    
        return res.render('home', {
            title: "Home page",
            posts: posts,
            all_users: users
        });
    }

    catch(err){
        console.log('Error', err);
        return;
    }

}
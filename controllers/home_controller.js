const Post = require('../models/post');

module.exports.home = async function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');
    
    // Populate the user of each post
    var posts = await Post.find().populate('user').exec();

    return res.render('home', {
        title: "Home page",
        posts: posts
    });

    // await Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home',{
    //         title: "Home",
    //         posts: posts
    //     });
    // });

}
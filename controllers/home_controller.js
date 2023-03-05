module.exports.home = function(req, res){
    // return res.end('<h1>Express is up for Socializer</h1>');
    
    return res.render('home', {
        title: "This is the title of my home page"
    });
}
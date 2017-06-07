var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

// Connecting to databse
db = mongoose.connect('mongodb://localhost/blogdb');

//checking db connection success
mongoose.connection.once('open', function() {

	console.log("database connection opened successfully");

});

//  db model file
var Blog = require('./blogSchema.js');
var blogModel = mongoose.model('blogModelX');

//middlewares
app.use(function(req,res,next){
	console.log("Time n Date Log ",new Date());
	console.log("Request url Log ",req.originalUrl);
	console.log("Request Method Log ",req.method);
	console.log("Request Ip address Log ",req.ip);
	next();
});



/////////// API for Blog////////////


// routes magic
app.get('/', function (req, res) {

  res.send("API for Blog App")

});

// route to GET all blogs
app.get('/blogs',function(req, res) {

  blogModel.find(function(err,result){
    if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}
	});

});
// end route to GET all blogs


// route to get a unique blog
app.get('/blogs/:id',function(req, res) {

	blogModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log("something is not working");
			res.send(err);
		}
		else{
			res.send(result)
		}
	});

});
// end route to get a unique blog

//start route to create a blog
	app.post('/blog/create',function(req, res) {
		var newBlog = new blogModel({

			title 		: req.body.title,
			subTitle 	: req.body.subTitle,
			blogBody 	: req.body.blogBody

		}); // end newBlog

		//date
		var today = Date.now();
		newBlog.created = today;

		//tags
		var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		newBlog.tags = allTags;

		// author
		var authorInfo = {fullName: req.body.authorFullName,email:req.body.authorEmail,website:req.body.authorWebsite};
		newBlog.authorInfo = authorInfo;

		newBlog.save(function(err){
			if(err){
				console.log(err, "something is not working");
				res.send(err);

			}
			else{
				res.send(newBlog);
			}

		});


	});

// end route to Create a blog


// blog edit
app.put('/blogs/:id/edit',function(req, res) {

	var update = req.body;

	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("something is not working");
			res.send(err)
		}
		else{
			res.send(result)
		}


	});

});


//404
app.use(function(req, res) {
   res.status('404').send("404: Page not Found");
   console.log("404 crime scene");
});
//404

///////////////////////////// end rest api  for blog app //////////////////////////////

app.listen(8080, function () {
  console.log("i'm  listening to port 3000!");
});

// {
//     "node": true,
//     "camelcase": true,
//     "indent": 4,
//     "undef": true,
//     "quotmark": "single",
//     "maxlen": 80,
//     "trailing": true,
//     "curly": true,
//     "eqeqeq": true,
//     "forin": true,
//     "immed": true,
//     "latedef": true,
//     "newcap": true,
//     "nonew": true,
//     "unused": true,
//     "strict": true
// }

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({  
  userName: String,
  email: String,
  password: String
});

var movieSchema = new mongoose.Schema({
	movieName: String,
	mUserId: [String]
});

var UserDb = mongoose.model('user', userSchema); 
var MovieDb = mongoose.model('movie', movieSchema);

mongoose.connect('mongodb://localhost/Project1');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use("/", express.static("public"));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

console.log('server side, listening at port 3000');
app.post('/signup', function(req, res){
	console.log('inside post method');
	UserDb.findOne({userName: req.body.username}).exec(function(err, user){
		if(!user){
			var u1 = new UserDb({userName: req.body.username,
								password: req.body.password,
								email: req.body.email });
			u1.save(function(err, result) {
				if(err){
					console.log('error while signing up'+err);
					res.json('error while signing up');
				}
				else{
					console.log('user registered successfully');
					res.json('user registered successfully');
				}
			});
		}
		else{
			console.log('user already exists');
			res.json('user already exists, please try again with diffrent user name');
		}
		});
	var str = JSON.stringify(req.body);
	// console.log(req.body);
	// console.log(str);
	var obj = JSON.parse(str);
	// console.log(obj);
	// console.log('body: ' + JSON.stringify(req.body));
});

app.post('/login', function(req, res){
	console.log('inside post-login method');
	UserDb.findOne({userName: req.body.username1}).exec(function(err, user){
		if(!user){
					console.log('user does not exist'+err);
					res.json({'error':'user does not exist, please sign up first'});
				}
		else{
			    if(user.password !== req.body.password1){
			    			console.log('authentication failure');
							res.json({'error':'authentication failure, please check your details'});
			    }
			    else{
					console.log('user login successful');
					MovieDb.find({mUserId:user._id},{movieName:1,_id:0},function(err, movies) {
					    if (err) {
					      // onErr(err, callback);
					      console.log('error!!!!');
					    } else {
					      console.log(movies)
					      res.json({'username':req.body.username1, 'userid':user._id, 'movieList':movies});
					    }
					});
					// res.json({'username':req.body.username1, 'userid':user._id});
					}
			}
					
		
	});
	// var str = JSON.stringify(req.body);
	// var obj = JSON.parse(str);
});

app.post('/addmovies', function(req, res){
	var flagCounter = 0;
	console.log('inside addmovies post method');
	var movieName = req.body.movieName;
	var uName = req.body.userId;
	console.log(movieName);
	console.log(req.body.userId);
	MovieDb.findOne({movieName: req.body.movieName}).exec(function(err, movie){
		if(!movie){
			var m1 = new MovieDb({movieName: req.body.movieName});
			m1.mUserId.push(uName);
			m1.save(function(err, result) {
				if(err){
					console.log('error while adding movie');
					res.json('error while adding movie');
				}
				else{
					console.log('movie added successfully');
					res.json('movie added successfully');
				}
			});
		}
		else{
			console.log(movie.mUserId.length);
			for(var i=0;i<movie.mUserId.length;i++){
				if(movie.mUserId[i] === req.body.userId)
				{
					// console.log('movie already exists in user's list');
					console.log(movie.mUserId[i]);
					flagCounter++;
				}
				console.log(flagCounter);
			}
			if(flagCounter == 1){
				res.json("movie already exists in your list");
			}
				else{
					movie.mUserId.push(req.body.userId);
					movie.save(function(err, result) {
						if(err){
							console.log('error while adding movie');
							res.json('error while adding movie');
						}
						else{
							console.log('movie added to your list successfully');
							res.json('movie added to your list successfully');
						}
					});
				}
			
		}
		});
});

// app.get('/hi', function(req,res) {
// 	console.log('in get all movies');
// 	var movieCollection = MovieDb.find();
// 	console.log(movieCollection);
// 	console.log(JSON.stringify(movieCollection));
// 	res.json(movieCollection);
// });

app.get('/ShowMovie', function(req,res) {
	console.log('in get all movies');
	MovieDb.find({},{movieName:1,_id:0},function(err, movies) {
    if (err) {
      // onErr(err, callback);
      console.log('error!!!!');
    } else {
      // mongoose.connection.close();
      console.log(movies);
      var movieIndex = movies[Math.floor(Math.random()*movies.length)];
      res.json(movieIndex);
      // callback("", movies);
    }
		});
});

var showMoviesFor1User = function(userid){
	console.log('in get movies for 1 user');
	MovieDb.find({mUserId:userid},{movieName:1,_id:0},function(err, movies) {
	    if (err) {
	      // onErr(err, callback);
	      console.log('error!!!!');
	    } else {
	      // mongoose.connection.close();
	      console.log(movies)
	      res.json(movies);
	      // callback("", movies);
	    }
	});
}


app.listen(3000);
//client side javascript

//client side javascript

/*
var ConnectToOMDB = function (){
  $.ajax(
  {
    type: 'GET',
    url: 'http://www.omdbapi.com/?t=dark+Knight&y=&plot=short&r=json',
    success : function(data){
      console.log(data);
    }
  });
  
}
*/
//==========================================================
//Use to display movie into html 
//  IN    movieObject - movieObject only that is formatted
//                      from OMBD
//  
//  TAG   #movieCard - html id 
//==========================================================
var ListArray= [];
var AddMovieToHtml= function(movieObject){
  'use strict';

  //$('#movieCard2').append(
  $('#movieCard').empty();

   $('#movieCard').append(
    '<div class="ui middle aligned center aligned cards">'+
      '<div class="ui centered card"><div class="image">' +
        '<img src="' + movieObject.mPosterUrl + '">'+
      '</div>' +
      '<div class="content">' +
        '<div class="header" id="movieTitle">'+ movieObject.mTitle + '</div>' +
  
        '<div class="description">' + movieObject.mYear + '</div>' +
      '</div>' +
      '<div class="extra content" id="VoteResult">' +
        '<div class="meta">VotePlease T-T</div>'+
        '<div class="ui two buttons">' + 
          '<div id="VoteUp" class="ui green button">Watch</div>'+
          '<div class="ui red button" id="VoteDown">Ignore</div>'+
        '</div>'+
      '</div>'+
    '</div>'
    );

    //supra code
    // $('#movieCard').append(
    //   '<div class="ui middle aligned center aligned cards">'+
    //   '<div class="ui centered card"><div class="image">' +
    //     '<img src='+movieObject.mPosterUrl+'>'+
    //   '</div>' +
    //   '<div class="content">' +
    //     '<div class="header" id="movieTitle">'+ movieObject.movieName + '</div>' +
    //   '</div>' +
    //   '<div class="extra content" id="VoteResult">' +
    //     '<div class="meta">VotePlease T-T</div>'+
    //     '<div class="ui two buttons">' + 
    //       '<div id="VoteUp" class="ui green button">Watch</div>'+
    //       '<div class="ui red button" id="VoteDown">Ignore</div>'+
    //     '</div>'+
    //   '</div>'+
    // '</div>'
    // );
    
    //test();

    VoteButton(movieObject.movieName);
    /*
    '<div class="ui two buttons">' + 
      '<div id="VoteUp" type="button" class="ui basic green button">Watch</div>'+
      '<div class="ui basic red button" id="VoteDown">Ignore</div>'+
    '</div>'+
    '</div></div>' +
    '</div>'
    */
    
    console.log("printEverything");
}

var VoteButton = function(nameMovie){
  
  $('#VoteUp').click(function () {
    console.log('TTTT 33' + nameMovie);
    $('#VoteResult').empty();

    Voting(nameMovie,1);
    
  });
  
  $('#VoteDown').click(function () {
    console.log('testDown');
    $('#VoteResult').empty();

    Voting(nameMovie,-1);
    
  });

  $('#nextButton').click(function(){
  console.log(nameMovie +'Next');
    callShowAllMoviesFunction();
  });

}



var Nexting = function(){
  
  $('#VoteResult').append('<div class="ui button" id="nextButton">NEXT</div>');
  VoteButton();
}


var Voting = function(nameMovie,score){
  var result; 
  var jsonStr = JSON.stringify({'movieName': nameMovie, 'score': score});
	console.log(jsonStr);
  //$('#VoteResult').append('<h3>Score: ' + 10 + ' for ' + nameMovie + '</h3>');
  
  $.ajax({  
    type: 'POST',
    data: jsonStr,
      dataType: 'json',
      contentType: 'application/json',
      url: 'http://localhost:3000/scoreUpdate',            
      success: function(data) {
        result = data;
        console.log(result);
        $('#VoteResult').append('<h3>Watch: ' + result.upVote + ' | Ignore: ' + result.downVote + '</h3>');
        Nexting();
      },
      error: function(){
        console.log("Cannot Vote")
      }
  });
  
}
//end of new code

$(function(){
  
  
  

	callShowAllMoviesFunction();

	$('.watch').click(function(){
		console.log('watch button clicked');
	});

	$('.right_menu2').hide();
	$('.login_seg').hide();

	$('.logout').click(function(){

		$('.right_menu2').hide();
		$('.right_menu1').show();
		$('.login_seg').hide();
		$('.main_seg').show();
		$('span.userId').empty();

	});

	$('.signup').click(function () {
    $('.signup_modal').modal('show');
	});

	$('.login').click(function () {
    $('.login_modal').modal('show');
	});

	$('.addmovie_button').click(function () {
    $('.addmovie_modal').modal('show');
	});

	$('.showmovie_button').click(function () {
    var userID = $('span.userId').text();
    var jsonStr = JSON.stringify({'userID': userID});
    callShowMoviesFor1User(jsonStr);
    $('.movie_seg').show();
	});

	$('.login_form').form({
		fields: {
					ulname: {
		      		identifier : 'ulname',
		      		rules: [
				        {
				          type   : 'empty',
				          prompt : 'Please enter a username'
				        }
			      		]
		    		},
		    		pwd: {
		      			identifier : 'pwd',
					      rules: [
					        {
					          type   : 'empty',
					          prompt : 'Please enter a password'
					        }
					      ]
		    			},
				},	
		onSuccess: function(event) {
	    callLogInFunction();
	    event.preventDefault();
	    console.log('form valid');
		}

	});

	$('.signup_form').form({ 
	fields: {
					username: {
		      identifier : 'uname',
		      rules: [
		        {
		          type   : 'empty',
		          prompt : 'Please enter a username'
		        }
		      ]
		    },
		    email: {
		      identifier : 'email',
		      rules: [
				        {
				          type   : 'email',
				          prompt : 'Please enter a valid email address'
				        },
			
		      ]
		    },
		    pwd1: {
		      identifier : 'pwd1',
		      rules: [
		        {
		          type   : 'empty',
		          prompt : 'Please enter a password'
		        },
		        {
		          type   : 'length['+6+']',
		          prompt : 'Your password must be at least 6 characters'
		        }
		      ]
		    },
		    pwd2: {
		      identifier : 'pwd2',
		      rules: [
		      	{
		          type   : 'empty',
		          prompt : 'Please enter a password'
		        },
		        {
		          type   : 'length['+6+']',
		          prompt : 'Your password must be at least 6 characters'
		        },
		        {
		          type   : 'match[pwd1]',
		          prompt : 'Passwords do not match'
		        }
		      ]
		    },
		    terms: {
		      identifier : 'chck',
		      rules: [
		        {
		          type   : 'checked',
		          prompt : 'You must agree to the terms and conditions'
		        }
		      ]
		    }
	},	
		onSuccess: function(event) {
	    callSignUpFunction();
	    event.preventDefault();
	    console.log('form valid');
	  	}
  });
	$('.addmovie_form').form({
		fields: {
					moviename: {
		      		identifier : 'moviename',
		      		rules: [
				        {
				          type   : 'empty',
				          prompt : 'This field cannot be empty'
				        }
			      		]
		    		}
				},	
		onSuccess: function(event) {
	    callAddMoviesFunction();
	    event.preventDefault();
	    console.log('form valid');
		}
	});

	
	
});


//ListAllUserMovie-------------------------------------------------
// list all the movie the user have with the score attach to it
//  IN       - arrayLenght - size of an array
//  IN       - movieArray - array of an object
//                          contian movieName and Score
//  TAG      - listAllMovies - id
//------------------------------------------------------------------
/*
var ListAllUserMovie = function(arrayLenght, movieArray){
  var counter = 0;
  $('#listAllMovies').empty();
  
  $('#listAllMovies').append('<div class="ui middle aligned dividec list">');
  for(; counter < arrayLenght; counter++){
    $('#listAllMovies').append(
    '<div class="item">' +
      '<div class="right floated content">' +
        '<div>' + movieArray[counter].score + '</div>' +
      '</div>' +
      '<div class="content">' + movieArray[counter].movieName + '</div>' +
    '</div>'
    )
  }
    $('#listAllMovies').append('</div>');
}

*/

var callSignUpFunction = function(){
		// body...
		// submit form data as json on button click
		var uname = document.getElementsByName('uname')[0].value;
		var email = document.getElementsByName('email')[0].value;
		var pwd1 = document.getElementsByName('pwd1')[0].value;
		var jsonStr = JSON.stringify({'username': uname, 'email': email, 'password': pwd1});
		console.log(jsonStr);

		$.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/signup',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(jsonStr);
                                    console.log(JSON.stringify(data));
                                    console.log(data);
                                    $('.result').html(data);
                                    $('.signup_form').trigger('reset');
                                    $('login_modal').modal('destroy');
                                }
                        });
	 }
	 var callLogInFunction = function(){
		// body...
		// submit form data as json on button click
		var ulname = document.getElementsByName('ulname')[0].value;
		var pwd = document.getElementsByName('pwd')[0].value;
		var jsonStr = JSON.stringify({'username1': ulname, 'password1': pwd});
		console.log(jsonStr);

		$.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/login',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(jsonStr);
                                    console.log(JSON.stringify(data));
                                    console.log(data);

                                    if(data.error){
                                    	$('.result2').html(data.error);
                                    	$('.login_form').trigger('reset');
                                    }
                                    else{
                                    	$('.result2').html(data);
	                                    $('.login_form').trigger('reset');
	                                    $('.login_modal').modal('hide');

	                                    $('.right_menu1').hide();
	                                    $('.pointing.label').text('Welcome '+data.username);

	                                    $('.userId').text(data.userid);
	                                    console.log(data.userid);
	                                    $('.userId').hide();

	                                    $('.right_menu2').show();

	                                    $('.login_seg').show();
	        							$('.main_seg').hide();

	        							$('.movie_seg').hide();

	        							// console.log(data.movieList.length);
	        							// for(var i=0;i<data.movieList.length;i++)
	        							// {
	        							// 	console.log('inside for loop');
	        							// 	console.log(data.movieList[i].movieName);
	        							// 	$result = $('<div class='+"'listitem'"+'><div class='+"'listcontent'"+'>').
                //                     		text(data.movieList[i].movieName);
                //                     		$('.listitem').append($result);
	        								
	        							// }
                                    }
                                    	

                      }
                      
                    //%%%%%%%%%%%%%%%%%%%%%%%%
                    //%%%Use for the List%%%%%
                    //%%%%%%%%%%%%%%%%%%%%%%%%
                    //{movieList: [{movieName: <> , movieScore: <>}]}
                    //ListAllUserMovie(data.movieList.lenght, data.movieList);

          });
		//get all the movies for this user from database


	 }
	 var callAddMoviesFunction = function() {
	 	// body..
    console.log('calladdmf');
	 	var movieName = document.getElementsByName('moviename')[0].value;
	 	var userID = $('span.userId').text();
	 	console.log(userID);
	 	// var uname = 
		var jsonStr = JSON.stringify({'movieName': movieName, 'userId': userID});
		console.log(jsonStr);
        $.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/addmovies',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(jsonStr);
                                    console.log(JSON.stringify(data));
                                    console.log(data);
                                    $('.result3').html(data);
                                    $('.addmovie_form').trigger('reset');
                                    // $('.addmovie_modal').modal('hide');
                                    $('.result3').html();
                                    

                                    // $('.right_menu1').hide();
                                    // $('.pointing.label').text('Welcome '+data);

                                    // $('.right_menu2').show();

                                }
                        });
	 }
	 var callShowAllMoviesFunction =function () {
	 	// body...
	 	console.log('in ajax get');
	 	$.ajax({
                    type: 'GET',
                    // data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/ShowMovie',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(JSON.stringify(data));
                                    console.log(data);
                                    AddMovieToHtml(data);
                                    // $('.result3').html(data);
                                    // $('.addmovie_form').trigger('reset');
                                    // // $('.addmovie_modal').modal('hide');
                                    // $('.result3').html();
                                    ConnectToOMDB();

                                    // $('.right_menu1').hide();
                                    // $('.pointing.label').text('Welcome '+data);

                                    // $('.right_menu2').show();

                                }
                        });
	 }

var callShowMoviesFor1User = function(jsonStr){

		$.ajax({
                    type: 'POST',
                    data: jsonStr,
                    dataType: 'json',
                    contentType: 'application/json',
                    url: 'http://localhost:3000/showMoviesFor1User',            
                    success: function(data) {
                                    console.log('success');
                                    console.log(jsonStr);
                                    console.log(JSON.stringify(data));
                                    console.log(data);

                                    if(data.error){
                                    	// $('.result2').html(data.error);
                                    	console.log('error');
                                    }
                                    else{
	        							console.log(data.movieList.length);
	        							if(ListArray.length > 0){
	        									ListArray.push(data.movieList[data.movieList.length-1].movieName);
	        									// $result = $('<div class='+"'ui blue segment'"+'>').
	                 //                    		text(data.movieList[data.movieList.length-1].movieName);
												$('.movie_seg').append('<div class='+"'ui blue segment'"+'>'+
													data.movieList[data.movieList.length-1].movieName +
													'<div class='+'"ui right floated span"'+'><i class='+"'thumbs up icon'"+'></i>'+data.movieList[data.movieList.length-1].mUpVote+
													'<i class='+"'thumbs down icon'"+'></i>'+data.movieList[data.movieList.length-1].mDownVote+'</div></div>'
													);	
	        							}
	        							else{
	                                    		for(var i=0;i<data.movieList.length;i++)
		        								{
		        								console.log(data.movieList[i].movieName);
		        								ListArray.push(data.movieList[i].movieName);
	                                    		$('.movie_seg').append('<div class='+"'ui blue segment'"+'>'+
													data.movieList[i].movieName +
													'<div class='+'"ui right floated span"'+'><i class='+"'thumbs up icon'"+'></i>'+data.movieList[i].mUpVote+
													'<i class='+"'thumbs down icon'"+'></i>'+data.movieList[i].mDownVote+'</div></div>'
													);	
	                                    		}
	        								
	        							}
                                    }
                                    	

                                }


                        });

	 }



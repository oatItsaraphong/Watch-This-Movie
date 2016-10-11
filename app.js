$(function(){

	$('.ui.form').form({
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
		    password2: {
		      identifier : 'pwd2',
		      rules: [
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
	}	
  });

});


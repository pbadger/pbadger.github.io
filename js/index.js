$(document).on('ready', function(){
  var logged_in = !!localStorage.getItem('logged_in')
  var email_login_possible;

  if(logged_in){
    $('.logout').show()
  }

  $('.poll .radio').click(function(){
    $('.poll .answers').hide()
    $('.poll .graph').show()
  })  

  $('.logout').click(function(){
    localStorage.removeItem('logged_in');
    $(this).hide()
  });

  $('.reply_button').click(function(){
    if(!logged_in){
      $('.login-modal, .login-modal-overlay').show()
      $('.logout').show()
    }

    show_response_for(this);
  });


  // response stuff 
  var response_html_from = function(post_text){
    return "<div class='container'>You: " + 
    post_text + "</div>"

  }

  var show_response_for = function(el){
    $(el).parents('.post:first').find('.response').show();
  }

  $('.post .post-button').click(function(){
    var post_text = $(this).siblings('textarea').val()
    $(this).parents('.post').append(response_html_from(post_text))
    $(this).parents('.response:first').hide()
  });


  // Login stuff!

  $('.login-modal .fb-login').click(
    function(){
      $('.login-modal, .login-modal-overlay').hide()
    }
  )

  $('.login-modal .email-login').click(function(){
    $(this).siblings('.inputs').show()
    email_login_possible = true
  });

  logged_in = true
  localStorage.setItem('logged_in', true)


  // share button stuff
  $('.share_button').click(function(){
    $('.sharing-modal').show();
  });


  $('.sharing-modal .closer, .share-button').click(function(){
    $('.sharing-modal').hide()
  })


  // voting stuff
})



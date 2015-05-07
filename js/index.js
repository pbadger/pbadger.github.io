$(document).on('ready', function(){
  var logged_in = !!localStorage.getItem('logged_in')
  var video_recorded;
  var current_posts = JSON.parse(localStorage.getItem('posts')) || {}

  var response_html_from = function(post_text){
    html = "<div class='container user-response'>You: " + 
    post_text + "</div>"
    if(video_recorded){
      html += "<img src='img/recorded_video.png'>"
    }
    return html
  }

  if(!$.isEmptyObject(current_posts)){
    for(i=0; i<3; i++){
      if(current_posts[i]){
        $($('.post')[i-1]).append(response_html_from(current_posts[i]))
      }
    }
  }

  if(logged_in){
    $('.logout').show()
  }

  $('.poll button').click(function(){
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


  $('.poll input').click(function(){
    $('.other-option').hide()
    $('.other-button').css('display', 'inline-block')
    $('.other-button').animate({opacity: 1}, 1000)
  });


  // response stuff 

  var create_response = function(post_text, post_number){
    current_posts[post_number] = post_text
    localStorage.setItem('posts', JSON.stringify(current_posts))
  }

  var show_response_for = function(el){
    $(el).parents('.post:first').find('.response').show();
  }

  $('.post .post-button').click(function(){
    var post_text = $(this).siblings('textarea').val()
    var post_number = $(this).parents('.post').data('post')

    $(this).parents('.post').append(response_html_from(post_text))
    video_recorded = false
    $(this).parents('.response:first').hide()
    create_response(post_text, post_number)
  });


  var log_in = function(){
    logged_in = true;
    localStorage.setItem('logged_in', true);
  }

  $('.response .add_video').click(function(){
    $(this).parents('.response').find('.add_video').hide()
    $(this).parents('.response').find('.recorded_video').show()
    video_recorded = true
  });

  // Login stuff!

  $('.login-modal .fb-login').click(
    function(){
      log_in()
      $('.login-modal, .login-modal-overlay').hide();
    }
  );

  $('.login-modal .email-login').click(function(){
    $(this).siblings('.inputs').show();

    $('.login-modal .email-login').click(function(){
      log_in();
      $('.login-modal, .login-modal-overlay').hide(); 
    });
  });

  // share button stuff
  $('.share_button').click(function(){
    $('.sharing-modal').show();
  });


  $('.sharing-modal .closer, .share-button').click(function(){
    $('.sharing-modal').hide();
  });


  // voting stuff
  
  $('.up-vote').click(function(evt){
    $('.upvoting-options').css('top', evt.clientY + 15);
    $('.upvoting-options').show();
  });

  $('.down-vote').click(function(evt){
    $('.downvoting-options').css('top', evt.clientY + 15);
    $('.downvoting-options').show();
  });

  $('.upvoting-options .closer, button').click(function(){
    $(this).parents('.upvoting-options').hide()
  });

  $('.downvoting-options .closer, button').click(function(){
    $(this).parents('.downvoting-options').hide()
  });


  // Description stuff
  $('.townhall-desc .reveal-info').click(function(){
    $('.townhall-desc .extended-text').show()
    $(this).hide()
  })

  $('.townhall-desc .hide-info').click(function(){
    $('.townhall-desc .extended-text').hide()
    $('.townhall-desc .reveal-info').show()
  })
})



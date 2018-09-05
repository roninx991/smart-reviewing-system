import swal from 'sweetalert';

// Import bootstrap
import 'bootstrap';

// Import the page's CSS. Webpack will know what to do with it.
import "../styles/app.css";

// ================================= Frontend ===============================

var signIn = $('.sign-in'),
   signUp = $('.sign-up'),
   card1 = $('#card-box-main-1'),
   card2 = $('#card-box-main-2'),
   submit = $('.submit');

function ifActive(elem){
  if (elem.hasClass('active')) {
    return true;
  } else {
    return false;
  }
}

function switchCards(){
  signUp.on('click', function(e){
    // e.preventDefault();
    if (ifActive(signIn)){
      signUp.addClass('active');
      signIn.removeClass('active');
      card1.removeClass('show-me').addClass('hide-me');
      card2.removeClass('hide-me').addClass('show-me animated bounceInRight');
      }
    }
  );
  signIn.on('click', function(e){
    // e.preventDefault();
    if (ifActive(signUp)) {
      signUp.removeClass('active');
      signIn.addClass('active');
      card2.removeClass('show-me').addClass('hide-me');
      card1.removeClass('hide-me').addClass('show-me animated bounceInLeft');
    }
  });
    
}

switchCards();
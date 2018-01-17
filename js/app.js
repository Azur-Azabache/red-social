$(document).ready(function() {
  $('#btn-login').on('click', function() {
    $(location).attr('href', 'login.html');
  });

  $('#btn-signup').on('click', function() {
    $(location).attr('href', 'signUp.html');
  });
});

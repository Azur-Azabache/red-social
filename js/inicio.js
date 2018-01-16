$(document).ready(function() {
  var $input2 = $('#input2');
  var $textArea1 = $('#textarea1');
  var $btnPost = $('#btnPost');
  var $board = $('#board');
  var $file = $('#file');
  var img = 'holu';
  var $comment = $('#comment');
  var $commentBox = $('#commentBox');
  var $btnComment = $('#btnComment');
  moment.locale('es');
  var $date = moment().format('lll');

  // Menu Hamburguesa
  $('.button-collapse').sideNav();

  $('.foto-user').attr('src', localStorage.photo);
  $('.name').text(localStorage.name);
  $('.email').text(localStorage.email);

  // Cursor automaticamente aparecerá en el textarea
  $textArea1.focus();

  // Habillita y dehabilita botón
  $textArea1.on('input', function() {
    if ($textArea1.val() === '') {
      $btnPost.addClass('disabled');
    } else {
      $btnPost.removeClass('disabled');
    }
  });

  // funcion postear
  $btnPost.on('click', function() {
    if ($file.val() === '') {
      // alert('hola');
      var $text = $textArea1.val();
      $($board).prepend('<form class=\'col s12\'><div class=\'row second-part\' ><div class=\'col s2\'><img src=\'\' class=\'circle responsive-img foto-user\'></div><div class=\'col s10\'>' + '<span class="date">' + $date + '</span><br><br><p>' + $text + '</p></div></div></form>');
      $('.foto-user').attr('src', localStorage.photo);
      $textArea1.val('');
      $btnPost.addClass('disabled');
    } else {
      var $text = $textArea1.val();
      $($board).prepend('<form class=\'col s12\'><div class=\'row second-part\' ><div class=\'col s2\'><img src=\'\' class=\'circle responsive-img foto-user\'></div><div class=\'col s10\'>' + '<span class="date">' + $date + '</span><br><br><p>' + $text + '</p><img class="imageUpload" src="' + img + '"></div></div></form>');
      $('.foto-user').attr('src', localStorage.photo);
      $textArea1.val('');
      $btnPost.addClass('disabled');
      $input2.val('');
      img = '';
    }
  });

  // Cargar imagenes
  $file.on('change', function(event) {
    var file = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(event2) {
      img = event2.target.result;
    };
    $btnPost.removeClass('disabled');
    fileReader.readAsDataURL(file);
  });

  // habilitar boton para Comentar
  $comment.on('input', function() {
    if ($comment.val() === '') {
      $btnComment.addClass('disabled');
    } else {
      $btnComment.removeClass('disabled');
    }
  });

  // Postear comentarios
  $btnComment.on('click', function() {
    var text = $comment.val();
    $('#postComment').prepend('<div class="row"><div class=\'col s5\'><img src=\'\' class=\'circle responsive-img foto-user\'></div><div class=\'col s7\'>' + '<span class="date">' + $date + '</span><br><br><p>' + text + '</p></div></div>');
    $('.foto-user').attr('src', localStorage.photo);
    $comment.val('');
  });
});

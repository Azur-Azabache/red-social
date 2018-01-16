<<<<<<< HEAD
$(document).ready(function () {
  // INCIALIZAMOS EL MENU HAMBURGUESA
  $('.button-collapse').sideNav();

=======
$(document).ready(function() {
  var $input2 = $('#input2');
>>>>>>> f43a7fba698b12be552fbfff41546175bc79dc94
  var $textArea1 = $('#textarea1');
  var $btnPost = $('#btnPost');
  var $board = $('#board');
  var $file = $('#file');
<<<<<<< HEAD
  var $date = moment().format('LT')
  // Evento para poder postear texto
=======
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
>>>>>>> f43a7fba698b12be552fbfff41546175bc79dc94

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
<<<<<<< HEAD
    var $text = $textArea1.val();
    $($board).prepend('<form class=\'col s12\'><div class=\'row\'><div class=\'col s2\'><img src=\'../assets/images/user.jpg\' class=\'circle responsive-img\'></div><div class=\'col s10\'><p>' + $text + '</p><span class="date">'+ $date +'</span></div></div></form>');
  });

  $file.on('change', function(evet) {
    var file = event.target.files[0];
    var fr = new FileReader();
    fr.onload = function(ev) {
      $($board).prepend('<form class="col s12"><div class="row"><div class="col s2"><img src="../assets/images/user.jpg" class="circle responsive-img"></div><div class="col s10"><p><img id="im" class="imageUpload"></p></div></div></form>');
      $('#im').attr('src', ev.target.result);
    };
    $file.val('');
    fr.readAsDataURL(file);
  });
  // $btnPost.on('click', function(){

  // })

  // $btnImage.on('click', function() {
  //    var $path = $file.val();
  //    var $image = $path.substring($path.lastIndexOf('\\') + 1, $path.length);
  //    console.log($image);
  //    $($board).prepend('<form class="col s12"><div class="row"><div class="col s2"><img src="../assets/images/user.jpg" class="circle responsive-img"></div><div class="col s10"><p><img class="imageUpload" src="../assets/images/' + $image + '"></p></div></div></form>');
  //  });

=======
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
>>>>>>> f43a7fba698b12be552fbfff41546175bc79dc94
});

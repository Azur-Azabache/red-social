$(document).ready(function () {
  // INCIALIZAMOS EL MENU HAMBURGUESA
  $('.button-collapse').sideNav();

  var $textArea1 = $('#textarea1');
  var $btnPost = $('#btnPost');
  var $board = $('#board');
  var $btnImage = $('#btnImage');
  var $file = $('#file');
  var $date = moment().format('LT')
  // Evento para poder postear texto

  $btnPost.on('click', function() {
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

});

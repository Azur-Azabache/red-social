$(document).ready(function() {
  // INCIALIZAMOS EL MENU HAMBURGUESA
  $('.button-collapse').sideNav();
  // Iniciar modal
  $('#modal-change').modal();


  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyDazYh5bEK6rNBj1X6VGa1QFuN_wsvUSs4',
    authDomain: 'redsocial-18498.firebaseapp.com',
    databaseURL: 'https://redsocial-18498.firebaseio.com',
    projectId: 'redsocial-18498',
    storageBucket: 'redsocial-18498.appspot.com',
    messagingSenderId: '67249186059'
  };
  // Inicializamos Firebase
  firebase.initializeApp(config);
  // capturamos el boton para subir imagen de perfil
  var $btnProfile = $('#btn-perfil');
  var $imgProfile = $('#img-profile');
  var $nameUser = $('#name-user');
  var $uploader = 0;

  $('.foto-user').attr('src', localStorage.photo);
  $('.name').text(localStorage.name);
  $('.email').text(localStorage.email);

  // var arrUser = [];
  // $.each(data, function(i, item) {
  //   arrUser.push(i);
  // });
  // console.log(arrUser);
  // console.log(localStorage.mail);
  // console.log(data.users[0].name);
  // if (localStorage.mail === data.users[1].email) {
  //   // $nameUser.text(data.users[i].name);
  //   console.log(data.users[1].name);
  // }
  // for (var i = 0; i++ ; i < data.users.length) {
  //   debugger;
  //   if (localStorage.mail = data.users[i].email) {
  //     // $nameUser.text(data.users[i].name);
  //     console.log(data.users[i].name);
  //   }
  // }

  // para cargar la foto a firebase
  // var TableDataBase = firebase.storage().ref('profile_photo');
  $btnProfile.on('change', function(event) {
    // if (this.files && this.files[0]) {
    //   var file = new FileReader();
    //   file.onload = function(e) {
    //     TableDataBase.push({
    //       url: e.target.result,
    //     });
    //     // visualizar imagen
    //     $imgProfile.attr('src', event.target.result);      
    //   };
    //   file.readAsDataURL(this.files[0]);
    // }
    // Obtener el archivo
    var $file = event.target.files[0];
    // creamos una storage ref
    var $storageRef = firebase.storage().ref('profile_photo/' + $file.name);
    // $imgProfile.removeAttr('src');
    console.log(event.target.result);
    // subir archivo
    var $task = $storageRef.put($file);
    $task.on('state_changed',
      function progress(snapshot) {
        var $percentage = (snapshot.bytesTransferred / snapshot.totalButes) * 100;
        $uploader = $percentage;
        var downloadURL = $storageRef.snapshot;
        console.log(downloadURL);
      },
      function error(err) {
      },
      function complete() {
      });
    $imgProfile.attr('src', this.files[0]);
  });

  // Obtener Elementos
  var $txtUsername = $('#name');
  var $txttype = $('#type');
  var $txttorredepart = $('#torredepart');
  var $txtEmail = $('#email');
  var $txtPassword = $('#password');
  var $txtconfirmPassword = $('#confirm-password');
  var $checkAcepted = $('#filled-in-box');
  var $btnSignup = $('#btn-signup');
  var $btnLogGoogle = $('#btn-google');
  
  // variable booleanas para la activación del boton
  var validateUsername = false;
  var validateType = false;
  var validatetorredepart = false;
  var validateEmail = false;
  var validatePassword = false;
  var validateConfirmPassword = false;
  var validateChecked = false;

  // Aqui indicar que se puede implementar la función como variable
  function activeButton() {
    if (validateUsername && validateType && validatetorredepart && validateEmail && validatePassword && validateConfirmPassword && validateChecked) {
      $btnSignup.removeClass('disabled');
    }
  }
  function desactiveButton() {
    $btnSignup.addClass('disabled');
  }

  $txtUsername.on('input', function(event) {
    if ($(this).val().length > 2) {
      validateUsername = true;
      localStorage.name = $(this).val();
    }
    // console.log($(this).val().length);
    console.log(validateUsername);
  });

  $txttype.on('input', function(event) {
    if ($(this).val().length > 5) {
      validateType = true;
      localStorage.type = $(this).val();
    }
    // console.log($(this).val().length);
    console.log(validateType);
  });

  $txttorredepart.on('input', function(event) {
    if ($(this).val().length <= 12) {
      validatetorredepart = true;
      localStorage.departament = $(this).val();
    }
    // console.log($(this).val().length);
    console.log(validatetorredepart);
  });

  $txtEmail.on('input', function(event) {
    // console.log(event.target.value);
    var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    // console.log(REGEXEMAIL.test($(this).val()));
    // console.log($(this).val());
    if (REGEXEMAIL.test($(this).val())) {
      localStorage.mail = $(this).val();
      validateEmail = true;
      activeButton();
    } else {
      desactiveButton();
    };
    // console.log($(this).val().length);
    console.log(validateEmail);
  });

  $txtPassword.on('input', function() {
    console.log($($txtPassword).val());
    if ($(this).val().length >= 6) {
      localStorage.password = $(this).val();
      validatePassword = true;
    }
    // console.log($(this).val().length);
    console.log(validatePassword);
  });

  $txtconfirmPassword.on('input', function() {
    // console.log($(this).val());
    if ($(this).val().length >= 6 && ($($txtPassword).val() === $($txtconfirmPassword).val())) {
      validateConfirmPassword = true;
      localStorage.confirmpassword = $(this).val();
    }
    // console.log($(this).val().length);
    console.log(validateConfirmPassword);
  });


  $checkAcepted.on('click', function(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      validateChecked = true;
      activeButton();
    } else {
      desactiveButton();
    }
    console.log(validateChecked);
  });

  var $auth = firebase.auth();

  // añadivos evento al signup
  $btnSignup.on('click', function(event) {
    // Obtnemos los valores de los campos
    // var $userName = $txtUsername.val();
    // var $lastName = $txtLastName.val();
    // var $email = $txtEmail.val();
    // var $pass = $txtPassword.val();
    // var $promise = $auth.createUserWithEmailAndPassword($email, $pass);
    // $promise.catch(event => alert(event.message));
    // window.location.href = 'start.html';

  });
});

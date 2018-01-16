$(document).ready(function() {
  // Inicializamos dropdown
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: false // Stops event propagation
  }
  );
  // Initialize Firebase
  var $config = {
    apiKey: 'AIzaSyDazYh5bEK6rNBj1X6VGa1QFuN_wsvUSs4',
    authDomain: 'redsocial-18498.firebaseapp.com',
    databaseURL: 'https://redsocial-18498.firebaseio.com',
    projectId: 'redsocial-18498',
    storageBucket: 'redsocial-18498.appspot.com',
    messagingSenderId: '67249186059'
  };
  firebase.initializeApp($config);
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
    var $email = $txtEmail.val();
    var $pass = $txtPassword.val();
    var $promise = $auth.createUserWithEmailAndPassword($email, $pass);
    $promise.catch(event => alert(event.message));

    window.location.href = 'start.html';
  });

  $btnLogGoogle.on('click', function(event) {
    var $provider = new firebase.auth.GoogleAuthProvider();
    // $provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup($provider).then(function(result) {
      window.location.href = 'start.html';
      console.log(result.user);
      // guardando la imagen y nombre;
      localStorage.photo = result.user.photoURL;
      localStorage.name = result.user.displayName;
      localStorage.id = result.user.uid;
      localStorage.email = result.user.email;
      guardarFirebase(result.user);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

    // funcion para guardar en firebase los datos de quien entra
    function guardarFirebase(user) {
      var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        foto: user.photoURL,
        mail: user.email,
        seguidores: 31,
      };
      firebase.database().ref('usuarios/' + user.uid).set(usuario);
      // window.location.href = '../views/profile.html';
    }
  });
});

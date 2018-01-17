$(document).ready(function() {
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

  // Obtener Elementos 
  var $txtEmail = $('#email');
  var $txtPassword = $('#password');
  var $btnSignup = $('#btn-login');
  var $btnLogGoogle = $('#btn-google');

  // variables booleanas para la activacion del boton
  var validateEmail = false;
  var validatePassword = false;

  // Aqui indicar que se puede implementar la función como variable
  function activeButton() {
    if (validateEmail && validatePassword) {
      $btnSignup.removeClass('disabled');
    }
  }

  function desactiveButton() {
    $btnSignup.addClass('disabled');
  }

  $txtEmail.on('input', function(event) {
    // console.log(event.target.value);
    localStorage.mail = event.target.value;
    console.log(localStorage.mail);
    var REGEXEMAIL = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    // console.log(REGEXEMAIL.test($(this).val()));
    // console.log($(this).val());
    if (REGEXEMAIL.test($(this).val())) {
      validateEmail = true;
      activeButton();
    } else {
      desactiveButton();
    };
    // console.log($(this).val().length);
    console.log(validateEmail);
  });

  $txtPassword.on('input', function() {
    console.log($(this).val());
    if ($(this).val().length >= 6) {
      validatePassword = true;
      activeButton();
    }
    // console.log($(this).val().length);
    console.log(validatePassword);
  });

  var $auth = firebase.auth();

  // añadivos evento al signup
  $btnSignup.on('click', function(event) {
    // Obtnemos los valores de los campos
    var $email = $txtEmail.val();
    var $pass = $txtPassword.val();

    var $promise = $auth.signInWithEmailAndPassword($email, $pass);
    $promise.catch(event => alert(event.message));


    // Validamos que no entre si es que no ingresa un usuario valido
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        alert('Usted se ha logueado Correctamente');
        window.location.href = 'start.html';
      } else {
        alert('usted no esta registrado');
      }
    });
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
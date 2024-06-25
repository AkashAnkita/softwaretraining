var firebaseConfig = {
  apiKey: "AIzaSyCDmMPZehIPZlCvsE5LDcs6lRZzXfWPv-I",
  authDomain: "softwaretraining-7acdc.firebaseapp.com",
  databaseURL: "https://softwaretraining-7acdc-default-rtdb.firebaseio.com",
  projectId: "softwaretraining-7acdc",
  storageBucket: "softwaretraining-7acdc.appspot.com",
  messagingSenderId: "511729359067",
  appId: "1:511729359067:web:77074f0bdcd176645d94fe"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const database = firebase.database()
  
  function register () {

    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
   
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
  
   
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        email : email,
        full_name : full_name,
        // favourite_song : favourite_song,
        // milk_before_cereal : milk_before_cereal,
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User Logged In!!')
      window.location.replace("index.html");
  
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

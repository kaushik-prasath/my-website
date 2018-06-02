function getUiConfig() {
  return {
    'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function(user, credential, redirectUrl) {
        // handleSignedInUser(user);

        return false;
      }
    },
    // Opens IDP Providers sign-in flow in a popup.
    'signInFlow': 'popup',
    'signInOptions': [
      // The Provider you need for your app. We need the Phone Auth
      firebase.auth.TwitterAuthProvider.PROVIDER_ID, {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // another option is 'audio'
          size: 'invisible', // other options are 'normal' or 'compact'
          badge: 'bottomleft' // 'bottomright' or 'inline' applies to invisible.
        }
      }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com'
  };
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui
  .auth
  .AuthUI(firebase.auth());

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {

  let phoneNumber = user.phoneNumber;
  let uid = user.uid;
  var uri = "/admin/login";
  $.post(uri, {
    "mobileNo": phoneNumber,
    "mobileId": uid,
    "email": null,
    "googleId": 'undefined'
  }, function(data, status) {
    console.log(data);
    if (data.code == 4) {
      window.location.href = `/admin/profile`;
    } else if (data.code == 6) {
      toastr.info('Server error, contact admin for more information');
    } else if (data.code == 1) {
      window.location.href = "/admin/user";
    } else if (data.code == 3) {
      toastr.info('You are already logged in on someother device.Make sure to logout and try again.');
    } else if (data.code == 5) {
      toastr.info('Permission is denied.Please contact the admin.')
    }
  });

};

/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  // document.getElementById('user-signed-in').style.display = 'none';
  // document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when the
// user is signed in or not.
firebase
  .auth()
  .onAuthStateChanged(function(user) {
    // document.getElementById('loading').style.display = 'none';
    // document.getElementById('loaded').style.display = 'block';
    user
      ?
      handleSignedInUser(user) :
      handleSignedOutUser();
  });

/**
 * Deletes the user's account.
 */
var deleteAccount = function() {
  firebase
    .auth()
    .currentUser
    .delete()
    .catch(function(error) {
      if (error.code == 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        firebase
          .auth()
          .signOut()
          .then(function() {
            // The timeout allows the message to be displayed after the UI has changed to
            // the signed out state.
            setTimeout(function() {
              alert('Please sign in again to delete your account.');
            }, 1);
          });
      }
    });
};

/**
 * Initializes the app.
 */
var initApp = function() {
  // document.getElementById('sign-out').addEventListener('click', function() {
  // firebase.auth().signOut(); });
  // document.getElementById('delete-account').addEventListener(     'click',
  // function() {       deleteAccount();     });
};

window.addEventListener('load', initApp);

toastr.options = {
  timeOut: 0,
  positionClass: "toast-top-center",
  newestOnTop: false,
  showEasing: 'swing',
  showMethod: 'slideDown',
  preventDuplicates: true,
  progressBar: false,
  rtl: true,
  closeButton: true
};
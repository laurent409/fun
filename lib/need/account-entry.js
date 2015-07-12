Meteor.startup(function () {
    AccountsEntry.config({
        privacyUrl: '/privacy-policy',     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
        termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
        homeRoute: '/',                    // mandatory - path to redirect to after sign-out
        dashboardRoute: '/dashboard',      // mandatory - path to redirect to after successful sign-in
        profileRoute: '/myprofile',
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });
});

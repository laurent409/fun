//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var T9n = Package['softwarerero:accounts-t9n'].T9n;
var SimpleForm = Package['joshowens:simple-form'].SimpleForm;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Session = Package.session.Session;
var SHA256 = Package.sha.SHA256;
var Iron = Package['iron:core'].Iron;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var AccountsEntry, __coffeescriptShare;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/entry.coffee.js                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
                  

AccountsEntry = {
  settings: {
    wrapLinks: true,
    homeRoute: '/home',
    dashboardRoute: '/dashboard',
    passwordSignupFields: 'EMAIL_ONLY',
    emailToLower: true,
    usernameToLower: false,
    entrySignUp: '/sign-up',
    extraSignUpFields: [],
    showOtherLoginServices: true
  },
  isStringEmail: function(email) {
    var emailPattern;
    emailPattern = /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i;
    if (email.match(emailPattern)) {
      return true;
    } else {
      return false;
    }
  },
  config: function(appConfig) {
    var signUpRoute;
    this.settings = _.extend(this.settings, appConfig);
    T9n.defaultLanguage = "en";
    if (appConfig.language) {
      T9n.language = appConfig.language;
    }
    if (appConfig.signUpTemplate) {
      signUpRoute = Router.routes['entrySignUp'];
      return signUpRoute.options.template = appConfig.signUpTemplate;
    }
  },
  signInRequired: function(router, extraCondition) {
    if (extraCondition == null) {
      extraCondition = true;
    }
    if (!Meteor.loggingIn()) {
      if (Meteor.user() && extraCondition) {
        return router.next();
      } else {
        Session.set('fromWhere', router.url);
        Router.go('/sign-in');
        Session.set('entryError', t9n('error.signInRequired'));
        return router.next();
      }
    }
  }
};

this.AccountsEntry = AccountsEntry;

this.T9NHelper = (function() {
  function T9NHelper() {}

  T9NHelper.translate = function(code) {
    return T9n.get(code, "error.accounts");
  };

  T9NHelper.accountsError = function(err) {
    return Session.set('entryError', this.translate(err.reason));
  };

  return T9NHelper;

})();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/helpers.coffee.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (typeof Handlebars !== "undefined") {
  UI.registerHelper("signedInAs", function(date) {
    if (Meteor.user().username) {
      return Meteor.user().username;
    } else if (Meteor.user().profile && Meteor.user().profile.name) {
      return Meteor.user().profile.name;
    } else if (Meteor.user().emails && Meteor.user().emails[0]) {
      return Meteor.user().emails[0].address;
    } else {
      return "Signed In";
    }
  });
}

UI.registerHelper('accountButtons', function() {
  return Template.entryAccountButtons;
});

UI.registerHelper('capitalize', function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

UI.registerHelper('signupClass', function() {
  if (AccountsEntry.settings.showOtherLoginServices && Accounts.oauth && Accounts.oauth.serviceNames().length > 0) {
    return "collapse";
  }
});

UI.registerHelper('signedIn', function() {
  if (Meteor.user()) {
    return true;
  }
});

UI.registerHelper('otherLoginServices', function() {
  return AccountsEntry.settings.showOtherLoginServices && Accounts.oauth && Accounts.oauth.serviceNames().length > 0;
});

UI.registerHelper('loginServices', function() {
  return Accounts.oauth.serviceNames();
});

UI.registerHelper('showSignupCode', function() {
  return AccountsEntry.settings.showSignupCode === true;
});

UI.registerHelper('passwordLoginService', function() {
  return !!Package['accounts-password'];
});

UI.registerHelper('showCreateAccountLink', function() {
  return !Accounts._options.forbidClientAccountCreation;
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signIn/template.signIn.js                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entrySignIn");                                                                                  // 2
Template["entrySignIn"] = new Template("Template.entrySignIn", (function() {                                          // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "container"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                             // 7
    "class": "row"                                                                                                    // 8
  }, "\n      ", Blaze.If(function() {                                                                                // 9
    return Spacebars.call(view.lookup("logo"));                                                                       // 10
  }, function() {                                                                                                     // 11
    return [ "\n        ", HTML.DIV({                                                                                 // 12
      "class": "entry-logo"                                                                                           // 13
    }, "\n            ", HTML.A({                                                                                     // 14
      href: "/"                                                                                                       // 15
    }, HTML.IMG({                                                                                                     // 16
      src: function() {                                                                                               // 17
        return Spacebars.mustache(view.lookup("logo"));                                                               // 18
      },                                                                                                              // 19
      alt: "logo"                                                                                                     // 20
    })), "\n        "), "\n      " ];                                                                                 // 21
  }), "\n      ", HTML.DIV({                                                                                          // 22
    "class": "entry col-md-4 col-md-offset-4"                                                                         // 23
  }, "\n        ", Blaze.If(function() {                                                                              // 24
    return Spacebars.call(view.lookup("otherLoginServices"));                                                         // 25
  }, function() {                                                                                                     // 26
    return [ "\n        ", HTML.DIV({                                                                                 // 27
      "class": "entry-social"                                                                                         // 28
    }, "\n          ", Blaze.Each(function() {                                                                        // 29
      return Spacebars.call(view.lookup("loginServices"));                                                            // 30
    }, function() {                                                                                                   // 31
      return [ "\n            ", Spacebars.include(view.lookupTemplate("entrySocial")), "\n          " ];             // 32
    }), "\n          ", Blaze.If(function() {                                                                         // 33
      return Spacebars.call(view.lookup("passwordLoginService"));                                                     // 34
    }, function() {                                                                                                   // 35
      return [ "\n          ", HTML.DIV({                                                                             // 36
        "class": "email-option"                                                                                       // 37
      }, "\n            ", HTML.STRONG({                                                                              // 38
        "class": "line-thru or-sign-in"                                                                               // 39
      }, Blaze.View(function() {                                                                                      // 40
        return Spacebars.mustache(view.lookup("t9n"), "OR");                                                          // 41
      })), "\n          "), "\n          " ];                                                                         // 42
    }), "\n        "), "\n        " ];                                                                                // 43
  }), "\n        ", Spacebars.include(view.lookupTemplate("entryError")), "\n        ", Blaze.Unless(function() {     // 44
    return Spacebars.call(view.lookup("otherLoginServices"));                                                         // 45
  }, function() {                                                                                                     // 46
    return [ "\n          ", HTML.DIV({                                                                               // 47
      "class": "email-option"                                                                                         // 48
    }, "\n            ", HTML.H3(Blaze.View(function() {                                                              // 49
      return Spacebars.mustache(view.lookup("t9n"), "signIn");                                                        // 50
    })), "\n          "), "\n        " ];                                                                             // 51
  }), "\n        ", Blaze.If(function() {                                                                             // 52
    return Spacebars.call(view.lookup("passwordLoginService"));                                                       // 53
  }, function() {                                                                                                     // 54
    return [ "\n          ", HTML.FORM({                                                                              // 55
      "class": "entry-form",                                                                                          // 56
      id: "signIn"                                                                                                    // 57
    }, "\n            ", HTML.DIV({                                                                                   // 58
      "class": "form-group"                                                                                           // 59
    }, "\n              ", HTML.INPUT({                                                                               // 60
      autofocus: "",                                                                                                  // 61
      name: "email",                                                                                                  // 62
      type: function() {                                                                                              // 63
        return Spacebars.mustache(view.lookup("emailInputType"));                                                     // 64
      },                                                                                                              // 65
      "class": "form-control",                                                                                        // 66
      value: function() {                                                                                             // 67
        return Spacebars.mustache(view.lookup("email"));                                                              // 68
      },                                                                                                              // 69
      placeholder: function() {                                                                                       // 70
        return Spacebars.mustache(view.lookup("emailPlaceholder"));                                                   // 71
      }                                                                                                               // 72
    }), "\n            "), "\n            ", HTML.DIV({                                                               // 73
      "class": "form-group"                                                                                           // 74
    }, "\n              ", HTML.INPUT({                                                                               // 75
      name: "password",                                                                                               // 76
      type: "password",                                                                                               // 77
      "class": "form-control",                                                                                        // 78
      value: function() {                                                                                             // 79
        return Spacebars.mustache(view.lookup("password"));                                                           // 80
      },                                                                                                              // 81
      placeholder: function() {                                                                                       // 82
        return Spacebars.mustache(view.lookup("t9n"), "password");                                                    // 83
      }                                                                                                               // 84
    }), "\n            "), "\n            ", Blaze.Unless(function() {                                                // 85
      return Spacebars.call(view.lookup("isUsernameOnly"));                                                           // 86
    }, function() {                                                                                                   // 87
      return [ "\n              ", HTML.P(HTML.A({                                                                    // 88
        href: function() {                                                                                            // 89
          return Spacebars.mustache(view.lookup("pathFor"), "entryForgotPassword");                                   // 90
        }                                                                                                             // 91
      }, Blaze.View(function() {                                                                                      // 92
        return Spacebars.mustache(view.lookup("t9n"), "forgotPassword");                                              // 93
      }))), "\n              ", HTML.BUTTON({                                                                         // 94
        type: "submit",                                                                                               // 95
        "class": "submit btn btn-block btn-default"                                                                   // 96
      }, Blaze.View(function() {                                                                                      // 97
        return Spacebars.mustache(view.lookup("t9n"), "signIn");                                                      // 98
      })), "\n            " ];                                                                                        // 99
    }), "\n          "), "\n        " ];                                                                              // 100
  }), "\n        ", Blaze.If(function() {                                                                             // 101
    return Spacebars.call(view.lookup("showCreateAccountLink"));                                                      // 102
  }, function() {                                                                                                     // 103
    return [ "\n        ", HTML.P({                                                                                   // 104
      "class": "entry-signup-cta"                                                                                     // 105
    }, Blaze.View(function() {                                                                                        // 106
      return Spacebars.mustache(view.lookup("t9n"), "dontHaveAnAccount");                                             // 107
    }), " ", HTML.A({                                                                                                 // 108
      href: function() {                                                                                              // 109
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignUp");                                             // 110
      }                                                                                                               // 111
    }, Blaze.View(function() {                                                                                        // 112
      return Spacebars.mustache(view.lookup("t9n"), "signUp");                                                        // 113
    }))), "\n        " ];                                                                                             // 114
  }), "\n      "), "\n    "), "\n  ");                                                                                // 115
}));                                                                                                                  // 116
                                                                                                                      // 117
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signIn/signIn.coffee.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
AccountsEntry.entrySignInHelpers = {
  emailInputType: function() {
    if (AccountsEntry.settings.passwordSignupFields === 'EMAIL_ONLY') {
      return 'email';
    } else {
      return 'string';
    }
  },
  emailPlaceholder: function() {
    var fields;
    fields = AccountsEntry.settings.passwordSignupFields;
    if (_.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL'], fields)) {
      return t9n("usernameOrEmail");
    } else if (fields === "USERNAME_ONLY") {
      return t9n("username");
    }
    return t9n("email");
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  },
  isUsernameOnly: function() {
    return AccountsEntry.settings.passwordSignupFields === 'USERNAME_ONLY';
  }
};

AccountsEntry.entrySignInEvents = {
  'submit #signIn': function(event) {
    var email;
    event.preventDefault();
    email = $('input[name="email"]').val();
    if ((AccountsEntry.isStringEmail(email) && AccountsEntry.settings.emailToLower) || (!AccountsEntry.isStringEmail(email) && AccountsEntry.settings.usernameToLower)) {
      email = email.toLowerCase();
    }
    Session.set('email', email);
    Session.set('password', $('input[name="password"]').val());
    return Meteor.loginWithPassword(Session.get('email'), Session.get('password'), function(error) {
      Session.set('password', void 0);
      if (error) {
        return T9NHelper.accountsError(error);
      } else if (Session.get('fromWhere')) {
        Router.go(Session.get('fromWhere'));
        return Session.set('fromWhere', void 0);
      } else {
        return Router.go(AccountsEntry.settings.dashboardRoute);
      }
    });
  }
};

Template.entrySignIn.helpers(AccountsEntry.entrySignInHelpers);

Template.entrySignIn.events(AccountsEntry.entrySignInEvents);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signUp/template.signUp.js                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entrySignUp");                                                                                  // 2
Template["entrySignUp"] = new Template("Template.entrySignUp", (function() {                                          // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "container"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                             // 7
    "class": "row"                                                                                                    // 8
  }, "\n      ", Blaze.If(function() {                                                                                // 9
    return Spacebars.call(view.lookup("logo"));                                                                       // 10
  }, function() {                                                                                                     // 11
    return [ "\n        ", HTML.DIV({                                                                                 // 12
      "class": "entry-logo"                                                                                           // 13
    }, "\n            ", HTML.A({                                                                                     // 14
      href: "/"                                                                                                       // 15
    }, HTML.IMG({                                                                                                     // 16
      src: function() {                                                                                               // 17
        return Spacebars.mustache(view.lookup("logo"));                                                               // 18
      },                                                                                                              // 19
      alt: "logo"                                                                                                     // 20
    })), "\n        "), "\n      " ];                                                                                 // 21
  }), "\n      ", HTML.DIV({                                                                                          // 22
    "class": "entry col-md-4 col-md-offset-4"                                                                         // 23
  }, "\n        ", HTML.H3(Blaze.View(function() {                                                                    // 24
    return Spacebars.mustache(view.lookup("t9n"), "createAccount");                                                   // 25
  })), "\n        ", Blaze.If(function() {                                                                            // 26
    return Spacebars.call(view.lookup("otherLoginServices"));                                                         // 27
  }, function() {                                                                                                     // 28
    return [ "\n          ", HTML.P({                                                                                 // 29
      "class": "entry-signin-cta"                                                                                     // 30
    }, Blaze.View(function() {                                                                                        // 31
      return Spacebars.mustache(view.lookup("t9n"), "ifYouAlreadyHaveAnAccount");                                     // 32
    }), " ", HTML.A({                                                                                                 // 33
      href: function() {                                                                                              // 34
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignIn");                                             // 35
      }                                                                                                               // 36
    }, Blaze.View(function() {                                                                                        // 37
      return Spacebars.mustache(view.lookup("t9n"), "signin");                                                        // 38
    })), "."), "\n          ", HTML.DIV({                                                                             // 39
      "class": "entry-social"                                                                                         // 40
    }, "\n            ", Blaze.Each(function() {                                                                      // 41
      return Spacebars.call(view.lookup("loginServices"));                                                            // 42
    }, function() {                                                                                                   // 43
      return [ "\n              ", Spacebars.include(view.lookupTemplate("entrySocial")), "\n            " ];         // 44
    }), "\n            ", Blaze.If(function() {                                                                       // 45
      return Spacebars.call(view.lookup("passwordLoginService"));                                                     // 46
    }, function() {                                                                                                   // 47
      return [ "\n              ", HTML.DIV({                                                                         // 48
        "class": "email-option"                                                                                       // 49
      }, "\n                ", HTML.STRONG({                                                                          // 50
        "class": "line-thru"                                                                                          // 51
      }, Blaze.View(function() {                                                                                      // 52
        return Spacebars.mustache(view.lookup("t9n"), "OR");                                                          // 53
      })), "\n                ", HTML.A({                                                                             // 54
        "data-toggle": "collapse",                                                                                    // 55
        href: "#signUp"                                                                                               // 56
      }, "\n                  ", Blaze.View(function() {                                                              // 57
        return Spacebars.mustache(view.lookup("t9n"), "signUpWithYourEmailAddress");                                  // 58
      }), "\n                "), "\n              "), "\n            " ];                                             // 59
    }), "\n          "), "\n        " ];                                                                              // 60
  }, function() {                                                                                                     // 61
    return [ "\n            ", HTML.P({                                                                               // 62
      "class": "entry-signin-cta"                                                                                     // 63
    }, Blaze.View(function() {                                                                                        // 64
      return Spacebars.mustache(view.lookup("t9n"), "ifYouAlreadyHaveAnAccount");                                     // 65
    }), " ", HTML.A({                                                                                                 // 66
      href: function() {                                                                                              // 67
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignIn");                                             // 68
      }                                                                                                               // 69
    }, Blaze.View(function() {                                                                                        // 70
      return Spacebars.mustache(view.lookup("t9n"), "signin");                                                        // 71
    })), "."), "\n        " ];                                                                                        // 72
  }), "\n        ", Spacebars.include(view.lookupTemplate("entryError")), "\n        ", Blaze.If(function() {         // 73
    return Spacebars.call(view.lookup("passwordLoginService"));                                                       // 74
  }, function() {                                                                                                     // 75
    return [ "\n          ", HTML.FORM({                                                                              // 76
      "class": function() {                                                                                           // 77
        return [ "entry-form ", Spacebars.mustache(view.lookup("signupClass")) ];                                     // 78
      },                                                                                                              // 79
      id: "signUp"                                                                                                    // 80
    }, "\n            ", Blaze.If(function() {                                                                        // 81
      return Spacebars.call(view.lookup("showUsername"));                                                             // 82
    }, function() {                                                                                                   // 83
      return [ "\n              ", HTML.DIV({                                                                         // 84
        "class": "form-group"                                                                                         // 85
      }, "\n                ", HTML.LABEL(Blaze.View(function() {                                                     // 86
        return Spacebars.mustache(view.lookup("t9n"), "username");                                                    // 87
      })), "\n                ", HTML.INPUT({                                                                         // 88
        autofocus: "",                                                                                                // 89
        name: "username",                                                                                             // 90
        type: "string",                                                                                               // 91
        "class": "form-control",                                                                                      // 92
        value: ""                                                                                                     // 93
      }), "\n              "), "\n            " ];                                                                    // 94
    }), "\n\n            ", Blaze.If(function() {                                                                     // 95
      return Spacebars.call(view.lookup("showEmail"));                                                                // 96
    }, function() {                                                                                                   // 97
      return [ "\n              ", HTML.DIV({                                                                         // 98
        "class": "form-group"                                                                                         // 99
      }, "\n                ", HTML.LABEL(Blaze.View(function() {                                                     // 100
        return Spacebars.mustache(view.lookup("t9n"), "emailAddress");                                                // 101
      })), "\n                ", Blaze.If(function() {                                                                // 102
        return Spacebars.call(view.lookup("showUsername"));                                                           // 103
      }, function() {                                                                                                 // 104
        return [ "\n                  ", HTML.INPUT({                                                                 // 105
          type: "email",                                                                                              // 106
          "class": "form-control",                                                                                    // 107
          value: function() {                                                                                         // 108
            return Spacebars.mustache(view.lookup("emailAddress"));                                                   // 109
          }                                                                                                           // 110
        }), "\n                " ];                                                                                   // 111
      }, function() {                                                                                                 // 112
        return [ "\n                  ", HTML.INPUT({                                                                 // 113
          autofocus: "",                                                                                              // 114
          type: "email",                                                                                              // 115
          "class": "form-control",                                                                                    // 116
          value: function() {                                                                                         // 117
            return Spacebars.mustache(view.lookup("emailAddress"));                                                   // 118
          }                                                                                                           // 119
        }), "\n                " ];                                                                                   // 120
      }), "\n              "), "\n            " ];                                                                    // 121
    }), "\n\n            ", HTML.DIV({                                                                                // 122
      "class": "form-group"                                                                                           // 123
    }, "\n              ", HTML.LABEL(Blaze.View(function() {                                                         // 124
      return Spacebars.mustache(view.lookup("t9n"), "password");                                                      // 125
    })), "\n              ", HTML.INPUT({                                                                             // 126
      type: "password",                                                                                               // 127
      "class": "form-control",                                                                                        // 128
      value: ""                                                                                                       // 129
    }), "\n            "), "\n\n            ", Blaze.If(function() {                                                  // 130
      return Spacebars.call(view.lookup("showSignupCode"));                                                           // 131
    }, function() {                                                                                                   // 132
      return [ "\n              ", HTML.DIV({                                                                         // 133
        "class": "form-group"                                                                                         // 134
      }, "\n                ", HTML.LABEL(Blaze.View(function() {                                                     // 135
        return Spacebars.mustache(view.lookup("t9n"), "signupCode");                                                  // 136
      })), "\n                ", HTML.INPUT({                                                                         // 137
        name: "signupCode",                                                                                           // 138
        type: "string",                                                                                               // 139
        "class": "form-control",                                                                                      // 140
        value: ""                                                                                                     // 141
      }), "\n              "), "\n            " ];                                                                    // 142
    }), "\n\n            ", Spacebars.include(view.lookupTemplate("entryExtraSignUpFields")), "\n            ", HTML.BUTTON({
      type: "submit",                                                                                                 // 144
      "class": "submit btn btn-block btn-default"                                                                     // 145
    }, Blaze.View(function() {                                                                                        // 146
      return Spacebars.mustache(view.lookup("t9n"), "signUp");                                                        // 147
    })), "\n          "), "\n        " ];                                                                             // 148
  }), "\n        ", Blaze.If(function() {                                                                             // 149
    return Spacebars.call(view.lookup("both"));                                                                       // 150
  }, function() {                                                                                                     // 151
    return [ "\n          ", HTML.P({                                                                                 // 152
      "class": "entry-agreement"                                                                                      // 153
    }, Blaze.View(function() {                                                                                        // 154
      return Spacebars.mustache(view.lookup("t9n"), "clickAgree");                                                    // 155
    }), "\n            ", HTML.A({                                                                                    // 156
      href: function() {                                                                                              // 157
        return Spacebars.mustache(view.lookup("privacyUrl"));                                                         // 158
      }                                                                                                               // 159
    }, Blaze.View(function() {                                                                                        // 160
      return Spacebars.mustache(view.lookup("t9n"), "privacyPolicy");                                                 // 161
    })), " ", Blaze.View(function() {                                                                                 // 162
      return Spacebars.mustache(view.lookup("t9n"), "and");                                                           // 163
    }), "\n            ", HTML.A({                                                                                    // 164
      href: function() {                                                                                              // 165
        return Spacebars.mustache(view.lookup("termsUrl"));                                                           // 166
      }                                                                                                               // 167
    }, Blaze.View(function() {                                                                                        // 168
      return Spacebars.mustache(view.lookup("t9n"), "terms");                                                         // 169
    })), ".\n          "), "\n        " ];                                                                            // 170
  }, function() {                                                                                                     // 171
    return [ "\n          ", Blaze.Unless(function() {                                                                // 172
      return Spacebars.call(view.lookup("neither"));                                                                  // 173
    }, function() {                                                                                                   // 174
      return [ "\n            ", HTML.P({                                                                             // 175
        "class": "entry-agreement"                                                                                    // 176
      }, Blaze.View(function() {                                                                                      // 177
        return Spacebars.mustache(view.lookup("t9n"), "clickAgree");                                                  // 178
      }), "\n              ", Blaze.If(function() {                                                                   // 179
        return Spacebars.call(view.lookup("privacyUrl"));                                                             // 180
      }, function() {                                                                                                 // 181
        return [ HTML.A({                                                                                             // 182
          href: function() {                                                                                          // 183
            return Spacebars.mustache(view.lookup("privacyUrl"));                                                     // 184
          }                                                                                                           // 185
        }, Blaze.View(function() {                                                                                    // 186
          return Spacebars.mustache(view.lookup("t9n"), "privacyPolicy");                                             // 187
        })), "." ];                                                                                                   // 188
      }), "\n              ", Blaze.If(function() {                                                                   // 189
        return Spacebars.call(view.lookup("termsUrl"));                                                               // 190
      }, function() {                                                                                                 // 191
        return [ HTML.A({                                                                                             // 192
          href: function() {                                                                                          // 193
            return Spacebars.mustache(view.lookup("termsUrl"));                                                       // 194
          }                                                                                                           // 195
        }, Blaze.View(function() {                                                                                    // 196
          return Spacebars.mustache(view.lookup("t9n"), "terms");                                                     // 197
        })), "." ];                                                                                                   // 198
      }), "\n            "), "\n          " ];                                                                        // 199
    }), "\n        " ];                                                                                               // 200
  }), "\n      "), "\n    "), "\n  ");                                                                                // 201
}));                                                                                                                  // 202
                                                                                                                      // 203
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signUp/signUp.coffee.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
AccountsEntry.hashPassword = function(password) {
  return {
    digest: SHA256(password),
    algorithm: "sha-256"
  };
};

AccountsEntry.entrySignUpHelpers = {
  showEmail: function() {
    var fields;
    fields = AccountsEntry.settings.passwordSignupFields;
    return _.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'EMAIL_ONLY'], fields);
  },
  showUsername: function() {
    var fields;
    fields = AccountsEntry.settings.passwordSignupFields;
    return _.contains(['USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY'], fields);
  },
  showSignupCode: function() {
    return AccountsEntry.settings.showSignupCode;
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  },
  privacyUrl: function() {
    return AccountsEntry.settings.privacyUrl;
  },
  termsUrl: function() {
    return AccountsEntry.settings.termsUrl;
  },
  both: function() {
    return AccountsEntry.settings.privacyUrl && AccountsEntry.settings.termsUrl;
  },
  neither: function() {
    return !AccountsEntry.settings.privacyUrl && !AccountsEntry.settings.termsUrl;
  },
  emailIsOptional: function() {
    var fields;
    fields = AccountsEntry.settings.passwordSignupFields;
    return _.contains(['USERNAME_AND_OPTIONAL_EMAIL'], fields);
  },
  emailAddress: function() {
    return Session.get('email');
  }
};

AccountsEntry.entrySignUpEvents = {
  'submit #signUp': function(event, t) {
    var email, emailRequired, extraFields, fields, filteredExtraFields, formValues, password, passwordErrors, signupCode, trimInput, username, usernameRequired;
    event.preventDefault();
    username = t.find('input[name="username"]') ? t.find('input[name="username"]').value.toLowerCase() : void 0;
    if (username && AccountsEntry.settings.usernameToLower) {
      username = username.toLowerCase();
    }
    signupCode = t.find('input[name="signupCode"]') ? t.find('input[name="signupCode"]').value : void 0;
    trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    };
    email = t.find('input[type="email"]') ? trimInput(t.find('input[type="email"]').value) : void 0;
    if (AccountsEntry.settings.emailToLower && email) {
      email = email.toLowerCase();
    }
    formValues = SimpleForm.processForm(event.target);
    extraFields = _.pluck(AccountsEntry.settings.extraSignUpFields, 'field');
    filteredExtraFields = _.pick(formValues, extraFields);
    password = t.find('input[type="password"]').value;
    fields = AccountsEntry.settings.passwordSignupFields;
    passwordErrors = (function(password) {
      var errMsg, msg;
      errMsg = [];
      msg = false;
      if (password.length < 7) {
        errMsg.push(t9n("error.minChar"));
      }
      if (password.search(/[a-z]/i) < 0) {
        errMsg.push(t9n("error.pwOneLetter"));
      }
      if (password.search(/[0-9]/) < 0) {
        errMsg.push(t9n("error.pwOneDigit"));
      }
      if (errMsg.length > 0) {
        msg = "";
        errMsg.forEach(function(e) {
          return msg = msg.concat("" + e + "\r\n");
        });
        Session.set('entryError', msg);
        return true;
      }
      return false;
    })(password);
    if (passwordErrors) {
      return;
    }
    emailRequired = _.contains(['USERNAME_AND_EMAIL', 'EMAIL_ONLY'], fields);
    usernameRequired = _.contains(['USERNAME_AND_EMAIL', 'USERNAME_ONLY'], fields);
    if (usernameRequired && username.length === 0) {
      Session.set('entryError', t9n("error.usernameRequired"));
      return;
    }
    if (username && AccountsEntry.isStringEmail(username)) {
      Session.set('entryError', t9n("error.usernameIsEmail"));
      return;
    }
    if (emailRequired && email.length === 0) {
      Session.set('entryError', t9n("error.emailRequired"));
      return;
    }
    if (AccountsEntry.settings.showSignupCode && signupCode.length === 0) {
      Session.set('entryError', t9n("error.signupCodeRequired"));
      return;
    }
    return Meteor.call('entryValidateSignupCode', signupCode, function(err, valid) {
      var newUserData;
      if (valid) {
        newUserData = {
          username: username,
          email: email,
          password: AccountsEntry.hashPassword(password),
          profile: filteredExtraFields
        };
        return Meteor.call('entryCreateUser', newUserData, function(err, data) {
          var isEmailSignUp, userCredential;
          if (err) {
            console.log(err);
            T9NHelper.accountsError(err);
            return;
          }
          isEmailSignUp = _.contains(['USERNAME_AND_EMAIL', 'EMAIL_ONLY'], AccountsEntry.settings.passwordSignupFields);
          userCredential = isEmailSignUp ? email : username;
          return Meteor.loginWithPassword(userCredential, password, function(error) {
            if (error) {
              console.log(error);
              return T9NHelper.accountsError(error);
            } else if (Session.get('fromWhere')) {
              Router.go(Session.get('fromWhere'));
              return Session.set('fromWhere', void 0);
            } else {
              return Router.go(AccountsEntry.settings.dashboardRoute);
            }
          });
        });
      } else {
        console.log(err);
        Session.set('entryError', t9n("error.signupCodeIncorrect"));
      }
    });
  }
};

Template.entrySignUp.helpers(AccountsEntry.entrySignUpHelpers);

Template.entrySignUp.events(AccountsEntry.entrySignUpEvents);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signUp/template.extraSignUpFields.js                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entryExtraSignUpFields");                                                                       // 2
Template["entryExtraSignUpFields"] = new Template("Template.entryExtraSignUpFields", (function() {                    // 3
  var view = this;                                                                                                    // 4
  return Blaze.Each(function() {                                                                                      // 5
    return Spacebars.call(view.lookup("extraSignUpFields"));                                                          // 6
  }, function() {                                                                                                     // 7
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_entryExtraSignUpField")), "\n    " ];                  // 8
  });                                                                                                                 // 9
}));                                                                                                                  // 10
                                                                                                                      // 11
Template.__checkName("_entryExtraSignUpField");                                                                       // 12
Template["_entryExtraSignUpField"] = new Template("Template._entryExtraSignUpField", (function() {                    // 13
  var view = this;                                                                                                    // 14
  return [ Blaze.If(function() {                                                                                      // 15
    return Spacebars.call(view.lookup("isTextField"));                                                                // 16
  }, function() {                                                                                                     // 17
    return [ "\n    ", HTML.DIV({                                                                                     // 18
      "class": "form-group"                                                                                           // 19
    }, "\n        ", Blaze.View(function() {                                                                          // 20
      return Spacebars.mustache(view.lookup("text_field"), view.lookup("field"), Spacebars.kw({                       // 21
        type: view.lookup("type"),                                                                                    // 22
        required: view.lookup("required"),                                                                            // 23
        label: view.lookup("label"),                                                                                  // 24
        placeholder: view.lookup("placeholder")                                                                       // 25
      }));                                                                                                            // 26
    }), "\n    "), "\n    " ];                                                                                        // 27
  }), "\n\n    ", Blaze.If(function() {                                                                               // 28
    return Spacebars.call(view.lookup("isCheckbox"));                                                                 // 29
  }, function() {                                                                                                     // 30
    return [ "\n    ", HTML.DIV({                                                                                     // 31
      "class": "checkbox"                                                                                             // 32
    }, "\n        ", Blaze.View(function() {                                                                          // 33
      return Spacebars.mustache(view.lookup("check_box"), view.lookup("name"), Spacebars.kw({                         // 34
        label: view.lookup("label"),                                                                                  // 35
        required: view.lookup("required")                                                                             // 36
      }));                                                                                                            // 37
    }), "\n    "), "\n    " ];                                                                                        // 38
  }) ];                                                                                                               // 39
}));                                                                                                                  // 40
                                                                                                                      // 41
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/signUp/extraSignUpFields.coffee.js                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.entryExtraSignUpFields.helpers({
  extraSignUpFields: function() {
    return AccountsEntry.settings.extraSignUpFields;
  }
});

Template._entryExtraSignUpField.helpers({
  isTextField: function() {
    return this.type !== "check_box";
  },
  isCheckbox: function() {
    return this.type === "check_box";
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/forgotPassword/template.forgotPassword.js                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entryForgotPassword");                                                                          // 2
Template["entryForgotPassword"] = new Template("Template.entryForgotPassword", (function() {                          // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "container"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                             // 7
    "class": "row"                                                                                                    // 8
  }, "\n      ", Blaze.If(function() {                                                                                // 9
    return Spacebars.call(view.lookup("logo"));                                                                       // 10
  }, function() {                                                                                                     // 11
    return [ "\n        ", HTML.DIV({                                                                                 // 12
      "class": "entry-logo"                                                                                           // 13
    }, "\n            ", HTML.A({                                                                                     // 14
      href: "/"                                                                                                       // 15
    }, HTML.IMG({                                                                                                     // 16
      src: function() {                                                                                               // 17
        return Spacebars.mustache(view.lookup("logo"));                                                               // 18
      },                                                                                                              // 19
      alt: "logo"                                                                                                     // 20
    })), "\n        "), "\n      " ];                                                                                 // 21
  }), "\n      ", HTML.DIV({                                                                                          // 22
    "class": "entry col-md-4 col-md-offset-4"                                                                         // 23
  }, "\n        ", Blaze.If(function() {                                                                              // 24
    return Spacebars.call(view.lookup("error"));                                                                      // 25
  }, function() {                                                                                                     // 26
    return [ "\n          ", HTML.DIV({                                                                               // 27
      "class": "alert alert-danger"                                                                                   // 28
    }, Blaze.View(function() {                                                                                        // 29
      return Spacebars.mustache(view.lookup("error"));                                                                // 30
    })), "\n        " ];                                                                                              // 31
  }), "\n        ", HTML.H3(Blaze.View(function() {                                                                   // 32
    return Spacebars.mustache(view.lookup("t9n"), "forgotPassword");                                                  // 33
  })), "\n        ", HTML.FORM({                                                                                      // 34
    id: "forgotPassword"                                                                                              // 35
  }, "\n          ", HTML.DIV({                                                                                       // 36
    "class": "form-group"                                                                                             // 37
  }, "\n            ", HTML.INPUT({                                                                                   // 38
    type: "email",                                                                                                    // 39
    name: "forgottenEmail",                                                                                           // 40
    "class": "form-control",                                                                                          // 41
    placeholder: function() {                                                                                         // 42
      return Spacebars.mustache(view.lookup("t9n"), "emailAddress");                                                  // 43
    },                                                                                                                // 44
    value: ""                                                                                                         // 45
  }), "\n          "), "\n          ", HTML.BUTTON({                                                                  // 46
    type: "submit",                                                                                                   // 47
    "class": "btn btn-default"                                                                                        // 48
  }, Blaze.View(function() {                                                                                          // 49
    return Spacebars.mustache(view.lookup("t9n"), "emailResetLink");                                                  // 50
  })), "\n        "), "\n        ", Blaze.If(function() {                                                             // 51
    return Spacebars.call(view.lookup("showSignupCode"));                                                             // 52
  }, function() {                                                                                                     // 53
    return [ "\n          ", HTML.P({                                                                                 // 54
      "class": "entry-signup-cta"                                                                                     // 55
    }, Blaze.View(function() {                                                                                        // 56
      return Spacebars.mustache(view.lookup("t9n"), "dontHaveAnAccount");                                             // 57
    }), " ", HTML.A({                                                                                                 // 58
      href: function() {                                                                                              // 59
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignUp");                                             // 60
      }                                                                                                               // 61
    }, Blaze.View(function() {                                                                                        // 62
      return Spacebars.mustache(view.lookup("t9n"), "signUp");                                                        // 63
    }))), "\n        " ];                                                                                             // 64
  }), "\n      "), "\n    "), "\n  ");                                                                                // 65
}));                                                                                                                  // 66
                                                                                                                      // 67
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/forgotPassword/forgotPassword.coffee.js                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.entryForgotPassword.helpers({
  error: function() {
    return t9n(Session.get('entryError'));
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  }
});

Template.entryForgotPassword.events({
  'submit #forgotPassword': function(event) {
    event.preventDefault();
    Session.set('email', $('input[name="forgottenEmail"]').val());
    if (Session.get('email').length === 0) {
      Session.set('entryError', 'Email is required');
      return;
    }
    return Accounts.forgotPassword({
      email: Session.get('email')
    }, function(error) {
      if (error) {
        return Session.set('entryError', error.reason);
      } else {
        return Router.go(AccountsEntry.settings.homeRoute);
      }
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/resetPassword/template.resetPassword.js                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entryResetPassword");                                                                           // 2
Template["entryResetPassword"] = new Template("Template.entryResetPassword", (function() {                            // 3
  var view = this;                                                                                                    // 4
  return HTML.DIV({                                                                                                   // 5
    "class": "container"                                                                                              // 6
  }, "\n    ", HTML.DIV({                                                                                             // 7
    "class": "row"                                                                                                    // 8
  }, "\n      ", Blaze.If(function() {                                                                                // 9
    return Spacebars.call(view.lookup("logo"));                                                                       // 10
  }, function() {                                                                                                     // 11
    return [ "\n        ", HTML.DIV({                                                                                 // 12
      "class": "entry-logo"                                                                                           // 13
    }, "\n            ", HTML.A({                                                                                     // 14
      href: "/"                                                                                                       // 15
    }, HTML.IMG({                                                                                                     // 16
      src: function() {                                                                                               // 17
        return Spacebars.mustache(view.lookup("logo"));                                                               // 18
      },                                                                                                              // 19
      alt: "logo"                                                                                                     // 20
    })), "\n        "), "\n      " ];                                                                                 // 21
  }), "\n      ", HTML.DIV({                                                                                          // 22
    "class": "entry col-md-4 col-md-offset-4"                                                                         // 23
  }, "\n        ", Blaze.If(function() {                                                                              // 24
    return Spacebars.call(view.lookup("error"));                                                                      // 25
  }, function() {                                                                                                     // 26
    return [ "\n          ", HTML.DIV({                                                                               // 27
      "class": "alert alert-danger"                                                                                   // 28
    }, Blaze.View(function() {                                                                                        // 29
      return Spacebars.mustache(view.lookup("error"));                                                                // 30
    })), "\n        " ];                                                                                              // 31
  }), "\n        ", HTML.H3(Blaze.View(function() {                                                                   // 32
    return Spacebars.mustache(view.lookup("t9n"), "resetYourPassword");                                               // 33
  })), "\n        ", HTML.FORM({                                                                                      // 34
    id: "resetPassword"                                                                                               // 35
  }, "\n          ", HTML.Raw('<div class="form-group">\n            <input type="password" name="new-password" class="form-control" value="">\n          </div>'), "\n          ", HTML.BUTTON({
    type: "submit",                                                                                                   // 37
    "class": "btn btn-default"                                                                                        // 38
  }, Blaze.View(function() {                                                                                          // 39
    return Spacebars.mustache(view.lookup("t9n"), "updateYourPassword");                                              // 40
  })), "\n        "), "\n        ", Blaze.If(function() {                                                             // 41
    return Spacebars.call(view.lookup("showSignupCode"));                                                             // 42
  }, function() {                                                                                                     // 43
    return [ "\n          ", HTML.P({                                                                                 // 44
      "class": "entry-signup-cta"                                                                                     // 45
    }, Blaze.View(function() {                                                                                        // 46
      return Spacebars.mustache(view.lookup("t9n"), "dontHaveAnAccount");                                             // 47
    }), " ", HTML.A({                                                                                                 // 48
      href: function() {                                                                                              // 49
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignUp");                                             // 50
      }                                                                                                               // 51
    }, Blaze.View(function() {                                                                                        // 52
      return Spacebars.mustache(view.lookup("t9n"), "signUp");                                                        // 53
    }))), "\n        " ];                                                                                             // 54
  }), "\n      "), "\n    "), "\n  ");                                                                                // 55
}));                                                                                                                  // 56
                                                                                                                      // 57
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/resetPassword/resetPassword.coffee.js                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.entryResetPassword.helpers({
  error: function() {
    return Session.get('entryError');
  },
  logo: function() {
    return AccountsEntry.settings.logo;
  }
});

Template.entryResetPassword.events({
  'submit #resetPassword': function(event) {
    var password, passwordErrors;
    event.preventDefault();
    password = $('input[type="password"]').val();
    passwordErrors = (function(password) {
      var errMsg, msg;
      errMsg = [];
      msg = false;
      if (password.length < 7) {
        errMsg.push(t9n("error.minChar"));
      }
      if (password.search(/[a-z]/i) < 0) {
        errMsg.push(t9n("error.pwOneLetter"));
      }
      if (password.search(/[0-9]/) < 0) {
        errMsg.push(t9n("error.pwOneDigit"));
      }
      if (errMsg.length > 0) {
        msg = "";
        errMsg.forEach(function(e) {
          return msg = msg.concat("" + e + "\r\n");
        });
        Session.set('entryError', msg);
        return true;
      }
      return false;
    })(password);
    if (passwordErrors) {
      return;
    }
    return Accounts.resetPassword(Session.get('resetToken'), password, function(error) {
      if (error) {
        return Session.set('entryError', error.reason || "Unknown error");
      } else {
        Session.set('resetToken', null);
        return Router.go(AccountsEntry.settings.dashboardRoute);
      }
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/social/template.social.js                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entrySocial");                                                                                  // 2
Template["entrySocial"] = new Template("Template.entrySocial", (function() {                                          // 3
  var view = this;                                                                                                    // 4
  return HTML.BUTTON({                                                                                                // 5
    "class": "btn",                                                                                                   // 6
    id: function() {                                                                                                  // 7
      return [ "entry-", Spacebars.mustache(view.lookup(".")) ];                                                      // 8
    },                                                                                                                // 9
    name: function() {                                                                                                // 10
      return Spacebars.mustache(view.lookup("."));                                                                    // 11
    }                                                                                                                 // 12
  }, "\n    ", Blaze.If(function() {                                                                                  // 13
    return Spacebars.call(view.lookup("unconfigured"));                                                               // 14
  }, function() {                                                                                                     // 15
    return [ "\n      ", HTML.I({                                                                                     // 16
      "class": function() {                                                                                           // 17
        return [ "fa fa-", Spacebars.mustache(view.lookup("icon")) ];                                                 // 18
      }                                                                                                               // 19
    }), " ", Blaze.View(function() {                                                                                  // 20
      return Spacebars.mustache(view.lookup("t9n"), "configure");                                                     // 21
    }), " ", Blaze.View(function() {                                                                                  // 22
      return Spacebars.mustache(view.lookup("capitalize"), view.lookup("."));                                         // 23
    }), "\n    " ];                                                                                                   // 24
  }, function() {                                                                                                     // 25
    return [ "\n      ", HTML.I({                                                                                     // 26
      "class": function() {                                                                                           // 27
        return [ "fa fa-", Spacebars.mustache(view.lookup("icon")) ];                                                 // 28
      }                                                                                                               // 29
    }), " ", Blaze.View(function() {                                                                                  // 30
      return Spacebars.mustache(view.lookup("buttonText"));                                                           // 31
    }), " ", Blaze.View(function() {                                                                                  // 32
      return Spacebars.mustache(view.lookup("t9n"), "with");                                                          // 33
    }), " ", Blaze.View(function() {                                                                                  // 34
      return Spacebars.mustache(view.lookup("capitalize"), view.lookup("."));                                         // 35
    }), "\n    " ];                                                                                                   // 36
  }), "\n  ");                                                                                                        // 37
}));                                                                                                                  // 38
                                                                                                                      // 39
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/social/social.coffee.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var capitalize;

Template.entrySocial.helpers({
  buttonText: function() {
    var buttonText;
    buttonText = Session.get('buttonText');
    if (buttonText === 'up') {
      return t9n('signUp');
    } else {
      return t9n('signIn');
    }
  },
  unconfigured: function() {
    return ServiceConfiguration.configurations.find({
      service: this.toString()
    }).fetch().length === 0;
  },
  google: function() {
    if (this[0] === 'g' && this[1] === 'o') {
      return true;
    }
  },
  icon: function() {
    switch (this.toString()) {
      case 'google':
        return 'google-plus';
      case 'meteor-developer':
        return 'rocket';
      default:
        return this;
    }
  }
});

Template.entrySocial.events({
  'click .btn': function(event) {
    var callback, loginWithService, options, serviceName;
    event.preventDefault();
    serviceName = $(event.target).attr('id').replace('entry-', '');
    callback = function(err) {
      if (!err) {
        if (Session.get('fromWhere')) {
          Router.go(Session.get('fromWhere'));
          return Session.set('fromWhere', void 0);
        } else {
          return Router.go(AccountsEntry.settings.dashboardRoute);
        }
      } else if (err instanceof Accounts.LoginCancelledError) {

      } else if (err instanceof ServiceConfiguration.ConfigError) {
        return Accounts._loginButtonsSession.configureService(serviceName);
      } else {
        return Accounts._loginButtonsSession.errorMessage(err.reason || t9n("error.unknown"));
      }
    };
    if (serviceName === 'meteor-developer') {
      loginWithService = Meteor["loginWithMeteorDeveloperAccount"];
    } else {
      loginWithService = Meteor["loginWith" + capitalize(serviceName)];
    }
    options = {};
    if (Accounts.ui._options.requestPermissions[serviceName]) {
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    }
    if (Accounts.ui._options.requestOfflineToken && Accounts.ui._options.requestOfflineToken[serviceName]) {
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    }
    return loginWithService(options, callback);
  }
});

capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/error/template.error.js                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entryError");                                                                                   // 2
Template["entryError"] = new Template("Template.entryError", (function() {                                            // 3
  var view = this;                                                                                                    // 4
  return Blaze.If(function() {                                                                                        // 5
    return Spacebars.call(view.lookup("error"));                                                                      // 6
  }, function() {                                                                                                     // 7
    return [ "\n  ", HTML.DIV({                                                                                       // 8
      "class": "alert alert-danger"                                                                                   // 9
    }, Blaze.View(function() {                                                                                        // 10
      return Spacebars.mustache(view.lookup("error"));                                                                // 11
    })), "\n  " ];                                                                                                    // 12
  });                                                                                                                 // 13
}));                                                                                                                  // 14
                                                                                                                      // 15
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/error/error.coffee.js                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Template.entryError.helpers({
  error: function() {
    return Session.get('entryError');
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/accountButtons/template.accountButtons.js                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entryAccountButtons");                                                                          // 2
Template["entryAccountButtons"] = new Template("Template.entryAccountButtons", (function() {                          // 3
  var view = this;                                                                                                    // 4
  return Blaze.If(function() {                                                                                        // 5
    return Spacebars.call(view.lookup("currentUser"));                                                                // 6
  }, function() {                                                                                                     // 7
    return [ "\n    ", Spacebars.include(view.lookupTemplate("signedInTemplate")), "\n  " ];                          // 8
  }, function() {                                                                                                     // 9
    return [ "\n\n    ", Spacebars.include(view.lookupTemplate("wrapLinksLi"), function() {                           // 10
      return [ "\n      ", HTML.A({                                                                                   // 11
        href: function() {                                                                                            // 12
          return Spacebars.mustache(view.lookup("pathFor"), "entrySignIn");                                           // 13
        }                                                                                                             // 14
      }, Blaze.View(function() {                                                                                      // 15
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("beforeSignIn")));                                    // 16
      }), Blaze.View(function() {                                                                                     // 17
        return Spacebars.mustache(view.lookup("t9n"), "signIn");                                                      // 18
      })), "\n    " ];                                                                                                // 19
    }), "\n\n    ", Blaze.Unless(function() {                                                                         // 20
      return Spacebars.call(view.lookup("wrapLinks"));                                                                // 21
    }, function() {                                                                                                   // 22
      return [ "\n      ", HTML.SPAN("or"), "\n    " ];                                                               // 23
    }), "\n\n    ", Blaze.If(function() {                                                                             // 24
      return Spacebars.call(view.lookup("showCreateAccountLink"));                                                    // 25
    }, function() {                                                                                                   // 26
      return [ "\n      ", Spacebars.include(view.lookupTemplate("wrapLinksLi"), function() {                         // 27
        return [ "\n        ", HTML.A({                                                                               // 28
          href: function() {                                                                                          // 29
            return Spacebars.mustache(view.lookup("entrySignUp"));                                                    // 30
          }                                                                                                           // 31
        }, Blaze.View(function() {                                                                                    // 32
          return Spacebars.makeRaw(Spacebars.mustache(view.lookup("beforeSignUp")));                                  // 33
        }), Blaze.View(function() {                                                                                   // 34
          return Spacebars.mustache(view.lookup("t9n"), "signUp");                                                    // 35
        })), "\n      " ];                                                                                            // 36
      }), "\n    " ];                                                                                                 // 37
    }), "\n  " ];                                                                                                     // 38
  });                                                                                                                 // 39
}));                                                                                                                  // 40
                                                                                                                      // 41
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/accountButtons/template._wrapLinks.js                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("wrapLinks");                                                                                    // 2
Template["wrapLinks"] = new Template("Template.wrapLinks", (function() {                                              // 3
  var view = this;                                                                                                    // 4
  return HTML.LI("\n  ", Blaze._InOuterTemplateScope(view, function() {                                               // 5
    return Spacebars.include(function() {                                                                             // 6
      return Spacebars.call(view.templateContentBlock);                                                               // 7
    });                                                                                                               // 8
  }), "\n");                                                                                                          // 9
}));                                                                                                                  // 10
                                                                                                                      // 11
Template.__checkName("noWrapLinks");                                                                                  // 12
Template["noWrapLinks"] = new Template("Template.noWrapLinks", (function() {                                          // 13
  var view = this;                                                                                                    // 14
  return Blaze._InOuterTemplateScope(view, function() {                                                               // 15
    return Spacebars.include(function() {                                                                             // 16
      return Spacebars.call(view.templateContentBlock);                                                               // 17
    });                                                                                                               // 18
  });                                                                                                                 // 19
}));                                                                                                                  // 20
                                                                                                                      // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/accountButtons/template.signedIn.js                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("entrySignedIn");                                                                                // 2
Template["entrySignedIn"] = new Template("Template.entrySignedIn", (function() {                                      // 3
  var view = this;                                                                                                    // 4
  return [ Blaze.If(function() {                                                                                      // 5
    return Spacebars.call(view.lookup("profileUrl"));                                                                 // 6
  }, function() {                                                                                                     // 7
    return [ "\n  ", Spacebars.include(view.lookupTemplate("wrapLinksLi"), function() {                               // 8
      return [ "\n    ", HTML.A({                                                                                     // 9
        "class": "profileLink",                                                                                       // 10
        href: function() {                                                                                            // 11
          return Spacebars.mustache(view.lookup("profileUrl"));                                                       // 12
        }                                                                                                             // 13
      }, Blaze.View(function() {                                                                                      // 14
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("beforeSignedInAs")));                                // 15
      }), Blaze.View(function() {                                                                                     // 16
        return Spacebars.mustache(view.lookup("signedInAs"));                                                         // 17
      })), "\n  " ];                                                                                                  // 18
    }), "\n" ];                                                                                                       // 19
  }, function() {                                                                                                     // 20
    return [ "\n  ", Spacebars.include(view.lookupTemplate("wrapLinksLi"), function() {                               // 21
      return [ "\n    ", HTML.P({                                                                                     // 22
        "class": "navbar-text"                                                                                        // 23
      }, Blaze.View(function() {                                                                                      // 24
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("beforeSignedInAs")));                                // 25
      }), Blaze.View(function() {                                                                                     // 26
        return Spacebars.mustache(view.lookup("signedInAs"));                                                         // 27
      })), "\n  " ];                                                                                                  // 28
    }), "\n" ];                                                                                                       // 29
  }), "\n\n", Spacebars.include(view.lookupTemplate("wrapLinksLi"), function() {                                      // 30
    return [ "\n  ", HTML.A({                                                                                         // 31
      href: function() {                                                                                              // 32
        return Spacebars.mustache(view.lookup("pathFor"), "entrySignOut");                                            // 33
      }                                                                                                               // 34
    }, Blaze.View(function() {                                                                                        // 35
      return Spacebars.makeRaw(Spacebars.mustache(view.lookup("beforeSignOut")));                                     // 36
    }), Blaze.View(function() {                                                                                       // 37
      return Spacebars.mustache(view.lookup("t9n"), "signOut");                                                       // 38
    })), "\n" ];                                                                                                      // 39
  }) ];                                                                                                               // 40
}));                                                                                                                  // 41
                                                                                                                      // 42
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/views/accountButtons/accountButtons.coffee.js                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var entryAccountButtonsHelpers;

entryAccountButtonsHelpers = {
  profileUrl: function() {
    if (!AccountsEntry.settings.profileRoute) {
      return false;
    }
    return AccountsEntry.settings.profileRoute;
  },
  wrapLinksLi: function() {
    if (AccountsEntry.settings.wrapLinks) {
      return Template.wrapLinks;
    } else {
      return Template.noWrapLinks;
    }
  },
  wrapLinks: function() {
    return AccountsEntry.settings.wrapLinks;
  },
  beforeSignIn: function() {
    return AccountsEntry.settings.beforeSignIn;
  },
  beforeSignUp: function() {
    return AccountsEntry.settings.beforeSignUp;
  },
  beforeSignOut: function() {
    return AccountsEntry.settings.beforeSignOut;
  },
  beforeSignedInAs: function() {
    return AccountsEntry.settings.beforeSignedInAs;
  },
  entrySignUp: function() {
    return AccountsEntry.settings.entrySignUp;
  },
  profile: function() {
    return Meteor.user().profile;
  }
};

Template.entryAccountButtons.helpers(entryAccountButtonsHelpers);

Template.entryAccountButtons.helpers({
  signedInTemplate: function() {
    if (AccountsEntry.settings.signedInTemplate) {
      Template[AccountsEntry.settings.signedInTemplate].helpers(entryAccountButtonsHelpers);
      return Template[AccountsEntry.settings.signedInTemplate];
    } else {
      return Template.entrySignedIn;
    }
  }
});

Template.entrySignedIn.helpers(entryAccountButtonsHelpers);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/english.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var en;

en = {
  signIn: "Sign In",
  signin: "sign in",
  signOut: "Sign Out",
  signUp: "Register",
  OR: "OR",
  forgotPassword: "Forgot your password?",
  emailAddress: "Email Address",
  emailResetLink: "Email Reset Link",
  dontHaveAnAccount: "Don't have an account?",
  resetYourPassword: "Reset your password",
  updateYourPassword: "Update your password",
  password: "Password",
  usernameOrEmail: "Username or email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "If you already have an account",
  signUpWithYourEmailAddress: "Register with your email address",
  username: "Username",
  optional: "Optional",
  signupCode: "Registration Code",
  clickAgree: "By clicking Register, you agree to our",
  privacyPolicy: "Privacy Policy",
  terms: "Terms of Use",
  sign: "Sign",
  configure: "Configure",
  "with": "with",
  createAccount: "Create an Account",
  and: "and",
  "Match failed": "Match failed",
  "User not found": "User not found",
  error: {
    minChar: "7 character minimum password.",
    pwOneLetter: "Password requires 1 letter.",
    pwOneDigit: "Password must have at least one digit.",
    usernameRequired: "Username is required.",
    emailRequired: "Email is required.",
    signupCodeRequired: "Registration code is required.",
    signupCodeIncorrect: "Registration code is incorrect.",
    signInRequired: "You must be signed in to do that.",
    usernameIsEmail: "Username cannot be an email address."
  }
};

T9n.map("en", en);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/french.coffee.js                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var fr;

fr = {
  signIn: "Se Connecter",
  signin: "se connecter",
  signOut: "Se Deconnecter",
  signUp: "S'enregistrer",
  OR: "OU",
  forgotPassword: "Vous avez oublié votre mot de passe ?",
  emailAddress: "Adresse Email",
  emailResetLink: "Adresse pour reinitialiser votre mot de passe",
  dontHaveAnAccount: "Vous n'avez pas de compte ?",
  resetYourPassword: "Reinitialiser votre mot de passe",
  updateYourPassword: "Mettre à jour le mot de passe",
  password: "Mot de passe",
  usernameOrEmail: "Nom d'utilisateur ou email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Si vous avez déjà un compte",
  signUpWithYourEmailAddress: "S'enregistrer avec votre adresse email",
  username: "Nom d'utilisateur",
  optional: "Optionnel",
  signupCode: "Code d'inscription",
  clickAgree: "En cliquant sur S'enregistrer, vous acceptez notre",
  privacyPolicy: "Politique de confidentialité",
  terms: "Conditions d'utilisation",
  sign: "S'enregistrer",
  configure: "Configurer",
  "with": "avec",
  createAccount: "Créer un compte",
  and: "et",
  error: {
    minChar: "Votre mot de passe doit contenir au minimum 7 caractères.",
    pwOneLetter: "Votre mot de passe doit contenir au moins une lettre.",
    pwOneDigit: "Votre mot de passe doit contenir au moins un chiffre.",
    usernameRequired: "Un nom d'utilisateur est requis.",
    emailRequired: "Un email est requis.",
    signupCodeRequired: "Un code d'inscription est requis.",
    signupCodeIncorrect: "Le code d'enregistrement est incorrect.",
    signInRequired: "Vous devez être connecté pour continuer.",
    usernameIsEmail: "Le nom d'utilisateur ne peut être le même que l'adresse email."
  }
};

T9n.map("fr", fr);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/german.coffee.js                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var de;

de = {
  signIn: "Anmelden",
  signin: "anmelden",
  signOut: "Abmelden",
  signUp: "Registrieren",
  OR: "ODER",
  forgotPassword: "Passwort vergessen?",
  emailAddress: "E-Mail Adresse",
  emailResetLink: "Senden",
  dontHaveAnAccount: "Noch kein Konto?",
  resetYourPassword: "Passwort zurücksetzen",
  updateYourPassword: "Passwort aktualisieren",
  password: "Passwort",
  usernameOrEmail: "Benutzername oder E-Mail",
  email: "E-Mail",
  ifYouAlreadyHaveAnAccount: "Falls Sie ein Konto haben, bitte hier",
  signUpWithYourEmailAddress: "Mit E-Mail registrieren",
  username: "Benutzername",
  optional: "Optional",
  signupCode: "Registrierungscode",
  clickAgree: "Durch die Registrierung akzeptieren Sie unsere",
  privacyPolicy: "Datenschutzerklärung",
  terms: "Geschäftsbedingungen",
  sign: "Anmelden",
  configure: "Konfigurieren",
  "with": "mit",
  createAccount: "Konto erzeugen",
  and: "und",
  error: {
    minChar: "Passwort muss mindesten 7 Zeichen lang sein.",
    pwOneLetter: "Passwort muss mindestens einen Buchstaben enthalten.",
    pwOneDigit: "Passwort muss mindestens eine Ziffer enthalten.",
    usernameRequired: "Benutzername benötigt.",
    emailRequired: "E-Mail benötigt.",
    signupCodeRequired: "Registrierungscode benötigt.",
    signupCodeIncorrect: "Registrierungscode ungültig.",
    signInRequired: "Sie müssen sich anmelden.",
    usernameIsEmail: "Benutzername kann nicht eine E-Mail."
  }
};

T9n.map("de", de);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/italian.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var it;

it = {
  signIn: "Accedi",
  signin: "accedi",
  signOut: "Esci",
  signUp: "Registrati",
  OR: "OPPURE",
  forgotPassword: "Hai dimenticato la password?",
  emailAddress: "Indirizzo Email",
  emailResetLink: "Invia Link di Reset",
  dontHaveAnAccount: "Non hai un account?",
  resetYourPassword: "Reimposta la password",
  updateYourPassword: "Aggiorna la password",
  password: "Password",
  usernameOrEmail: "Nome utente o email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Se hai già un account",
  signUpWithYourEmailAddress: "Registrati con il tuo indirizzo email",
  username: "Username",
  optional: "Opzionale",
  signupCode: "Codice di Registrazione",
  clickAgree: "Cliccando Registrati, accetti la nostra",
  privacyPolicy: "Privacy Policy",
  terms: "Termini di Servizio",
  sign: "Accedi",
  configure: "Configura",
  "with": "con",
  createAccount: "Crea un Account",
  and: "e",
  "Match failed": "Riscontro fallito",
  "User not found": "Utente non trovato",
  error: {
    minChar: "Password di almeno 7 caratteri.",
    pwOneLetter: "La Password deve contenere 1 lettera.",
    pwOneDigit: "La Password deve contenere almeno un numero.",
    usernameRequired: "Il Nome utente è obbligatorio.",
    emailRequired: "L'Email è obbligatoria.",
    signupCodeRequired: "Il Codice di Registrazione è obbligatorio.",
    signupCodeIncorrect: "Codice di Registrazione errato.",
    signInRequired: "Per fare questo devi accedere.",
    usernameIsEmail: "Il Nome Utente non può essere un indirizzo email."
  }
};

T9n.map("it", it);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/polish.coffee.js                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var pl;

pl = {
  signIn: "Zaloguj się",
  signin: "zaloguj się",
  signOut: "Wyloguj się",
  signUp: "Zarejestruj się",
  OR: "LUB",
  forgotPassword: "Zapomniałeś hasła?",
  emailAddress: "Adres email",
  emailResetLink: "Wyślij email z linkiem do zmiany hasła",
  dontHaveAnAccount: "Nie masz konta?",
  resetYourPassword: "Ustaw nowe hasło",
  updateYourPassword: "Zaktualizuj swoje hasło",
  password: "Hasło",
  usernameOrEmail: "Nazwa użytkownika lub email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Jeżeli już masz konto",
  signUpWithYourEmailAddress: "Zarejestruj się używając adresu email",
  username: "Nazwa użytkownika",
  optional: "Nieobowiązkowe",
  signupCode: "Kod rejestracji",
  clickAgree: "Klikając na Zarejestruj się zgadzasz się z naszą",
  privacyPolicy: "polityką prywatności",
  terms: "warunkami korzystania z serwisu",
  sign: "Podpisz",
  configure: "Konfiguruj",
  "with": "z",
  createAccount: "Utwórz konto",
  and: "i",
  error: {
    minChar: "7 znaków to minimalna długość hasła.",
    pwOneLetter: "Hasło musi zawierać 1 literę.",
    pwOneDigit: "Hasło musi zawierać przynajmniej jedną cyfrę.",
    usernameRequired: "Wymagana jest nazwa użytkownika.",
    emailRequired: "Wymagany jest adres email.",
    signupCodeRequired: "Wymagany jest kod rejestracji.",
    signupCodeIncorrect: "Kod rejestracji jest nieprawidłowy.",
    signInRequired: "Musisz być zalogowany, aby to zrobić.",
    usernameIsEmail: "Nazwa użytkownika nie może być adres e-mail."
  }
};

T9n.map("pl", pl);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/spanish.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var es;

es = {
  signIn: "Entrar",
  signOut: "Salir",
  signUp: "Suscribir",
  OR: "O",
  forgotPassword: "Contraseña olvidada?",
  emailAddress: "Dirección de Email",
  emailResetLink: "Reiniciar Email",
  dontHaveAnAccount: "No tenés una cuenta?",
  resetYourPassword: "Resetear tu contraseña",
  updateYourPassword: "Actualizar tu contraseña",
  password: "Contraseña",
  usernameOrEmail: "Usuario o email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Si ya tenés una cuenta",
  signUpWithYourEmailAddress: "Suscribir con tu email",
  username: "Usuario",
  optional: "Opcional",
  signupCode: "Codigo para suscribir",
  clickAgree: "Si haces clic en Sucribir estas de acuerdo con la",
  privacyPolicy: "Póliza de Privacidad",
  terms: "Terminos de Uso",
  sign: "Ingresar",
  configure: "Disposición",
  "with": "con",
  createAccount: "Crear cuenta",
  and: "y",
  error: {
    minChar: "7 carácteres mínimo.",
    pwOneLetter: "mínimo una letra.",
    pwOneDigit: "mínimo un dígito.",
    usernameRequired: "Usuario es necesario.",
    emailRequired: "Email es necesario.",
    signupCodeRequired: "Código para suscribir es necesario.",
    signupCodeIncorrect: "Código para suscribir no coincide.",
    signInRequired: "Debes iniciar sesión para hacer eso.",
    usernameIsEmail: "Usuario no puede ser Email."
  }
};

T9n.map("es", es);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/swedish.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var sv;

sv = {
  signIn: "Logga in",
  signin: "logga in",
  signOut: "Logga ut",
  signUp: "Skapa konto",
  OR: "ELLER",
  forgotPassword: "Glömt din e-postadress?",
  emailAddress: "E-postadress",
  emailResetLink: "E-post återställningslänk",
  dontHaveAnAccount: "Har du inget konto?",
  resetYourPassword: "Återställ ditt lösenord",
  updateYourPassword: "Uppdatera ditt lösenord",
  password: "Lösenord",
  usernameOrEmail: "Användarnamn eller e-postadress",
  email: "E-postadress",
  ifYouAlreadyHaveAnAccount: "Om du redan har ett konto",
  signUpWithYourEmailAddress: "Skapa ett konto med din e-postadress",
  username: "Användarnamn",
  optional: "Valfri",
  signupCode: "Registreringskod",
  clickAgree: "När du väljer att skapa ett konto så godkänner du också vår",
  privacyPolicy: "integritetspolicy",
  terms: "användarvilkor",
  sign: "Logga",
  configure: "Konfigurera",
  "with": "med",
  createAccount: "Skapa ett konto",
  and: "och",
  "Match failed": "Matchning misslyckades",
  "User not found": "Användaren hittades inte",
  error: {
    minChar: "Det krävs minst 7 tecken i ditt lösenord.",
    pwOneLetter: "Lösenordet måste ha minst 1 bokstav.",
    pwOneDigit: "Lösenordet måste ha minst 1 siffra.",
    usernameRequired: "Det krävs ett användarnamn.",
    emailRequired: "Det krävs ett lösenord.",
    signupCodeRequired: "Det krävs en registreringskod.",
    signupCodeIncorrect: "Registreringskoden är felaktig.",
    signInRequired: "Inloggning krävs här.",
    usernameIsEmail: "Användarnamnet kan inte vara en e-postadress."
  }
};

T9n.map("sv", sv);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/portuguese.coffee.js                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var pt;

pt = {
  signIn: "Entrar",
  signin: "Entrar",
  signOut: "Sair",
  signUp: "Registrar",
  OR: "OU",
  forgotPassword: "Esqueceu sua senha?",
  emailAddress: "Endereço de e-mail",
  emailResetLink: "Gerar nova senha",
  dontHaveAnAccount: "Não tem conta?",
  resetYourPassword: "Gerar nova senha",
  updateYourPassword: "Atualizar senha",
  password: "Senha",
  usernameOrEmail: "Usuario ou e-mail",
  email: "E-mail",
  ifYouAlreadyHaveAnAccount: "Se você já tem uma conta",
  signUpWithYourEmailAddress: "Entre usando seu endereço de e-mail",
  username: "Nome de usuário",
  optional: "Opcional",
  signupCode: "Código de acesso",
  clickAgree: "Ao clicar em Entrar, você aceita nosso",
  privacyPolicy: "Política de Privacidade",
  terms: "Termos de Uso",
  sign: "Entrar",
  configure: "Configurar",
  "with": "com",
  createAccount: "Criar Conta",
  and: "e",
  "Match failed": "Usuário ou senha não encontrado",
  "User not found": "Usuário não encontrado",
  error: {
    minChar: "Senha requer um mínimo de 7 caracteres.",
    pwOneLetter: "Senha deve conter pelo menos uma letra.",
    pwOneDigit: "Senha deve conter pelo menos um digito.",
    usernameRequired: "Nome de usuário é obrigatório.",
    emailRequired: "E-mail é obrigatório.",
    signupCodeRequired: "É necessário um código de acesso.",
    signupCodeIncorrect: "Código de acesso incorreto.",
    signInRequired: "Você precisa estar logado para fazer isso.",
    usernameIsEmail: "Nome de usuário não pode ser um endereço de e-mail."
  }
};

T9n.map("pt", pt);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/slovene.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var sl;

sl = {
  signIn: "Prijava",
  signin: "se prijavi",
  signOut: "Odjava",
  signUp: "Registracija",
  OR: "ALI",
  forgotPassword: "Pozabljeno geslo?",
  emailAddress: "Email naslov",
  emailResetLink: "Pošlji ponastavitveno povezavo",
  dontHaveAnAccount: "Nisi registriran(a)?",
  resetYourPassword: "Ponastavi geslo",
  updateYourPassword: "Spremeni geslo",
  password: "Geslo",
  usernameOrEmail: "Uporabniško ime ali email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Če si že registriran(a),",
  signUpWithYourEmailAddress: "Prijava z email naslovom",
  username: "Uporabniško ime",
  optional: "Po želji",
  signupCode: "Prijavna koda",
  clickAgree: "S klikom na Registracija se strinjaš",
  privacyPolicy: "z našimi pogoji uporabe",
  terms: "Pogoji uporabe",
  sign: "Prijava",
  configure: "Nastavi",
  "with": "z",
  createAccount: "Nova registracija",
  and: "in",
  "Match failed": "Prijava neuspešna",
  "User not found": "Uporabnik ne obstaja",
  "Incorrect password": "Napačno geslo",
  "Email already exists.": "Email že obstaja.",
  "Email is required": "Email je obvezen podatek",
  error: {
    minChar: "Geslo mora imeti vsaj sedem znakov.",
    pwOneLetter: "V geslu mora biti vsaj ena črka.",
    pwOneDigit: "V geslu mora biti vsaj ena številka.",
    usernameRequired: "Uporabniško ime je obvezen vnos.",
    emailRequired: "Email je obvezen vnos.",
    signupCodeRequired: "Prijavna koda je obvezen vnos.",
    signupCodeIncorrect: "Prijavna koda je napačna.",
    signInRequired: "Za to moraš biti prijavljen(a).",
    usernameIsEmail: "Uporabniško ime ne more biti email naslov."
  }
};

T9n.map("sl", sl);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/russian.coffee.js                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ru;

ru = {
  signIn: "Войти",
  signin: "Войти",
  signOut: "Выйти",
  signUp: "Регистрация",
  OR: "ИЛИ",
  forgotPassword: "Забыли пароль?",
  emailAddress: "Email",
  emailResetLink: "Отправить ссылку для сброса",
  dontHaveAnAccount: "Нет аккаунта?",
  resetYourPassword: "Сбросить пароль",
  updateYourPassword: "Обновить пароль",
  password: "Пароль",
  usernameOrEmail: "Имя пользователя или email",
  email: "Email",
  ifYouAlreadyHaveAnAccount: "Если у вас уже есть аккаунт",
  signUpWithYourEmailAddress: "Зарегистрируйтесь с вашим email адресом",
  username: "Имя пользователя",
  optional: "Необязательно",
  signupCode: "Регистрационный код",
  clickAgree: "Нажав на Регистрация вы соглашаетесь с условиями",
  privacyPolicy: "Политики безопасности",
  terms: "Условиями пользования",
  sign: "Подпись",
  configure: "Конфигурировать",
  "with": "с",
  createAccount: "Создать аккаунт",
  and: "и",
  "Match failed": "Не совпадают",
  "User not found": "Пользователь не найден",
  error: {
    minChar: "Минимальное кол-во символов для пароля 7.",
    pwOneLetter: "В пароле должна быть хотя бы одна буква.",
    pwOneDigit: "В пароле должна быть хотя бы одна цифра.",
    usernameRequired: "Имя пользователя обязательно.",
    emailRequired: "Email обязательно.",
    signupCodeRequired: "Необходим регистрациооный код.",
    signupCodeIncorrect: "Неправильный регистрационный код.",
    signInRequired: "Необходимо войти для чтобы продолжить.",
    usernameIsEmail: "Имя пользователя не может быть адресом email."
  }
};

T9n.map("ru", ru);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/client/t9n/arabic.coffee.js                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ar;

ar = {
  signIn: "تسجيل الدخول",
  signin: "تسجيل الدخول",
  signOut: "تسجيل الخروج",
  signUp: "افتح حساب جديد",
  OR: "او",
  forgotPassword: "نسيت كلمة السر؟",
  emailAddress: "البريد الالكترونى",
  emailResetLink: "اعادة تعيين البريد الالكترونى",
  dontHaveAnAccount: "ليس عندك حساب؟",
  resetYourPassword: "اعادة تعيين كلمة السر",
  updateYourPassword: "جدد كلمة السر",
  password: "كلمة السر",
  usernameOrEmail: "اسم المستخدم او البريد الالكترونى",
  email: "البريد الالكترونى",
  ifYouAlreadyHaveAnAccount: "اذا كان عندك حساب",
  signUpWithYourEmailAddress: "سجل ببريدك الالكترونى",
  username: "اسم المستخدم",
  optional: "اختيارى",
  signupCode: "رمز التسجيل",
  clickAgree: "بفتح حسابك انت توافق على",
  privacyPolicy: "سياسة الخصوصية",
  terms: "شروط الاستخدام",
  sign: "تسجيل",
  configure: "تعديل",
  "with": "مع",
  createAccount: "افتح حساب جديد",
  and: "و",
  "Match failed": "المطابقة فشلت",
  "User not found": "اسم المستخدم غير موجود",
  error: {
    minChar: "سبعة حروف هو الحد الادنى لكلمة السر",
    pwOneLetter: "كلمة السر تحتاج الى حرف اخر",
    pwOneDigit: "كلمة السر يجب ان تحتوى على رقم واحد على الاقل",
    usernameRequired: "اسم المستخدم مطلوب",
    emailRequired: "البريد الالكترونى مطلوب",
    signupCodeRequired: "رمز التسجيل مطلوب",
    signupCodeIncorrect: "رمز التسجيل غير صحيح",
    signInRequired: "عليك بتسجبل الدخول لفعل ذلك",
    usernameIsEmail: "اسم المستخدم لا يمكن ان يكون بريد الكترونى"
  }
};

T9n.map("ar", ar);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/joshowens:accounts-entry/shared/router.coffee.js                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var exclusions;

Router.map(function() {
  this.route("entrySignIn", {
    path: "/sign-in",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Session.set('buttonText', 'in');
      return this.next();
    },
    onRun: function() {
      var pkgRendered, userRendered;
      if (Meteor.userId()) {
        Router.go(AccountsEntry.settings.dashboardRoute);
      }
      if (AccountsEntry.settings.signInTemplate) {
        this.template = AccountsEntry.settings.signInTemplate;
        pkgRendered = Template.entrySignIn.rendered;
        userRendered = Template[this.template].rendered;
        if (userRendered) {
          Template[this.template].rendered = function() {
            pkgRendered.call(this);
            return userRendered.call(this);
          };
        } else {
          Template[this.template].rendered = pkgRendered;
        }
        Template[this.template].events(AccountsEntry.entrySignInEvents);
        Template[this.template].helpers(AccountsEntry.entrySignInHelpers);
      }
      return this.next();
    }
  });
  this.route("entrySignUp", {
    path: "/sign-up",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Session.set('buttonText', 'up');
      return this.next();
    },
    onRun: function() {
      var pkgRendered, userRendered;
      if (AccountsEntry.settings.signUpTemplate) {
        this.template = AccountsEntry.settings.signUpTemplate;
        pkgRendered = Template.entrySignUp.rendered;
        userRendered = Template[this.template].rendered;
        if (userRendered) {
          Template[this.template].rendered = function() {
            pkgRendered.call(this);
            return userRendered.call(this);
          };
        } else {
          Template[this.template].rendered = pkgRendered;
        }
        Template[this.template].events(AccountsEntry.entrySignUpEvents);
        Template[this.template].helpers(AccountsEntry.entrySignUpHelpers);
      }
      return this.next();
    }
  });
  this.route("entryForgotPassword", {
    path: "/forgot-password",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      return this.next();
    }
  });
  this.route('entrySignOut', {
    path: '/sign-out',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      if (AccountsEntry.settings.homeRoute) {
        Meteor.logout(function() {
          return Router.go(AccountsEntry.settings.homeRoute);
        });
      }
      return this.next();
    }
  });
  return this.route('entryResetPassword', {
    path: 'reset-password/:resetToken',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Session.set('resetToken', this.params.resetToken);
      return this.next();
    }
  });
});

exclusions = [];

_.each(Router.routes, function(route) {
  return exclusions.push(route.name);
});

Router.onStop(function() {
  var _ref;
  if (!_.contains(exclusions, (_ref = Router.current().route) != null ? _ref.getName() : void 0)) {
    return Session.set('fromWhere', Router.current().path);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['joshowens:accounts-entry'] = {
  AccountsEntry: AccountsEntry
};

})();

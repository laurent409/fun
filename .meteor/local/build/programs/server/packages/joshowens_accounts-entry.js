(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var T9n = Package['softwarerero:accounts-t9n'].T9n;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var AccountsEntry, __coffeescriptShare;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/joshowens:accounts-entry/server/entry.coffee.js                                          //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Meteor.startup(function() {
  var AccountsEntry;
  Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
  };
  AccountsEntry = {
    settings: {},
    config: function(appConfig) {
      return this.settings = _.extend(this.settings, appConfig);
    }
  };
  this.AccountsEntry = AccountsEntry;
  return Meteor.methods({
    entryValidateSignupCode: function(signupCode) {
      check(signupCode, Match.OneOf(String, null, void 0));
      return !AccountsEntry.settings.signupCode || signupCode === AccountsEntry.settings.signupCode;
    },
    entryCreateUser: function(user) {
      var profile, userId;
      check(user, Object);
      profile = AccountsEntry.settings.defaultProfile || {};
      if (user.username) {
        userId = Accounts.createUser({
          username: user.username,
          email: user.email,
          password: user.password,
          profile: _.extend(profile, user.profile)
        });
      } else {
        userId = Accounts.createUser({
          email: user.email,
          password: user.password,
          profile: _.extend(profile, user.profile)
        });
      }
      if (user.email && Accounts._options.sendVerificationEmail) {
        return Accounts.sendVerificationEmail(userId, user.email);
      }
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/joshowens:accounts-entry/shared/router.coffee.js                                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['joshowens:accounts-entry'] = {
  AccountsEntry: AccountsEntry
};

})();

//# sourceMappingURL=joshowens_accounts-entry.js.map

Router.configure({

    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    waitOn: function() {
      Meteor.subscribe('post', Meteor.user()),
      Meteor.subscribe('user')
    }
});

Router.map(function() {

    Router.route('/', {name: 'home'});
    Router.route('/dashboard', {name: 'dashboard'});
    Router.route('/chat', {name: 'chat'});
    Router.route('/settings', {name: 'settings'});
    this.route('/profile/:username', {
        name: 'profile',
        controller: 'profileController'
    });
    var requireLogin = function() {
        if (!Meteor.user()) {
            this.render('sign-in');
        }
        else {
            this.next();
        }
    };

    Router.onBeforeAction(requireLogin, {only: 'index'});
});

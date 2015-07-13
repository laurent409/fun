Router.configure({

    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function() {

    Router.route('/', {name: 'home'});
    // Router.route('/home', {name: 'home'});
    Router.route('/dashboard', {name: 'dashboard'});
    Router.route('/myprofile', {name: 'myprofile'});
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

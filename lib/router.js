/**
 * Created by Laurent-Fleexeo on 02/06/2015.
 */

Router.configure({

    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.map(function() {

    Router.route('/', {name: 'home'});
    // Router.route('/home', {name: 'home'});
    Router.route('/dashboard', {name: 'dashboard'});

});

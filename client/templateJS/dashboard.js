Template.dashboard.events({

    "submit #dashboard_submit_post": function(e) {
        e.preventDefault();

        var post = {
            content: $('#content_dashboard').val()
        };

        $('#content_dashboard').val("");

        Meteor.call('createPost', post, function(error) {
            if(error) {
                alert(error.reason);
            }
        });
    },


    "click #dashboard_click_post": function(e) {
        e.preventDefault();

        var post = {
            content: $('#content_dashboard').val()
        };
        // console.log("('#content_dashboard').val() : "+$('#content_dashboard').val());

        $('#content_dashboard').val("");

        Meteor.call('createPost', post, function(error) {
            if(error) {
                alert(error.reason);
            }
        });
        // console.log("post : "+post);
    }

});

Template.dashboard.helpers({

    getPosts: function () {

        return Posts.find({},
            {
                sort: {submitted: -1}
            }
        );
    },

    getNbGabsFromConnectedUser: function() {
        return Posts.find({ userId: Meteor.userId() }).count();
    },

    getNbFollowers: function() {
        var username = Meteor.user().username;
        var loggedUser = Meteor.users.findOne({ username: username });

        return loggedUser.nbFollowers;
    },

    getNbFollowing: function() {
        var username = Meteor.user().username;
        var loggedUser = Meteor.users.findOne({ username: username });

        return loggedUser.nbFollowing;
    },

    checkPicture: function() {
        var username = Meteor.user().username;
        var loggedUser = Meteor.users.findOne({ username: username });
        return loggedUser.urlAvatar == "";
    },

    checkBackPicture: function() {
        var author = Router.current().params.username;
        var authorUser = Meteor.users.findOne({ username: author });
        return authorUser.urlBackgroundImage == "";
    },

});

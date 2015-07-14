Template.profile.helpers({
    getPosts: function () {
        var username = Router.current().params.username;
        return Posts.find({ author: username},
            {
                sort: {submitted: -1}
            }
        );
    },

    getNbGabsFromSelectedUser: function() {
        return Posts.find({ author: Router.current().params.username }).count();
    },

    getUserInfos: function() {
        // console.log(Meteor.users.findOne({username: Router.current().params.username}));
        return Meteor.users.findOne({username: Router.current().params.username});
    },

    getUsername: function() {
        return Router.current().params.username;
    },

    ownProfile: function() {
        return Router.current().params.username == Meteor.user().username;
    },

    alreadyLiked: function() {
        return _.include(this.likesUserId, Meteor.userId());
    },

    followed: function() {
        var usernameInUrl = Router.current().params.username;
        var userToFollow = Meteor.users.findOne({ username: usernameInUrl });
        return _.include(userToFollow.followers, Meteor.userId());
    },

    getNbFollowers: function() {
        var usernameInUrl = Router.current().params.username;
        var userToFollow = Meteor.users.findOne({ username: usernameInUrl });

        return userToFollow.nbFollowers;
    },

    getNbFollowing: function() {
        var usernameInUrl = Router.current().params.username;
        var userToFollow = Meteor.users.findOne({ username: usernameInUrl });

        return userToFollow.nbFollowing;
    },

    checkPicture: function() {
        var author = Router.current().params.username;
        var authorUser = Meteor.users.findOne({ username: author });
        return authorUser.urlAvatar == "";
    },

    checkBackPicture: function() {
        var author = Router.current().params.username;
        var authorUser = Meteor.users.findOne({ username: author });
        return authorUser.urlBackgroundImage == "";
    },

    photoUpOptions: function() {
        return {
            //loadImage: ,
            crop: true,
            //jCrop: ,
            callback: function(error, photo) {

                var image = photo.src;
                // console.log(image);
                var user = {
                    description: $('description').val(),
                    urlAvatar: image
                };

                Meteor.call("updateProfile", user, function(error) {
                    if (error)
                        alert(error.reason);
                });
                //console.log(photo.src)
            }
        };
    }
});

Template.profile.events({

    "submit #profile_submit_post": function(e) {
        e.preventDefault();

        var post = {
            content: $('#content_profile').val()
        };

        $('#content_profile').val("");

        Meteor.call('createPost', post, function(error) {
            if(error) {
                alert(error.reason);
            }
        });
    },


    "click #profile_click_post": function(e) {
        e.preventDefault();

        var post = {
            content: $('#content_profile').val()
        };

        $('#content_profile').val("");

        Meteor.call('createPost', post, function(error) {
            if(error) {
                alert(error.reason);
            }
        });
    },

    "click #follow": function() {

        var usernameInUrl = Router.current().params.username;

        var followers = Meteor.users.findOne({ username: usernameInUrl });
        var following = Meteor.users.findOne({ _id: Meteor.userId() });

        var relatedUsers = {
            followedUserId: followers._id,
            followingUserId: Meteor.userId(),
            followers: followers,
            following: following
        };

        Meteor.call('followUser', relatedUsers, function(error) {
            if (error)
                alert(error.reason);
        });

    },

    "click #like": function() {

        var postId = this._id;

        var post = {
            _id: postId,
            likesUserId: this.likesUserId
        };

        Meteor.call('likePostOnProfile', post, function(error) {
            if (error)
                alert(error.reason);
        });
    },

    "click #delete": function() {

        var posts = this._id;

        swal({
            title: "Do you really want to delete this post ?",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            closeOnConfirm: true
        }, function(){
            Posts.remove(posts);
        });
    }

});

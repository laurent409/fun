Template.post.events({

    "click #like": function() {

        var postId = this._id;

        var post = {
            _id: postId,
            likesUserId: this.likesUserId
        };

        Meteor.call('likePost', post, function(error) {
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


Template.post.helpers({

    getUserInfo: function() {
        return Meteor.users.findOne({username: this.author});
    },

    ownPost: function() {
        return this.userId == Meteor.userId();
    },

    alreadyLiked: function() {
        return _.include(this.likesUserId, Meteor.userId());
    },

    checkPicture: function() {
        var author = this.author;
        var authorUser = Meteor.users.findOne({ username: author });
        return authorUser.urlAvatar == "";
    }

});

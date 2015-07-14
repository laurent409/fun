/**
 * Created by Hugo on 03/06/15.
 */


Meteor.methods({


    createPost: function(postAttributes) {
        var user = Meteor.user();

        if(!user)
            throw new Meteor.Error(401, "Log in to post something");

        if(!postAttributes.content)
            throw new Meteor.Error(422, "Please don't submit an empty post");

        var post = _.extend(_.pick(postAttributes, 'content'), {
            userId: user._id,
            author: user.username,
            authorId: Meteor.userId(),
            likesUserId: [],
            nbLikes: 0,
            submitted: new Date().getTime()
        });
        console.log("user._id : "+user._id+" ; user.username : "+user.username);
        return Posts.insert(post);
    },

    likePost: function(postAttributes) {
        var user = Meteor.user();

        if (!user) {
            //sweetAlert("Error", "Log in to like a post", "error");
            //return;
            throw new Meteor.Error(401, "Log in to like a post.");
        }

        if (!_.include(postAttributes.likesUserId, user._id)) {

            Posts.update(postAttributes._id,
                {
                    $push: {
                        likesUserId: user._id
                    },
                    $inc: {
                        nbLikes: 1
                    }
                }
            );

        }
        else {

            Posts.update(postAttributes._id,
                {
                    $pull: {
                        likesUserId: user._id
                    },
                    $inc: {
                        nbLikes: -1
                    }
                }
            );
        }
    },

    likePostOnProfile: function(postAttributes) {
        var user = Meteor.user();

        if (!user) {
            //sweetAlert("Error", "Log in to like a post", "error");
            //return;
            throw new Meteor.Error(401, "Log in to like a post.");
        }

        if (!_.include(postAttributes.likesUserId, user._id)) {

            Posts.update(postAttributes._id,
                {
                    $push: {
                        likesUserId: user._id
                    },
                    $inc: {
                        nbLikes: 1
                    }
                }
            );

        }
        else {

            Posts.update(postAttributes._id,
                {
                    $pull: {
                        likesUserId: user._id
                    },
                    $inc: {
                        nbLikes: -1
                    }
                }
            );
        }
    },

    deletePost: function(postAttributes) {

        swal({
            title: "Do you want to delete this post ?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Supprimer!",
            cancelButtonText: "Annuler",
            closeOnConfirm: true
        }, function(){
            Posts.remove(postAttributes._id);
        });



    }
});

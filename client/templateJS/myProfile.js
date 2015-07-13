Template.myprofile.events({
});

Template.myprofile.helpers({

  ownProfile: function() {
      return Meteor.user().username;
  },

  getConnectedUser: function(){
    return Meteor.user().username;
  },

  getPosts: function () {
    var username = Meteor.user().username;
    return Posts.find({ author: username},
        {
            sort: {submitted: -1}
        }
    );
  },

  getNbPostsFromSelectedUser: function() {
      return Posts.find({ author: Meteor.user().username }).count();
  },

  getUserInfos: function() {
      console.log(Meteor.users.findOne({username: Meteor.user().username}));
      return Meteor.users.findOne({username: Meteor.user().username});
  },

  alreadyLiked: function() {
      return _.include(this.likesUserId, Meteor.userId());
  },

  followed: function() {
      var usernameInUrl = Router.current().params.username;
      var userToFollow = Meteor.users.findOne({ username: Meteor.user().username });
      return _.include(userToFollow.followers, Meteor.userId());
  },

  getNbFollowers: function() {
      var userToFollow = Meteor.users.findOne({ username: Meteor.user().username });

      return userToFollow.nbFollowers;
  },

  getNbFollowing: function() {
      var userToFollow = Meteor.users.findOne({ username: Meteor.user().username });

      return userToFollow.nbFollowing;
  },

  checkPicture: function() {
      var authorUser = Meteor.users.findOne({ username: Meteor.user().username });
      return authorUser.urlAvatar == "";
  },

  photoUpOptions: function() {
      return {
          //loadImage: ,
          crop: true,
          //jCrop: ,
          callback: function(error, photo) {

              var image = photo.src;
              console.log(image);
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

Template.home.events({
});

Template.home.helpers({
  getConnectedUser: function(){
    return Meteor.user().username;
  }
});

Template.navbar.events({
});

Template.navbar.helpers({
  getConnectedUser: function(){
    return Meteor.user().username;
  }
});

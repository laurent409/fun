profileController = RouteController.extend({
    template: "profile",
    data: function() {
        var username = Router.current().params.username;
        return Meteor.users.findOne({ username: username });
    }
});

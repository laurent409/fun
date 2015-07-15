configurationController = RouteController.extend({
    template: "settings",
    data: function() {
        var username = Router.current().params.username;
        return Meteor.users.findOne({ username: username });
    }
});

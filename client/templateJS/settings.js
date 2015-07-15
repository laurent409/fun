
Template.settings.events({
    "submit #setSettings": function(event) {
        event.preventDefault();

        var description = $('#description').val();

        var usersInfos = {
            description: description
        };

        Meteor.call('updateDescription', usersInfos, function(error) {
            if (error)
                alert(error.reason);
        });

        window.location.href = "/profile/" + Router.current().params.username;//Router.current().params.username;

        return false;
    }
});

Template.settings.helpers({

    fillForm: function() {
        return Meteor.users.findOne({username: Router.current().params.username});

    },

    photoUpOptionsBack: function() {
        return {
            //loadImage: ,
            crop: true,
            //jCrop: ,
            callback: function(error, photo) {

                var image = photo.src;
                console.log(image);
                var user = {
                    description: $('description').val(),
                    urlBackgroundImage: image
                };

                Meteor.call("updateBackProfile", user, function(error) {
                    if (error)
                        alert(error.reason);
                });
                //console.log(photo.src)
            }
        };
    }
});

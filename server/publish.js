Meteor.publish('post', function(user) {

    if(user != null) {
        //var current = user.following;

        //current.push(Meteor.userId);

        return Posts.find();//{ authorId: {$in: current} }
    }

    return null;

});

Meteor.publish('user', function() {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            profile: 1,
            followers: 1,
            following: 1,
            nbFollowers: 1,
            nbFollowing: 1,
            urlAvatar: "",
            urlBackgroundImage: "",
            description: ""
        }
    });
});

Meteor.publish('userProfile', function(username) {
    var user = Meteor.users.findOne({
        username: username
    });

    if(!user) {
        this.ready();
        return;
    }

    if(this.userId == user._id) {
        return Meteor.users.find(this.userId);
    }
    else {
        return Meteor.users.find(user._id, {
            fields: {
                "profile": 0,
                "emails": 0,
                "followers": 1,
                "following": 1,
                "nbFollowers": 1,
                "nbFollowing": 1,
                urlAvatar: "",
                urlBackgroundImage: "",
                description: ""
            }
        });
    }
});

Meteor.publish('usersinfos', function() {
    return UsersInfos.find();
});

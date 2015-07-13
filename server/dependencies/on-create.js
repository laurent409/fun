Accounts.onCreateUser(function(option, user) {

    user.followers = [];
    user.following = [];
    user.nbFollowers = 0;
    user.nbFollowing = 0;
    user.urlAvatar = "";
    user.description = "My own description";

    return user;
});

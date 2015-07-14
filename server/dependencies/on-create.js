Accounts.onCreateUser(function(option, user) {

    user.description = "";
    user.followers = [];
    user.following = [];
    user.nbFollowers = 0;
    user.nbFollowing = 0;
    user.urlAvatar = "";

    return user;
});

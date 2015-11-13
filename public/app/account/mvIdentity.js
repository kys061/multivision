angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
        //currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function () {
            //console.log(!!this.currentUser);
            //console.log("Identity this.currentUser == $window.bootstrappedUserObject : ");
            //console.log(this.currentUser);
            return !!this.currentUser;
        },
        isAuthorized: function (roles) {
            return !!this.currentUser && this.currentUser.roles.indexOf('admin') > -1
        }
    }
})
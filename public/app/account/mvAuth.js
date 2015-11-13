angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: authenticateUser,
        logoutUser: logoutUser,
        authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
    }

    function authenticateUser (username, password) {
        var dfd = $q.defer();
        $http.post('/login', {username: username, password: password}).then(function (response) {
            //console.log(response.data);
            if (response.data.success) {
                var user = new mvUser();
                angular.extend(user, response.data.user);
                mvIdentity.currentUser = user;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function logoutUser () {
        var dfd = $q.defer();
        $http.post('/logout', {logout:true}).then(function(){
            mvIdentity.currentUser = undefined;
            dfd.resolve();
        })
        return dfd.promise;
    }

    function authorizeCurrentUserForRoute(role) {
        if(mvIdentity.isAuthorized(role)){
            return true;
        } else {
            return $q.reject('not authorized');
        }
    }


})
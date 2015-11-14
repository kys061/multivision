angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: authenticateUser,
        createUser: createUser,
        updateCurrentUser: updateCurrentUser,
        logoutUser: logoutUser,
        authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
        authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute
    }

    function authenticateUser (username, password) {
        var dfd = $q.defer();
        $http.post('/login', {username: username, password: password}).then(function (response) {
            //console.log(response.data);
            if (response.data.success) {
                var user = new mvUser();
                console.log("user in authenticateUser:")
                console.log(user);
                angular.extend(user, response.data.user);
                mvIdentity.currentUser = user;
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }
        });
        return dfd.promise;
    }

    function createUser (newUserData) {
        var newUser = new mvUser(newUserData);
        var dfd = $q.defer();

        newUser.$save().then(function(){
            mvIdentity.currentUser = newUser;
            dfd.resolve();
        }, function(response) {
            dfd.reject(response.data.reason);
        });

        return dfd.promise;
    }

    function updateCurrentUser(newUserData) {
        var dfd = $q.defer();

        var clone = angular.copy(mvIdentity.currentUser);
        console.log("before extend, and clone:");
        console.log(clone);
        angular.extend(clone, newUserData);
        console.log("after extend, and clone:");
        console.log(clone);
        clone.$update().then(function() {
            mvIdentity.currentUser = clone;
            dfd.resolve();
        }, function(response) {
            dfd.reject(response.data.reason);
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

    function authorizeAuthenticatedUserForRoute() {
        if(mvIdentity.isAuthenticated()) {
            return true;
        } else {
            return $q.reject('not authorized');
        }
    }
})


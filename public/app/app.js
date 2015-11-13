angular.module('app', ['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {

    var routeRoleCheck = {
       admin: {
           auth: function (mvAuth) {
               return mvAuth.authorizeCurrentUserForRoute('admin')
           }
       }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleCheck.admin
        })

});

// this is going to be a run section on my app module.
// by calling "run", the code within here is going to be executed
// after the module's been completely configured.
// so, it's going to be run after the code that's defined above

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
})
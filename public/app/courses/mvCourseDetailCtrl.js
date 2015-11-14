angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCourse, mvCachedCourses, $routeParams) {
    //$scope.course = mvCourse.get({_id:$routeParams.id})
    // mvCachedCourses.query returns array but that array exposes a promise that will resolve
    // when the data comes back, and that's contained in the $promise property
    mvCachedCourses.query().$promise.then(function(collection) {
        collection.forEach(function(course) {
            if(course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    })
});
angular.module('app').controller('mvMainCtrl', function($scope, mvCourse, mvCachedCourses){
    $scope.courses = mvCachedCourses.query();
    //$scope.courses = mvCourse.query();
});
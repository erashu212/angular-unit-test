// Home controller and injectors
ajapp.controller('homeCtrl', ['$scope', '$location', '$window', 'LoginService', "$http", "myConfig", function ($scope, $location, $window, $LoginService, $http, myConfig) {

    // Declaration
	$scope.authorized = $LoginService.verify();

}]);

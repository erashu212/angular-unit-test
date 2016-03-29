// Home controller and injectors
ajapp.controller('thetaCtrl', ['$scope', '$location', '$window', 'LoginService', "$http", "myConfig", "$stateParams", function ($scope, $location, $window, $LoginService, $http, myConfig, $stateParams) {

    // Declaration
	$scope.authorized = $LoginService.verify();
	$scope.error = '';
	
	$scope.gAllLocations = function() {
        $http({
            url: myConfig.baseURL + "/api/getAllLocations", 
            method: "get",
         }).success(function(data){
            $scope.AllLocations = data.data;
            $scope.error = '';
        }).error(function(err){
            $scope.error = "Error: " + err.message
            $scope.AllLocations = '';
        });
    };
      
    	$scope.gAllSkills = function() {
        $http({
            url: myConfig.baseURL + "/api/getAllSkills", 
            method: "get",
         }).success(function(data){
            $scope.AllSkills = data.data;
            $scope.error = '';
        }).error(function(err){
            $scope.error = "Error: " + err.message
            $scope.AllSkills = '';
        });
    };
    
    	$scope.gPersonEmail = function(email) {
        $http({
            url: myConfig.baseURL + "/api/lookUpPerson/" + email, 
            method: "get",
         }).success(function(data){
            $scope.PersonEmail = data.data;
            $scope.error = '';
        }).error(function(err){
            $scope.error = "Error: " + err.message
            $scope.PersonEmail = '';
        });
    };
    
    	$scope.gPersonBySkill = function(skill) {
        $http({
            url: myConfig.baseURL + "/api/getPersonBySkill/" + skill,
            method: "get",
         }).success(function(data){
            $scope.PersonBySkill = data.data;
            $scope.error = '';
        }).error(function(err){
            $scope.error = "Error: " + err.message
            $scope.PersonBySkill = '';
        });
    };

        $scope.gPersonalAppointments = function(email) {
        $http({
            url: myConfig.baseURL + "/api/getPersonalAppointments/" + email, 
            method: "get",
            headers: {
                'token': $window.sessionStorage.token
            }
         }).success(function(data){
            $scope.PersonalAppointments = data.data;
            $scope.error = '';
        }).error(function(err){
            $scope.error = "Error: " + err.message
            $scope.PersonalAppointments = '';
        });
    };
}]);

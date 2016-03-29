// User controller and injectors
ajapp.controller('personCtrl', ['$scope', '$http', '$location', '$window', 'LoginService', 'AuthenticationService', '$timeout', 'myConfig', function ($scope, $http, $location, $window, $LoginService, $AuthenticationService, $timeout, $myConfig) {

        // Declaration
        $scope.authorized = $LoginService.verify;
        $scope.PersonEmail = "";
        $scope.error = '';
    
        
        $scope.gPersonUsername = function() {
            $http({
                url: $myConfig.baseURL + "/api/lookUpPersonByUsername/" + $window.sessionStorage.username,
                method: "get",
             }).success(function(data){
                $scope.PersonEmail = data.data[1];
                $scope.error = '';
            }).error(function(err){
                $scope.error = "Error: " + err.message
                $scope.PersonEmail = "";
            });
        };
        
        $scope.deletePerson = function(email) {
            $http({
                method: 'delete',
                url: $myConfig.baseURL + "/api/deletePerson/" + $scope.PersonEmail,
                headers: {
                    'token': $window.sessionStorage.token}
                }).success(function(){
                   $location.path("/logout");
                }).error(function(err){
                    $scope.error = "Error: " + err.message
        });
        };
        
        $scope.modifyPerson = function(email1, name1, password1, islect) {
            $http({
                method: 'put',
                url: $myConfig.baseURL + "/api/modifyPerson/" + $scope.PersonEmail,
                data: {
                    email: email1,
                    name: name1,
                    password: password1,
                    lecturer: islect
                },
                headers:{
                    'token': $window.sessionStorage.token}
                }).success(function(){
                   $location.path("/logout");
             }).error(function(err){
            $scope.error = "Error: " + err.message
        });
        };
        
        
    }
]);
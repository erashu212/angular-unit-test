// User controller and injectors
ajapp.controller('userCtrl', ['$scope', '$http', '$location', '$window', 'LoginService', 'AuthenticationService', '$timeout', 'myConfig', function ($scope, $http, $location, $window, $LoginService, $AuthenticationService, $timeout, $myConfig) {

        // Declaration
        $scope.authorized = $LoginService.verify;
        $scope.register_success = $window.sessionStorage.register_success;
        $scope.login_success = $window.sessionStorage.login_success;
        $scope.login_error = $window.sessionStorage.login_error;
        $scope.skills = [];
        $scope.error = '';
    
        $scope.addSkill = function(skill) {
            if (skill != null && skill != "") {
            $scope.skills.push(skill);
                
            }
        },
    
    	$scope.gAllSkills = function() {
            $http({
                url: $myConfig.baseURL + "/api/getAllSkills", 
                method: "get",
             }).success(function(data){
                $scope.AllSkills = data.data;
                $scope.error = '';
            }).error(function(err){
                $scope.error = "Error: " + err.message
                $scope.AllSkills = '';
            });
        };
        
        $scope.removeSkill = function(index) {
         $scope.skills.splice(index, 1);
        };

       // Timeout alert message
        $timeout(function(){
            delete $window.sessionStorage.register_success;
            delete $window.sessionStorage.login_success;
            delete $window.sessionStorage.login_error;
            $scope.register_success = false
            $scope.login_success = false
            $scope.login_error = false
        }, 5000);

        // Login method
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
                $LoginService.logIn(username, password).success(function(data) {
                    $AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.username = username;
                    $window.sessionStorage.token = data.data;
                    $window.sessionStorage.login_success = true;
                    $location.path("/");
                    $window.location.reload();
                }).error(function(status, data) {
                    $window.sessionStorage.login_error = true;
                    $scope.login_error = true;
                });
            }
        }
        
        // Register method
        $scope.register = function register(rname, email, username, password, IsLecturer) {
            var skills = $scope.skills
            if ($AuthenticationService.isAuthenticated) {
                $location.path("/theta");
            }
            else {
                $LoginService.register(rname, email, username, password, skills, IsLecturer).success(function(data) {
                    $window.sessionStorage.register_success = true;
                    $location.path("/login");
                }).error(function(status, data) {
                });
            }
        }

        // Logout method
        $scope.logOut = function logout() {
            if ($AuthenticationService.isAuthenticated) {
                $AuthenticationService.isAuthenticated = false;
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.token;
                $location.path("/");
                $window.location.reload();
            }
        }
        
    }
]);
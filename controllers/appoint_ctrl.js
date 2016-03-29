ajapp.controller('appointCtrl', ['$scope', '$location', '$window', 'LoginService', "$http", "myConfig", "$stateParams", function ($scope, $location, $window, $LoginService, $http, $myConfig, $stateParams) {

        $scope.authorized = $LoginService.verify;
        $scope.AllLecturer = [];
        $scope.appoints = [];
        $scope.error = '';
        $scope.test = "33"

    	$scope.gAllLecturer = function() {
            $http({
                url: $myConfig.baseURL + "/api/getAllLecturer",
                method: "get",
             }).success(function(data){
                var AllLecturerRaw = data.data;
                for(var i = 0; i<AllLecturerRaw.length; i++){
                    var name = AllLecturerRaw[i][1]
                    var username = AllLecturerRaw[i][3]
                    $scope.AllLecturer.push({name:name,username:username})
                }
                $scope.error = '';
            }).error(function(err){
                $scope.error = "Error: " + err.message
                $scope.AllLecturer = '';
            });
        };

    	$scope.gAllLocations = function() {
            $http({
                url: $myConfig.baseURL + "/api/getAllLocations",
                method: "get",
             }).success(function(data){
                $scope.AllLocations = data.data;
                $scope.error = '';
            }).error(function(err){
                $scope.error = "Error: " + err.message
                $scope.AllLocations = '';
            });
        };

        $scope.addAppoint = function(Title, STime, ETime, DDate, Participants, Bookable, Location) {
            $http({
                method: 'POST',
                url: $myConfig.baseURL + "/api/addNewAppointment",
                data: {
                    title: Title,
                    startTime: STime,
                    endTime: ETime,
                    date: DDate,
                    participants: Participants,
                    bookable: Bookable,
                    location: Location
                },
                headers: {
                    'token': $window.sessionStorage.token
                }
             }).success(function(data){
                $scope.appoints.push(data.data)
                $scope.error = '';
             }).error(function(err){
            $scope.error = "Error: " + err.message
        });
    };


        $scope.removeAppoint = function(id, index) {
            $http({
                method: 'delete',
                url: $myConfig.baseURL + "/api/deleteAppointment/" + id,
                headers: {
                    'token': $window.sessionStorage.token
                }
            }).success(function(data){
                $scope.appoints.splice(index, 1);
                $scope.error = "Appointment Deleted!";
             }).error(function(err){
            $scope.error = "Error: " + err.message
        });
        };
        // Not Working , Server Sided
        $scope.modifyAppoint = function(id, Title, STime, ETime, DDate, Participants, Bookable, Location) {
            $http({
                method: 'put',
                url: $myConfig.baseURL + "/api/modifyAppointment/" + id,
                data: {
                    title: Title,
                    startTime: STime,
                    endTime: ETime,
                    date: DDate,
                    participants: Participants,
                    bookable: Bookable,
                    location: Location
                },
                headers: {
                    'token': $window.sessionStorage.token
                }
            }).success(function(data){
                $scope.error = "Appointment Updated!";
             }).error(function(err){
            $scope.error = "Error: " + err.message
        });
        };


    }
]);

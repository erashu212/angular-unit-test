// Angular app declaration, injecting modules and services

var ajapp = angular.module("ajjapp", ['ui.router', 'ngRoute', 'ngSanitize', 'UserService']);
ajapp.constant('myConfig',
	{
	
		baseURL: 'http://cortexapi.ddns.net:8080'

	});

// Token interceptor
ajapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

// Routes declaration
ajapp.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	
		.state('home',{
			url:"/",
			views: {
			  '@': {            
				templateUrl: "templates/home.html",
				controller: 'homeCtrl',
				access: { requiredLogin: false }
			  }
			}
		})
		.state('login',{
			url:"/login",
			views: {
			  '@': {            
				templateUrl: "templates/users/login.html",
				controller: 'userCtrl',
				access: { requiredLogin: false }
			  }
			}
		})
		.state('logout',{
			url:"/logout",
			views: {
			  '@': {
			  	templateUrl: "templates/users/logout.html",
				controller: 'userCtrl',
				access: { requiredLogin: true }
			  }
			}
		})
		.state('register',{
			url:"/register",
			views: {
			  '@': {            
				templateUrl: "templates/users/register.html",
				controller: 'userCtrl',
				access: { requiredLogin: false }
			  }
			}
		})
		.state('theta',{
			url:"/theta",
			views: {
			  '@': {            
				templateUrl: "templates/theta.html",
				controller: 'thetaCtrl',
				access: { requiredLogin: false }
			  }
			}
		})
		.state('appointment',{
			url:"/appointment",
			views: {
			  '@': {            
				templateUrl: "templates/appoint/appointment.html",
				controller: 'appointCtrl',
				access: { requiredLogin: false } // change to True
			  }
			}
		})
		.state('modifyPerson',{
			url:"/modifyPerson",
			views: {
			  '@': {            
				templateUrl: "templates/users/modify.html",
				controller: 'personCtrl',
				access: { requiredLogin: false } // change to True
			  }
			}
		})
		
	$urlRouterProvider.otherwise('/');
	
		
})

ajapp.run(function($rootScope, $state) {
$rootScope.$on("$stateChangeStart", 
	function(event, toState, toParams, fromState, fromParams) {
       $state.callbackState = fromState.name       
   });

});

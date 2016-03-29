describe("Unit: Testing Controller", function() {
  var service, httpBackend, createController, scope, service, _window, location;
  var baseURL = 'http://cortexapi.ddns.net:8080';
  describe("teta Ctrl:", function() {

    beforeEach(module('ngRoute'));
    beforeEach(module('ui.router'));
    beforeEach(module('ngSanitize'));
    beforeEach(module('UserService'));
    beforeEach(module('ajjapp'));

    beforeEach(inject(function($rootScope, $injector, $httpBackend, $templateCache) {
      scope = $rootScope.$new();
      var _ctrl = $injector.get('$controller');
      service = $injector.get('LoginService');
      _window = $injector.get('$window');
      location = $injector.get('$location');
      httpBackend = $httpBackend;


      $templateCache.put('templates/home.html', 'templates/home.html');
      $templateCache.put('templates/users/logout.html', 'templates/users/logout.html');

      spyOn(service, 'verify').and.returnValue(true);
      _window.sessionStorage.username = 'as';
      createController = function() {
        return _ctrl('thetaCtrl', {
          '$scope': scope,
          LoginService: service,
          $window: _window
        });
      };
    }));

    it('teta ctrl should be defined', function() {
      var controller = createController();
      expect(controller).toBeDefined();
    })

    it('user has  authorization', function() {
      createController();
      expect(scope.authorized).toBeTruthy();
    })

    it('get all locations', function() {
      var responseData = {
        "status": "success",
        "message": "5 locations found.",
        "data": [{
          "name": "Starbucks"
        }, {
          "name": "Theta"
        }, {
          "name": "ECG-26"
        }, {
          "name": "EC1-14"
        }, {
          "name": "EC2-12"
        }]
      };

      httpBackend.expectGET(baseURL + "/api/getAllLocations").respond(200, responseData);
      createController();
      scope.gAllLocations();
      httpBackend.flush();

      expect(scope.AllLocations).toEqual(responseData.data);
      expect(scope.error).toEqual('');
    });


    it('get all skills', function() {
      var responseData = {
        "status": "success",
        "message": "5 locations found.",
        "data": [{
          "name": "Starbucks"
        }, {
          "name": "Theta"
        }, {
          "name": "ECG-26"
        }, {
          "name": "EC1-14"
        }, {
          "name": "EC2-12"
        }]
      };

      httpBackend.expectGET(baseURL + "/api/getAllSkills").respond(200, responseData);
      createController();
      scope.gAllSkills();
      httpBackend.flush();

      expect(scope.AllSkills).toEqual(responseData.data);
      expect(scope.error).toEqual('');
    });

    it('get person email', function() {
      var responseData = {
        'data': 'test@test.com'
      };

      httpBackend.expect('GET', baseURL + "/api/lookUpPerson/as").respond(200, responseData);
      createController();
      scope.gPersonEmail('as');
      httpBackend.flush();

      expect(scope.PersonEmail).toEqual(responseData.data);
      expect(scope.error).toEqual('');
    });

    it('get person by skill', function() {
      var responseData = {
        'data': 'test@test.com'
      };

      httpBackend.expect('GET', baseURL + "/api/getPersonBySkill/as").respond(200, responseData);
      createController();
      scope.gPersonBySkill('as');
      httpBackend.flush();

      expect(scope.PersonBySkill).toEqual(responseData.data);
      expect(scope.error).toEqual('');
    });

    it('get person appointments', function() {
      var responseData = {
        'data': 'test@test.com'
      };

      httpBackend.expect('GET', baseURL + "/api/getPersonalAppointments/as").respond(200, responseData);
      createController();
      scope.gPersonalAppointments('as');
      httpBackend.flush();

      expect(scope.PersonalAppointments).toEqual(responseData.data);
      expect(scope.error).toEqual('');
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

  })
});

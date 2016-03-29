describe("Unit: Testing Controller", function() {
  var service, httpBackend, createController, scope, service, _window, location;
  var baseURL = 'http://cortexapi.ddns.net:8080';
  describe("Person Ctrl:", function() {

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
        return _ctrl('personCtrl', {
          '$scope': scope,
          LoginService: service,
          $window: _window
        });
      };
    }));

    it('person ctrl should be defined', function() {
      var controller = createController();
      expect(controller).toBeDefined();
    })

    it('user has  authorization', function() {
      createController();
      expect(scope.authorized).toBeTruthy();
    })

    it('get person username - HTTP STATUS 200 ok', function() {
      var responseData = {
        "status": "success",
        "message": "Lecturer found",
        "data": [
          'test@test.com',
          'abc@xyz.com',
        ]
      };

      httpBackend.expect('GET', baseURL + "/api/lookUpPersonByUsername/as").respond(200, responseData);
      createController();
      scope.gPersonUsername();
      httpBackend.flush();

      expect(scope.PersonEmail).toEqual(responseData.data[1]);
      expect(scope.error).toEqual('');
    });

    it('get person username - not 200 status', function() {
      httpBackend.expect('GET', baseURL + "/api/lookUpPersonByUsername/as").respond(500, {
        message: '500'
      });
      createController();
      scope.gPersonUsername();
      httpBackend.flush();

      expect(scope.PersonEmail).toEqual('');
      expect(scope.error).toEqual('Error: 500');
    });

    it('delete person by email', function() {
      httpBackend.expect('DELETE', baseURL + "/api/deletePerson/as").respond(200);
      createController();
      scope.PersonEmail = 'as';
      scope.deletePerson();
      httpBackend.flush();
      expect(location.path()).toBe('/logout')
    });


    it('update person by email', function() {
      httpBackend.expect('PUT', baseURL + "/api/modifyPerson/as").respond(200);
      createController();
      scope.PersonEmail = 'as';
      scope.modifyPerson('a', 'b', 'c', 'd');
      httpBackend.flush();
      expect(location.path()).toBe('/logout')
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

  })
});

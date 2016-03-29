describe("Unit: Testing Controller", function() {
  var service, httpBackend, createController, scope, service, _window, location;
  var baseURL = 'http://cortexapi.ddns.net:8080';
  describe("user Ctrl:", function() {

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

      spyOn(service, 'verify').and.returnValue(true);
      _window.sessionStorage.username = 'as';
      createController = function() {
        return _ctrl('userCtrl', {
          '$scope': scope,
          LoginService: service,
          $window: _window
        });
      };
    }));

    it('user ctrl should be defined', function() {
      var controller = createController();
      expect(controller).toBeDefined();
    })

    it('user has  authorization', function() {
      createController();
      expect(scope.authorized).toBeTruthy();
    })

    it('add skill', function() {
      var requestData = {
        id: 1,
        name: 'skill1'
      };

      createController();
      scope.addSkill(requestData);

      expect(scope.skills.length).toEqual(1);
      expect(scope.skills[0]).toEqual(requestData);
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

    it('remove skill', function() {
      var requestData = {
        id: 1,
        name: 'skill1'
      };

      createController();
      scope.addSkill(requestData);

      expect(scope.skills.length).toEqual(1);
      expect(scope.skills[0]).toEqual(requestData);

      scope.removeSkill(0);

      expect(scope.skills.length).toEqual(0);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

  })
});

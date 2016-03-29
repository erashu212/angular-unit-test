describe("Unit: Testing Controller", function() {
  var service, httpBackend, controller, scope, service, $window;
  describe("Home Ctrl:", function() {

    beforeEach(module('ngRoute'));
    beforeEach(module('ui.router'));
    beforeEach(module('ngSanitize'));
    beforeEach(module('UserService'));
    beforeEach(module('ajjapp'));

    beforeEach(inject(function($rootScope, $injector, $httpBackend, $templateCache) {
      scope = $rootScope.$new();
      var _ctrl = $injector.get('$controller');
      service = $injector.get('LoginService');
      httpBackend = $httpBackend;

      $templateCache.put('templates/home.html', 'templates/home.html');
      spyOn(service, 'verify').and.returnValue(true);
      controller = _ctrl('homeCtrl', {'$scope' : scope ,'LoginService' : service});
    }));

    it('home ctrl should be defined', function(){
      expect(controller).toBeDefined();
    })

    it('user has  authorization', function(){
      expect(service.verify).toHaveBeenCalled();
      expect(scope.authorized).toBeTruthy();
    })

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  })
});

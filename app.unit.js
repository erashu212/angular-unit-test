'use strict';
describe('Token Interceptor', function() {
  var tokenInterceptor;
  var authenticationService, _window, $q;
  beforeEach(module('UserService'));
  beforeEach(inject(function(_$q_, AuthenticationService, $window, TokenInterceptor) {
    authenticationService = AuthenticationService;
    _window = $window;
    $q = _$q_;
    tokenInterceptor = TokenInterceptor;
    $window.sessionStorage.token = true;
    authenticationService.isAuthenticated = false;
  }));

  it('should have TokenInterceptor be defined', function() {
    expect(tokenInterceptor).toBeDefined();
  });

  it('HTTP status : is 200 ok', function() {
    var response = {
      status: 200,
      config: {}
    };

    var promise = tokenInterceptor.response(response)
    expect(authenticationService.isAuthenticated).toBeTruthy();
  });

  it('HTTP status : is 401 Unauthorized', function() {
    var response = {
      status: 401,
      config: {}
    };

    spyOn($q, 'reject');
    var promise = tokenInterceptor.responseError(response)
    expect($q.reject).toHaveBeenCalled();
  });

});

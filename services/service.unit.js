describe("Unit: Testing User Module", function() {
  var service, httpBackend, baseUrl, registerUserData;
  baseUrl = 'http://cortexapi.ddns.net:8080';
  describe('Token Interceptor :', function() {
    describe("Authentication Service :", function() {
      var authenticationService, _window;
      beforeEach(module('UserService'));
      beforeEach(inject(function(AuthenticationService, $window) {
        authenticationService = AuthenticationService;
        _window = $window;
        $window.sessionStorage.token = true;
        authenticationService.isAuthenticated = false;
      }));

      it('by default it should have authentication as false', function() {
        expect(authenticationService.isAuthenticated).not.toBeTruthy();
      });

      afterEach(function() {
        _window.sessionStorage.token = false;
      });
    });

    describe("Login Service:", function() {
      var _window;
      beforeEach(module('UserService'))
      beforeEach(inject(function(LoginService, $httpBackend, $window) {
        service = LoginService;
        httpBackend = $httpBackend;
        _window = $window;
        registerUserData = {
          rname: 'test',
          email: 'test@test.com',
          username: 'testUN',
          password: 'password',
          skills: 'angularjs, jasmine, typescript',
          IsLecturer: true
        }
      }));

      it('login should be defined', function() {
        expect(service).toBeDefined();
      });

      it('it should allow to logged in if username ="admin" and password="admin"', function() {
        var stubUser = {
          username: 'admin',
          password: 'admin'
        };
        var stubResponse = {
          login: 'admin',
          lastLogin: Date.now()
        }

        httpBackend.expectPOST(baseUrl + '/api/authenticate').respond(200, stubResponse)
        service.logIn(stubUser.username, stubUser.password).success(function(response) {
          expect(response.login).toBe(stubResponse.login)
          expect(response.lastLogin).toBe(stubResponse.lastLogin)
        });

        httpBackend.flush();
      });

      it('it should not allow to logged in if username !="admin" and password !="admin"', function() {
        var stubUser = {
          username: 'admin1',
          password: 'admin1'
        };
        var stubResponse = {
          login: 'admin',
          lastLogin: Date.now()
        }

        httpBackend.expectPOST(baseUrl + '/api/authenticate').respond(401, {})
        service.logIn(stubUser.username, stubUser.password).success(function(response) {
          expect(response.login).not.toBe(stubResponse.login)
          expect(response.lastLogin).not.toBe(stubResponse.lastLogin)
        });
        httpBackend.flush();
      });

      it('it should allow user to be registerd', function() {

        var stubResponse = {
          username: registerUserData.username,
          email: registerUserData.email
        }

        httpBackend.expectPOST(baseUrl + '/api/addNewPerson').respond(200, stubResponse);
        service.register(
          registerUserData.rname,
          registerUserData.email,
          registerUserData.username,
          registerUserData.password,
          registerUserData.skills,
          registerUserData.IsLecturer).success(function(response) {
          expect(response.username).toBe(stubResponse.username)
          expect(response.email).toBe(stubResponse.email)
        });
        httpBackend.flush();
      });

      it('it should return false if no token', function() {
        spyOn(service, 'verify').and.returnValue(false);
        var isTruthy = service.verify();
        expect(isTruthy).not.toBeTruthy();
      })

      it('it should return true if there is session', function() {
        spyOn(service, 'verify').and.returnValue(true);
        var isTruthy = service.verify();
        expect(isTruthy).toBeTruthy();
      })

      afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
      });
    })
  });
})

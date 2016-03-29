describe("Unit: Testing Controller", function() {
  var service, httpBackend, createController, scope, service, _window;
  var baseURL = 'http://cortexapi.ddns.net:8080';
  describe("ApPoint Ctrl:", function() {

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
      _window = $injector.get('$window');

      $templateCache.put('templates/home.html', 'templates/home.html');
      spyOn(service, 'verify').and.returnValue(true);
      createController = function() {
        return _ctrl('appointCtrl', {
          '$scope': scope,
          LoginService: service
        });
      };
    }));

    it('appoint ctrl should be defined', function() {
      var controller = createController();
      expect(controller).toBeDefined();
    })

    it('user has  authorization', function() {
      createController();
      expect(scope.authorized).toBeTruthy();
    })

    it('get all lecturer', function() {
      var responseData = {
        "status": "success",
        "message": "Lecturer found",
        "data": [
          [
            [
              "Project Management"
            ],
            "Craig Stewart ",
            "ab4491@coventry.ac.uk",
            "craigs"
          ],
          [
            [
              "JavaScript",
              "Neo4j",
              "AngularJS",
              "NodeJS"
            ],
            "Mark Tyers",
            "aa7401@coventry.ac.uk",
            "markt"
          ],
          [
            [
              "Project Management"
            ],
            "Peter Every",
            "peter.every@coventry.ac.uk",
            "petere"
          ]
        ]
      };

      httpBackend.expectGET(baseURL + "/api/getAllLecturer").respond(200, responseData);
      createController();
      scope.gAllLecturer();
      httpBackend.flush();

      function compareResponse() {
        var actualResponse = [];
        var AllLecturerRaw = responseData.data;
        for (var i = 0; i < AllLecturerRaw.length; i++) {
          var name = AllLecturerRaw[i][1]
          var username = AllLecturerRaw[i][3]
          actualResponse.push({
            name: name,
            username: username
          })
        }
        return actualResponse;
      }
      expect(scope.AllLecturer).toEqual(compareResponse());
      expect(scope.error).toEqual('');
    });

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

    it('add appointment', function() {
      var data = {
        title: 'Title',
        startTime: 'STime',
        endTime: 'ETime',
        date: 'DDate',
        participants: 'Participants',
        bookable: 'Bookable',
        location: 'Location'
      };

      httpBackend.expectPOST(baseURL + "/api/addNewAppointment").respond(200, {
        data: data
      });
      createController();
      scope.addAppoint(data.title, data.startTime, data.endTime, data.date, data.participants, data.bookable, data.location);
      httpBackend.flush();

      expect(scope.appoints).toBeDefined();
      expect(scope.appoints).toEqual([data]);
      expect(scope.error).toEqual('');
    })

    it('remove appointment', function() {

      var data = {
        title: 'Title',
        startTime: 'STime',
        endTime: 'ETime',
        date: 'DDate',
        participants: 'Participants',
        bookable: 'Bookable',
        location: 'Location'
      };

      httpBackend.expectPOST(baseURL + "/api/addNewAppointment").respond(200, {
        data: data
      });
      createController();
      scope.addAppoint(data.title, data.startTime, data.endTime, data.date, data.participants, data.bookable, data.location);
      httpBackend.flush();

      expect(scope.appoints).toBeDefined();
      expect(scope.appoints).toEqual([data]);
      expect(scope.error).toEqual('');

      httpBackend.expect('DELETE', baseURL + "/api/deleteAppointment/" + 1).respond(200);
      scope.removeAppoint(1, 0);
      httpBackend.flush()

      expect(scope.appoints).toBeDefined();
      expect(scope.appoints).toEqual([]);
      expect(scope.error).toEqual("Appointment Deleted!");
    })

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });
  })
});

describe('Login Page:', function() {

  beforeEach(function() {
    browser.get('http://localhost:3333/index.html#login');
  });

  it('should render login page', function() {
    var currentUrl = browser.getLocationAbsUrl();
    expect(currentUrl).toMatch('/login');
    expect(element(by.className('underline')).getText()).toBe('User Login');
    var backBtn = element(by.className('form-horizontal')).all(by.tagName('a'));
    expect(backBtn.isDisplayed()).toBeTruthy();
  });

  it('should navigate to home page on back button click', function() {
    var backBtn = element(by.className('form-horizontal')).all(by.tagName('a'));
    backBtn.click();
    var currentUrl = browser.getLocationAbsUrl();
    expect(currentUrl).toMatch('/');
  });

  it('should not sign in with invalid credentials', function() {

    // Find page elements
    var userNameField = element(by.model('login.username'));
    var userPassField = element(by.model('login.password'));
    var userLoginBtn = element(by.className('btn-default'));

    // Fill input fields
    userNameField.sendKeys('test');
    userPassField.sendKeys('1234');

    // Ensure fields contain what we've entered
    expect(userNameField.getAttribute('value')).toEqual('test');
    expect(userPassField.getAttribute('value')).toEqual('1234');

    // Click to sign in - waiting for Angular as it is manually bootstrapped.
    userLoginBtn.click().then(function() {
      browser.waitForAngular();
      expect(element(by.className('alert-success')).isDisplayed()).toBeTruthy();
      expect(element(by.className('alert-success')).getText()).toBe('Please check the login credentials.');
    }, 10000);
  });

  xit('should sign in with valid credentials', function() {

    // Find page elements
    var userNameField = element(by.model('login.username'));
    var userPassField = element(by.model('login.password'));
    var userLoginBtn = element(by.className('btn-default'));

    // Fill input fields
    userNameField.sendKeys('ashu');
    userPassField.sendKeys('as');

    // Ensure fields contain what we've entered
    expect(userNameField.getAttribute('value')).toEqual('ashu');
    expect(userPassField.getAttribute('value')).toEqual('as');

    // Click to sign in - waiting for Angular as it is manually bootstrapped.
    userLoginBtn.click().then(function() {
      browser.waitForAngular();
      browser.wait(function() {
        return browser.isElementPresent(by.xpath('//a[@ui-sref="theta"]'))
      }).then(function() {
        var homeLink = by.xpath('//a[@ui-sref="theta"]')
        browser.isElementPresent(homeLink).then(function() {
          expect(element(by.xpath('//a[@ui-sref="theta"]')).isDisplayed()).toBeTruthy();
          expect(element(by.xpath('//a[@ui-sref="logout"]')).isDisplayed()).toBeTruthy();
          expect(element(by.xpath('//a[@ui-sref="appointment"]')).isDisplayed()).toBeTruthy();
          expect(element(by.xpath('//a[@ui-sref="modifyPerson"]')).isDisplayed()).toBeTruthy();
        })
      });
    }, 10000);
  });
});

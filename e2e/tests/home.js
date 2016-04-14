describe('Home Page:', function() {
	beforeEach(function() {
		browser.get('http://localhost:3333/index.html');
	});

	it("Initially three links should be present", function() {
		expect(element(by.xpath('//a[@ui-sref="home"]')).isDisplayed()).toBeTruthy();
		expect(element(by.xpath('//a[@ui-sref="login"]')).isDisplayed()).toBeTruthy();
		expect(element(by.xpath('//a[@ui-sref="register"]')).isDisplayed()).toBeTruthy();
	});

	it("should navigate to login page", function() {
		element(by.xpath('//a[@ui-sref="login"]')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/login');
	});

	it("should navigate to register page", function() {
		element(by.xpath('//a[@ui-sref="register"]')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/register');
	});

	it("should navigate to home page", function() {
		element(by.xpath('//a[@ui-sref="home"]')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/');
	});
});

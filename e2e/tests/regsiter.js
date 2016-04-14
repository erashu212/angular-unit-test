describe('Registartion Page:', function() {

  beforeEach(function() {
    browser.get('http://localhost:3333/index.html#register');
  });

  it('should render register page', function() {
    var currentUrl = browser.getLocationAbsUrl();
    expect(currentUrl).toMatch('/register');
    expect(element(by.className('underline')).getText()).toBe('User Registraion');
  });

  it('should navigate to home page on cancel button click', function() {
    var backBtn = element(by.className('form-horizontal')).all(by.tagName('a'));
    backBtn.click();
    var currentUrl = browser.getLocationAbsUrl();
    expect(currentUrl).toMatch('/');
  });

  xit('should add skill on button click', function() {
    element(by.css('select option:nth-child(0)')).click();
    element(by.xpath('//a[@ng-click="addSkill(inputSkills)"]')).click()
    var addedSkillEle = element.all(by.repeater('skill in skills')).first().all(by.tagName('td')).first();

    expect(addedSkillEle.getText()).toMatch('JavaScript');

    element(by.xpath('//a[@ng-click="removeSkill($index)"]')).click()


    element(by.css('select option:nth-child(0)')).click();
    var btnAddSkill = element(by.xpath('//a[@ng-click="addSkill(inputSkills)"]')).click()
    var addedSkillEle = element.all(by.repeater('skill in skills')).first().all(by.tagName('td')).first();

    expect(addedSkillEle.getText()).toMatch('JavaScript');
  });

  it('should allow user to register', function() {
    var name = element(by.model('register.rname'));
    var email = element(by.model('register.rname'));
    var username = element(by.model('register.rname'));
    var password = element(by.model('register.rname'));

    var isLecturer = element(by.model('register.IsLecturer'));

    var skill = element(by.cssContainingText('option', 'JavaScript'));
    var btnAddSkill = element(by.xpath('//a[@ng-click="addSkill(inputSkills)"]'))
  });
});

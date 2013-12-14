describe('angularjs homepage', function() {
  it('should greet the named user', function() {
    // Load the AngularJS homepage.
    browser.get('http://localhost:8020');

    // Find the element with ng-model matching 'yourName' - this will
    // find the <input type="text" ng-model="yourName"/> element - and then
    // type 'Julie' into it.
    $('a.select2-choice').click();
    $('input.select2-input').sendKeys('Honey, I');

    browser.sleep(1000);

    // Find the element with binding matching 'yourName' - this will
    // find the <h1>Hello {{yourName}}!</h1> element.
    var film = $('.select2-highlighted .select2-result-label');

    // Assert that the text element has the expected value.
    // Protractor patches 'expect' to understand promises.
    expect(film.getText()).toEqual('Honey, I Shrunk the Kids (1989)');
  });
});
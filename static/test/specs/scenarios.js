'use strict';

describe('find film', function () {
    var base, ptor;

    base = 'http://betterthanpredator.com/#';
    ptor = protractor.getInstance();

    it('should find Honey I Shrunk the Kids', function () {

        ptor.get(base);
        ptor.findElement(protractor.By.className('select2-choice')).click();
        ptor.findElement(protractor.By.className('select2-input')).sendKeys('Honey, I');
        ptor.wait(function () {
            return ptor.isElementPresent(protractor.By.className('select2-result-label'));
        }).then(function () {
            var expectedTitle, film;
            expectedTitle = 'Honey, I Shrunk the Kids (1989)';
            film = ptor.findElement(protractor.By.className('select2-result-label'));
            expect(film.getText()).toEqual(expectedTitle);
            film.click();
        });
        // Does the button get updated correctly
        ptor.wait(function () {
            return ptor.isElementPresent(protractor.By.className('go'));
        }).then(function () {
            var btn, expectedLink;
            expectedLink = base + '/versus/10611/honey-i-shrunk-the-kids';
            btn = ptor.findElement(protractor.By.className('go'));
            expect(btn.getAttribute('href')).toEqual(expectedLink);
        });

    });
});

'use strict';

describe('find film', function () {
    var API_BASE, base, ptor;

    base = 'http://betterthanpredator.com/#';
    ptor = protractor.getInstance();

    it('should find Honey I Shrunk the Kids', function () {
        var films, query;

        ptor.get(base);
        query = element(by.model('title'));
        films = protractor.By.repeater('f in films');

        query.sendKeys('honey')

        ptor.wait(function () {
            return ptor.isElementPresent(films);
        }).then(function () {
            var film0, film2;

            film0 = element(films.row(0).column('{{f.title}}'));
            film2 = element(films.row(2).column('{{f.title}}'));

            // We've limited the results to 10 and we should get that many
            expect(element.all(films).count()).toEqual(10);
            // The second result (FOR NOW) is HISTK
            expect(film2.getText()).toEqual('Honey, I Shrunk the Kids (1989)');
            // Move down two
            query.sendKeys(protractor.Key.DOWN);
            query.sendKeys(protractor.Key.DOWN);
            // Make sure the first film isn't active
            expect(film0.getAttribute('class')).not.toContain('active');
            // Make sure HISTK is
            expect(film2.getAttribute('class')).toContain('active');
        });

    });
});

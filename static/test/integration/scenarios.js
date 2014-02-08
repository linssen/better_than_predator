'use strict';

describe('BTP pages', function () {
    var API_BASE, base, expectedFilms, expectedVersusURL, ptor;

    base = 'http://betterthanpredator.com/#';
    ptor = protractor.getInstance();
    expectedFilms = function () {
        /*jshint camelcase: false */
        return {
            movies: [
                {id: 10611, title: 'Honey, I Shrunk the Kids', year: '1989', url: 'honey-i-shrunk-the-kids'},
                {id: 770882280, title: 'Honey', year: '2003', url: 'honey'}
            ]
        };
    };
    expectedVersusURL = ':base/versus/:id/:title'
        .replace(':base', base)
        .replace(':id', expectedFilms().movies[0].id)
        .replace(':title', expectedFilms().movies[0].url);

    it('should find Honey I Shrunk the Kids', function () {
        var films, query;

        ptor.get(base);
        query = element(by.model('title'));
        films = protractor.By.repeater('f in films');

        query.sendKeys('honey')

        ptor.wait(function () {
            return ptor.isElementPresent(films);
        }).then(function () {
            var expectedTitle, film0, film2;

            expectedTitle = ':title (:year)'
                .replace(':title', expectedFilms().movies[0].title)
                .replace(':year', expectedFilms().movies[0].year);

            film0 = element(films.row(0).column('{{f.title}}'));
            film2 = element(films.row(2).column('{{f.title}}'));

            // We've limited the results to 10 and we should get that many
            expect(element.all(films).count()).toEqual(10);
            // The second result (FOR NOW) is HISTK
            expect(film2.getText()).toEqual(expectedTitle);
            // Move down two
            query.sendKeys(protractor.Key.DOWN);
            query.sendKeys(protractor.Key.DOWN);
            // Make sure the first film isn't active
            expect(film0.getAttribute('class')).not.toContain('active');
            // Make sure HISTK is
            expect(film2.getAttribute('class')).toContain('active');
            // Select a flm with the enter key
            query.sendKeys(protractor.Key.ENTER);
            ptor.waitForAngular();
            expect(ptor.getCurrentUrl()).toEqual(expectedVersusURL);

        });

    });
});

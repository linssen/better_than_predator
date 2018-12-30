describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie*',
      response: {
        results: [
          {
            id: 9354,
            title: 'Honey, I Shrunk the Kids',
            poster_path: '/f5eFxKYAd7hN1BxYzBg9qL1SDRe.jpg',
            release_date: '1989-06-22',
            vote_average: 6.2,
          },
        ],
      },
    });
    cy.visit('/');
    cy.get('input[type="search"]').as('search');
    cy.get('@search').should('have.attr', 'placeholder', 'Find a film...');

    cy.get('@search').type('Honey, I');
    cy.wait(401).as('Debounce pause');
    cy.get('ul li').should('have.length', 1);
    cy.get('ul li:first').contains('Honey, I Shrunk the Kids');
  });
});

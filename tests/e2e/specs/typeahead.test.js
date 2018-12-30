describe('TypeAhead', () => {
  it('Searches on type, and clears on clear', () => {
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
    cy.wait(401);

    cy.get('ul li').as('results');
    cy.get('@results').should('have.length', 1);
    cy.get('@results').get(':first').should('contain', 'Honey, I Shrunk the Kids (1989)');
    cy.get('@results').get(':first a').should('have.attr', 'href', '#/versus/9354/honey-i-shrunk-the-kids');

    cy.get('@search').clear();
    cy.wait(401);
    cy.get('@results').should('have.length', 0);
  });
});

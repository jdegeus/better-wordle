describe('Navigation', () => {
  it('Homepage consist of elements that should be shown at initial visit.', () => {
    cy.viewport("iphone-xr");

    // Start from the index page
    cy.visit('/');
 
    // All main components should exist or not exist.
    cy.get('[data-cy="layout"]').should('exist');
    cy.get('[data-cy="homepage"]').should('exist');
    cy.get('[data-cy="control-bar"]').should('exist');
    cy.get('[data-cy="board"]').should('exist');
    cy.get('[data-cy="message"]').should('not.exist');
    cy.get('[data-cy="definition"]').should('not.exist');
    cy.get('[data-cy="keyboard"]').should('exist');
  });
});
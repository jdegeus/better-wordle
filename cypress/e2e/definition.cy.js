import { WORD_LIST } from "../../public/words_en";
const ANSWER = "oriel";

describe('Guessing', () => {
  it('Users can make guess by either typing with keyboard or using provided character buttons.', () => {
    //cy.viewport('iphone-xr');
    cy.viewport(500, 500);

    expect(WORD_LIST).to.be.a('array');

    // Start from the index page
    cy.visit(`/?word=${ANSWER}`);

    cy.get('[data-cy="definition"] [data-cy="default-button"]').should('not.exist');
    cy.get('[data-cy="homepage"]').should('exist');

    // GOOD ANSWER

    cy.focused();

    cy.get('[data-cy="homepage"]').type(`${ANSWER}{enter}`);

    cy.get('[data-cy="guesses-row"]').should('have.length', 1).last()
    .children().should('have.length', 5)
    .first().should('contain', ANSWER[0]).should('have.class', 'CORRECT_SPOT')
    .next().should('contain', ANSWER[1]).should('have.class', 'CORRECT_SPOT')
    .next().should('contain', ANSWER[2]).should('have.class', 'CORRECT_SPOT')
    .next().should('contain', ANSWER[3]).should('have.class', 'CORRECT_SPOT')
    .next().should('contain', ANSWER[4]).should('have.class', 'CORRECT_SPOT');

    cy.get(`[data-cy="keyboard-char-${ANSWER[0]}"]`).parent().should('have.class', 'CORRECT_SPOT')
    cy.get(`[data-cy="keyboard-char-${ANSWER[1]}"]`).parent().should('have.class', 'CORRECT_SPOT')
    cy.get(`[data-cy="keyboard-char-${ANSWER[2]}"]`).parent().should('have.class', 'CORRECT_SPOT')
    cy.get(`[data-cy="keyboard-char-${ANSWER[3]}"]`).parent().should('have.class', 'CORRECT_SPOT')
    cy.get(`[data-cy="keyboard-char-${ANSWER[4]}"]`).parent().should('have.class', 'CORRECT_SPOT');

    // OPEN DEFINITION

    cy.get('[data-cy="definition"] [data-cy="default-button"]').should('exist');

    cy.get('[data-cy="definition"] [data-cy="default-button"]').click();

    cy.get('[data-cy="definition"] [data-cy="card"]').should('exist');

    cy.get('[data-cy="definition"] [data-cy="card-close"]').click();

    cy.get('[data-cy="definition"] [data-cy="card"]').should('not.exist');

    cy.get('[data-cy="definition"] [data-cy="default-button"]').click();

    cy.get('[data-cy="definition"] [data-cy="card"]').should('exist');

    cy.get('[data-cy="homepage"]').type(`{esc}`);

    cy.get('[data-cy="definition"] [data-cy="card"]').should('not.exist');

    cy.get('[data-cy="definition"] [data-cy="default-button"]').click();

    cy.get('[data-cy="definition"] [data-cy="card"]').should('exist');

    cy.get('[data-cy="definition"] [data-cy="card-inner"]').click();

    cy.get('[data-cy="definition"] [data-cy="card"]').should('exist');

    cy.get('[data-cy="definition"] [data-cy="card"]').click('bottom');

    cy.get('[data-cy="definition"] [data-cy="card"]').should('not.exist');
  });
});
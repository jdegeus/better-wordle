import { WORD_LIST } from "../../public/words_en";
const ANSWER = "oriel";
const WORD_1 = "xiyue";
const WORD_2 = "elite";
const WORD_3 = "elves";

describe('Guessing', () => {
  it('Users can make guess by either typing with keyboard or using provided character buttons.', () => {
    cy.viewport('iphone-xr');

    expect(WORD_LIST).to.be.a('array');
    expect(WORD_LIST).to.contain(WORD_1);
    expect(WORD_LIST).to.contain(WORD_2);
    expect(WORD_LIST).to.contain(WORD_3);

    // Start from the index page
    cy.visit(`/?word=${ANSWER}`);

    oneGame();

    cy.get(`[data-cy="action-button"]`).should('exist').click();

    oneGame();

    cy.get('[data-cy="homepage"]').type(`r`);

    oneGame();
  });
});

function oneGame(){
  
  // WORD 1

  cy.focused();

  cy.get('[data-cy="homepage"]').type(`${WORD_1}{enter}`);

  cy.get('[data-cy="guesses-row"]').should('have.length', 1)
  .children().should('have.length', 5)
  .first().should('contain', WORD_1[0]).should('have.class', 'NO_SPOT')
  .next().should('contain', WORD_1[1]).should('have.class', 'WRONG_SPOT')
  .next().should('contain', WORD_1[2]).should('have.class', 'NO_SPOT')
  .next().should('contain', WORD_1[3]).should('have.class', 'NO_SPOT')
  .next().should('contain', WORD_1[4]).should('have.class', 'WRONG_SPOT');

  // WORD 2

  cy.get(`[data-cy="keyboard-char-${WORD_2[0]}"]`).click();
  cy.get(`[data-cy="keyboard-char-${WORD_2[1]}"]`).click();
  cy.get(`[data-cy="keyboard-char-${WORD_2[2]}"]`).click();
  cy.get(`[data-cy="keyboard-char-${WORD_2[3]}"]`).click();
  cy.get(`[data-cy="keyboard-char-${WORD_2[4]}"]`).click();
  cy.get(`[data-cy="keyboard-char-enter"]`).click();

  cy.get('[data-cy="guesses-row"]').should('have.length', 2).last()
  .children().should('have.length', 5)
  .first().should('contain', WORD_2[0]).should('have.class', 'WRONG_SPOT')
  .next().should('contain', WORD_2[1]).should('have.class', 'WRONG_SPOT')
  .next().should('contain', WORD_2[2]).should('have.class', 'CORRECT_SPOT')
  .next().should('contain', WORD_2[3]).should('have.class', 'NO_SPOT')
  .next().should('contain', WORD_2[4]).should('have.class', 'WRONG_SPOT_EXTRA');

  cy.get(`[data-cy="keyboard-char-${WORD_2[0]}"]`).parent().should('have.class', 'WRONG_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_2[1]}"]`).parent().should('have.class', 'WRONG_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_2[2]}"]`).parent().should('have.class', 'CORRECT_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_2[3]}"]`).parent().should('have.class', 'NO_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_2[4]}"]`).parent().should('have.class', 'WRONG_SPOT');

  // WORD 3

  cy.get('[data-cy="homepage"]').type(`${WORD_3}{enter}`);

  cy.get('[data-cy="guesses-row"]').should('have.length', 3).last()
  .children().should('have.length', 5)
  .first().should('contain', WORD_3[0]).should('have.class', 'WRONG_SPOT_EXTRA')
  .next().should('contain', WORD_3[1]).should('have.class', 'WRONG_SPOT')
  .next().should('contain', WORD_3[2]).should('have.class', 'NO_SPOT')
  .next().should('contain', WORD_3[3]).should('have.class', 'CORRECT_SPOT')
  .next().should('contain', WORD_3[4]).should('have.class', 'NO_SPOT');

  cy.get(`[data-cy="keyboard-char-${WORD_3[0]}"]`).parent().should('have.class', 'CORRECT_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_3[1]}"]`).parent().should('have.class', 'WRONG_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_3[2]}"]`).parent().should('have.class', 'NO_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_3[3]}"]`).parent().should('have.class', 'CORRECT_SPOT')
  cy.get(`[data-cy="keyboard-char-${WORD_3[4]}"]`).parent().should('have.class', 'NO_SPOT');

  // GOOD ANSWER

  cy.get('[data-cy="homepage"]').type(`${ANSWER}{enter}`);

  cy.get('[data-cy="guesses-row"]').should('have.length', 4).last()
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
}
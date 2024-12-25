import { selectors } from './e2e';

declare global {
  namespace Cypress {
    interface Chainable {
      intercept(intercept: any): any;
      openModal(ingredientName: string): any;
      addIngredient(index: number, position: number): any;
    }
  }
}

Cypress.Commands.add('openModal', (ingredientName: string) => {
  cy.contains(ingredientName).click();
});

Cypress.Commands.add('addIngredient', (index: number, position: number) => {
  cy.get(selectors.ingredientsList)
    .eq(index)
    .children()
    .eq(position)
    .find('button')
    .click();
});

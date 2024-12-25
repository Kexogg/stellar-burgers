const selectors = {
  ingredient: '[data-testId="ingredient-item"]',
  modal: '[data-testId="modal"]',
  modalOverlay: '[data-testId="modal-overlay"]',
  constructor: '[data-testId="constructor"]',
  orderButton: '[data-testId="getOrder-button"]',
  closeButton: '[data-testId="close-button"]'
};

describe('Burger constructor and order creation', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('refreshToken', JSON.stringify('token'));
    cy.setCookie('accessToken', JSON.stringify('token'));

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Constructor functionality', () => {
    it('should display ingredients in constructor', () => {
      cy.get(selectors.ingredient, { timeout: 10000 }).should('exist');
      cy.get(selectors.ingredient).first().children('button').click();
      cy.get(selectors.constructor).as('constructor');
      cy.get('@constructor').contains('Краторная булка N-200i');
    });

    it('should toggle ingredient modal visibility', () => {
      cy.get(selectors.ingredient, { timeout: 10000 }).first().click();
      cy.get(selectors.modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(selectors.closeButton).click();
      cy.get('@modal').should('not.exist');
    });

    it('should close ingredient modal on outside click', () => {
      cy.get(selectors.ingredient, { timeout: 10000 }).first().click();
      cy.get(selectors.modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(selectors.modalOverlay).click({ force: true });
      cy.get('@modal').should('not.exist');
    });

    it('should create an order and display order number in modal', () => {
      cy.get(selectors.ingredient, { timeout: 10000 }).first().click();
      cy.get(selectors.ingredient).eq(1).click();
      cy.get(selectors.orderButton).click();

      cy.wait('@createOrder');

      cy.get(selectors.modal).as('orderModal');
      cy.get('@orderModal').should('exist');
      cy.get('@orderModal').should('contain', '555');

      cy.get(selectors.modalOverlay).click({ force: true });
      cy.get('@orderModal').should('not.exist');
    });
  });
});

describe('signup form', () => {
  it('renders correctly', () => {
    cy.visit('/signup');

    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  describe('visited from login page', () => {
    it('redirects to original page after signup', () => {
      cy.visit('/farm');

      cy.get('button:contains("Login")').click();

      cy.get('button:contains("Sign up")').click();

      const password = 'password';

      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type(password);
      cy.get('input[name="confirmPassword"]').type(password);
      cy.get('button[role="checkbox"]').click();
      cy.get('button[type="submit"]').click();

      cy.url().should('eq', '/farm');
    });
  });
});

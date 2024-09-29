export const getButton = (label: string, options?: unknown) =>
    cy.contains('button', label, options);

describe('getButton', () => {
    it('finds a `Button` by label', () => {
        cy.visit('http://localhost:8000/about');
        getButton('121').should('exist');
        getButton('Non-existent').should('not.exist');
    });
});

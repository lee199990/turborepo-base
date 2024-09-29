import React from 'react';
import Alert from './Alert';

describe('<Alert />', () => {
    it('renders', () => {
        cy.mount(<Alert message="Success Text" type="success" />);
        cy.contains('div', 'Success Text').should('exist');
        cy.contains('div', 'Success Text').should('not.exist');
    });
});

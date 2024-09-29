import React from 'react';
import Pagination from './Pagination';

describe('<Pagination />', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.mount(<Pagination total={21} />);
    });
    it('测试组件能否正常显示', () => {
        cy.get('.ant-pagination').should('exist');
    });

    it('测试点击页码是否能正确跳转', () => {
        cy.get('.ant-pagination-item').contains('2').click();
        cy.get('.ant-pagination-item-active').should('contain', '2');
    });
    it('测试输入页码是否能正确跳转', () => {
        cy.get('.ant-pagination-options-quick-jumper input').focus().type('3');
        cy.get('.ant-pagination-options-quick-jumper input').blur();
        cy.get('.ant-pagination-item-active').should('contain', '3');
    });
    it('测试切换pageSize', () => {
        cy.get('.ant-pagination-options-size-changer').click();
        cy.get('.ant-select-item-option-content').contains('30').click();
        cy.get('.ant-pagination-item').should('have.length', 1);
    });
});

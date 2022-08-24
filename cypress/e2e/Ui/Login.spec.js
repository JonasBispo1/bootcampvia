/// <reference types="cypress" />

describe('US0001 - Funcionalidade: Login', () => {

   beforeEach(() => {
      cy.visit('login')
   });

    it('Deve fazer login com sucesso', () => {
      cy.login('jonas.neto-ext@viavarejo.com.br','jonas123')
      cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha inválidos', () => {
      cy.login('jonas.neto123-ext@viavarejo.com.br','jonas123')
      cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
     });
});
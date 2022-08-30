/// <reference types="cypress" />
import usuariosJson from "../../fixtures/usuarios.json"

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

    it('Deve fazer login com sucesso - Usando importação', () => {
      cy.login(usuariosJson[0].email,usuariosJson[0].senha)
      cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it.only('Deve fazer login com sucesso - Usando fixture', () => {
      cy.fixture("usuarios").then((keyUserJson) => {
        cy.login(keyUserJson[0].email, keyUserJson[0].senha)
      })
      cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
      cy.title().should('eq', 'ConexaoQA')
    });
});
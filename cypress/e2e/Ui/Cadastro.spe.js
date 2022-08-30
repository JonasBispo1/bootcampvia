/// <reference types="cypress" />

const faker = require('faker-br')
let email = 'Jonas ' + faker.internet.email()

describe('US0002 - Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrar')
     });

    it('Deve fazer cadastro com sucesso', () => {
        cy.cadastrarUsuario('Jonas Bispo',email,'teste123')
        cy.valida_cadastro_sucesso()
    });

    it('Deve fazer cadastro com usuário já cadastrado', () => {
        cy.cadastrarUsuario('Jonas Bispo',email,'teste123')
        cy.get('div[class="alert alert-danger"]').should('contain','Usuário já registrado')
    });

    it.only('Deve criar perfil com sucesso', () => {
        cy.cadastrarUsuario('Jonas Bispo',faker.internet.email(),'teste123')
        cy.valida_cadastro_sucesso()
        cy.get('a[data-test="dashboard-createProfile"]').click()
        cy.listArray('QAE Sênior','div[id="mui-component-select-status"]')
        cy.perfil_empresarial()
        cy.get('input[name="skills"]').type('robot framework; C#; Java ...')
        cy.get('input[data-test="profile-submit"]').click()
        cy.get('a[data-test="dashboard-addExperience"]').should('exist')
        cy.get('a[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
    });

    it('Deve criar perfil sem preencher campo obrigatório "Conhecimentos"', () => {
        cy.cadastrarUsuario('Jonas Bispo',faker.internet.email(),'teste123')
        cy.valida_cadastro_sucesso()
        cy.get('a[data-test="dashboard-createProfile"]').click()
        cy.listArray('QAE Sênior','div[id="mui-component-select-status"]')
        cy.perfil_empresarial()
        cy.get('input[data-test="profile-submit"]').click()
        cy.get('div[data-test="profile-skills"] p').should('contain', 'Conhecimentos é obrigatório')
    });
});
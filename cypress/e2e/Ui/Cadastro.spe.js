/// <reference types="cypress" />

const faker = require('faker-br')

describe('US0002 - Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrar')
     });

    it('Deve fazer cadastro com sucesso', () => {
        cy.get('input[name="name"]').type('Jonas Bispo')
        cy.get('input[name="email"]').type('Jonas ' + faker.internet.email())
        cy.get('input[name="password"]').type('teste123')
        cy.get('input[name="password2"]').type('teste123')
        cy.get('input[data-test="register-submit"]').click()
        cy.get('h1[class="large text-primary"]').should('contain','Dashboard')
        cy.get('a[data-test="dashboard-createProfile"]').should('exist')
        cy.get('a[data-test="dashboard-createProfile"]').click()

        cy.listArray('QAE Sênior','div[id="mui-component-select-status"]')

        cy.get('input[name="company"]').type('Viahuber')
        cy.get('input[name="website"]').type('https://www.coisanenhuma.com/')
        cy.get('input[name="location"]').type('São Paulo - Osasco')
        cy.get('input[name="skills"]').type('robot framework; C#; Java ...')
        cy.get('input[name="githubusername"]').type('https://github.com/JonasBispo1/')
        cy.get('textarea[name="bio"]').type('este campo não será possivel preencher, chame para um churrasco')
        cy.get('button[data-test="profile-socials"]').click()

        cy.get('input[name="twitter"]').should('exist')
        cy.get('input[name="twitter"]').type('https://www.twitter.com/')
        cy.get('input[name="facebook"]').type('https://www.facebook.com/')
        cy.get('input[name="youtube"]').type('https://www.youtube.com/')
        cy.get('input[name="linkedin"]').type('https://www.linkedin.com/')
        cy.get('input[name="instagram"]').type('https://www.instagram.com/')
        cy.get('input[name="medium"]').type('https://www.medium.com/')

        cy.get('input[data-test="profile-submit"]').click()

        cy.get('a[data-test="dashboard-addExperience"]').should('exist')
        cy.get('a[href="/adicionar-formacao"]').should('contain', 'Adicionar Formação Acadêmica')
    });
});